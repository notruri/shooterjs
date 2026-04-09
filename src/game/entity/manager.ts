import { Scene } from 'phaser';

import { Player } from '@/game/models';
import { InputState } from '@/game/input/state';
import Projectile from '@/game/models/projectile';
import EntityFactory from '@/game/entity/factory';
import InputManager from '@/game/input/manager';
import Arena from '@/game/arena';

export default class EntityManager {
    scene: Scene;
    input: InputManager;
    arena: Arena;
    player: Player;
    projectiles: Phaser.Physics.Arcade.Group;
    factory: EntityFactory;

    constructor(scene: Scene, input: InputManager, arena: Arena) {
        this.scene = scene;
        this.input = input;
        this.arena = arena;

        const player_pos = { x: arena.width / 2, y: arena.height / 2 };
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
