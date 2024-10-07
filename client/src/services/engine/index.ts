export type Point = {
    x: number,
    y: number
}

export interface IGameObject {
    position: Point;
    localPosition: Point;

    update(deltaTime: number): void;
}