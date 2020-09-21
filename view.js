// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
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

updateShapeList = function (truc, type) {
    shapeList.push(truc);
    var element = document.getElementById("shapeList");
    var li = document.createElement("li");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-default";
    var span = document.createElement("span");
    span.className = "glyphicon glyphicon-remove-sign"
    btn.appendChild(span);
    btn.onclick = function () {

        // First method to remove
        //const index = drawing.forms.indexOf(truc);
        //if (index > -1) {
        //   drawing.forms.splice(index, 1);
        //}

        //Second method to remove
        drawing.forms = drawing.forms.filter(function (e) {
            return e !== truc
        })

        canvas.getContext('2d').fillStyle = '#F0F0F0'; // set canvas' background color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawing.paint(ctx)

        var d = btn.parentNode;
        d.parentElement.removeChild(d);
    }
    var p = document.createElement("p");

    li.appendChild(btn);
    li.appendChild(p)
    if (type === "rec") {
        p.innerHTML = "Rectangle " + recCount;
        recCount++;
    } else {
        p.innerHTML = "Line " + lineCount;
        lineCount++;

    }
    element.appendChild(li);

};