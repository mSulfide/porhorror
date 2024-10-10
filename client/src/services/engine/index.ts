import Input from "./structures/Input/Input";

export type TPoint = {
    x: number,
    y: number
}

export interface IGameObject {
    position: TPoint;

    update(deltaTime: number, input: Input): void;
}