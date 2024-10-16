import { TPoint, TUpdateParameters } from "../..";
import { Vector } from "../../structures";
import { CircleCollider } from "../../structures/Physic";

class Player extends CircleCollider {
    constructor(radius: number = 1, position?: TPoint) {
        super(radius, position);
    }

    update(game: TUpdateParameters): void {
        game.physic.translate(this, new Vector(
            game.input.getAxisX(),
            game.input.getAxisY()
        ).multiplyScalar(game.deltaTime));
    }
}

export default Player;