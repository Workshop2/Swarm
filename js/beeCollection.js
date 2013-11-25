function BeeCollection(two, playArea, utils, systemParameters) {

	var bees = [];
	
	var spawnBee = function() {
		var colour = i % 3 == 0 ? '#20B2AA' : '#00FF33';
		var dot = utils.createDot(two, colour);
		var bee = new Bee(dot, playArea, utils, systemParameters);
		bees.push(bee);
	};

	var update = function update(target) {
		// get closest bee
		var leader = null;
		for(var i = 0; i < bees.length; i++) {
			var bee = bees[i];
			var distanceTo = utils.distanceTo(bee.dot.translation, target.translation);
			var current = {
				bee: bee,
				distance: utils.getDistance(distanceTo)
			};

			if(leader == null || current.distance < leader.distance) {
				leader = current;
			}
		}

		for(var i = 0; i < bees.length; i++) {
			var bee = bees[i];

			if(bee == leader.bee) {
				bee.update(target, systemParameters.indicator);
			}
			else		
				bee.update({ translation: leader.bee.dot.translation });
		}
	};

	return {
		spawnBee: spawnBee,
		update: update
	};
}