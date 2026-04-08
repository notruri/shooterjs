import { Scene } from 'phaser';

import InputManager from '@/game/input/manager';
import EntityManager from '@/game/entity/manager';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;

    input_manager: InputManager;
    entity_manager: EntityManager;

    constructor() {
        super('Game');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.input_manager = new InputManager(this);
        this.entity_manager = new EntityManager(this, this.input_manager);
    }

    update(_time: number, _delta: number): void {
        this.input_manager.update();

        const state = this.input_manager.get_state();
        this.entity_manager.update(state);
    }
}
