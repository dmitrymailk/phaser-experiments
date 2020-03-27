import Cube from "./Cube";

export default class Cubes extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    console.log(scene);
    super(scene.physics.world, scene);

    // super(scene.matter.world, scene);
    this.scene = scene;
  }

  createCube(scene, x, y) {
    let cube = this.getFirstDead();
    if (!cube) {
      console.log("create new");
      cube = new Cube(scene, x, y);
      this.add(cube);
    } else {
      console.log("get dead");
      cube.reset(x, y);
    }
  }

  // checkCreateNew() {
  //   let coords = this.last.getBounds();
  //   if (coords.x < this.world.bounds.width) {
  //     if (this.currentHeight >= this.length) {
  //       console.log("low");
  //       this.currentHeight = 0;
  //     }
  //     let posY = this.base - this.step * this.heights[this.currentHeight];
  //     this.currentHeight++;
  //     this.createPlatform(this.scene, 800, posY);
  //     this.last.setVelocity(-200, 0);
  //   }
  // }
}
