import { IGameObject, TPoint } from "..";

class PhysicalBehaviour implements IGameObject {

    position: TPoint;
    weight: number;
    velocity: number = 0.5;
    velocityDirection: TPoint = {x: 1, y: 1}
    friction: number = 1;

    constructor(position: TPoint, weight: number = 1) {
        this.position = position
        this.weight = weight;
    }

    setVelocityDirection(direction: TPoint) {
        this.velocityDirection.x = direction.x;
        this.velocityDirection.y = direction.y;
    }

    setVelocity(velocity: number) {
        this.velocity = velocity;
    }

    addVelocity(velocity: number) {
        this.velocity += velocity;
    }

    update(deltaTime: number): void {
        let x = this.position.x;
        let y = this.position.y;
        if (this.velocity) {
            let frictionAcceleration = this.friction * this.weight * deltaTime;
            if (this.velocity < frictionAcceleration) {
                this.velocity = 0;
            } else {
                this.position.x += this.velocityDirection.x * this.velocity * deltaTime;
                this.position.y += this.velocityDirection.y * this.velocity * deltaTime;
                this.velocity -= frictionAcceleration * this.velocity
            }
        }
        console.log(Math.sqrt(this.position.x ** 2 + this.position.y ** 2) - 
            Math.sqrt(x ** 2 + y ** 2));
    }
}

export default PhysicalBehaviour;