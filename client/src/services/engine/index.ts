import { Physic } from "./structures";
import Input from "./structures/Input/Input";

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