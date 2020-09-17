var editingMode = {rect: 0, line: 1};

function Pencil(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.line;
    this.currLineWidth = 5;
    this.currColour = '#000000';
    this.currentShape = 0;

    this.truc = 0;

    this.ctx = ctx;
    // Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

    new DnD(canvas, this);

    // Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd

    this.onInteractionStart = function (dnd) {
        if (document.getElementById("butRect").checked) {
            this.currentShape = "Rectangle";
        } else {
            this.currentShape = "Line";
        }

        if (this.currentShape === "Rectangle") {
            this.truc = new Rectangle(dnd.initXCoord, dnd.initYCoord, computeWidth(dnd.initXCoord, dnd.finalXCoord), computeHeight(dnd.initYCoord, dnd.finalYCoord),
                document.getElementById("spinnerWidth").value, document.getElementById("colour").value);

        } else {
            this.truc = new Line(dnd.initXCoord, dnd.initYCoord, dnd.finalXCoord, dnd.finalYCoord,
                document.getElementById("spinnerWidth").value, document.getElementById("colour").value);
        }


    }.bind(this);

    this.onInteractionUpdate = function (dnd) {
        canvas.getContext('2d').fillStyle = '#F0F0F0'; // set canvas' background color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawing.paint(ctx)
        if (this.currentShape === "Rectangle") {
            this.truc.largeur = computeWidth(dnd.initXCoord, dnd.finalXCoord);
            this.truc.hauteur = computeHeight(dnd.initYCoord, dnd.finalYCoord);
            this.truc.paint(this.ctx);
        } else {
            this.truc.initX2 = dnd.finalXCoord;
            this.truc.initY2 = dnd.finalYCoord;
            this.truc.paint(this.ctx);

        }


    }.bind(this);

    this.onInteractionEnd = function (dnd) {

        if (this.currentShape === "Rectangle") {
            this.truc.largeur = computeWidth(dnd.initXCoord, dnd.finalXCoord);
            this.truc.hauteur = computeHeight(dnd.initYCoord, dnd.finalYCoord);
            this.truc.paint(this.ctx);
            drawing.forms.push(this.truc);
            drawing.paint(this.ctx);
            updateShapeList(this.truc, "rec");
        } else {
            this.truc.initX2 = dnd.finalXCoord;
            this.truc.initY2 = dnd.finalYCoord;
            this.truc.paint(this.ctx);
            drawing.forms.push(this.truc);
            drawing.paint(this.ctx);
            updateShapeList(this.truc, "line");

        }
    }.bind(this);
}


function computeWidth(x1, x2) {
    return x2 - x1;
}

function computeHeight(y1, y2) {
    return y2 - y1;
}