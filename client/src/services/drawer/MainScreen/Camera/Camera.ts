import { add, mlt, one, zero } from "../../../engine/math";
import { IRenderer } from "../IRenderer";
import { TCameraParams, TPoint } from "../types";

class Camera {
    position: TPoint;
    width: number;
    height: number;
    vision: IRenderer[] = [];

    constructor({ width, height, position }: TCameraParams) {
        this.position = position || zero();
        this.width = width;
        this.height = height;
    }

    update(scene: IRenderer[]): void {
        this.vision = [];
        scene.forEach(renderer => {
            const { x, y } = renderer.position;
            const x0 = this.position.x;
            const y0 = this.position.y;
            const offset = add(mlt({ x: this.width, y: this.height }, 0.5), mlt(one(), renderer.viewRadius));
            if (
                x0 - offset.x <= x && x <= x0 + offset.x &&
                y0 - offset.y <= y && y <= y0 + offset.y
            ) {
                this.vision.push(renderer);
            }
        });
    }
}

export default Camera