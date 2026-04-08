import Entity from '@/game/models/entity';
import { InputState } from '@/game/input/state';

const TEXTURE = 'player';

export default class Player extends Entity {
    speed: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super({ scene, texture: TEXTURE, pos: { x, y } });

        this.speed = 100;
    }

    update(state: InputState) {
        const vx = state.move.x * this.speed;
        const vy = state.move.y * this.speed;
        this.sprite.setVelocity(vx, vy);

        const dx = state.aim.x - this.sprite.x;
        const dy = state.aim.y - this.sprite.y;
        this.sprite.setRotation(Math.atan2(dy, dx));
    }
}
