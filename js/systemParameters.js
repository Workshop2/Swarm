function SystemParameters(utils) {
	var debug = utils.urlParam("debug") != 0,
	 	indicator = debug ? {fill: 'white', scale: 3} : null,
	 	defaultSpeed = utils.urlParam("speed") || 2,
	 	bees = utils.urlParam("bees") || 64,
	 	beeColour = '#00FF33',
	 	beeAltColour = '#20B2AA',
	 	targets = utils.urlParam("targets") || 2;

 	return {
 		debug: debug,
 		indicator: indicator,
 		defaultSpeed: defaultSpeed,
 		bees: bees,
 		beeColour: beeColour,
 		beeAltColour: beeAltColour,
 		targets: targets
 	}
}