import { IGameObject, TPoint } from "..";

class PhysicalBehaviour implements IGameObject {

    position: TPoint;
    weight: number;
    velocity: TPoint = {x: 0, y: 0};
    friction: number = 1;

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
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.velocity.x -= this.friction * this.weight * deltaTime;
        this.velocity.y -= this.friction * this.weight * deltaTime;
    }
}