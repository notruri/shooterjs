import { Physics, Scene } from 'phaser';

export type Pos = {
    x: number;
    y: number;
};

export interface EntityProps {
    scene: Scene;
    texture: string;
    pos: Pos;
}

export default class Entity extends Physics.Arcade.Sprite {
    scene: Scene;

    constructor({ scene, texture, pos }: EntityProps) {
        super(scene, pos.x, pos.y, texture);

        this.scene = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}
