const canvas = document.querySelector("canvas");
 /** @type {CanvasRenderingContext2D} */ 
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;

const colors = [
    "#1abc9c",
    "#2ecc71",
    "#f1c40f",
    '#8e44ad',
    '#e74c3c',
    '#bdc3c7',
    '#d35400'
]

function onClick(event) {
    ctx.beginPath();
    ctx.moveTo(400,400);
    const color = colors[Math.floor(Math.random() *colors.length)];
    ctx.strokeStyle = color;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}
canvas.addEventListener("mousemove",onClick);