import { TGameObject } from "../../services/server/types";

type TSceneObject = Omit<TGameObject, 'id'>;

class Scene {
    private scene: { [id: string]: TSceneObject } = {};

    set(scene: TGameObject[]) {
        scene.forEach(({ id, image, position, velocity, radius, angle }) => {
            const gameObject = this.scene[id];
            if (gameObject) {
                gameObject.image = image;
                gameObject.position = position;
                gameObject.velocity = velocity;
                gameObject.radius = radius;
                gameObject.angle = angle;
            }
            else {
                this.scene[id] = { image, position, velocity, radius, angle };
            }
        });
    }

    update(deltaTime: number): void {
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
            const transform = this.scene[id];
            transform.position.x = transform.position.x + transform.velocity.x * deltaTime;
            transform.position.y = transform.position.y + transform.velocity.y * deltaTime;
        });
    }
}

export default Scene;