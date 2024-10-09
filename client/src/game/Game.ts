import CONFIG, { TPoint } from "../config";
const { WIDTH, HEIGHT } = CONFIG;

class Game {
    private kapitoshka: TPoint;

    constructor() {
        this.kapitoshka = { x: 2, y: 5 };
    }

    destructor() {
        //...
    }

    getScene() {
        return {
            kapitoshka: this.kapitoshka,
        };
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