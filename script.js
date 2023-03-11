const controlStep = 2;
const ballAngleDegreesSpan = document.getElementById('ballAngleDegrees')

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
//variables for ball
let x = canvas.width/2;
let y = 20;
let w = 20;
let ballAngleDegrees = -45;
const ballVelocity = 2;

let leftPoints = 0;

let leftControl = 0;
let rightControl = 0;

//position for left pad
let leftTop = 240;
//position for right pad
let rightTop = 240;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.fillRect(x, y, w, w);
  ctx.fillRect(10, leftTop, 10, 120);
  ctx.fillRect(canvas.width-20, rightTop, 10, 120);

  const ballAngleRadians = ballAngleDegrees / 180 * Math.PI;
  let u = Math.cos(ballAngleRadians) * ballVelocity; // speed in x direction
  let v = -Math.sin(ballAngleRadians) * ballVelocity; // speed in y direction
  x += u;
  y += v;

  if (x < 0) {
    ballAngleDegrees = 180 - ballAngleDegrees;
    x = 0;
  } else if (x > canvas.width) {
    ballAngleDegrees = 180 - ballAngleDegrees;
    x = canvas.width;
  }

  if (y < 0) {
    ballAngleDegrees = -ballAngleDegrees;
    y = 0;
  } else if (y > canvas.height) {
    ballAngleDegrees = -ballAngleDegrees;
    y = canvas.height;
  }
  ballAngleDegreesSpan.textContent = ballAngleDegrees;

  leftTop += leftControl;
  if (leftTop >= canvas.height - 120) {
    leftTop = canvas.height - 120;
    leftControl = 0;
  } else if (leftTop < 0) {
    leftTop = 0;
    leftControl = 0;
  }

  rightTop += rightControl;
  if (rightTop >= canvas.height - 120) {
    rightTop = canvas.height - 120;
    rightControl = 0;
  } else if (rightTop < 0) {
    rightTop = 0;
    rightControl = 0;
  }
}

setInterval(animate, 0.1);

function handleKeyDown(event) {
  switch (event.key) {
    case "w":
      leftControl = -controlStep;
      break;

    case "s":
      leftControl = controlStep;
      break;

    case "ArrowUp":
      rightControl = -controlStep;
      break;

    case "ArrowDown":
      rightControl = controlStep;
      break;
  }
}

function handleKeyUp(event) {
  switch (event.key) {
    case "w":
    case "s":
      leftControl = 0;
      break;

    case "ArrowUp":
    case "ArrowDown":
      rightControl = 0;
      break;
  }
}
