import Platform from "./Platform";

export default class Platforms extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    // console.log(scene);
    super(scene.physics.world, scene);
    this.scene = scene;
    this.last = null;

    this.currentHeight = 0;
    this.heights = [
      1,
      2,
      2,
      1,
      2,
      1,
      2,
      3,
      2,
      1,
      2,
      1,
      2,
      3,
      4,
      3,
      2,
      3,
      2,
      1,
      0,
      -1,
      0,
      1,
      2,
      3,
      4,
      3,
      2
    ];
    this.length = this.heights.length;
    this.step = 60;
    this.base = 468;

    this.init();
    this.setVelocity(-200, 0);
  }

  init() {
    this.defaults = Object.assign(this.defaults, {
      setImmovable: true,
      setAllowGravity: false
    });
    this.createPlatform(this.scene, -50);
    this.createPlatform(this.scene, 360);
    this.scene.events.on("update", this.checkCreateNew, this);
  }

  createPlatform(scene, x = 800, y = 468) {
    let platform = this.getFirstDead();
    if (!platform) {
      platform = Platform.generate(scene, x, y);
      this.add(platform);
      this.last = platform;
    } else {
      platform.reset(y);
      this.last = platform;
    }
  }

  checkCreateNew() {
    let coords = this.last.getBounds();
    if (coords.x < this.world.bounds.width) {
      if (this.currentHeight >= this.length) {
        console.log("low");
        this.currentHeight = 0;
      }
      let posY = this.base - this.step * this.heights[this.currentHeight];
      this.currentHeight++;
      this.createPlatform(this.scene, 800, posY);
      this.last.setVelocity(-200, 0);
    }
  }
}
