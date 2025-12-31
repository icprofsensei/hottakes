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

let r = 1;

const cx = canvas.width / 2;
const cy = canvas.height /2;
var ri = 25;
let coordarray = [];

for (let xo = 0; xo < canvas.width; xo+= 0.01) {
    let presqrt = Math.pow(ri, 2) - Math.pow(xo - cx, 2);

    if (presqrt >= 0) {
        let yTop = cy - Math.sqrt(presqrt);
        let yBottom = cy + Math.sqrt(presqrt);

        coordarray.push({ x: xo, y: yTop });
        coordarray.push({ x: xo, y: yBottom });
    }
}

let index = 0;

setInterval(function() {
    let item = coordarray[index];
    let arraylen = coordarray.length
    animateCircle(item.x, item.y, r);
    if (index <= 30){index += 1;}
    else if (index == arraylen - 2){
        drawCircle(cx, cy, ri)
        let vx = 0
        let vy = 0
        setInterval(function(){
            drawCircle(cx + vx, cy+ vy, r);
            drawCircle(cx + vx, cy- vy, r);
            drawCircle(cx - vx, cy- vy, r);
            drawCircle(cx - vx, cy+ vy, r);
            vx += 5
            vy += 5
            console.log(vx, vy)
            if ((cx - vx) <= 0 || (cx + vx) >= canvas.width ||
             (cy + vy) >= canvas.height || (cy - vy) <= 0 ){
                    setInterval(function(){
                            drawCircle(cx, cy, ri)
                            ri += 1
                            if (ri >= canvas.width /2){
                                window.location.replace("home.html");
                            }
                        }, ri+=0.1)
            }
            }, 5)

            
    }
    else if (index > arraylen -30){ index += 1}
    
    else {
        index += 7
    }
    
},0.1
)




        