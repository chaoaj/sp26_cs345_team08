class Enemy {
  constructor(health, damage, speed, path, coolDown, type) {
    this.path = path;
    this.pos = path[0].copy();
    this.targetPos = 1;
    this.speed = speed;
    this.health = health;
    this.damage = damage;
	this.coolDown = 0;
	this.type = type

    // Sprite and animation properties
    this.sprite = this.createSpriteConfig(type);
    this.facingRow = this.sprite ? this.sprite.defaultRow : 0;  // Which direction-row is visible
    this.animationFrame = 0;
    this.lastMoveDirection = createVector(0, 1);  // Track movement direction for sprite facing
  }

  createSpriteConfig(type) {
    // Only basic enemies (red goblins) have sprite sheets; others fall back to colored circles
    if (type !== 'basic') {
      return null;
    }

    // Configure the grunt goblin sprite sheet (512x512, 4x4 grid = 128x128 per frame)
    return {
      assetKey: 'gruntGoblinSprite',
      frameWidth: 128,
      frameHeight: 128,
      frameCols: 4,
      frameRows: 4,
      animationRate: 10,
      directional: true,
      rowByDirection: {
        down: 0,
        left: 1,
        right: 2,
        up: 3,
      },
      defaultRow: 0,
      drawWidth: 56,
      drawHeight: 56,
    };
  }

  speedUp() {
    this.speed = this.speed * 5;
  }

  slowDown() {
    this.speed = this.speed / 5;
  }

 updatePos() {
  if (this.targetPos >= this.path.length) return;

  let target = this.path[this.targetPos];
  let direction = p5.Vector.sub(target, this.pos);
  let dist = direction.mag();

  if (dist <= this.speed) {
    // Store direction before reaching target 
    if (dist > 0) {
      this.lastMoveDirection = direction.copy();
    }
    this.pos = target.copy();
    this.targetPos++;

    // Handle leftover speed if there's a next waypoint
    let leftover = this.speed - dist;
    if (this.targetPos < this.path.length && leftover > 0) {
      let nextDir = p5.Vector.sub(this.path[this.targetPos], this.pos);
      nextDir.setMag(leftover);
      this.pos.add(nextDir);
    }
    return;
  }

  // Move toward current target waypoint and record direction for sprite facing
  if (dist > 0) {
    this.lastMoveDirection = direction.copy();
  }
  direction.setMag(this.speed);
  this.pos.add(direction);
}

  updateFacingFromMovement() {
    // Skip if no sprite or sprite is not directional
    if (!this.sprite || !this.sprite.directional) {
      return;
    }

    const dx = this.lastMoveDirection.x;
    const dy = this.lastMoveDirection.y;

    // Pick the row based on primary direction of movement
    // If moving more horizontally, face left/right; otherwise face up/down
    if (abs(dx) > abs(dy)) {
      this.facingRow = dx >= 0 ? this.sprite.rowByDirection.right : this.sprite.rowByDirection.left;
    } else {
      this.facingRow = dy >= 0 ? this.sprite.rowByDirection.down : this.sprite.rowByDirection.up;
    }
  }

  renderSprite() {
    if (!this.sprite) {
      return false;
    }

    const spriteSheet = Game.assets[this.sprite.assetKey];
    if (!spriteSheet) {
      return false;
    }

    const frameCol = floor(frameCount / this.sprite.animationRate) % this.sprite.frameCols;
    const srcX = frameCol * this.sprite.frameWidth;
    const srcY = this.facingRow * this.sprite.frameHeight;

    push();
    imageMode(CENTER);
    image(
      spriteSheet,
      this.pos.x,
      this.pos.y,
      this.sprite.drawWidth,
      this.sprite.drawHeight,
      srcX,
      srcY,
      this.sprite.frameWidth,
      this.sprite.frameHeight
    );
    pop();

    return true;
  }

  render() {
  if(this.type == "berserker"){
		fill(255, 213, 0);
    	ellipse(this.pos.x, this.pos.y, 40);
	}
	else if(this.type == "brute"){
		fill(43, 200, 100);
    	ellipse(this.pos.x, this.pos.y, 40);
	}
	else if(this.type == 'boss'){
		fill(0, 0, 0);
		ellipse(this.pos.x, this.pos.y, 60);
	}

    this.updateFacingFromMovement();
    if (this.renderSprite()) {
      this.renderHealthBar();
      return;
    }

	if(this.type == 'basic'){
		fill(255, 0, 0);
	    ellipse(this.pos.x, this.pos.y, 40);
	}

    this.renderHealthBar();
  }

  renderHealthBar() {
    let squareSize = 7;
    let gap = 2;
    let totalWidth = 4 * squareSize + 3 * gap;
    let healthX = this.pos.x - totalWidth / 2;
    let healthY = this.pos.y - 30;

    for (let i = 0; i < 4; i++) {
      let x = healthX + i * (squareSize + gap);
      if (i < this.health) {
        fill(0, 255, 0);
      } else {
        fill(80);
      }
      stroke(0);
      strokeWeight(1);
      rect(x, healthY, squareSize, squareSize);
    }
  }
}
