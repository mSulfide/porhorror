import { TPoint } from "../../../services/math";
import { TSprite } from "./types";

export interface IRendered {
    position: TPoint;
    sprite: TSprite | TSprite[];
    size?: TPoint;
    radius: number;
    angle?: number;
}