function Target(dot, playArea, utils, systemParameters) {
	var clockwise = utils.randomInt(0, 1) == 0,
		degrees = utils.randomInt(1, 360),
		pos = dot.translation,
		speedModifier = utils.diffuse(systemParameters.defaultSpeed, 0.15);

	var update = function() {
		// move target in a lovely circle (Thanks James)
		var radians = utils.toRadians(degrees / speedModifier); // convert degrees to radians
		pos.x = playArea.width  / 2 + (Math.cos(radians) * (playArea.width  / 3));
		pos.y = playArea.height / 2 + (Math.sin(radians) * (playArea.height / 3));

		updateDirection();
	};

	var updateDirection = function() {
		if(clockwise)
			degrees++;
		else
			degrees--;

		if(degrees > 720)
			clockwise = false;
		if(degrees < 0)
			clockwise = true; 
	};

	var findLeader = function(bees) {
		// find closest bee to target e.g. the leader
		var leader = null;

		for (var i = bees.length - 1; i >= 0; i--) {
			var bee = bees[i],
				distanceTo = utils.distanceTo(bee.dot.translation, pos);
				
			var current = {
				bee: bee,
				distance: utils.getDistance(distanceTo)
			};

			if(leader == null || current.distance < leader.distance) {
				leader = current;
			}
		};

		return leader;
	};

	return {
		translation: pos,
		update: update,
		findLeader: findLeader
	};
}