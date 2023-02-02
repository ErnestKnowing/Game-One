let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let score = 0;
let lives = 4;

//КИРПИЧИ
let brickRowCount = 10;
let brickColumnCount = 6;
let brickWidth = 65;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}


//РАКЕТКА
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//КОНТРОЛЬ МЫШКОЙ
document.addEventListener("mousemove", mouseMoveHandler, false);
function keyDownHandler(e) {
  if (e.code == "ArrowRight") {
    rightPressed = true;
  } else if (e.code == "ArrowLeft") {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.code == "ArrowRight") {
    rightPressed = false;
  } else if (e.code == "ArrowLeft") {
    leftPressed = false;
  }
}
//КОНТРОЛЬ МЫШКОЙ
function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

//СТОЛКНОВЕНИЕ С ПЕРВЫМ ШАРОМ
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

//СТОЛКНОВЕНИЕ С ВТОРЫМ ШАРОМ
function collisionDetectionTwo() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let d = bricks[c][r];
      if (d.status == 1) {
        if (
          a > d.a &&
          a < d.a + brickWidth &&
          b > d.b &&
          b < d.b + brickHeight
        ) {
          db = -db;
          d.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

//ONE BALL
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

//TWO BALL
let ballRadiusTwo = 10;
let a = canvas.width / 5;
let b = canvas.height - 60;
let da = 1.6;
let db = -1.6;
function drawBallTwo() {
  ctx.beginPath();
  ctx.arc(a, b, ballRadiusTwo, 0, Math.PI * 4);
  ctx.fillStyle = "#ffff00";
  ctx.fill();
  ctx.closePath();
}

//РАКЕТКА
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

//КИРПИЧИ ДЛЯ ПЕРВОГО ШАРА
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#ff0000";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

//КИРПИЧИ ДЛЯ ВТОРОГО ШАРА
function drawBricksTwo() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].a = brickX;
        bricks[c][r].b = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#ff0000";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

//ОЧКИ
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //ONE BALL
  drawBall();
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER");
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 1.8;
        dy = -1.8;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
  //РАКЕТКА
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  x += dx;
  y += dy;


  //TWO BALL
  drawBricks();
  drawBricksTwo();
  drawBallTwo();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  collisionDetectionTwo();
  if (a + da > canvas.width - ballRadiusTwo || a + da < ballRadiusTwo) {
    da = -da;
  }
  if (b + db < ballRadiusTwo) {
    db = -db;
  } else if (b + db > canvas.height - ballRadiusTwo) {
    if (a > paddleX && a < paddleX + paddleWidth) {
      db = -db;
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER");
        document.location.reload();
      } else {
        a = canvas.width / 5;
        b = canvas.height - 60;
        da = 1.6;
        db = -1.6;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
  //РАКЕТКА
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  a += da;
  b += db;
  requestAnimationFrame(draw);
}

draw();
