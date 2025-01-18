import { IDrawer, TDrawOption } from "../IDrawer";

class CanvasDrawer implements IDrawer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d')!;
        this.ctx.imageSmoothingEnabled = false;
    }

    clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw({ image, x, y, dx, dy, dw, dh, sx, sy, angle }: TDrawOption): void {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const alpha = angle * Math.PI / 180;
        const sizeX = sx * Math.cos(alpha) * width + sy * Math.sin(alpha) * height;
        const sizeY = sx * Math.sin(alpha) * width - sy * Math.cos(alpha) * height;
        const posX = x * width - sizeX / 2;
        const posY = (1 - y) * height + sizeY / 2;
        this.ctx.save();
        this.ctx.translate(posX, posY);
        this.ctx.rotate(-alpha);
        this.ctx.translate(-posX, -posY);
        this.ctx.drawImage(
            image,
            dx, dy,
            dw, dh,
            posX, posY,
            sx * width, sy * height
        );
        this.ctx.restore();
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
        this.ctx.moveTo(x1 * width, (1 - y1) * height);
        this.ctx.lineTo(x2 * width, (1 - y2) * height);
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