import { Scene } from 'phaser';

import InputManager from '@/game/input/manager';
import EntityManager from '@/game/entity/manager';
import Arena from '../arena';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;

    input_manager: InputManager;
    entity_manager: EntityManager;

    grid: Phaser.GameObjects.Graphics;
    pos: Phaser.GameObjects.Text;

    constructor() {
        super('Game');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor('#636363');

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.input_manager = new InputManager(this);

        const arena = new Arena(5000, 5000);
        this.entity_manager = new EntityManager(
            this,
            this.input_manager,
            arena,
        );
        this.camera.startFollow(this.entity_manager.player);

        this.grid = this.add.graphics();
        this.grid.lineStyle(1, 0xffffff, 0.15);

        const cell = 64;
        const width = arena.width;
        const height = arena.height;

        for (let x = 0; x <= width; x += cell) {
            this.grid.lineBetween(x, 0, x, height);
        }

        for (let y = 0; y <= height; y += cell) {
            this.grid.lineBetween(0, y, width, y);
        }

        this.pos = this.add.text(16, 16, '', {
            fontFamily: 'monospace',
            fontSize: 16,
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 6, y: 4 },
        });
        this.pos.setScrollFactor(0);
        this.pos.setDepth(1000);
    }

    update(_time: number, _delta: number): void {
        this.input_manager.update();

        const state = this.input_manager.get_state();
        this.entity_manager.update(state);

        const player = this.entity_manager.player;
        this.pos.setText([
            `x: ${player.x.toFixed()}, y: ${player.y.toFixed()}`,
        ]);
    }
}
