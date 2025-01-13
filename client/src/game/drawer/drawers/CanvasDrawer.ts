import { IDrawer, TDrawOption } from "../IDrawer";

class CanvasDrawer implements IDrawer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d')!;
    }

    clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(option: TDrawOption): void {
        const width = this.canvas.width;
        const height = this.canvas.height;
        this.ctx.drawImage(
            option.image, 
            option.dx,
            option.dy,
            option.dw,
            option.dh,
            (option.x - option.sx / 2) * width,
            (1 - option.y - option.sy / 2) * height,
            option.sx * width,
            option.sy * height
        );
    }

    drawLine(
        x1: number, y1: number,
        x2: number, y2: number,
        color: string = "red",
        lineWidth: number = 2
    ): void {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        const width = this.canvas.width;
        const height = this.canvas.height;
        this.ctx.moveTo(x1 * width, y1 * height);
        this.ctx.lineTo(x2 * width, y2 * height);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawFunction(
        func: (x: number) => number,
        color: string = "red",
        lineWidth: number = 2
    ): void {
        const width = this.canvas.width;
        const height = this.canvas.height;
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        for (let x = 0; x < width; x++) {
            const normalizedX = (x / width) * 2 - 1; // Нормализуем x в диапазон [-1, 1]
            const y = (height / 2) - func(normalizedX) * (height / 2);
            this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        this.ctx.stroke();
    }
}

export default CanvasDrawer;