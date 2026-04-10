import Player from '@/game/models/player';
import { InputState } from '@/game/input/state';

export class PlayerController {
    constructor() {}

    update(player: Player, state: InputState) {
        player.update(state);
    }
}
