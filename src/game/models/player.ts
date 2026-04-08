import Entity from '@/game/models/entity';
import { InputState } from '@/game/input/state';

export default class Player extends Entity {
    constructor() {
        super();
    }

    update(_state: InputState) {}
}
