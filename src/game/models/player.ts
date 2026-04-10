import { Projectile } from '@/game/entity/factory';
import { Actor } from '@/game/models';
import { ActorProps } from '@/game/models/actor';

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
}
