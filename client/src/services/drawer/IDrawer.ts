export type TDrawOption = {
    image: HTMLImageElement,
    /** x ∈ [0, 1], where 0 - left 1 - right*/
    x: number,
    /** y ∈ [0, 1], where 0 - down, 1 - up */
    y: number,
    sx: number,
    sy: number
}

export interface IDrawer {
    clear(): void;

    draw(option: TDrawOption): void;

    drawFunction(
        func: (x: number) => number,
        color: string,
        lineWidth: number,

    ): void
}