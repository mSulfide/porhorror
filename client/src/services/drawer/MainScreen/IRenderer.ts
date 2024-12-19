import { TPoint } from "./types";

export interface IRenderer {
    position: TPoint;
    sprite?: boolean;
    size?: TPoint;
    radius: number;
}