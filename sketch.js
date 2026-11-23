let centerX;              
let centerY;              
let orbitRadius = 150;    
let angle = 0;            
let angularSpeed = 0.02;  
let isPaused = false;     

function setup() {
  createCanvas(600, 600);
  centerX = width / 2;    
  centerY = height / 2;
  angleMode(RADIANS);     
}

function draw() {
  background(20, 24, 40);

  if (keyIsDown(UP_ARROW)) {
    angularSpeed = angularSpeed + 0.0005;       
  }
  if (keyIsDown(DOWN_ARROW)) {
    angularSpeed = angularSpeed - 0.0005;       
  }
  if (keyIsDown(RIGHT_ARROW)) {
    orbitRadius = min(orbitRadius + 1, 250);    
  }
  if (keyIsDown(LEFT_ARROW)) {
    orbitRadius = max(orbitRadius - 1, 20);     
  }

  if (!isPaused) {
    angle = angle + angularSpeed;
  }

  let dotX = centerX + orbitRadius * cos(angle);
  let dotY = centerY + orbitRadius * sin(angle);

  noFill();
  stroke(80, 90, 130);
  strokeWeight(1);
  circle(centerX, centerY, orbitRadius * 2);   

  stroke(255, 200, 80);
  line(centerX, centerY, dotX, centerY);     
  stroke(120, 220, 255);
  line(dotX, centerY, dotX, dotY); 
  stroke(200);
  line(centerX, centerY, dotX, dotY);  

  noStroke();
  fill(200);
  circle(centerX, centerY, 8);

  fill(255, 100, 120);
  circle(dotX, dotY, 24);

  let angleDegrees = degrees(angle) % 360;
  if (angleDegrees < 0) {
    angleDegrees = angleDegrees + 360;
  }
  fill(255);
  textSize(15);
  textAlign(LEFT, TOP);
  text("angle = " + angle.toFixed(3) + " rad  (" + angleDegrees.toFixed(1) + " deg)", 15, 15);
  text("cos(angle) = " + cos(angle).toFixed(3) + "    sin(angle) = " + sin(angle).toFixed(3), 15, 38);
  text("x = " + dotX.toFixed(1) + "    y = " + dotY.toFixed(1), 15, 61);
  text("radius = " + orbitRadius + "    speed = " + angularSpeed.toFixed(3) + " rad/frame", 15, 84);

  textAlign(LEFT, BOTTOM);
  fill(180, 255, 180);
  text("SPACE: pause/resume    HOLD UP/DOWN: speed    HOLD LEFT/RIGHT: radius", 15, height - 38);
  text("Click mouse: reverse direction    R: reset angle", 15, height - 15);
}

function keyPressed() {
  if (key === ' ') {
    isPaused = !isPaused; 
  } else if (key === 'r' || key === 'R') {
    angle = 0;  
  }
  return false; 
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    angularSpeed = -angularSpeed;
  }
}
