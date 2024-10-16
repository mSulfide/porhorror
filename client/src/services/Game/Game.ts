import { Scene } from "../engine/structures";
import { TGameOptions, TGameState } from ".";
import Input from "../engine/structures/Input/Input";

class Game {
    private dTimeStamp: number;
    private scene: Scene;
    private input: Input;

    constructor(options: TGameOptions) {
        this.dTimeStamp = Date.now();
        this.scene = options.scene || new Scene();
        this.input = options.input || new Input();
    }

    public update() {
        const deltaTime = (Date.now() - this.dTimeStamp) / 1000;
        this.dTimeStamp = Date.now();

        const input: Input = this.input;

        this.scene.forEachUpdated((gameObject) => {
            gameObject.update({ deltaTime, input });
        });

        input.update();
    }

    public getState(): TGameState {
        return { scene: this.scene };
    }
}

export default Game;