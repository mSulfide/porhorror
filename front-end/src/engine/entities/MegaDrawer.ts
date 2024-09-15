import { Point } from "../structures";
import IDrawer from "../structures/IDrawer";

export default class MegaDrawer implements IDrawer {
    drawSprite(position: Point): void {
        console.log(position);
    }
}