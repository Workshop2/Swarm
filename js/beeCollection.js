function BeeCollection(two, playArea, utils, systemParameters) {

	var bees = [];
	
	var spawnBee = function() {
		var colour = i % 3 == 0 ? systemParameters.beeAltColour : systemParameters.beeColour;
		var dot = utils.createDot(two, colour);
		var bee = new Bee(dot, playArea, utils, systemParameters);
		bees.push(bee);
	};

	var update = function(targetCollection) {
		var targetGroups = groupBees(targetCollection);

		for (var x = 0; x < targetGroups.length; x++) {
			var targetGroup = targetGroups[x];

			// get closest bee
			var leader = null;
			for(var i = 0; i < targetGroup.bees.length; i++) {
				var bee = targetGroup.bees[i],
					distanceTo = utils.distanceTo(bee.dot.translation, targetGroup.target.translation);
					
				var current = {
					bee: bee,
					distance: utils.getDistance(distanceTo)
				};

				if(leader == null || current.distance < leader.distance) {
					leader = current;
				}
			}

			for(var i = 0; i < targetGroup.bees.length; i++) {
				var bee = targetGroup.bees[i];

				if(bee == leader.bee) {
					bee.update(targetGroup.target, systemParameters.indicator);
				}
				else		
					bee.update(leader.bee.dot);
			}

		};		
	};

	// will return a list of grouped targets and children
	var groupBees = function(targetCollection) {
		var targetGroups = [];

		// turn target collection into a wrapped target with children
		for (var i = 0; i < targetCollection.length; i++) {
			targetGroups.push({ target: targetCollection[i], bees: [] });
		}

		for (var i = 0; i < bees.length; i++) {
			var bee = bees[i];
			var evalTargets = [];

			// builds a list of distances between all available targets
			for (var j = 0; j < targetCollection.length; j++) {
				var target = targetCollection[j],
					distanceTo = utils.distanceTo(bee.dot.translation, target.translation);

				evalTargets.push({target: target, distance: utils.getDistance(distanceTo) })
			}

			var beeTarget = null;
			for (var k = 0; k < evalTargets.length; k++) {
				var evalTarget = evalTargets[k];
				if(beeTarget == null || evalTarget.distance < beeTarget.distance) {
					beeTarget = evalTarget;
				}
			}

			for (var l = 0; l < targetGroups.length; l++) {
				var targetGroup = targetGroups[l];
				if(targetGroup.target == beeTarget.target) {
					targetGroup.bees.push(bee);
					break;
				}
			}
		}

		return targetGroups;
	};

	return {
		spawnBee: spawnBee,
		update: update
	};
}