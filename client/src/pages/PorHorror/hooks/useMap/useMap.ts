import { useContext } from "react";
import { IRendered } from "../../../../game/drawer/Renderer/IRendered";
import { StoreContext } from "../../../../App";
import maps, { EMap } from "./maps";

const useMap = (map: EMap): [IRendered[], number] => {
    const resources = useContext(StoreContext).resources;
    const rendereds: IRendered[] = [];
    maps[map].forEach(({ sprite, position, size }) => {
        const currectSprite = resources.getSprite(sprite);
        currectSprite && rendereds.push({
            sprite: currectSprite,
            position,
            size,
            radius: 1
        });
    });
    return [rendereds, rendereds.length];
}

export default useMap;