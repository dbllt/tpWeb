// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

function Drawing() {
    this.forms = [];
}


function Form(epaisseur, couleur) {
    this.epaisseur = epaisseur;
    this.couleur = couleur;
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


