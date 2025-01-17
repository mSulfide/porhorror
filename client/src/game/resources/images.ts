import tas from "../../assets/img/tas.png";
import players from "../../assets/img/alpha/players.png";
import environment from "../../assets/img/alpha/environment.png";
import items from "../../assets/img/alpha/items.png";
import patterns from "../../assets/img/alpha/patterns.png";
import walls from "../../assets/img/alpha/walls.png";

export enum EImage {
    tas = 'tas',
    players = 'players',
    environment = 'environment',
    items = 'items',
    patterns = 'patterns',
    walls = 'walls'
}

export const srcs = {
    [EImage.tas]: tas,
    [EImage.players]: players,
    [EImage.environment]: environment,
    [EImage.items]: items,
    [EImage.patterns]: patterns,
    [EImage.walls]: walls
}