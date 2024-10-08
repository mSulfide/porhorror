import { Scene } from "../engine/structures";
import { TGameOptions, TGameState } from ".";

class Game {
    private dTimeStamp: number;
    private scene: Scene;

    constructor(options: TGameOptions) {
        this.dTimeStamp = Date.now();
        this.scene = options.scene || new Scene([]);
    }

    public update() {
        const deltaTime = (Date.now() - this.dTimeStamp) / 1000;
        this.scene.forEach((gameObject) => {
            gameObject.update(deltaTime);
        });
    }

    public getState(): TGameState {
        return { scene: this.scene };
    }
}

export default Game;