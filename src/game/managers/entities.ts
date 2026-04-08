import { Scene } from 'phaser';

import { Player } from '@/game/models';
import { InputState } from '../input/state';
import Projectile from '@/game/models/projectile';
import { EntityFactory } from '@/game/factories/entities';
import InputManager from '@/game/input/manager';

export default class EntityManager {
    scene: Scene;
    input: InputManager;
    player: Player;
    projectiles: Phaser.Physics.Arcade.Group;
    factory: EntityFactory;

    constructor(scene: Scene, input: InputManager) {
        this.scene = scene;
        this.input = input;

        const player_pos = { x: 512, y: 384 };
        this.player = new Player({
            scene,
            pos: player_pos,
            shoot: (projectile) =>
                this.factory.spawn_projectile(scene, projectile),
        });

        this.projectiles = this.scene.physics.add.group({
            classType: Projectile,
        });
        this.factory = new EntityFactory(this.projectiles);
    }

    update(state: InputState) {
        this.player.update(state);
    }
}
