function Target(dot, playArea, utils, systemParameters) {
	var clockwise = true;

	return {
		translation: pos = dot.translation,
		degrees: degrees = utils.randomInt(1, 360),
		update: function() {
			if(clockwise)
				degrees++;
			else
				degrees--;

			var speedModifier = systemParameters.defaultSpeed;
			if(systemParameters.cool === true)
				speedModifier = utils.randomInt(1, 2); // simulates multiple targets to confuse the swarm

			// move target in a lovely circle (Thanks James)
			var radians = utils.toRadians(degrees / speedModifier); // convert degrees to radians
			pos.x = playArea.width  / 2 + (Math.cos(radians) * (playArea.width  / 3));
			pos.y = playArea.height / 2 + (Math.sin(radians) * (playArea.height / 3));

			if(degrees > 720)
				clockwise = false;
			if(degrees < 0)
				clockwise = true; 
		}
	};
}