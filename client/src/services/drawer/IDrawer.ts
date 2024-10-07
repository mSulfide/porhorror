export type TDrawOption = {
    x: number,
    y: number
}

export interface IDrawer {
    clear(): void;

    draw(option: TDrawOption): void;
}