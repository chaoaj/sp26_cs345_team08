class Enemy {
  constructor(health, damage, speed,path) {
	this.path = path
    this.pos = path[0].copy();
    this.targetPos = 1;
    this.speed = speed;
	this.health = health
	this.damage = damage
  }

  updatePos() {
  	if (this.targetPos >= this.path.length) return;

  	let target = this.path[this.targetPos];
  	let direction = p5.Vector.sub(target, this.pos);  //creates direct arrow vector pointing to target location

	//set entity to target position if close enough
  	if (direction.mag() <= 3) {
    	this.pos = target.copy();
    	this.targetPos++;		//new target position is the next vector in path[]
  	  	return;
  	}
	
	//only runs if we haven't reached the new target position
  	direction.setMag(this.speed);	//sets the distance to travel in next frame
  	this.pos.add(direction);		//travel that distance
	}

  //shows enemy on screen
  render() {
    fill(255, 0, 0);
    ellipse(this.pos.x, this.pos.y, 40);
  }
}