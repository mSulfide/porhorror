import { ESprite } from "../../../../game/resources";
type TPoint = { x: number, y: number };
type TObject = {
    sprite: ESprite,
    position: TPoint,
    size: TPoint
};

const getMap = (): TObject[] => {
    const map: TObject[] = [];
    return map;
};

export default getMap;