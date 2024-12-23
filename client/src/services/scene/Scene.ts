import { TTransform } from "./types";

class Scene {
    private scene: TTransform[] = [];
    private dTimeStamp: number;

    constructor() {
        this.dTimeStamp = Date.now();
    }

    set(scene: TTransform[]) {
        this.scene = scene;
    }

    update(): void {
        const deltaTime = (Date.now() - this.dTimeStamp) / 1000;
        this.dTimeStamp = Date.now();

        this.scene.forEach(
            transform => {
                transform.position.x = transform.position.x + transform.velocity.x * deltaTime;
                transform.position.y = transform.position.y + transform.velocity.y * deltaTime;
            }
        );
    }
}

export default Scene;