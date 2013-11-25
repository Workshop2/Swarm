function SystemParameters(utils) {
	var debug = utils.urlParam("debug") != 0,
		cool = utils.urlParam("cool") != 0,
	 	indicator = debug ? {fill: 'white', scale: 3} : null,
	 	defaultSpeed = utils.urlParam("speed") || 2;

 	return {
 		debug: debug,
 		cool: cool,
 		indicator: indicator,
 		defaultSpeed: defaultSpeed
 	}
}