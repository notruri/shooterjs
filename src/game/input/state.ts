export type MoveAxis = {
    x: number;
    y: number;
};

export type AimDirection = {
    x: number;
    y: number;
};

export type InputState = {
    move: MoveAxis;
    aim: AimDirection;
    firing: boolean;
};
