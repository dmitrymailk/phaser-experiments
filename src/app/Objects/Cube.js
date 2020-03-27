export default class Cube extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "star");
    this.scene = scene;
    this.init();
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.body.setSize(60, 60);
    this.setImmovable(true);
    this.body.setVelocityX(0);
    this.scene.events.on("update", this.update, this);
  }
  setAlive(status) {
    this.body.enable = status;
    this.setVisible(status);
    this.setActive(status);
  }

  update() {
    if (this.active && this.x < -this.scene.game.config.width) {
      this.setAlive(false);
    }
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.setAlive(true);
    this.body.setVelocityX(0);
  }
}
