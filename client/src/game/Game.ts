import CONFIG, { TPoint } from "../config";
const { WIDTH, HEIGHT } = CONFIG;
import Input from "../services/engine/structures/Input/Input";

class Game {
    private kapitoshka: TPoint;
    private input: Input;

    constructor() {
        this.kapitoshka = { x: 2, y: 5 };
        this.input = new Input();
    }

    destructor() {
        //...
    }

    getScene() {
        return {
            kapitoshka: this.kapitoshka,
        };
    }

    update(): void {
        // Обновление состояния ввода
        this.input.update();
  
        // Обработка движения
        const dx = this.input.getAxisX();
        const dy = this.input.getAxisY();
        this.move(dx, dy);
      }
  

    move(dx: number, dy: number): void {
        if ((dx > 0 && this.kapitoshka.x + dx <= WIDTH - 1) ||
            (dx < 0 && this.kapitoshka.x - dx >= 0)
        ) {
            this.kapitoshka.x += dx;
        }
        if ((dy > 0 && this.kapitoshka.y + dy <= HEIGHT - 1) ||
            (dy < 0 && this.kapitoshka.y - dy >= 0)
        ) {
            this.kapitoshka.y += dy;
        }
    }
}

export default Game;