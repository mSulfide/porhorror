import { ESprite } from "../../../../../game/resources";
import { TMapObject } from "../map";

class Tools {
    private map: TMapObject[];
    constructor(map: TMapObject[]) {
        this.map = map;
    }

    fill(aX: number, aY: number, bX: number, bY: number, sprite: ESprite, sizeX: number, sizeY: number, angle: number = 0): void {
        const x1 = Math.min(aX, bX);
        const y1 = Math.min(aY, bY);
        const x2 = Math.max(aX, bX);
        const y2 = Math.max(aY, bY);
        const sx = Math.abs(sizeX);
        const sy = Math.abs(sizeY);

        for (let x = x1; x < x2; x += sx) {
            for (let y = y1; y < y2; y += sy) {
                this.map.push({ sprite, position: { x, y }, size: { x: sizeX, y: sizeY}, angle });
            }
        }
    }
}

export default Tools;