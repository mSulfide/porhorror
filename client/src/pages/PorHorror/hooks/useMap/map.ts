import { ESprite } from "../../../../game/resources";
import Tools from "./Tools/Tools";
type TPoint = { x: number, y: number };
export type TMapObject = {
    sprite: ESprite,
    position: TPoint,
    size: TPoint
};

const getMap = (): TMapObject[] => {
    const map: TMapObject[] = [];
    const tools = new Tools(map);

    tools.fill(1, 1, 8, 5, ESprite.toiletENV, 1, 1);

    return map;
};

export default getMap;