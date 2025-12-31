function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
}

function animateCircle(x, y, r) {
    ///ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle(x, y, r);
}

function setCanvasSize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
}

canvas = document.getElementById('lander');
ctx = canvas.getContext('2d');
setCanvasSize();

let x = 0;
let y = canvas.height / 4;
let r = 5;

const cx = canvas.width / 2;
const cy = canvas.height / 3;
const ri = canvas.width / 20;
const randarr = [{ x: canvas.width / 5, y: canvas.height / 5}, { x: canvas.width / 7, y: canvas.height * 4 / 5},{ x: canvas.width *2 /3, y: canvas.height * 4 /5}]
let coordarray = [];

for (let xo = 0; xo < canvas.width; xo+= 0.15) {
    let inside = Math.pow(ri, 2) - Math.pow(xo - cx, 2);

    if (inside >= 0) {
        let yTop = cy - Math.sqrt(inside);
        let yBottom = cy + Math.sqrt(inside);

        coordarray.push({ x: xo, y: yTop });
        coordarray.push({ x: xo, y: yBottom });
    }
}

let index = 0;

function step() {
    let item = coordarray[index];
    let arraylen = coordarray.length
    animateCircle(item.x, item.y, r);
    if (index <= 30){index += 1;}
    else if (index == arraylen - 2){
        drawCircle(cx, cy, ri);
        for (let i = 0; i < randarr.length; i ++ ){
            setTimeout(drawCircle(randarr[i].x, randarr[i].y, ri), 1500)
        }
    }
    else if (index > arraylen -30){ index += 1}
    
    else {
        index += 10
    }
    requestAnimationFrame(step);
}

requestAnimationFrame(step);



        