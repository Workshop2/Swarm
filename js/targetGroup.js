function TargetGroup(target, utils) {

	var bees = [],
		leader = { bee: null, distance: 0 };

	var addBee = function(bee) {
		bees.push(bee);

		// works out the current leader while bees are being added to the array
		var distance = utils.getDistance(utils.distanceTo(bee.dot.translation, target.translation));			
		if(leader.bee == null || distance < leader.distance) {
			leader.bee = bee;
			leader.distance = distance;
		}
	};

	var getLeader = function() {
		return leader.bee;
	};

	return {
		target: target,
		bees: bees,
		addBee: addBee,
		getLeader: getLeader
	};
}