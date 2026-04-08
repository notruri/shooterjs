import Projectile from '@/game/models/projectile';

export default class Bullet extends Projectile {
    speed: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player');

        this.speed = 100;
    }
}
