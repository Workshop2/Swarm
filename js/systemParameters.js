function SystemParameters(utils) {
	var debug = utils.urlParam("debug") != 0,
	 	indicator = debug ? {fill: 'white', scale: 3} : null,
	 	defaultSpeed = parseFloat(utils.urlParam("speed") || 1),
	 	bees = parseFloat(utils.urlParam("bees") || 64),
	 	beeColour = '#00FF33',
	 	beeAltColour = '#20B2AA',
	 	targets = parseFloat(utils.urlParam("targets") || 4),
	 	targetColour = 'red',
	 	velocityClamp = parseFloat(utils.urlParam("vc") || 9),
	 	accelerationClamp = parseFloat(utils.urlParam("ac") || 0.6),
	 	frameThrottle = (utils.urlParam("ft") || 1) == 1;

 	return {
 		debug: debug,
 		indicator: indicator,
 		defaultSpeed: defaultSpeed,
 		bees: bees,
 		beeColour: beeColour,
 		beeAltColour: beeAltColour,
 		targets: targets,
 		targetColour: targetColour,
 		velocityClamp: velocityClamp,
 		accelerationClamp: accelerationClamp,
 		frameThrottle: frameThrottle
 	}
}