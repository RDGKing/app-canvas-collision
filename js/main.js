const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#E59999";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;

        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        this.draw(context);


        if ((this.posX + this.radius) > window_width) {
            this.dx = -this.dx;
        }

        if ((this.posX - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.posY - this.radius) < 0) {
            this.dy = -this.dy;
        }

        if ((this.posY + this.radius) > window_height) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }

}

function getDistance(posX1, posY1, posX2, posY2) {
    let result = Math.sqrt(Math.pow((posX2 - posX1), 2) + Math.pow((posY2 - posY1), 2));
    return result;
}


let randomX = Math.random() * window_width;
let randomY = Math.random() * window_height;
let randomRadius = Math.floor(Math.random() * 100 + 30);


//console.log(getDistance(miCirculo.posX, miCirculo.posY, miCirculo2.posX, miCirculo2.posY));
///////////////////////////

let arrayCircle = [];

for (let i = 0; i < 10; i++) {

    let randomR = Math.floor(Math.random() * 60 + 20);
    let randomX = Math.random() * (window_width - randomR * 2) + randomR;
    let randomY = Math.random() * (window_height - randomR * 2) + randomR;
    let randomS = Math.floor(Math.random() * 10 + 1);

    let miCirculo = new Circle(randomX, randomY, randomR, 'blue', (i + 1), randomS);
    arrayCircle.push(miCirculo);
    arrayCircle[i].draw(ctx);
}
function updateCircles() {
    ctx.clearRect(0, 0, window_width, window_height);
    arrayCircle.forEach(circle => {
        circle.update(ctx);

        arrayCircle.forEach(circletwo => {
            if (circle !== circletwo && getDistance(circle.posX, circle.posY, circletwo.posX, circletwo.posY) <= (circle.radius + circletwo.radius)) {

                let angulo = Math.atan2(circletwo.posY - circle.posY, circletwo.posX - circle.posX);
                //console.log("angulo: " + angulo * 180 / Math.PI);
                let PosNewX = Math.cos(angulo);
                let PosNewY = Math.sin(angulo);
                // console.log("X: " + PosNewX * 180 / Math.PI);
                // console.log("Y: " + PosNewY * 180 / Math.PI);
                circle.dx = circle.speed * -PosNewX;
                circle.dy = circle.speed * -PosNewY;
                circletwo.dx = circletwo.speed * PosNewX;
                circletwo.dy = circletwo.speed * PosNewY;
            }
        });
    });
    requestAnimationFrame(updateCircles);
}

updateCircles();
