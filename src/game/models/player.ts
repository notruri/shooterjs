import { Actor } from '@/game/models';
import { ActorProps } from '@/game/models/actor';
import { InputState } from '@/game/input/state';
import { Projectile } from '@/game/entity/factory';

type ShootFn = (projectile: Projectile) => void;

type PlayerProps = ActorProps & {
    shoot: ShootFn;
};

export default class Player extends Actor {
    shooting: boolean = false;
    alive: boolean = true;
    shoot: ShootFn = () => {};

    constructor({ shoot, texture = 'player', ...props }: PlayerProps) {
        super({ ...props, texture });

        this.shoot = shoot;
    }

    update(input: InputState) {
        if (!this.alive) {
            this.reset_state(input);
        }

        this.move(input);
        this.fire(input);
    }

    move(state: InputState) {
        const length = Math.hypot(state.move.x, state.move.y);
        const nx = length > 0 ? state.move.x / length : 0;
        const ny = length > 0 ? state.move.y / length : 0;

        this.setVelocity(nx * this.speed, ny * this.speed);

        const dx = state.aim.x - this.x;
        const dy = state.aim.y - this.y;

        this.setRotation(Math.atan2(dy, dx));
    }

    fire(state: InputState) {
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

    reset_state(state: InputState) {
        state.move = { x: 0, y: 0 };
        state.aim = { x: this.x, y: this.y };
        state.firing = false;
    }
}
