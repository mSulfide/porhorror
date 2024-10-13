import { IGameObject, TPoint, TUpdateParameters } from "../..";

class Player implements IGameObject {
    position: TPoint;

    constructor(position?: TPoint) {
        const { x, y } = position || { x: 0, y: 0 };
        this.position = { x, y };
    }

    update(game: TUpdateParameters): void {
        
    }
}

export default Player;