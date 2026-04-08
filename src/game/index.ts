import { AUTO, Game } from 'phaser';

import { Boot } from '@/game/scenes/boot';
import { GameOver } from '@/game/scenes/gameover';
import { Game as MainGame } from '@/game/scenes/game';
import { MainMenu } from '@/game/scenes/mainmenu';
import { Preloader } from '@/game/scenes/preload';

// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'window',
    backgroundColor: '#028af8',
    physics: {
        default: 'arcade',
    },
    scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;
