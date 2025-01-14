import { EImage } from "./images"

export enum ESprite {
    tas = 'tas',
    // ENVIRONMENT
    wardrobeENV = 'wardrobeENV',
    tableRightENV = 'tableRightENV',
    tableLeftENV = 'tableLeftENV',
    tableBothENV = 'tableBothENV',
    tableEmptyENV = 'tableEmptyENV',
    wateringCanENV = 'wateringCanENV',
    cookiesENV = 'cookiesENV',
    xeroxENV = 'xeroxENV',
    printerENV = 'printerENV',
    blackCoffieMachineENV = 'blackCoffieMachineENV',
    redCoffieMachineENV = 'redCoffieMachineENV',
    trashCanENV = 'trashCanENV',
    potPlantENV = 'potPlantENV',
    dryPotPlantENV = 'dryPotPlantENV',
    toiletENV = 'toiletENV',
    // ITEMS
    cookieITM = 'cookieITM',
    horizPhotoITM = 'horizPhotoITM',
    verticPhotoITM = 'verticPhotoITM',
    coffeeITM = 'coffeeITM',
    wateringCanITM = 'wateringCanITM',
    paperITM = 'paperITM',
    gradeBookITM = 'gradeBookITM',
    // PATTERNS
    linoleumPAT = 'linoleumPAT',
    slabsPAT = 'slabsPAT',
    // WALLS - walls
    allSidesWLL = 'allSidesWLL',
    longSidesWLL = 'longSidesWLL',
    threeSidesWLL = 'threeSidesWLL',
    longSideWLL = 'longSideWLL',
    cornerWLL = 'cornerWLL',
    // WALLS - columns
    allSidesColumnWLL = 'allSidesColumnWLL',
    cornerColumnWLL = 'cornerColumnWLL',
    threeSidesColumnWLL = 'threeSidesColumnWLL'

}

export const getSprite = (image: EImage, offset: number[], size: number[]) => ({
    image,
    offset: { x: offset[0], y: offset[1] },
    size: { x: size[0], y: size[1] }
});

export const sprites = {
    // ENVIRONMENT
    [ESprite.tas]: getSprite(EImage.tas, [0, 0], [32, 32]),
    [ESprite.wardrobeENV]: getSprite(EImage.environment, [0, 0], [32, 32]),
    [ESprite.tableRightENV]: getSprite(EImage.environment, [32, 0], [64, 32]),
    [ESprite.tableLeftENV]: getSprite(EImage.environment, [96, 0], [64, 32]),
    [ESprite.tableBothENV]: getSprite(EImage.environment, [32, 32], [64, 32]),
    [ESprite.tableEmptyENV]: getSprite(EImage.environment, [96, 32], [64, 32]),
    [ESprite.wateringCanENV]: getSprite(EImage.environment, [0, 32], [32, 32]),
    [ESprite.cookiesENV]: getSprite(EImage.environment, [0, 64], [32, 32]),
    [ESprite.xeroxENV]: getSprite(EImage.environment, [32, 64], [32, 32]),
    [ESprite.printerENV]: getSprite(EImage.environment, [64, 64], [32, 32]),
    [ESprite.blackCoffieMachineENV]: getSprite(EImage.environment, [96, 64], [32, 32]),
    [ESprite.redCoffieMachineENV]: getSprite(EImage.environment, [128, 64], [32, 32]),
    [ESprite.trashCanENV]: getSprite(EImage.environment, [0, 96], [32, 32]),
    [ESprite.potPlantENV]: getSprite(EImage.environment, [32, 96], [32, 32]),
    [ESprite.dryPotPlantENV]: getSprite(EImage.environment, [64, 96], [32, 32]),
    [ESprite.toiletENV]: getSprite(EImage.environment, [96, 96], [32, 32]),
    // ITEMS
    [ESprite.horizPhotoITM]: getSprite(EImage.items, [0, 0], [16, 16]),
    [ESprite.verticPhotoITM]: getSprite(EImage.items, [16, 0], [16, 16]),
    [ESprite.coffeeITM]: getSprite(EImage.items, [32, 0], [16, 16]),
    [ESprite.wateringCanITM]: getSprite(EImage.items, [48, 0], [16, 16]),
    [ESprite.paperITM]: getSprite(EImage.items, [64, 0], [16, 16]),
    [ESprite.cookieITM]: getSprite(EImage.items, [0, 16], [16, 16]),
    [ESprite.gradeBookITM]: getSprite(EImage.items, [16, 16], [16, 16]),
    // PATTERNS
    [ESprite.linoleumPAT]: getSprite(EImage.patterns, [0, 0], [32, 32]),
    [ESprite.slabsPAT]: getSprite(EImage.patterns, [32, 0], [32, 32]),
    // WALLS - walls
    [ESprite.allSidesWLL]: getSprite(EImage.walls, [0, 0], [8, 32]),
    [ESprite.longSidesWLL]: getSprite(EImage.walls, [8, 0], [8, 32]),
    [ESprite.threeSidesWLL]: getSprite(EImage.walls, [16, 0], [8, 32]),
    [ESprite.longSideWLL]: getSprite(EImage.walls, [24, 0], [8, 32]),
    [ESprite.cornerWLL]: getSprite(EImage.walls, [32, 0], [8, 32]),
    // WALLS - columns
    [ESprite.allSidesColumnWLL]: getSprite(EImage.walls, [0, 0], [32, 32]),
    [ESprite.cornerColumnWLL]: getSprite(EImage.walls, [32, 32], [32, 32]),
    [ESprite.threeSidesColumnWLL]: getSprite(EImage.walls, [0, 64], [32, 32]),
}