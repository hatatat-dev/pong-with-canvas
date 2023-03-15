fucntion reset() {
  
}

const controlStep = 4;
const ballAngleDegreesSpan = document.getElementById('ballAngleDegrees');
const deadZoneDegrees = 15;
const leftPointsSpan = document.getElementById('leftPoints');
const rightPointsSpan = document.getElementById('rightPoints');
//ok
//you can use left top and right top compared to y
//the paddle is 120 pixels if that helps
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
//variables for ball
let x = canvas.width/2;
let y = 20;
let w = 20;
let ballAngleDegrees = -45;
const ballVelocity = 2.5;

const paddleHeight = 120;
const paddleWidth = 10;
const paddleMargin = 10;


let leftControl = 0;
let rightControl = 0;

//variables for left pad
let leftTop = (canvas.height - paddleHeight)/2;
let leftPoints = 0;
//variables for right pad
let rightTop = (canvas.height - paddleHeight)/2;
let rightPoints = 0;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.fillRect(x, y, w, w);
  ctx.fillRect(paddleMargin, leftTop, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width-paddleMargin-paddleWidth, rightTop, paddleWidth, paddleHeight);

  const ballAngleRadians = ballAngleDegrees / 180 * Math.PI;
  let u = Math.cos(ballAngleRadians) * ballVelocity; // speed in x direction
  let v = -Math.sin(ballAngleRadians) * ballVelocity; // speed in y direction
  x += u;
  y += v;

  if (x < paddleMargin+paddleWidth&&leftTop-w < y&&y < leftTop+paddleHeight+w) {
    //TODO
    ballAngleDegrees = 180 - ballAngleDegrees + Math.random() * 15;
    x = paddleMargin+paddleWidth;
  } else if (x > canvas.width-paddleMargin-paddleWidth-w&&rightTop-w < y&&y< rightTop+paddleHeight+w) {
    ballAngleDegrees = 180 - ballAngleDegrees + Math.random() * 15;
    x = canvas.width-paddleMargin-paddleWidth-w;
  }

  if (x < paddleMargin) {
    rightPoints++;
    //add function reset
  }

  if (x > canvas.width - paddleMargin) {
    leftPoints++;
  //add function reset
  }
  
  if (y < 0) {
    ballAngleDegrees = -ballAngleDegrees;
    y = 0;
  } else if (y > canvas.height-w) {
    ballAngleDegrees = -ballAngleDegrees;
    y = canvas.height-w;
  }

  while(ballAngleDegrees < 0) {
    ballAngleDegrees += 360;
  }
  while(ballAngleDegrees >= 360) {
    ballAngleDegrees -= 360;
  }
  ballAngleDegrees = Math.floor(ballAngleDegrees);
//  if (ballAngleDegrees>90-deadZoneDegrees)

  leftTop += leftControl;
  if (leftTop >= canvas.height - paddleHeight) {
    leftTop = canvas.height - paddleHeight;
    leftControl = 0;
  } else if (leftTop < 0) {
    leftTop = 0;
    leftControl = 0;
  }

  rightTop += rightControl;
  if (rightTop >= canvas.height - paddleHeight) {
    rightTop = canvas.height - paddleHeight;
    rightControl = 0;
  } else if (rightTop < 0) {
    rightTop = 0;
    rightControl = 0;
  }
}

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

function displayVariables() {
  leftPointsSpan.textContent = leftPoints;
  rightPointsSpan.textContent = rightPoints;
  ballAngleDegreesSpan.textContent = ballAngleDegrees;
}

function update() {
  animate();
  displayVariables();
}

setInterval(update, 0.1);
