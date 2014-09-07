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

	return {
		translation: pos,
		update: update
	};
}