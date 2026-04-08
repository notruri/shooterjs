import { Scene } from 'phaser';

import { Player } from '@/game/models';
import { InputState } from '../input/state';

export default class EntityManager {
    scene: Scene;
    player: Player;
    projectiles: Phaser.Physics.Arcade.Group;

    constructor(scene: Scene) {
        this.scene = scene;
        this.player = new Player(scene, 512, 384);
        this.projectiles = this.scene.physics.add.group();
        this.enemies = this.scene.physics.add.group();
    }

    update(state: InputState) {
        this.player.update(state);
    }
}
