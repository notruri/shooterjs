import Player from '@/game/models/player';
import { InputState } from '@/game/input/state';

export class PlayerController {
    constructor() {}

    update(player: Player, state: InputState) {
        const length = Math.hypot(state.move.x, state.move.y);
        const nx = length > 0 ? state.move.x / length : 0;
        const ny = length > 0 ? state.move.y / length : 0;

        player.setVelocity(nx * player.speed, ny * player.speed);

        const dx = state.aim.x - player.x;
        const dy = state.aim.y - player.y;

        player.setRotation(Math.atan2(dy, dx));

        if (state.firing && !player.shooting) {
            player.shoot({
                kind: 'bullet',
                pos: { x: player.x, y: player.y },
                angle: player.rotation,
                speed: 300,
            });

            player.shooting = true;
        } else if (!state.firing) {
            player.shooting = false;
        }
    }
}
