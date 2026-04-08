import Entity, { EntityProps } from '@/game/models/entity';

type Props = {
    entity: EntityProps;
    speed: number;
};

export default class Projectile extends Entity {
    speed: number;

    constructor({ entity, speed }: Props) {
        const { scene, texture, pos } = entity;
        super({ scene, texture, pos });

        this.speed = speed;
    }
}
