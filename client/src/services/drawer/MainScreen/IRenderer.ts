import { TPoint } from "./types";

export interface IRenderer {
    position: TPoint;
    sprite: HTMLImageElement;
    size?: TPoint;
    radius: number;
}