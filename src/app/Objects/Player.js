import Cubes from "./Cubes";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(data) {
    super(data.scene, data.x, data.y, data.key);
    this.init(data);
    this.scene = data.scene;
    this.cubes = new Cubes(this.scene);
    this.body.height = 75;
    this.setCollideWorldBounds(true);
  }

  init(data) {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // this.scene.matter.add.gameObject(this);
    this.body.enable = true;
    this.velocityX = data.velocity;
    this.body.setVelocityX(data.velocity);
    this.setVelocityX(0);
    this.setCollideWorldBounds(true);
    this.scene.events.on("update", this.update, this);

    this.scene.anims.create({
      key: "right",
      frames: this.scene.anims.generateFrameNumbers(data.key, {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: "player-slide",
      frames: this.scene.anims.generateFrameNames("player-slide"),
      frameRate: 10,
      repeat: -1
    });

    this.scene.input.on("pointerdown", () => {
      if (this.body.touching.down && this.body.velocity.y == 0) {
        this.cubes.createCube(this.scene, this.x, this.getBounds().bottom - 90);
        this.y = this.y - 110;
      }
    });
  }

  update() {
    this.controls();
  }

  controls() {
    var w = this.scene.input.keyboard.addKey("W");
    var s = this.scene.input.keyboard.addKey("' '");
    // let touch = this.scene.input.activePointer;
    var player = this;

    // console.log(this.body.velocity.y);
    if (w.isDown && player.body.touching.down && this.body.velocity.y == 0) {
      this.cubes.createCube(
        this.scene,
        player.x,
        player.getBounds().bottom - 90
      );
      player.y = player.y - 110;
    }

    if (player.body.touching.right) {
      this.scene.resetScore();
      player.x = 350;
      player.y = 200;
      player.setVelocity(0);
    }
  }
}
