let gameStart = false;
let gameInitialized = false;

function preload() {
  Game.assets.castle = loadImage('assets/Castle.png');
  Game.assets.logo = loadImage('assets/high-resolution-color-logo.png');
  Game.assets.archerTower = loadImage('assets/Castle Rush tower 1 placeholder.png');
  Game.assets.knightTower = loadImage('assets/knightIcon.png');
  Game.assets.wizardTower = loadImage('assets/wizardIcon.png');
  Game.assets.trash = loadImage('assets/trashIcon.png');
  Game.assets.startbutton = loadImage('assets/CastleRush Start Placeholder.png');
  Game.assets.settingbutton = loadImage('assets/CastleRush Settings Placeholder.png');
  Game.assets.settingIcon   = loadImage('assets/Setting_Icon.png');
  Game.assets.twoxicon   = loadImage('assets/2x.png');
  Game.assets.volumeIcon    = loadImage('assets/Volume.png');
  Game.assets.muteIcon      = loadImage('assets/Muted.png');
  Game.assets.hiteffect     = loadSound('assets/hiteffectupd.mp3');
  Game.assets.wall      = loadImage('assets/UIWall.png');

}

function setup() {
  createCanvas(1535, 825);
  userStartAudio();  // unlock audio for browser autoplay policy
  applyVolume();     // apply Game.volume (0.5) immediately at startup
}

function draw() {
  if (gameLost) {
    drawLoseScreen();
    return;
  }

  if (gameStart == false) {
    menuDraw();
    startButton();
    settingButton();
    drawSettingsMenu();
    return;
  }
  
  if (gameStart == true) {
    
    if (!gameInitialized) {
      createPath(Game.path);
      Game.level = new Levels(Game.path);
      setupRoundButtons();
      gameInitialized = true;
    }

    background(220);

    syncRoundButtons();
    renderPath(Game.path);
    updateRoundState();
    updateAndRenderEnemies();
    updateAndRenderTowers();

    renderHud();
    renderSidebar();
    renderRoundControls();
    renderTowerButtons();
    renderSelectedTowerPanel();
    renderDraggingTowerPreview();
    renderCastle();
    drawSettingsMenu();
    renderSettingIconButton()
	renderSpeedUpButton() 

    if (Game.castleHealth <= 0) {
      gameLost = true;
    }
  }
}