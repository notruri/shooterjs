import { Physics, Scene } from 'phaser';

export default class Entity {
    scene: Scene;
    sprite: Physics.Arcade.Sprite;

    constructor(scene: Scene, x: number, y: number, texture: string) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, texture);
    }

    destroy() {
        this.sprite.destroy();
    }
}
