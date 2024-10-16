import { TPoint, TUpdateParameters } from "..";
import { Vector } from "../structures";
import { CircleCollider } from "../structures/Physic";

class PhysicalBehaviour extends CircleCollider {
    weight: number;
    velocity: Vector = new Vector();
    friction: number = 1;

    constructor(radius?: number, position?: TPoint, weight?: number) {
        super(radius, position);
        this.weight = weight || 1;
    }

    setVelocity(velocity: TPoint) {
        this.velocity = new Vector(velocity.x, velocity.y);
    }

    addVelocity(velocity: TPoint) {
        const { x, y } = velocity;
        this.velocity = this.velocity.add(new Vector(x, y));
    }

    update(game: TUpdateParameters): void {
        const frictionAcceleration = this.friction * this.weight * game.deltaTime;
        if (this.velocity.length() < frictionAcceleration) {
            this.velocity = new Vector();
        } else {
            game.physic.translate(this, this.velocity.multiplyScalar(game.deltaTime));
            this.velocity = this.velocity.subtract(this.velocity.normalize().multiplyScalar(-frictionAcceleration));
        }
        super.update(game);
    }
}

export default PhysicalBehaviour;