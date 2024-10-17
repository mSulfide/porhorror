import { TPoint, TUpdateParameters } from "../..";
import PhysicalBehaviour from "../../physic/PhysicalBehavouor";

class Player extends PhysicalBehaviour {
    speed: number = 2;

    constructor(radius?: number, position?: TPoint, weigth?: number) {
        super(radius, position, weigth);
    }

    update(game: TUpdateParameters): void {
        const axis: TPoint = { x: game.input.getAxisX(), y: game.input.getAxisY() };
        this.setVelocity(axis);
        super.update(game);
    }
}

export default Player;