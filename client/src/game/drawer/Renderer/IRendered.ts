import { TPoint } from "./types";

export interface IRendered {
    position: TPoint;
    sprite: HTMLImageElement;
    size?: TPoint;
    radius: number;
}