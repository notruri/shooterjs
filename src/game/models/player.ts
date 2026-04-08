import Entity from '@/game/models/entity';
import { InputState } from '@/game/input/state';

export default class Player extends Entity {
    speed: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player');

        this.speed = 100;
    }

    update(state: InputState) {
        const x = state.move.x * this.speed;
        const y = state.move.y * this.speed;
        this.sprite.setVelocity(x, y);

        const dx = state.aim.x - x;
        const dy = state.aim.y - y;
        this.sprite.setRotation(Math.atan2(dy, dx));
    }
}
