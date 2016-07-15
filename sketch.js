

var e;
var f;

function setup() {
  createCanvas(1000, 1000);
  e = new Emitter(width/4, height/4, 100, .01, createVector(1,0));
  f = new Emitter(width/4, height/4, 100, .01, createVector(0,1));
}

function draw() {
  background(255);
  noFill();
  ellipse(e.x, e.y, e.r * 2, e.r * 2);
  line(e.x, e.y - e.r, e.x, e.y + e.r);
  line(e.x - e.r, e.y, e.x + e.r, e.y);
  e.update();
  f.update();
  e.show();
  f.show();
  e.clean();
  f.clean();
  text("Y = r * sin(theta)", width/2, height/5);
  text( "X = r * cos(theta)", width/5, height/2)
}

var Baby = function(position, velocity) {
  this.position = position;
  this.velocity = velocity;
  this.update = function() {
    this.position.add(this.velocity);
  }
  this.show = function() {
    push();
    stroke(0);
    fill(0);
    translate(this.position.x, this.position.y);
    point(0,0);
    pop();
  }
}

var Emitter = function(x, y, r, omega, pointV) {
  this.x = x;
  this.y = y;
  this.omega = omega;
  this.r = r;
  this.theta = 0;
  this.points = [];
  this.pointV = pointV;
  this.update = function() {
    this.theta += this.omega;
    xloc = this.x + this.r * cos(this.theta);
    yloc = this.y + this.r * sin(this.theta);
    if (this.pointV.x > 0) {
      this.points.push(new Baby(createVector(this.x, yloc), this.pointV));
    } else if (this.pointV.y > 0) {
      this.points.push(new Baby(createVector(xloc, this.y), this.pointV));
    }
  }
  this.show = function() {
    stroke(255,0,0);
    fill(255,0,0);
    xlocation = this.x + this.r * cos(this.theta);
    ylocation = this.y + this.r * sin(this.theta);
    ellipse(xlocation, ylocation, 5, 5);
    line(xlocation, ylocation, this.x, ylocation);
    line(xlocation, ylocation, xlocation, this.y);
    line(this.x, this.y, xlocation, ylocation);
    stroke(0);
    fill(0);
    for (var i = 0; i < this.points.length; i++) {
      this.points[i].show();
    }
  }
  this.clean = function() {
    for (var i = this.points.length - 1; i >=0; i--) {
      if (this.points[i].x > width) {
        this.points.splice(i,1);
      } else {
        this.points[i].update();
      }
    }
  }
}

