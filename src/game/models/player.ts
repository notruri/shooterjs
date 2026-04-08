import Entity from '@/game/models/entity';
import { InputState } from '@/game/input/state';

export default class Player extends Entity {
    constructor() {
        super();

        this.x = 512;
        this.y = 384;
        this.speed = 3;
        this.rotation = 0;
    }

    update(state: InputState) {
        this.x += state.move.x * this.speed;
        this.y += state.move.y * this.speed;

        const dx = state.aim.x - this.x;
        const dy = state.aim.y - this.y;

        this.rotation = Math.atan2(dy, dx);
    }
}
