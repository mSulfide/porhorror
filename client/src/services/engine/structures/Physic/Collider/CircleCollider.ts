import { ICollider } from "..";
import { IGameObject, TPoint, TUpdateParameters } from "../../..";
import { add, mlt, norm, smod, sub } from "../../../math";

class CircleCollider implements ICollider, IGameObject {
    position: TPoint;
    radius: number;

    constructor(radius: number = 1, position?: TPoint) {
        this.radius = Math.max(0, radius);
        this.position = position || { x: 0, y: 0 };
    }

    collide(collider: CircleCollider): TPoint | null {
        const ab = sub(collider.position, this.position);
        if (smod(ab) > (this.radius + collider.radius) ** 2)
            return null;
        return add(this.position, mlt(norm(ab), this.radius));
    }

    update(game: TUpdateParameters): void {
        
    }
}

export default CircleCollider;