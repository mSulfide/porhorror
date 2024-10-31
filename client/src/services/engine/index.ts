import { Input, Physic } from "./structures";

export type TPoint = {
    x: number,
    y: number
}

export type TUpdateParameters = {
    deltaTime: number,
    input: Input,
    physic: Physic
}

export interface IGameObject {
    position: TPoint;

    update(game: TUpdateParameters): void;
}

export interface IRenderer {
    position: TPoint;
    sprite?: boolean;
    size?: TPoint;
    viewRadius: number;
}