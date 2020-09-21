const editingMode = {rect: 0, line: 1};

function Pencil(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.line;
    this.currentShape = 0;

    this.ctx = ctx;

    new DnD(canvas, this);

    this.onInteractionStart = function (dnd) {
        if (document.getElementById("butRect").checked) {
            this.currEditingMode = editingMode.rect;
        } else {
            this.currEditingMode = editingMode.line;
        }

        if (this.currEditingMode === editingMode.rect) {
            this.currentShape = new Rectangle(dnd.initXCoord, dnd.initYCoord, computeWidth(dnd.initXCoord, dnd.finalXCoord), computeHeight(dnd.initYCoord, dnd.finalYCoord),
                document.getElementById("spinnerWidth").value, document.getElementById("colour").value);

        } else {
            this.currentShape = new Line(dnd.initXCoord, dnd.initYCoord, dnd.finalXCoord, dnd.finalYCoord,
                document.getElementById("spinnerWidth").value, document.getElementById("colour").value);
        }


    }.bind(this);

    this.onInteractionUpdate = function (dnd) {
        canvas.getContext('2d').fillStyle = '#F0F0F0'; // set canvas' background color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawing.paint(ctx)
        if (this.currEditingMode === editingMode.rect) {
            this.currentShape.largeur = computeWidth(dnd.initXCoord, dnd.finalXCoord);
            this.currentShape.hauteur = computeHeight(dnd.initYCoord, dnd.finalYCoord);
            this.currentShape.paint(this.ctx);
        } else {
            this.currentShape.initX2 = dnd.finalXCoord;
            this.currentShape.initY2 = dnd.finalYCoord;
            this.currentShape.paint(this.ctx);

        }


    }.bind(this);

    this.onInteractionEnd = function (dnd) {

        if (this.currEditingMode === editingMode.rect) {
            this.currentShape.largeur = computeWidth(dnd.initXCoord, dnd.finalXCoord);
            this.currentShape.hauteur = computeHeight(dnd.initYCoord, dnd.finalYCoord);
            this.currentShape.paint(this.ctx);
            drawing.forms.push(this.currentShape);
            drawing.paint(this.ctx);
            updateShapeList(this.currentShape, "rec");
        } else {
            this.currentShape.initX2 = dnd.finalXCoord;
            this.currentShape.initY2 = dnd.finalYCoord;
            this.currentShape.paint(this.ctx);
            drawing.forms.push(this.currentShape);
            drawing.paint(this.ctx);
            updateShapeList(this.currentShape, "line");

        }
    }.bind(this);
}


function computeWidth(x1, x2) {
    return x2 - x1;
}

function computeHeight(y1, y2) {
    return y2 - y1;
}