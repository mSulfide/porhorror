import { EImage } from "./images"

export enum ESprite {
    tas = 'tas',
    player = 'player'
}

export const getSprite = (image: EImage, offset: number[], size: number[]) => ({
    image,
    offset: { x: offset[0], y: offset[1] },
    size: { x: size[0], y: size[1] }
});

export const sprites = {
    [ESprite.tas]: getSprite(EImage.tas, [0, 0], [32, 32]),
    [ESprite.player]: getSprite(EImage.assets, [101, 10], [21, 12])
}