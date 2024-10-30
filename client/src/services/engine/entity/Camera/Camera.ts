import { IGameObject, TPoint, TUpdateParameters } from "../..";
import { mlt, zero } from "../../math";
import { Scene } from "../../structures";

class Camera implements IGameObject {
    position: TPoint;
    scene: Scene;
    width: number;
    height: number;
    vision: IGameObject[] = [];

    constructor(width: number, height: number, scene: Scene, position?: TPoint) {
        this.position = position || zero();
        this.scene = scene;
        this.width = width;
        this.height = height;
    }

    update(game: TUpdateParameters): void {
        this.vision = [];
        this.scene.forEachUpdated(gameObject => {
            const { x, y } = gameObject.position;
            const x0 = this.position.x;
            const y0 = this.position.y;
            const offset = mlt({ x: this.width, y: this.height }, 0.5);
            if (
                x0 - offset.x <= x && x <= x0 + offset.x &&
                y0 - offset.y <= y && y <= y0 + offset.y
            ) {
                this.vision.push(gameObject);
            }
        });
    }
}

export default Camera