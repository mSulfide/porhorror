import Scene from "../engine/structures/Scene";
import { TGameOptions } from "./types";

class Game {
    private dTimeStamp: number;
    private scene: Scene;

    constructor(options: TGameOptions) {
        this.dTimeStamp = Date.now();
        this.scene = new Scene([]);
    }

    public update() {
        const deltaTime = (Date.now() - this.dTimeStamp) / 1000;
        this.scene.forEach((gameObject) => {
            gameObject.update(deltaTime);
        });
    }
}

export default Game;