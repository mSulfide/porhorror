import { IDrawer } from "../IDrawer";
import { mlt, one } from "../../../services/math";
import Camera from "./Camera/Camera";
import { IRendered } from "./IRendered";
import { TCameraParams } from "./types";

export default class Renderer {
    private drawer: IDrawer;
    public readonly camera: Camera;

    constructor(drawer: IDrawer, cameraParams: TCameraParams) {
        this.drawer = drawer;
        this.camera = new Camera(cameraParams);
    }

    public render(scene: IRendered[]) {
        this.drawer.clear();
        this.drawCells(0.25, 1);
        this.drawCells();
        this.camera.update(scene);
        const cam = this.camera;
        cam.vision.forEach(({ radius, size, position, sprite }) => {
            const currectSize = size || mlt(one(), radius);
            sprite && this.drawer.draw({
                image: sprite.image,
                x: this.sx(position.x),
                y: this.sy(position.y),
                sx: currectSize.x * 2 / cam.width,
                sy: currectSize.y * 2 / cam.height,
                dx: sprite.offset.x,
                dy: sprite.offset.y,
                dw: sprite.size.x,
                dh: sprite.size.y
            });
        });
    }

    private sx(x: number): number {
        return ((x - this.camera.position.x) * 2 / this.camera.width + 1) / 2;
    }

    private sy(y: number): number {
        return ((y - this.camera.position.y) * 2 / this.camera.height + 1) / 2
    }

    private drawCells(cellSize: number = 1, lineWidth: number = 2) {
        if (this.drawer.drawLine) {
            const cam = this.camera;
            for (let i = Math.ceil((-cam.width / 2 + cam.position.x) / cellSize); i <= Math.floor((cam.width / 2 + cam.position.x) / cellSize); i++) {
                const x = this.sx(i * cellSize);
                this.drawer.drawLine(x, 0, x, 1, "#5555", lineWidth);
            }
            for (let i = Math.ceil((-cam.height / 2 + cam.position.y) / cellSize); i <= Math.floor((cam.height / 2 + cam.position.y) / cellSize); i++) {
                const y = 1 - this.sy(i * cellSize);
                this.drawer.drawLine(0, y, 1, y, "#5555", lineWidth);
            }
        }
    }
}