export type TPoint = {
    x: number,
    y: number
}

export interface IGameObject {
    position: TPoint;

    update(deltaTime: number): void;
}