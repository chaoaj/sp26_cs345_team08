function createPath(path) {
  path.length = 0;
  path.push(createVector(-10, 100));
  path.push(createVector(300, 100));
  path.push(createVector(300, 600));
  path.push(createVector(700, 600));
  path.push(createVector(900, 350));
  path.push(createVector(1050, 350));
  path.push(createVector(1050, 700));
  path.push(createVector(1250, 700));
}

function renderPath(path) {
  noFill();
  stroke('#4e4848');
  strokeWeight(20);
  beginShape();
  for (let p of path) {
    vertex(p.x, p.y);
  }
  endShape();
  strokeWeight(1);
}
