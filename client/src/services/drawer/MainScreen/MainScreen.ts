import { IDrawer } from "../IDrawer";
import sprite from "../../../assets/img/tas.png";
import { mlt, one } from "../../engine/math";
import Camera from "./Camera/Camera";
import { IRenderer } from "./IRenderer";
import { TCameraParams } from "./types";

export default class MainScreen {
    private drawer: IDrawer;
    private image: HTMLImageElement;
    private isReady: boolean = false;
    private camera: Camera;

    constructor(drawer: IDrawer, cameraParams: TCameraParams) {
        this.drawer = drawer;
        this.camera = new Camera(cameraParams);
        this.image = new Image();
        this.image.src = sprite;
        this.image.onload = () => this.isReady = true;
    }

    public render(scene: IRenderer[]) {
        this.drawer.clear();
        this.drawCells(0.25, 1);
        this.drawCells();
        this.camera.update(scene);
        const cam = this.camera;
        cam.vision.forEach(renderer => {
            if (this.isReady) {
                const size = renderer.size || mlt(one(), renderer.viewRadius);
                this.drawer.draw({
                    image: this.image,
                    x: this.sx(renderer.position.x),
                    y: this.sy(renderer.position.y),
                    sx: size.x * 2 / cam.width,
                    sy: size.y * 2 / cam.height
                });
            }
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
            for (let i = Math.ceil((-cam.width / 2 - cam.position.x) / cellSize); i <= Math.floor((cam.width / 2 + cam.position.x) / cellSize); i++) {
                const x = this.sx(i * cellSize);
                this.drawer.drawLine(x, 0, x, 1, "#5555", lineWidth);
            }
            for (let i = Math.ceil((-cam.height / 2 - cam.position.y) / cellSize); i <= Math.floor((cam.height / 2 + cam.position.y) / cellSize); i++) {
                const y = this.sy(i * cellSize);
                this.drawer.drawLine(0, y, 1, y, "#5555", lineWidth);
            }
        }
    }
}