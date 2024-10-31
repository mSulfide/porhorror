import { IUpdatable, IRenderer, TPoint, TUpdateParameters } from "../..";
import { add, mlt, one, zero } from "../../math";
import { Scene } from "../../structures";

class Camera implements IUpdatable {
    position: TPoint;
    scene: Scene;
    width: number;
    height: number;
    vision: IRenderer[] = [];

    constructor(width: number, height: number, scene: Scene, position?: TPoint) {
        this.position = position || zero();
        this.scene = scene;
        this.width = width;
        this.height = height;
    }

    update(game: TUpdateParameters): void {
        this.vision = [];
        this.scene.forEachRenederers(renderer => {
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