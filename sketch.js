const path = []
function createPath(){
  path.push(createVector(-10, 200));
  path.push(createVector(50, 200));
  path.push(createVector(200, 200));
  path.push(createVector(205, 100));
  path.push(createVector(400, 100));
  path.push(createVector(400, 300));
  path.push(createVector(500, 300));
}

function setup() {
  createCanvas(600, 600);
  createPath()
  enemy = new Enemy(2,3,2,path)
}

function draw() {
  background(220);

  //draw path to visualize: can be removed
  noFill();
  stroke('#4e4848');
  strokeWeight(20)
  beginShape();
  for (let p of path) {
    vertex(p.x, p.y);
  }
  endShape();
  strokeWeight(1)
  //-----------------------------
  enemy.updatePos()
  enemy.render()
}
