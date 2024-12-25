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

    update(FPS: number): void {
        // GAME_TIMESTAMP: 1000, //ms
        // FPS - частота отрисовки экрана
        // TIME_REQUEST - время ответа сервера
        /*
        
        dFPS = (GAME_TIMESTAMP + TIME_REQUEST) / FPS
        
            update
              |
              v
        0_____|_____|_____|_____|_____|_____|____1000 + TIME_REQUEST
        
        
        
        */

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