class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.scene = config.scene;
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    this.body.setSize(220, 400);
    this.lastdirection = 1;

    this.scene.anims.create({
      key: "run-right",
      frames: this.scene.anims.generateFrameNames("dude-run-right"),
      frameRate: 30,
      repeat: -1
    });
    this.scene.anims.create({
      key: "run-left",
      frames: this.scene.anims.generateFrameNames("dude-run-left"),
      frameRate: 30,
      repeat: -1
    });
    this.scene.anims.create({
      key: "idle-right",
      frames: this.scene.anims.generateFrameNames("dude-idle-right"),
      frameRate: 2,
      repeat: -1
    });
    this.scene.anims.create({
      key: "idle-left",
      frames: this.scene.anims.generateFrameNames("dude-idle-left"),
      frameRate: 2,
      repeat: -1
    });
  }

  controls() {
    var cursors = this.scene.cursors;
    var player = this;

    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("run-left", true).setScale(0.2);
      this.lastdirection = 0;
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play("run-right", true).setScale(0.2);
      this.lastdirection = 1;
    } else {
      player.setVelocityX(0);
      if (this.lastdirection) {
        player.anims.play("idle-right", true).setScale(0.2);
      } else {
        player.anims.play("idle-left", true).setScale(0.2);
      }
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }
}

class Stars extends Phaser.Physics.Arcade.Group {
  constructor(config) {
    super(config.scene.physics.world, config.scene, {
      key: config.key,
      repeat: config.repeat,
      setXY: config.setXY
    });
    // config.scene.physics.world.enable(this);
    // config.scene.add.existing(this);

    this.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      child.setCollideWorldBounds(true);
    });
  }
}

class Platforms extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.create(400, 568, "ground")
      .setScale(2)
      .refreshBody();

    this.create(600, 400, "ground");
    this.create(50, 250, "ground");
    this.create(750, 220, "ground");
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super();
    // this.player = null;
    this.cursors = null;
    this.score = 0;
    this.scoreText = null;
  }

  preload() {
    this.load.image("sky", "src/games/firstgame/assets/sky.png");
    this.load.image("ground", "src/games/firstgame/assets/platform.png");
    this.load.image("star", "src/games/firstgame/assets/star.png");
    this.load.image("bomb", "src/games/firstgame/assets/bomb.png");
    this.load.spritesheet("dude", "src/games/firstgame/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });

    this.load.multiatlas(
      "dude-run-left",
      "src/games/firstgame/assets/run-left/run-left.json",
      "src/games/firstgame/assets/run-left/"
    );
    this.load.multiatlas(
      "dude-run-right",
      "src/games/firstgame/assets/run-right/run-right.json",
      "src/games/firstgame/assets/run-right/"
    );
    this.load.atlas(
      "dude-idle-right",
      "src/games/firstgame/assets/idle-right/idle-right.png",
      "src/games/firstgame/assets/idle-right/idle-right.json"
    );
    this.load.atlas(
      "dude-idle-left",
      "src/games/firstgame/assets/idle-left/idle-left.png",
      "src/games/firstgame/assets/idle-left/idle-left.json"
    );
  }

  create() {
    this.add.image(400, 300, "sky");

    // this.anims.create({
    //   key: "idle-right",
    //   frames: this.anims.generateFrameNames("dude-idle-right"),
    //   frameRate: 2,
    //   repeat: -1
    // });

    // this.add
    //   .sprite(400, 300, "dude-idle-right")
    //   .play("idle-right")
    //   .setScale(0.2);

    let platforms = new Platforms(this);

    var player = new Player({
      scene: this,
      x: 100,
      y: 450,
      key: "dude-idle-right"
    });
    console.log(player);

    this.cursors = this.input.keyboard.createCursorKeys();

    var stars = new Stars({
      scene: this,
      key: "star",
      repeat: 21,
      setXY: { x: 12, y: 10, stepX: 70 }
    });

    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000"
    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    // this.physics.add.collider(player, stars);
    // this.physics.add.collider(stars, stars);

    this.physics.add.overlap(player, stars, this.collectStar, null, this);
    console.log(this);

    this.cameras.main.setSize(400, 300);
    this.cameras.main.startFollow(player);

    this.player = player;
  }

  update() {
    this.player.controls();
  }

  collectStar(player, star) {
    // star.disableBody(true, true);
    console.log("You collected star");

    // this.score += 10;
    // this.scoreText.setText("Score: " + this.score);
  }
}

var config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "phaser-example",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [GameScene]
};

var game = new Phaser.Game(config);
