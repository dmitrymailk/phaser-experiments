export default class Platform extends Phaser.Physics.Arcade.Sprite {
  constructor(data) {
    // console.log("platform", data);
    super(data.scene, data.x, data.y, data.texture);
    this.scene = data.scene;

    this.init();
  }

  static generate(scene, x, y) {
    // console.log(scene);
    return new Platform({
      scene: scene,
      x: x,
      y: y,
      texture: "ground"
    });
  }

  init() {
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.scene.events.on("update", this.update, this);
    this.setOrigin(-1, -1);
    // console.log(this.scene.game.config.width);
  }

  reset(y) {
    const data = { x: 800, y: 468 };
    this.x = 800;
    this.y = y;
    this.setAlive(true);
  }

  setAlive(status) {
    this.body.enable = status;
    this.setVisible(status);
    this.setActive(status);
  }

  update() {
    if (this.active && this.x < -this.width * 2) {
      this.setAlive(false);
      this.scene.completePlatform();
    }
  }
}
