function Utils() {
	
	var randomInt = function(min, max) {
		return Math.round(randomFloat(min, max));
	}

	var randomFloat = function(min, max) {
		return (Math.random() * (max - min) + min).toFixed(5);
		//return (Math.random() * max) + min;
	}

	var toRadians = function(degrees) {
		return degrees * Math.PI / 180;
	}

	var getAngleBetween = function(self, target) {
		return Math.atan2(target.y - self.y, target.x - self.x);
	}

	var getRadiansBetween = function(self, target) {
		return toRadians(getAngleBetween(self, target));
	}

	var distanceTo = function(self, target) {
		return { 
			x: target.x - self.x,
			y: target.y - self.y
		};
	}

	var getDistance = function(distanceBetween) {
		return Math.sqrt((distanceBetween.x * distanceBetween.x) + (distanceBetween.y * distanceBetween.y));
	}

	var clamp = function(value, limit) {
		if(value > limit)
			value = limit;
		if(value < -limit)
			value = -limit;

		return value;
	}

	var urlParam = function(name) {
	    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    if (!results)
	    { 
	        return 0; 
	    }
	    return results[1] || 0;
	}

	var getRandomPosition = function(playArea) {
		var degrees = randomInt(1, 360);
		var radians = toRadians(degrees);
		var radius = randomInt(1, 300);
		var x = playArea.width  / 2 + (Math.cos(radians) * radius);
		var y = playArea.height / 2 + (Math.sin(radians) * radius);

		return { x: x, y: y };
	}
	
	var createDot = function(two, colour, size) {
		var x = -5,
			y = -5;

		size = size || 2;

    	var dot = two.makeCircle(x, y, size);
    	dot.fill = colour || 'yellow';

    	return dot;
	};

	var diffuse = function(value, differential) {
		var min = 1 - differential,
			max = 1 + differential;

		return value * randomFloat(min, max);		
	};

	return {
		randomInt: randomInt,
		randomFloat: randomFloat,
		toRadians: toRadians,
		getAngleBetween: getAngleBetween,
		getRadiansBetween: getRadiansBetween,
		distanceTo: distanceTo,
		getDistance: getDistance,
		clamp: clamp,
		urlParam: urlParam,
		getRandomPosition: getRandomPosition,
		createDot: createDot,
		diffuse: diffuse
	};
}