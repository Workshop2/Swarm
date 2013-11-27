function TargetCollection(two, playArea, utils, systemParameters) {

	var targets = [];

	var spawnTarget = function() {
		var targeDot = utils.createDot(two, systemParameters.targetColour, 3);
		var target = new Target(targeDot, playArea, utils, systemParameters);
		targets.push(target);
	};

	var update = function() {
		for (var i = targets.length - 1; i >= 0; i--) {
			targets[i].update();
		};
	};

	var groupBees = function(bees) {
		var targetGroups = [];

		// turn target collection into a wrapped target with children
		for (var i = targets.length - 1; i >= 0; i--) {
			targetGroups.push({ target: targets[i], bees: [] });
		};

		// assign a bee to a target group
		for (var i = bees.length - 1; i >= 0; i--) {
			var bee = bees[i];
			var evalTargets = [];

			// builds a list of distances between all available targets
			for (var j = targets.length - 1; j >= 0; j--) {
				var target = targets[j],
					distanceTo = utils.distanceTo(bee.dot.translation, target.translation);

				evalTargets.push({target: target, distance: utils.getDistance(distanceTo) })
			};

			var beeTarget = null;
			for (var k = evalTargets.length - 1; k >= 0; k--) {
				var evalTarget = evalTargets[k];
				if(beeTarget == null || evalTarget.distance < beeTarget.distance) {
					beeTarget = evalTarget;
				}
			};

			for (var l = targetGroups.length - 1; l >= 0; l--) {
				var targetGroup = targetGroups[l];
				if(targetGroup.target == beeTarget.target) {
					targetGroup.bees.push(bee);
					break;
				}
			};
		};

		return targetGroups;
	};

	return {
		update: update,
		spawnTarget: spawnTarget,
		targets: targets,
		groupBees: groupBees
	};
}