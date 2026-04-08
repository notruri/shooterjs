import { Input, Scene } from 'phaser';
import { InputState } from '@/game/input/state';

type Keys = {
    up?: Input.Keyboard.Key;
    down?: Input.Keyboard.Key;
    left?: Input.Keyboard.Key;
    right?: Input.Keyboard.Key;
};

export default class InputManager {
    state: InputState;
    scene: Scene;
    keys?: Keys;

    constructor(scene: Scene) {
        this.scene = scene;

        this.state = {
            move: { x: 0, y: 0 },
            aim: { x: 0, y: 0 },
            firing: false,
        };

        this.keys = scene.input.keyboard?.addKeys({
            up: Input.Keyboard.KeyCodes.W,
            down: Input.Keyboard.KeyCodes.S,
            left: Input.Keyboard.KeyCodes.A,
            right: Input.Keyboard.KeyCodes.D,
        });
    }

    get_state(): InputState {
        return this.state;
    }

    update() {
        const move_x =
            Number(this.keys?.right?.isDown) - Number(this.keys?.left?.isDown);
        const move_y =
            Number(this.keys?.down?.isDown) - Number(this.keys?.up?.isDown);
        const pointer = this.scene.input.activePointer;

        this.state.move.x = move_x;
        this.state.move.y = move_y;
        this.state.aim.x = pointer.worldX;
        this.state.aim.y = pointer.worldY;
        this.state.firing = pointer.leftButtonDown();
    }

    destroy() {}
}
