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
        const physic: Physic = this.physic;

        this.scene.forEachUpdated((gameObject) => {
            gameObject.update({ deltaTime, input, physic });
        });

        physic.update();
        input.update();
    }

    public getState(): TGameState {
        return { scene: this.scene };
    }
}

export default Game;