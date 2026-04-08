type MoveAxis = {
    x: Number;
    y: Number;
};
type AimDirection = {
    x: Number;
    y: Number;
};

export type InputState = {
    move: MoveAxis;
    aim: AimDirection;
    firing: boolean;
};
