import { Scene } from "../engine/structures";
import { TGameOptions, TGameState } from ".";
import Input from "../engine/structures/Input/Input";

class Game {
    private dTimeStamp: number;
    private scene: Scene;
    private input: Input;

    constructor(options: TGameOptions) {
        this.dTimeStamp = Date.now();
        this.scene = options.scene || new Scene([]);
        this.input = new Input();
    }

    public update() {
        const deltaTime = (Date.now() - this.dTimeStamp) / 1000;
        this.dTimeStamp = Date.now(); // Обновление dTimeStamp после расчета deltaTime
        // Обновление Input перед обновлением сцены
        this.input.update();

        this.scene.forEach((gameObject) => {
            gameObject.update(deltaTime, this.input);
        });
    }

    public getState(): TGameState {
        return { scene: this.scene };
    }
}

export default Game;