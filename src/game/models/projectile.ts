import Entity, { EntityProps } from '@/game/models/entity';

type Props = {
    entity: EntityProps;
    owner?: Entity;
    speed: number;
};

export default class Projectile extends Entity {
    owner?: Entity;
    speed: number;

    constructor({ entity, owner, speed }: Props) {
        const { scene, texture, pos } = entity;
        super({ scene, texture, pos });

        this.owner = owner;
        this.speed = speed;
    }
}
