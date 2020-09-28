const editingMode = {rect: 0, line: 1, circle: 2};

function Pencil(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.line;
    this.currentShape = 0;

    this.ctx = ctx;

    new DnD(canvas, this);

    this.onInteractionStart = function (dnd) {
        if (document.getElementById("butRect").checked) {
            this.currEditingMode = editingMode.rect;
        } else if (document.getElementById("butLine").checked) {
            this.currEditingMode = editingMode.line;
        } else {

            this.currEditingMode = editingMode.circle;
        }

        if (this.currEditingMode === editingMode.rect) {
            this.currentShape = new Rectangle(dnd.initXCoord, dnd.initYCoord, computeWidth(dnd.initXCoord, dnd.finalXCoord), computeHeight(dnd.initYCoord, dnd.finalYCoord),
                document.getElementById("spinnerWidth").value, document.getElementById("colour").value);

        } else if (this.currEditingMode === editingMode.line) {
            this.currentShape = new Line(dnd.initXCoord, dnd.initYCoord, dnd.finalXCoord, dnd.finalYCoord,
                document.getElementById("spinnerWidth").value, document.getElementById("colour").value);
        } else {
            this.currentShape = new Circle(dnd.initXCoord, dnd.initYCoord, computeRadius(dnd.initXCoord, dnd.initYCoord, dnd.finalXCoord, dnd.finalYCoord), computeStartAngle(dnd.initXCoord, dnd.initYCoord, dnd.finalXCoord, dnd.finalYCoord), computeEndAngle(dnd.initXCoord, dnd.initYCoord, dnd.finalXCoord, dnd.finalYCoord),
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
        } else if (this.currEditingMode === editingMode.line) {
            this.currentShape.initX2 = dnd.finalXCoord;
            this.currentShape.initY2 = dnd.finalYCoord;
            this.currentShape.paint(this.ctx);

        } else {
            this.currentShape.radius = computeRadius(dnd.initXCoord, dnd.initYCoord, dnd.finalXCoord, dnd.finalYCoord);
            this.currentShape.startAngle = computeStartAngle(dnd.initXCoord, dnd.initYCoord, dnd.finalXCoord, dnd.finalYCoord);
            this.currentShape.endAngle = computeEndAngle(dnd.initXCoord, dnd.initYCoord, dnd.finalXCoord, dnd.finalYCoord);
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
        } else if (this.currEditingMode === editingMode.line) {
            this.currentShape.initX2 = dnd.finalXCoord;
            this.currentShape.initY2 = dnd.finalYCoord;
            this.currentShape.paint(this.ctx);
            drawing.forms.push(this.currentShape);
            drawing.paint(this.ctx);
            updateShapeList(this.currentShape, "line");

        } else {
            this.currentShape.radius = computeRadius(dnd.initXCoord, dnd.initYCoord, dnd.finalXCoord, dnd.finalYCoord);
            this.currentShape.startAngle = computeStartAngle(dnd.initXCoord, dnd.initYCoord, dnd.finalXCoord, dnd.finalYCoord);
            this.currentShape.endAngle = computeEndAngle(dnd.initXCoord, dnd.initYCoord, dnd.finalXCoord, dnd.finalYCoord);
            this.currentShape.paint(this.ctx);
            drawing.forms.push(this.currentShape);
            drawing.paint(this.ctx);
            updateShapeList(this.currentShape, "circle");
        }
    }.bind(this);
}


function computeWidth(x1, x2) {
    return x2 - x1;
}

function computeHeight(y1, y2) {
    return y2 - y1;
}

function computeRadius(x1, y1, x2, y2) {
    var ret = x1 - x2;
    ret = ret * ret;
    var temp = y1 - y2;
    temp = temp * temp;
    return Math.sqrt(ret + temp);
}

function computeStartAngle(x1, y1, x2, y2) {
    return 0;
}

function computeEndAngle(x1, y1, x2, y2) {
    return 2 * Math.PI;
}

