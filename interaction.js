// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
    // Définir ici les attributs de la 'classe'
    this.canvas = canvas;

    this.initXCoord = 0;
    this.initYCoord = 0;
    this.finalXCoord = 0;
    this.finalYCoord = 0;

    this.isPressed = false;

    // Developper les 3 fonctions gérant les événements
    this.mouseDown = function (evt) {
        this.isPressed = true;
        this.initXCoord = getMousePosition(this.canvas,evt).x;
        this.initYCoord = getMousePosition(this.canvas,evt).y;
        console.log(this.initXCoord);
        console.log(this.initYCoord);
    }.bind(this);

    this.mouseMove = function (evt) {
        if (this.isPressed) {
            this.finalXCoord = getMousePosition(this.canvas,evt).x;
            this.finalYCoord = getMousePosition(this.canvas,evt).y;
            console.log(this.finalXCoord);
            console.log(this.finalYCoord);
        }
    }.bind(this);

    this.mouseUp = function (evt) {
        this.isPressed = false;
        this.finalXCoord = getMousePosition(this.canvas,evt).x;
        this.finalYCoord = getMousePosition(this.canvas,evt).y;
        console.log(this.finalXCoord);
        console.log(this.finalYCoord);

    }.bind(this);


    // Associer les fonctions précédentes aux évènements du canvas.
    canvas.addEventListener('mousedown', this.mouseDown, false);
    canvas.addEventListener('mousemove', this.mouseMove, false);
    canvas.addEventListener('mouseup', this.mouseUp, false);
}


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}



