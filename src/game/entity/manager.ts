import { Scene } from 'phaser';

import { InputState } from '@/game/input/state';
import { Player } from '@/game/models';
import { PlayerController } from '@/game/entity/controller';
import Arena from '@/game/arena';
import EntityFactory from '@/game/entity/factory';
import InputManager from '@/game/input/manager';
import Projectile from '@/game/models/projectile';

export default class EntityManager {
    scene: Scene;
    input: InputManager;
    arena: Arena;
    player: Player;

    factory: EntityFactory;
    player_controller: PlayerController;

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

        this.initialize_local_player(scene, arena);

        this.projectiles = this.scene.physics.add.group({
            classType: Projectile,
        });

        this.factory = new EntityFactory(this.projectiles);
        this.player_controller = new PlayerController();
    }

    update(state: InputState) {
        this.player_controller.update(this.player, state);
    }

    private initialize_local_player(scene: Scene, arena: Arena) {
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
    }
}
