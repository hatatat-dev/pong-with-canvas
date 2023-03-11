let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
//variables for ball
let x = canvas.width/2;
let y = 20;
let u = 1.5; // speed in x direction
let v = 1.5; // speed in y direction
let w = 20;

let leftPoints = 0;

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
  x += u;
  y += v;

  if (x+u <15) {
    u = -u;
  }
  if (x+u+w > canvas.width-15) {
    u = -u;
  }
  if (y+v < 0) {
    v = -v;
  }
  if (y+v+w > canvas.height) {
    v = -v;
  }
}

setInterval(animate, 0.1);

function wkey(event) {
  if(event.key=="w") {
    if (leftTop > 0) {
    leftTop = leftTop-40;
    }
  }
}

function skey(event) {
  if(event.key=="s") {
    if (leftTop < canvas.height-120) {
    leftTop = leftTop+40;
    }
  }
}

function upkey(event) {
  if(event.key=="ArrowUp") {
    if (rightTop > 0) {
    rightTop = rightTop-40;
    }
  }
}

function downkey(event) {
  if(event.key=="ArrowDown") {
    if (rightTop < canvas.height-120) {
    rightTop = rightTop+40;
    }
  }
  console.log(event)
}
