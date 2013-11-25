function TargetCollection(two, playArea, utils, systemParameters) {

	var targets = [];

	var spawnTarget = function() {
		var targeDot = utils.createDot(two, 'red');
		var target = new Target(targeDot, playArea, utils, systemParameters);
		targets.push(target);
	};

	var update = function() {
		for(var i = 0; i < targets.length; i++)
			targets[i].update();
	};

	return {
		update: update,
		spawnTarget: spawnTarget
	};
}