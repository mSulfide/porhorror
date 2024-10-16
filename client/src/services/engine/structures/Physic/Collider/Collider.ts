import { ICollider } from "..";
import { TPoint } from "../../..";

class CircleCollider implements ICollider {
    position: TPoint;
    radius: number;

    constructor(radius: number = 1, position?: TPoint) {
        this.radius = Math.max(0, radius);
        this.position = position || { x: 0, y: 0 };
    }

    collide(collider: CircleCollider): boolean {
        return false;
    }
}

export default CircleCollider;