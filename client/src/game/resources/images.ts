import tas from "../../assets/img/tas.png";
import environment from "../../assets/img/alpha/environment.png"
import items from "../../assets/img/alpha/items.png"
import patterns from "../../assets/img/alpha/patterns.png"
import walls from "../../assets/img/alpha/walls.png"

export enum EImage {
    tas = 'tas',
    environment = 'environment',
    items = 'items',
    patterns = 'patterns',
    walls = 'walls'
}

export const srcs = {
    [EImage.tas]: tas,
    [EImage.environment]: environment,
    [EImage.items]: environment,
    [EImage.patterns]: environment,
    [EImage.walls]: environment
}