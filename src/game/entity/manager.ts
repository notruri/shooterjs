import { Scene } from 'phaser';

import { InputState } from '@/game/input/state';
import { Enemy, Player } from '@/game/models';
import { PlayerController } from '@/game/entity/controller';
import Arena from '@/game/arena';
import EntityFactory, { Projectile } from '@/game/entity/factory';
import InputManager from '@/game/input/manager';
import ProjectileEnt from '../models/projectile';

export default class EntityManager {
    scene: Scene;
    input: InputManager;
    arena: Arena;
    player: Player;

    factory: EntityFactory;
    player_controller: PlayerController;

    enemies: Phaser.Physics.Arcade.Group;
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

        this.enemies = this.scene.physics.add.group({
            classType: Enemy,
        });

        this.projectiles = this.scene.physics.add.group({
            classType: ProjectileEnt,
        });

        this.initialize_local_player(scene, arena);
        this.init_hitboxes();

        this.factory = new EntityFactory(this.projectiles, this.enemies);
        this.player_controller = new PlayerController();

        this.spawn_enemy();
    }

    update(state: InputState) {
        this.player_controller.update(this.player, state);

        for (const child of this.enemies.getChildren()) {
            const enemy = child as Enemy;
            enemy.update(this.player);
        }
    }

    spawn_enemy() {
        if (!this.scene) return;

        const shoot = (projectile: Projectile) => {
            this.hud.ignore(
                this.factory.spawn_projectile(this.scene, projectile),
            );
        };

        this.factory.spawn_enemy(
            this.scene,
            { x: 100, y: 100 },
            shoot,
            (enemy) => this.hud.ignore(enemy),
        );
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

    private init_hitboxes() {
        this.scene.physics.add.collider(this.player, this.enemies);
        this.scene.physics.add.collider(this.enemies, this.enemies);

        this.scene.physics.add.overlap(
            this.projectiles,
            this.player,
            (_player, _projectiles) => {
                const player = _player as Player;
                const projectile = _projectiles as ProjectileEnt;

                projectile.destroy();
                player.health -= 10;

                if (player.health <= 0) {
                    player.alive = false;
                    player.destroy();
                }
            },
            (_player, _projectiles) => {
                const player = _player as Player;
                const projectile = _projectiles as ProjectileEnt;
                return projectile.owner !== player
            },
        );

        this.scene.physics.add.overlap(
            this.projectiles,
            this.enemies,
            (projectile, enemy) => {
                const bullet = projectile as ProjectileEnt;
                const target = enemy as Enemy;

                bullet.destroy();
                target.health -= 10;

                if (target.health <= 0) {
                    target.alive = false;
                    target.destroy();
                }
            },
            (projectile, enemy) => {
                const bullet = projectile as ProjectileEnt;
                return bullet.owner !== enemy;
            },
        );
    }
}
