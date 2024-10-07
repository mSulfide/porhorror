export type Point = {
    x: number,
    y: number
}

export interface IGameObject {
    position: Point;

    update(deltaTime: number): void;
}