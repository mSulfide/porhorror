import { ESprite } from "../../../../game/resources";

export enum EMap {
    default = 'default'
}

const getRendered = (sprite: ESprite, position: number[], size: number[]) => ({
    sprite,
    position: { x: position[0], y: position[1] },
    size: { x: size[0], y: size[1] }
});

const maps = {
    [EMap.default]: [
        getRendered(ESprite.tas, [2, 3], [1, 1])
    ]
}

export default maps;