function BeeCollection(two, playArea, utils, systemParameters) {

	var bees = [];
	
	var spawnBee = function() {
		var colour = i % 3 == 0 ? systemParameters.beeAltColour : systemParameters.beeColour;
		var dot = utils.createDot(two, colour);
		var bee = new Bee(dot, playArea, utils, systemParameters);
		bees.push(bee);
	};

	var update = function(targetGroups) {
		// for each group, detect the leader and update bees
		for (var x = targetGroups.length - 1; x >= 0; x--) {
			var target = targetGroups[x].target,
				groupedBees = targetGroups[x].bees;

			var leader = target.findLeader(groupedBees);

			for (var i = groupedBees.length - 1; i >= 0; i--) {
				var bee = groupedBees[i];

				if(bee == leader.bee) {
					bee.update(target, systemParameters.indicator);
				} else {
					bee.update(leader.bee.dot);
				}
			};
		};
	};

	return {
		spawnBee: spawnBee,
		update: update,
		bees: bees
	};
}