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
    factory: EntityFactory;

    projectiles: Phaser.Physics.Arcade.Group;
    hud: Phaser.Cameras.Scene2D.Camera;

    constructor(
        scene: Scene,
        input: InputManager,
        arena: Arena,
        hud: Phaser.Cameras.Scene2D.Camera,
    ) {
        this.scene = scene;
        this.input = input;
        this.arena = arena;
        this.hud = hud;

        const player_pos = { x: arena.width / 2, y: arena.height / 2 };
        this.player = new Player({
            scene,
            pos: player_pos,
            shoot: (projectile) => {
                this.hud.ignore(
                    this.factory.spawn_projectile(scene, projectile),
                );
            },
        });
        this.player.setCollideWorldBounds(true);

        this.projectiles = this.scene.physics.add.group({
            classType: Projectile,
        });
        this.factory = new EntityFactory(this.projectiles);
    }

    update(state: InputState) {
        this.player.update(state);
    }
}
