import { Point } from ".";

export default interface IDrawer {
    drawSprite(position: Point): void;
}