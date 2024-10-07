import { IDrawer, TDrawOption } from "../IDrawer";

class CanvasDrawer implements IDrawer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d')!;
    }

    clear(): void {
        
    }

    draw(option: TDrawOption): void {
        console.log(option);
    }

}

export default CanvasDrawer;