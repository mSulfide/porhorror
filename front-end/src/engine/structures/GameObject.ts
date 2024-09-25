import { TDrawRequest, TPoint } from "../types";

export default abstract class GameObject {
    public position: TPoint;

    constructor(position?: TPoint) {
        this.position = position ?? { x: 0, y: 0 };
    }

    public abstract update(deltaTime: number): void;

    public abstract render(addDrawRequest: (drawRequest: TDrawRequest) => void): void;
}