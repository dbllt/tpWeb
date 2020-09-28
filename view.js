Rectangle.prototype.paint = function (ctx) {
    ctx.lineWidth = this.epaisseur;
    ctx.strokeStyle = this.couleur;
    ctx.beginPath();
    ctx.rect(this.initX, this.initY, this.largeur, this.hauteur);
    ctx.stroke();
};

Line.prototype.paint = function (ctx) {
    ctx.lineWidth = this.epaisseur;
    ctx.strokeStyle = this.couleur;
    ctx.beginPath();
    ctx.moveTo(this.initX, this.initY);
    ctx.lineTo(this.initX2, this.initY2);
    ctx.stroke();
};


Circle.prototype.paint = function (ctx) {
    ctx.lineWidth = this.epaisseur;
    ctx.strokeStyle = this.couleur;
    ctx.beginPath();
    ctx.arc(this.initX, this.initY, this.radius, this.startAngle, this.endAngle);
    ctx.stroke();
};


Drawing.prototype.paint = function (ctx) {
    ctx.fillStyle = '#F0F0F0'; // set canvas' background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.forms.forEach(function (form) {
        form.paint(ctx);
    });
};


shapeList = []
lineCount = 1;
recCount = 1;
circCount = 1;


updateShapeList = function (shape, type) {
    shapeList.push(shape);
    const element = document.getElementById("shapeList");
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-default";
    const span = document.createElement("span");
    span.className = "glyphicon glyphicon-remove-sign"
    btn.appendChild(span);
    btn.onmouseenter = function () {
        drawing.forms.forEach(element => {
            if (element != shape) {
                element.couleur = "rgba(0, 0,0, 0.2)";
            }
        });


        canvas.getContext('2d').fillStyle = '#F0F0F0'; // set canvas' background color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawing.paint(ctx)
    }
    btn.onmouseout = function () {
        drawing.forms.forEach(element => {
            element.couleur = element.couleurBackup;
        });

        canvas.getContext('2d').fillStyle = '#F0F0F0'; // set canvas' background color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawing.paint(ctx)
    }
    btn.onclick = function () {

        drawing.forms = drawing.forms.filter(function (e) {
            return e !== shape;
        });

        shapeList = shapeList.filter(function (e) {
            return e !== shape;
        });

        drawing.forms.forEach(element => {
            element.couleur = element.couleurBackup;
        });

        canvas.getContext('2d').fillStyle = '#F0F0F0'; // set canvas' background color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawing.paint(ctx)

        const d = btn.parentNode;
        d.parentElement.removeChild(d);
    }
    const p = document.createElement("p");

    li.appendChild(btn);
    li.appendChild(p)
    if (type === "rec") {
        p.innerHTML = "Rectangle " + recCount;
        recCount++;
    } else if (type === "line") {
        p.innerHTML = "Line " + lineCount;
        lineCount++;

    } else {

        p.innerHTML = "Circle " + circCount;
        circCount++;
    }
    element.appendChild(li);

};