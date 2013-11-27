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

			var beeTarget = null;
			// builds a list of distances between all available targets
			for (var j = targetGroups.length - 1; j >= 0; j--) {
				var target = targetGroups[j].target,
					distanceTo = utils.distanceTo(bee.dot.translation, target.translation),
					distance = utils.getDistance(distanceTo);

				if(beeTarget == null || distance < beeTarget.distance) {
					beeTarget = { target: target, distance: distance, id: j };
				}
				else if(distance == beeTarget.distance) { 
					// if they are the same, pick a random one
					var rnd = utils.randomInt(0, 1);
					beeTarget = rnd == 0 ? beeTarget : { target: target, distance: distance, id: j };
				}
			};

			if(beeTarget != null)
				targetGroups[beeTarget.id].bees.push(bee);
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