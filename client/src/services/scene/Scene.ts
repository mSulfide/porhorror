import { add, mlt } from "../engine/math";
import { TTransform } from "./types";

class Scene {
    private scene: TTransform[] = [];
    private dTimeStamp: number;

    constructor(scene: TTransform[]) {
        this.dTimeStamp = Date.now();
        this.scene = scene;
    }

    update(): void {
        const deltaTime = (Date.now() - this.dTimeStamp) / 1000;
        this.dTimeStamp = Date.now();

        this.scene.forEach(
            transform => transform.position = add(transform.position, mlt(transform.velocity, deltaTime))
        );
    }
}

export default Scene;