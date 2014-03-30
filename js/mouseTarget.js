function MouseTarget(dot, playArea, utils, systemParameters) {
	var pos = dot.translation,
		mouseX = 0,
		mouseY = 0;

	var update = function() {
        pos.x = mouseX;
        pos.y = mouseY;
	};

	window.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        event = event || window.event; // IE-ism

        // store in variable so we conform to the framefrate updates
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

	var findLeader = function(bees) {
		// find closest bee to target e.g. the leader
		var leader = null;

		for (var i = bees.length - 1; i >= 0; i--) {
			var bee = bees[i],
				distanceTo = utils.distanceTo(bee.dot.translation, pos);
				
			var current = {
				bee: bee,
				distance: utils.getDistance(distanceTo)
			};

			if(leader == null || current.distance < leader.distance) {
				leader = current;
			}
		};

		return leader;
	};

	return {
		translation: pos,
		update: update,
		findLeader: findLeader
	};
}