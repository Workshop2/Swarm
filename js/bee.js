function Bee(doty, playArea, utils, systemParameters) {

	acceleration = { x: 0.0, y: 0.0 };
	accelerationClamp = utils.diffuse(systemParameters.accelerationClamp, 0.15);

	rf = utils.randomFloat(0.00002, 0.00009);
	position = utils.getRandomPosition(playArea);

	velocity = { x: 0.0, y: 0.0 };
	velocityClamp = utils.diffuse(systemParameters.velocityClamp, 0.15)

	dot = doty;
	initialFill = dot.fill;
	initialLineWidth = dot.linewidth;

	return {
		dot: dot,
		update: this.update
	};
}

Bee.prototype = {
	acceleration: null,
	accelerationClamp: null,
	rf: null,
	position: null,
	velocity: null,
	velocityClamp: null,
	dot: null,
	initialFill: null,
	initialLineWidth: null,
	update: function(targetDot, systemParameters) {
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

		updateLeaderState(systemParameters);
	},
	updateLeaderState: function(systemParameters) {
		if(systemParameters.debug === true) {
			if(systemParameters != null){
				dot.fill = systemParameters.fill;
				dot.scale = systemParameters.scale;
			}
			else{
				if(dot.scale != 1) {
					dot.fill = initialFill;
					dot.scale = 1;
				}
			}
		}
	}
};