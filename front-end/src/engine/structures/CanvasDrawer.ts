import { TDrawRequest, TPoint } from "../types";
import IDrawer from "../interfaces/IDrawer";

class CanvasDrawer implements IDrawer {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._ctx = this._canvas.getContext('2d')!;
  }

  draw(request: TDrawRequest): void {
    this._ctx.beginPath();
    this._ctx.arc(request.position.x, request.position.y, request.radius, 0, 2 * Math.PI);
    this._ctx.fill();
  }

  clear(): void {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }
}

export default CanvasDrawer;
