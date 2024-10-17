import { TPoint, TUpdateParameters } from "..";
import { add, mlt, modl, norm, sub, zero } from "../math";
import { CircleCollider } from "../structures/Physic";

class PhysicalBehaviour extends CircleCollider {
    weight: number;
    velocity: TPoint = zero();
    friction: number = 1;

    constructor(radius?: number, position?: TPoint, weight?: number) {
        super(radius, position);
        this.weight = weight || 1;
    }

    setVelocity(velocity: TPoint) {
        this.velocity = velocity;
    }

    addVelocity(velocity: TPoint) {
        this.velocity = add(this.velocity, velocity);
    }

    update(game: TUpdateParameters): void {
        const frictionAcceleration = this.friction * this.weight * game.deltaTime;
        if (modl(this.velocity) < frictionAcceleration) {
            this.velocity = zero();
        } 
        else {
            game.physic.translate(this, mlt(this.velocity, game.deltaTime));
            this.velocity = sub(this.velocity, mlt(norm(this.velocity), -frictionAcceleration));
        }
        super.update(game);
    }
}

export default PhysicalBehaviour;