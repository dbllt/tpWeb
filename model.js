function Drawing() {
    this.forms = [];
}

function Form(epaisseur, couleur) {
    this.epaisseur = epaisseur;
    this.couleur = couleur;
    this.couleurBackup = couleur;
}

function Line(initX, initY, initX2, initY2, epaisseur, couleur) {
    this.initX = initX;
    this.initY = initY;
    this.initX2 = initX2;
    this.initY2 = initY2;
    Form.call(this, epaisseur, couleur);
}

Line.prototype = new Form();

function Rectangle(initX, initY, largeur, hauteur, epaisseur, couleur) {
    this.initX = initX;
    this.initY = initY;
    this.largeur = largeur;
    this.hauteur = hauteur;
    Form.call(this, epaisseur, couleur);

}

Rectangle.prototype = new Form();

function Circle(initX, initY, radius, startAngle, endAngle, epaisseur, couleur) {
    this.initX = initX;
    this.initY = initY;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    Form.call(this, epaisseur, couleur);

}

Rectangle.prototype = new Form();
