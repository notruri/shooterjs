import { Scene } from 'phaser';
import Bullet from '@/game/models/bullet';
import { Pos } from '@/game/models/entity';
import { Enemy } from '@/game/models';

type Group = Phaser.Physics.Arcade.Group;

export type Projectile = {
    kind: ProjectileKind;
    pos: Pos;
    angle: number;
    speed: number;
};

type ProjectileKind = 'bullet';

export type ShootFn = (projectile: Projectile) => void;

export default class EntityFactory {
    projectiles: Group;
    enemies: Group;

    constructor(projectiles: Group, enemies: Group) {
        this.projectiles = projectiles;
        this.enemies = enemies;
    }

    spawn_projectile(scene: Scene, projectile: Projectile) {
        const { kind } = projectile;

        switch (kind) {
            case 'bullet':
                return this.spawn_bullet(scene, projectile);
        }
    }

    spawn_enemy(
        scene: Scene,
        pos: { x: number; y: number },
        shoot: ShootFn,
        callback: (enemy: Enemy) => void,
    ) {
        const enemy = new Enemy({
            scene: scene,
            pos,
            speed: 60,
            shoot,
        });

        enemy.setCollideWorldBounds(true);
        this.enemies.add(enemy);

        callback(enemy);
    }

    private spawn_bullet(scene: Scene, projectile: Projectile) {
        const { pos, angle, speed } = projectile;

        const bullet = new Bullet(scene, pos.x, pos.y);

        this.projectiles.add(bullet);

        bullet.setRotation(angle);
        bullet.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

        return bullet;
    }
}
