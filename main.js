const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800
canvas.height = 600


// Code final à utiliser pour manipuler Pencil.
drawing = new Drawing();
const pencil = new Pencil(ctx, drawing, canvas);
drawing.paint(ctx, canvas);

