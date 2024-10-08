import { IGameObject, TPoint } from "../..";

class Player implements IGameObject {
    position: TPoint;

    constructor(position?: TPoint) {
        const { x, y } = position || { x: 0, y: 0 };
        this.position = { x, y };
    }

    update(deltaTime: number): void {
        
    }
}

export default Player;