let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//One ball
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 1.8;
let dy = -1.8;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall()

    requestAnimationFrame(draw);
}

draw()