import Phaser from "phaser";
import GameScene from "./app/scenes/GameScene";

var config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "phaser-example",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false
    },
    matter: {
      gravity: { y: 500 },
      enabled: {
        showBody: true
      }
    }
  },
  scene: [GameScene]
  // backgroundColor: 0x323443
};

new Phaser.Game(config);
