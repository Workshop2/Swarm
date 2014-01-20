function Bee(doty, playArea, utils, systemParameters) {

	this.dot = doty;
	this.velocity = { x: 0.0, y: 0.0 };;
	this.acceleration = { x: 0.0, y: 0.0 };
	this.position = utils.getRandomPosition(playArea);
	this.rf = utils.randomFloat(0.00002, 0.00009);
	this.initialFill = doty.fill;
	this.initialLineWidth = doty.linewidth;
	this.accelerationClamp = utils.diffuse(systemParameters.accelerationClamp, 0.15);
	this.velocityClamp = utils.diffuse(systemParameters.velocityClamp, 0.15);   

}

Bee.prototype.update = function(targetDot, colour) {
	var target = targetDot.translation;

	var d = utils.distanceTo(this.position, target);
	var distance = utils.getDistance(d);

	var accelerationRate = distance * this.rf;
	this.acceleration.x = d.x * accelerationRate;
	this.acceleration.y = d.y * accelerationRate;

	this.acceleration.x = utils.clamp(this.acceleration.x, this.accelerationClamp);
	this.acceleration.y = utils.clamp(this.acceleration.y, this.accelerationClamp);

	this.velocity.x = this.velocity.x + this.acceleration.x;
	this.velocity.y = this.velocity.y + this.acceleration.y;

	this.velocity.x = utils.clamp(this.velocity.x, this.velocityClamp);
	this.velocity.y = utils.clamp(this.velocity.y, this.velocityClamp);

	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;

	this.dot.translation.set(this.position.x, this.position.y);

	this.updateLeaderState(colour);
};

Bee.prototype.updateLeaderState = function(colour) {
	if(systemParameters.debug === true) {
		if(colour != null){
			this.dot.fill = colour.fill;
			this.dot.scale = colour.scale;
		}
		else{
			if(this.dot.scale != 1) {
				this.dot.fill = this.initialFill;
				this.dot.scale = 1;
			}
		}
	}
};