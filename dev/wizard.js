class WizardTower extends Tower {
  constructor(x, y, attackRange = 120, cooldown = 55, damage = 1, splashRadius = 60) {
    // WizardTower does not draw itself directly.
    // It passes sprite metadata into the shared Tower renderer so the base
    // class can handle animation, direction changes, and fallback drawing.
    super(x, y, attackRange, cooldown, damage, 'Wizard Tower', {
      rangeStyle: {
        fill: [120, 180, 255, 40],
        stroke: [120, 180, 255, 120],
        weight: 1,
      },
      sprite: {
        assetKey: 'wizardSprite',
        // The wizard sprite sheet is arranged in rows by direction and
        // columns by animation frame.
        frameWidth: 128,
        frameHeight: 128,
        frameCols: 2,
        frameRows: 4,
        animationRate: 12,
        directional: true,
        rowByDirection: {
          down: 0,
          left: 1,
          right: 2,
          up: 3,
        },
        defaultRow: 0,
        drawWidth: 52,
        drawHeight: 52,
      },
    });
    this.splashRadius = splashRadius;
  }

  attack(enemy) {
    this.projectiles.push(new SplashOrbProjectile(this.x, this.y, enemy, this.damage, 5, this.splashRadius));
  }
}
