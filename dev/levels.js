class Levels {
  constructor(path) {
    this.path = path;
    this.levelActive = false;

    this.waveEnemies = [];
    this.spawnIndex = 0;
    this.lastSpawnTime = 0;
    this.spawnDelay = 0;
	this.currentLevel=1
  }

  startWave() {
    this.waveEnemies = this.spawnEnemies(); // your existing function
    this.spawnIndex = 0;
    this.lastSpawnTime = millis();
    this.spawnDelay = random(500, 3000);
    this.levelActive = true;
  }

  update(enemies) {

    // spawn enemies randomly
    if (this.spawnIndex < this.waveEnemies.length &&
        millis() - this.lastSpawnTime > this.spawnDelay) {
      
      enemies.push(this.waveEnemies[this.spawnIndex]);
      this.spawnIndex++;

      this.lastSpawnTime = millis();
      this.spawnDelay = random(500, 1500);
    }

    // check if wave finished
    if (this.spawnIndex >= this.waveEnemies.length && enemies.length === 0) {
      this.levelActive = false;
	  this.currentLevel+=1
    }
  }

  spawnEnemies() {
	let enemies = []
	for(let x = 1;x<this.currentLevel*5;x++){
		enemies.push(new Enemy(4, 1, 1, this.path),)
	}
	return enemies
  }
}