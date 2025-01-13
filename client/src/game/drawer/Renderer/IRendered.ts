import { TPoint, TSprite } from "./types";

export interface IRendered {
    position: TPoint;
    sprite: TSprite;
    size?: TPoint;
    radius: number;
}