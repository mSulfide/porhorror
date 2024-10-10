import { IGameObject, TPoint } from "..";

class PhysicalBehaviour implements IGameObject {

    position: TPoint;
    weight: number;
    velocity: TPoint = {x: 0.13, y: 0.12};
    friction: number = 0.01;

    constructor(position: TPoint, weight: number = 1) {
        this.position = position
        this.weight = weight;
    }

    setVelocity(velocity: TPoint) {
        this.velocity.x = velocity.x;
        this.velocity.y = velocity.y;
    }

    addVelocity(velocity: TPoint) {
        this.velocity.x += velocity.x;
        this.velocity.y += velocity.y;
    }

    update(deltaTime: number): void {
        if (this.velocity.x || this.velocity.y) {
            this.position.x += this.velocity.x * deltaTime;
            this.position.y += this.velocity.y * deltaTime;
            let frictionAcceleration = this.friction * this.weight * deltaTime;
            let overallVelocity = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
            if (overallVelocity < frictionAcceleration) {
                this.velocity.x = 0;
                this.velocity.y = 0;
            } else {
                if (this.velocity.x > 0) {
                    this.velocity.x -= frictionAcceleration * this.velocity.x / overallVelocity;
                } else {
                    this.velocity.x += frictionAcceleration * this.velocity.x / overallVelocity;
                }
                if (this.velocity.y > 0) {
                    this.velocity.y -= frictionAcceleration * this.velocity.y / overallVelocity;
                } else {
                    this.velocity.y += frictionAcceleration * this.velocity.y / overallVelocity;
                }
            }
        }
        console.log(this.position.x, " ", this.position.y)
    }
}

export default PhysicalBehaviour;