export type TDrawOption = {
    image: HTMLImageElement,
    /** x ∈ [-1, 1] */
    x: number,
    /** y ∈ [-1, 1] */
    y: number
}

export interface IDrawer {
    clear(): void;

    draw(option: TDrawOption): void;
}