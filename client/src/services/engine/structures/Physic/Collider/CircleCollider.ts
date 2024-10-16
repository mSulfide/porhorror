import { ICollider } from "..";
import { TPoint } from "../../..";
import Vector from "../../Vector/Vector";

class CircleCollider implements ICollider {
    position: TPoint;
    radius: number;

    constructor(radius: number = 1, position?: TPoint) {
        this.radius = Math.max(0, radius);
        this.position = position || { x: 0, y: 0 };
    }

    collide(collider: CircleCollider): boolean {
        return new Vector(this.position.x, this.position.y).subtract(new Vector(collider.position.x, collider.position.y)).sqrLength() <= (this.radius + collider.radius) ** 2;
    }
}

export default CircleCollider;