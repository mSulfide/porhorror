import { IGameObject, TPoint, TUpdateParameters } from "../..";

class Player implements IGameObject {
    position: TPoint;

    constructor(position?: TPoint) {
        const { x, y } = position || { x: 0, y: 0 };
        this.position = { x, y };
    }

    update(game: TUpdateParameters): void {
        this.position.x += game.input.getAxisX() * game.deltaTime;
        this.position.y += game.input.getAxisY() * game.deltaTime;
    }
}

export default Player;