import { ICollider, THitInfo } from "..";
import { IGameObject, TPoint, TUpdateParameters } from "../../..";
import { add, mlt, norm, smod, sub } from "../../../math";

class CircleCollider implements ICollider, IGameObject {
    position: TPoint;
    radius: number;

    constructor(radius: number = 1, position?: TPoint) {
        this.radius = Math.max(0, radius);
        this.position = position || { x: 0, y: 0 };
    }

    collide(collider: CircleCollider): THitInfo | null {
        const ab = sub(collider.position, this.position);
        if (smod(ab) > (this.radius + collider.radius) ** 2)
            return null;
        const normal = norm(ab);
        return { point: add(this.position, mlt(normal, this.radius)), normal };
    }

    update(game: TUpdateParameters): void {
        
    }
}

export default CircleCollider;