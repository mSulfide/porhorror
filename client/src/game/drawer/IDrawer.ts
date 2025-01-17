export type TDrawOption = {
    image: HTMLImageElement,
    /** x ∈ [0, 1], where 0 - left 1 - right*/
    x: number,
    /** y ∈ [0, 1], where 0 - down, 1 - up */
    y: number,
    sx: number, sy: number,
    dx: number, dy: number,
    dw: number, dh: number,
    /** 0 - rigth, 90 - up, 180 - left, -90 - down */
    angle: number
}

export interface IDrawer {
    clear(): void;

    draw(option: TDrawOption): void;

    drawLine?(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        color?: string,
        lineWidth?: number
    ): void;

    drawFunction?(
        func: (x: number) => number,
        color?: string,
        lineWidth?: number,

    ): void
}