import { TPoint } from "../../../services/math"

export type TCameraParams = {
    width: number,
    height: number,
    position?: TPoint
}

export type TSprite = {
    image: HTMLImageElement,
    offset: TPoint,
    size: TPoint
}