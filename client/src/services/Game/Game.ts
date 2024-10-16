import { Input, Physic, Scene } from "../engine/structures";
import { TGameOptions, TGameState } from ".";

class Game {
    private dTimeStamp: number;
    private scene: Scene;
    private input: Input;
    private physic: Physic;

    constructor(options: TGameOptions) {
        this.dTimeStamp = Date.now();
        this.scene = options.scene || new Scene();
        this.input = options.input || new Input();
        this.physic = new Physic(this.scene);
    }

    public update() {
        const deltaTime = (Date.now() - this.dTimeStamp) / 1000;
        this.dTimeStamp = Date.now();

        const input: Input = this.input;

        this.scene.forEachUpdated((gameObject) => {
            gameObject.update({ deltaTime, input });
        });

        this.physic.update();
        input.update();
    }

    public getState(): TGameState {
        return { scene: this.scene };
    }
}

export default Game;