import { Scene } from 'phaser';
import Bullet from '@/game/models/bullet';
import { Pos } from '@/game/models/entity';

export type Projectile = {
    kind: ProjectileKind;
    pos: Pos;
    angle: number;
    speed: number;
};

type ProjectileKind = 'bullet';

export default class EntityFactory {
    group: Phaser.Physics.Arcade.Group;

    constructor(group: Phaser.Physics.Arcade.Group) {
        this.group = group;
    }

    spawn_projectile(scene: Scene, projectile: Projectile) {
        const { kind } = projectile;

        switch (kind) {
            case 'bullet':
                return this.spawn_bullet(scene, projectile);
        }
    }

    private spawn_bullet(scene: Scene, projectile: Projectile) {
        const { pos, angle, speed } = projectile;

        const bullet = new Bullet(scene, pos.x, pos.y);

        this.group.add(bullet);

        bullet.setRotation(angle);
        bullet.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

        return bullet;
    }
}
