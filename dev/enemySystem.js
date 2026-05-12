function updateAndRenderEnemies() {
  for (let i = Game.enemies.length - 1; i >= 0; i--) {
    let enemy = Game.enemies[i];


    if (!settingsOpen) {
      enemy.updatePos();
    }

    if (enemy.health <= 0) {
      if (enemy.health <= 0) {
        let reward = 1;
        if (enemy.type === 'berserker' && Game.level && Game.level.currentLevel <= 11) {
          reward = 2;
        }
        addGold(reward);
		gameStats.goldCollected+=reward;
		gameStats.enemiesKilled+=1;
      }
      Game.enemies.splice(i, 1);
      continue;
    }
	if(enemy.targetPos >= Game.path.length && !settingsOpen){
		enemy.coolDown-=1;
		if(enemy.coolDown <= 0){
			Game.assets.enemyHit.setVolume(0.7);
			Game.assets.enemyHit.play();
			Game.castleHealth -= enemy.damage
			enemy.coolDown = 100;
		}
		
	}

    enemy.render();
  }
}
