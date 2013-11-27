function Bee(dot, playArea, utils, systemParameters) {

	var velocity = {x: 0.0, y: 0.0},
    			acceleration = {x: 0.0, y: 0.0},
    			position = utils.getRandomPosition(playArea),
    			rf = utils.randomFloat(0.00002, 0.00009),
    			initialFill = dot.fill,
    			initialLineWidth = dot.linewidth,
    			accelerationClamp = systemParameters.accelerationClamp * utils.randomFloat(0.85, 1.15),
    			velocityClamp = systemParameters.velocityClamp * utils.randomFloat(0.85, 1.15);   

	var update = function(targetDot, settings) {
		var target = targetDot.translation;

		var d = utils.distanceTo(position, target);
		var distance = utils.getDistance(d);

		var accelerationRate = distance * rf;
		acceleration.x = d.x * accelerationRate;
		acceleration.y = d.y * accelerationRate;

		acceleration.x = utils.clamp(acceleration.x, accelerationClamp);
		acceleration.y = utils.clamp(acceleration.y, accelerationClamp);

		velocity.x = velocity.x + acceleration.x;
		velocity.y = velocity.y + acceleration.y;

		velocity.x = utils.clamp(velocity.x, velocityClamp);
		velocity.y = utils.clamp(velocity.y, velocityClamp);

		position.x += velocity.x;
		position.y += velocity.y;

		dot.translation.set(position.x, position.y);

		updateLeaderState(settings);
	};

	var updateLeaderState = function(settings) {
		if(systemParameters.debug === true) {
			if(settings != null){
				dot.fill = settings.fill;
				dot.scale = settings.scale;
			}
			else{
				if(dot.scale != 1) {
					dot.fill = initialFill;
					dot.scale = 1;
				}
			}
		}
	};

	return {
		dot: dot,
		update: update
	};
}