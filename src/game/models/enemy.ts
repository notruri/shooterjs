import Actor, { ActorProps } from '@/game/models/actor';
import Player from '@/game/models/player';

type EnemyProps = ActorProps;

export default class Enemy extends Actor {
    alive: boolean = true;

    constructor({ texture = 'player', ...props }: EnemyProps) {
        super({ ...props, texture });
    }

    update(player: Player) {
        if (!this.alive) {
            this.setVelocity(0, 0);
            return;
        }

        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const length = Math.hypot(dx, dy);

        const nx = length > 0 ? dx / length : 0;
        const ny = length > 0 ? dy / length : 0;

        this.setVelocity(nx * this.speed, ny * this.speed);
        this.setRotation(Math.atan2(dy, dx));
    }
}
