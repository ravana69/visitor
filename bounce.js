var canvas = document.getElementById('a');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

 
const hitSound = new Audio('sounds/hitSound.mp3');



function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}


function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}


Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, 20, 20);
}

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width+(width/4)) {
    this.velX = -(this.velX);
  }
  
  if ((this.x ) <= 0-(width/4)) {
    this.velX = -(this.velX);
  }
  
  if ((this.y + this.size) >= height+(height/4)) {
    this.velY = -(this.velY);
  }
  
  if ((this.y ) <= 0-(height/4)) {
    this.velY = -(this.velY);
  }
  
  this.x += this.velX;
  this.y += this.velY;  
}


Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.size + balls[j].size) {
      balls[j].color = '#0f0';
         hitSound.play();
      }
    }
  }
}


var balls = [];

setTimeout(function(){ visitors(); }, 3000);
  
  function visitors() {   

var amountballs=document.getElementById("count").innerHTML ;

if (balls.length > amountballs) { balls.pop();}
 else
 if (balls.length < amountballs) {
  {
    var ball = new Ball(
      random(0,width), 
      random(0,height),
      random(-10,10), 
      random(-10,10),
      '#0f0',
      random(10,10)
    );
    balls.push(ball);
  }
} 

setTimeout(function(){ visitors(); }, 3000);
}

function loop() {
  ctx.fillStyle = 'rgba(0, 08, 0, 0.4)';
 ctx.fillRect(0, 0, width, height);

  
  for (var i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();       
  }
  requestAnimationFrame(loop);
}

loop();

