import GameObject from "./GameObject";
import Obstacle from "../entities/objects/Obstacle";
import { TPoint } from "../types/index"; 

export default class Scene {
    private _objects: GameObject[] = [];

    constructor(objects: GameObject[] = []) {
        objects?.forEach((gameObject: GameObject) => {
            this._objects.push(gameObject);
        });
    }

    public forEach(action: (gameObject: GameObject) => void) {
        this._objects.forEach(action);
    }

    public addObstacle(position: TPoint, radius: number): void {
        const obstacle = new Obstacle(position, radius);
        this._objects.push(obstacle);
    }
}
