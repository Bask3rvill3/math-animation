// Orbiting dot: circular motion using cosine and sine.
// x = centerX + radius * cos(angle)
// y = centerY + radius * sin(angle)

// ----- Variables that describe the animation -----
let centerX;              // x of the point we orbit around
let centerY;              // y of the point we orbit around
let orbitRadius = 150;    // distance from the center to the dot (pixels)
let angle = 0;            // current angle in radians (changes every frame)
let angularSpeed = 0.02;  // radians added to the angle each frame
let isPaused = false;     // true when the animation is paused

function setup() {
  createCanvas(600, 600);
  centerX = width / 2;    // middle of the canvas
  centerY = height / 2;
  angleMode(RADIANS);     // cos() and sin() use radians
}

function draw() {
  background(20, 24, 40);

  // 0. Held arrow keys change speed and radius a little every frame.
  if (keyIsDown(UP_ARROW)) {
    angularSpeed = angularSpeed + 0.0005;       // faster
  }
  if (keyIsDown(DOWN_ARROW)) {
    angularSpeed = angularSpeed - 0.0005;       // slower (negative = reverse)
  }
  if (keyIsDown(RIGHT_ARROW)) {
    orbitRadius = min(orbitRadius + 1, 250);    // bigger orbit, kept on canvas
  }
  if (keyIsDown(LEFT_ARROW)) {
    orbitRadius = max(orbitRadius - 1, 20);     // smaller orbit
  }

  // 1. Update the angle (only when not paused).
  // Positive speed turns clockwise on screen because p5's y-axis points DOWN.
  if (!isPaused) {
    angle = angle + angularSpeed;
  }

  // 2. The mathematics: convert (radius, angle) into canvas coordinates.
  // cos(angle) gives the horizontal share of the radius,
  // sin(angle) gives the vertical share of the radius.
  let dotX = centerX + orbitRadius * cos(angle);
  let dotY = centerY + orbitRadius * sin(angle);

  // 3. Draw the orbit path, the radius line, and the center.
  noFill();
  stroke(80, 90, 130);
  strokeWeight(1);
  circle(centerX, centerY, orbitRadius * 2);   // diameter = 2 * radius

  // Right-triangle legs: horizontal leg = r*cos, vertical leg = r*sin
  stroke(255, 200, 80);
  line(centerX, centerY, dotX, centerY);       // horizontal leg (cos part)
  stroke(120, 220, 255);
  line(dotX, centerY, dotX, dotY);             // vertical leg (sin part)
  stroke(200);
  line(centerX, centerY, dotX, dotY);          // hypotenuse = radius

  noStroke();
  fill(200);
  circle(centerX, centerY, 8);

  // 4. Draw the orbiting dot.
  fill(255, 100, 120);
  circle(dotX, dotY, 24);

  // 5. Readout so the values can be checked by hand.
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

  // 6. Control instructions on the canvas.
  textAlign(LEFT, BOTTOM);
  fill(180, 255, 180);
  text("SPACE: pause/resume    HOLD UP/DOWN: speed    HOLD LEFT/RIGHT: radius", 15, height - 38);
  text("Click mouse: reverse direction    R: reset angle", 15, height - 15);
}

// Keyboard controls
function keyPressed() {
  if (key === ' ') {
    isPaused = !isPaused;                       // toggle pause
  } else if (key === 'r' || key === 'R') {
    angle = 0;                                  // back to the starting angle
  }
  return false; // stop arrow keys/space from scrolling the page
}

// Mouse control: reverse direction by flipping the sign of the speed
function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    angularSpeed = -angularSpeed;
  }
}
