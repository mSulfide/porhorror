import GameObject from "../../structures/GameObject";
import { TDrawRequest, TPoint } from "../../types/index";

export default class Obstacle extends GameObject {
    private _radius: number;

    constructor(position: TPoint, radius: number) {
        super(position);
        this._radius = radius;
    }

    public update(deltaTime: number): void {
        // Препятствие не движется, поэтому ничего не делаем
    }

    public render(addDrawRequest: (drawRequest: TDrawRequest) => void): void {
        addDrawRequest({ position: this.position, radius: this._radius });
    }
}
