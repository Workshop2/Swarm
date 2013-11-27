function TargetCollection(two, playArea, utils, systemParameters) {

	var targets = [];

	var spawnTarget = function() {
		var targeDot = utils.createDot(two, systemParameters.targetColour, 3);
		var target = new Target(targeDot, playArea, utils, systemParameters);
		targets.push(target);
	};

	var update = function() {
		for (var i = targets.length - 1; i >= 0; i--) {
			targets[i].update();
		};
	};

	return {
		update: update,
		spawnTarget: spawnTarget,
		targets: targets
	};
}