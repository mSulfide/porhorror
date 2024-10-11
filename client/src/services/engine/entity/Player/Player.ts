import { IGameObject, TPoint } from "../..";
import Input from "../../structures/Input/Input";

class Player implements IGameObject {
    position: TPoint;

    constructor(position?: TPoint) {
        const { x, y } = position || { x: 0, y: 0 };
        this.position = { x, y };
    }

    update(deltaTime: number, input: Input): void {
        this.position.x += input.getAxisX() * deltaTime;
        this.position.y += input.getAxisY() * deltaTime;
    }
}

export default Player;