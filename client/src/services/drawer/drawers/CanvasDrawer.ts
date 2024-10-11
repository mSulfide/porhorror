import { IDrawer, TDrawOption } from "../IDrawer";

class CanvasDrawer implements IDrawer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d')!;
    }

    clear(): void {
        //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(option: TDrawOption): void {
        const width = this.canvas.width;
        const height = this.canvas.height;
        this.ctx.beginPath();
        this.ctx.drawImage(
            option.image,
            (option.x / 2 + 0.5) * width,
            (0.5 - option.y / 2) * height
        );
        this.ctx.fill();
    }

}

export default CanvasDrawer;