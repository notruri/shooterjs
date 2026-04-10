import Actor, { ActorProps } from '@/game/models/actor';
import Player from '@/game/models/player';
import { ShootFn } from '@/game/entity/factory';

type EnemyProps = ActorProps & {
    shoot: ShootFn;
};

export default class Enemy extends Actor {
    alive: boolean = true;
    shoot: ShootFn;
    last_shot: number = 0;
    fire_delay: number = 800;

    constructor({ shoot, texture = 'player', ...props }: EnemyProps) {
        super({ ...props, texture });
        this.shoot = shoot;
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

        this.fire();
    }

    fire() {
        const now = this.scene.time.now;
        if (now - this.last_shot < this.fire_delay) {
            return;
        }

        this.shoot({
            kind: 'bullet',
            pos: { x: this.x, y: this.y },
            angle: this.rotation,
            owner: this,
            speed: 250,
        });

        this.last_shot = now;
    }
}
