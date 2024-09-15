import { Point } from ".";
import IDrawer from "./IDrawer";

export default abstract class GameObject {
    public position: Point = new Point();

    protected name: string;

    constructor(name: string, pos?: Point) {
        this.name = name;
        if (pos)
            this.position = pos;
    }

    public abstract update(deltaTime: number): void;

    public abstract draw(drawer: IDrawer): void;
}