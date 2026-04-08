import Entity, { Pos } from '@/game/models/entity';
import { InputState } from '@/game/input/state';
import { Projectile } from '@/game/entity/factory';

const TEXTURE = 'player';

type ShootFn = (projectile: Projectile) => void;

type Props = {
    scene: Phaser.Scene;
    pos: Pos;
    shoot: ShootFn;
};

export default class Player extends Entity {
    speed: number;
    shooting: boolean;
    shoot: ShootFn;

    constructor({ scene, pos, shoot }: Props) {
        super({ scene, pos, texture: TEXTURE });

        this.speed = 100;
        this.shoot = shoot;
    }

    update(state: InputState) {
        const vx = state.move.x * this.speed;
        const vy = state.move.y * this.speed;

        this.setVelocity(vx, vy);

        const dx = state.aim.x - this.x;
        const dy = state.aim.y - this.y;

        this.setRotation(Math.atan2(dy, dx));

        if (state.firing && !this.shooting) {
            this.shoot({
                kind: 'bullet',
                pos: { x: this.x, y: this.y },
                angle: this.rotation,
                speed: 300,
            });

            this.shooting = true;
        } else if (!state.firing) {
            this.shooting = false;
        }
    }
}
