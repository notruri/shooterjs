import { Scene } from 'phaser';
import { InputState } from '@/game/input/state';

export default class InputManager {
    state: InputState;
    scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    get_state(): InputState {
        return this.state;
    }

    update() {}

    destroy() {}
}
