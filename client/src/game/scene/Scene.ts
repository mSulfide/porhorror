import { TPoint, mlt, sub } from "../../services/math";
import { TGameObject } from "../../services/server/types";

type TSceneObject = Omit<TGameObject, 'id'> & {
    acceleration?: TPoint,
    velocityA?: TPoint;
};

class Scene {
    private scene: { [id: string]: TSceneObject } = {};
    private lastSetTime: number = 0;

    set(scene: TGameObject[]) {
        scene.forEach(({ id, image, position, velocity, radius, angle }) => {
            const gameObject = this.scene[id];
            if (gameObject) {
                gameObject.image = image;
                if (gameObject.velocityA) {
                    gameObject.acceleration = mlt(sub(velocity, gameObject.velocityA), 1 / this.lastSetTime);
                }
                gameObject.velocityA = { x: velocity.x, y: velocity.y };
                gameObject.position = position;
                gameObject.velocity = velocity;
                gameObject.radius = radius;
                gameObject.angle = angle;
            }
            else {
                this.scene[id] = { image, position, velocity, radius, angle };
            }
        });
        this.lastSetTime = 0;
    }

    update(deltaTime: number): void {
        this.lastSetTime += deltaTime;
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
        Object.keys(this.scene).forEach((id) => {
            const { position, velocity, acceleration } = this.scene[id];
            position.x = position.x + velocity.x * deltaTime;
            position.y = position.y + velocity.y * deltaTime;
            if (acceleration) {
                velocity.x = velocity.x + acceleration.x * deltaTime;
                velocity.y = velocity.y + acceleration.y * deltaTime;
            }
        });
    }
}

export default Scene;