function updateAndRenderEnemies() {
  for (let i = Game.enemies.length - 1; i >= 0; i--) {
    let enemy = Game.enemies[i];


    if (!settingsOpen) {
      enemy.updatePos();
    }

    if (enemy.health <= 0) {
      if (enemy.health <= 0) {
        addGold(1);
      }
      Game.enemies.splice(i, 1);
      continue;
    }
	if(enemy.targetPos >= Game.path.length){
		if(frameCount % enemy.hitRate == 0){
			console.log(frameCount)
			Game.castleHealth -= enemy.damage
		}
		
	}

    enemy.render();
  }
}
