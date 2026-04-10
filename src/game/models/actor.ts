import Entity, { EntityProps } from '@/game/models/entity';

export type ActorProps = Omit<EntityProps, 'texture'> & {
    texture?: string;
    health?: number;
    max_health?: number;
    speed?: number;
    alive?: boolean;
};

export default class Actor extends Entity {
    health: number = 100;
    max_health: number = 100;
    speed: number = 100;

    constructor({ texture = 'actor', ...props }: ActorProps) {
        super({ ...props, texture });
        Object.assign(this, props);
    }
}
