import bg from "../../assets/backs/background.png";
import platform from "../../assets/platform.png";
import ice from "../../assets/my-art/ice2.png";
import dude from "../../assets/dude.png";
import dudeImg from "../../assets/my-art/Sprite-0001-Sheet.png";
import dudeJson from "../../assets/my-art/Sprite-0001.json";

import star from "../../assets/star.png";
import snow from "../../assets/my-art/snow.png";

import Player from "../Objects/Player";
import Platforms from "../Objects/Platforms";
import Cubes from "../Objects/Cubes";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super();

    this.score = 0;
  }

  preload() {
    this.load.image("bg", bg);
    this.load.image("ground", ice);
    this.load.image("star", snow);
    this.load.atlas("player-slide", dudeImg, dudeJson);
    // this.load.spritesheet("dude", dude, { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.createBackground();

    let player = new Player({
      scene: this,
      x: 350,
      y: this.game.config.height / 2,
      key: "player-slide",
      velocity: 0
    });

    player.play("player-slide");

    let platforms = new Platforms(this);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, player.cubes);
    this.physics.add.collider(player.cubes, platforms);

    this.scoreText = this.add
      .text(16, 16, "platforms: 0", {
        fontSize: "32px",
        fill: "#000"
      })
      .setDepth(1);
  }

  completePlatform() {
    this.score++;
    this.scoreText.setText("platforms: " + this.score);
  }

  resetScore() {
    this.score = 0;
    this.scoreText.setText("platforms: 0");
  }

  update() {
    this.bg.tilePositionX += 0.5;
  }

  createBackground() {
    this.bg = this.add
      .tileSprite(0, 0, this.game.config.width, this.game.config.height, "bg")
      .setOrigin(0);
  }
}
