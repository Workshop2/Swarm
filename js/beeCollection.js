function BeeCollection(two, playArea, utils, systemParameters) {

	var bees = [];
	
	var spawnBee = function() {
		var colour = i % 3 == 0 ? systemParameters.beeAltColour : systemParameters.beeColour;
		var dot = utils.createDot(two, colour);
		var bee = new Bee(dot, playArea, utils, systemParameters);
		bees.push(bee);
	};

	var update = function(targetCollection) {
		var targetGroups = targetCollection.groupBees(bees);

		for (var x = targetGroups.length - 1; x >= 0; x--) {
			var targetGroup = targetGroups[x];

			// find closest bee to target e.g. the leader
			var leader = null;
			for (var i = targetGroup.bees.length - 1; i >= 0; i--) {
				var bee = targetGroup.bees[i],
					distanceTo = utils.distanceTo(bee.dot.translation, targetGroup.target.translation);
					
				var current = {
					bee: bee,
					distance: utils.getDistance(distanceTo)
				};

				if(leader == null || current.distance < leader.distance) {
					leader = current;
				}
			};

			for (var i = targetGroup.bees.length - 1; i >= 0; i--) {
				var bee = targetGroup.bees[i];

				if(bee == leader.bee) {
					bee.update(targetGroup.target, systemParameters.indicator);
				} else {
					bee.update(leader.bee.dot);
				}
			};
		};
	};

	return {
		spawnBee: spawnBee,
		update: update
	};
}