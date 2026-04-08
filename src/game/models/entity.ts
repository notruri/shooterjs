import { Physics, Scene } from 'phaser';

type Pos = {
    x: number;
    y: number;
};

export interface EntityProps {
    scene: Scene;
    texture: string;
    pos: Pos;
}

export default class Entity {
    scene: Scene;
    sprite: Physics.Arcade.Sprite;

    constructor({ scene, texture, pos }: EntityProps) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(pos.x, pos.y, texture);
    }

    destroy() {
        this.sprite.destroy();
    }
}
