import Player, { PlayerState } from '@/game/models/player';
import { InputState } from '@/game/input/state';

export class PlayerController {
    constructor() {}

    update(player: Player, input: InputState, state?: Partial<PlayerState>) {
        player.update(input, state);
    }
}
