import Entity from '@/game/models/entity';
import Projectile from '@/game/models/projectile';

export default class Bullet extends Projectile {
    speed: number;

    constructor(scene: Phaser.Scene, x: number, y: number, owner?: Entity) {
        const pos = { x, y };
        const entity = {
            scene: scene,
            texture: 'bullet',
            pos,
        };

        super({ entity, owner, speed: 300 });

        this.speed = 100;
    }
}
