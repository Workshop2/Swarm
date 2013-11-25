function Target(dot, playArea, utils, systemParameters) {
	var clockwise = utils.randomInt(0, 2) == 0,
		degrees = utils.randomInt(1, 360),
		pos = dot.translation;


	var update = function() {
		var speedModifier = getSpeedModifier();

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

	var getSpeedModifier = function() {
		var speedModifier = systemParameters.defaultSpeed;
		if(systemParameters.cool === true)
			speedModifier = utils.randomInt(1, 2); // simulates multiple targets to confuse the swarm

		return speedModifier;
	};

	return {
		translation: pos,
		update: update
	};
}