function DnD(canvas, interactor) {
    this.canvas = canvas;
    this.interactor = interactor;

    this.initXCoord = 0;
    this.initYCoord = 0;
    this.finalXCoord = 0;
    this.finalYCoord = 0;

    this.isPressed = false;

    this.mouseDown = function (evt) {
        this.isPressed = true;
        this.initXCoord = getMousePosition(this.canvas, evt).x;
        this.initYCoord = getMousePosition(this.canvas, evt).y;
        this.interactor.onInteractionStart(this);
    }.bind(this);

    this.mouseMove = function (evt) {
        if (this.isPressed) {
            this.finalXCoord = getMousePosition(this.canvas, evt).x;
            this.finalYCoord = getMousePosition(this.canvas, evt).y;
            this.interactor.onInteractionUpdate(this);
        }
    }.bind(this);

    this.mouseUp = function (evt) {
        this.isPressed = false;
        this.finalXCoord = getMousePosition(this.canvas, evt).x;
        this.finalYCoord = getMousePosition(this.canvas, evt).y;
        this.interactor.onInteractionEnd(this);

    }.bind(this);


    canvas.addEventListener('mousedown', this.mouseDown, false);
    canvas.addEventListener('mousemove', this.mouseMove, false);
    canvas.addEventListener('mouseup', this.mouseUp, false);
}


function getMousePosition(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}



