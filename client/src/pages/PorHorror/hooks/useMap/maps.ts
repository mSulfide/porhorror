import { ESprite } from "../../../../game/resources";

export enum EMap {
    default = 'default'
}

const getRendered = (sprite: ESprite, position: number[], size: number[], angle: number = 0) => ({
    sprite,
    position: { x: position[0], y: position[1] },
    size: { x: size[0], y: size[1] },
    angle
});

const maps = {
    [EMap.default]: [
        getRendered(ESprite.slabsPAT, [0, 1], [2, 2], 15),
    ]
}

export default maps;