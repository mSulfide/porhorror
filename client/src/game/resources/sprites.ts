import Sprite from "./Sprite/Sprite";
import { EImage } from "./images"

export enum ESprite {
    tas = 'tas',
    // PLAYER
    player = 'player',
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
    gradeBooksToiletENV = 'gradeBooksToiletENV',
    bloodyToiletENV = 'bloodyToiletENV',
    bookShelf1ENV = 'bookShelf1ENV',
    bookShelf2ENV = 'bookShelf2ENV',
    // env npcs
    nadezhdaENV = 'nadezhdaENV',
    allaENV = 'allaENV',
    fizrukENV = 'fizrukENV',
    pascalENV = 'pascalENV',
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
    // WALLS - small
    allSidesWLL = 'allSidesWLL',
    longSidesWLL = 'longSidesWLL',
    threeSidesWLL = 'threeSidesWLL',
    longSideWLL = 'longSideWLL',
    cornerWLL = 'cornerWLL',
    // WALLS - blocks
    allSidesBlockWLL = 'allSidesColumnWLL',
    cornerBlockWLL = 'cornerColumnWLL',
    threeSidesBlockWLL = 'threeSidesColumnWLL',
    twoSidesBlockWLL = 'twoSidesBlockWLL',
    oneSideBlockWLL = 'oneSideBlockWLL',
    innerCornerWLL = 'innerCornerWLL'
}

export const getSprite = (image: EImage, offset: number[], size: number[]) => ({
    image,
    offset: { x: offset[0], y: offset[1] },
    size: { x: size[0], y: size[1] }
});

export const sprites = {
    [ESprite.tas]: getSprite(EImage.tas, [0, 0], [64, 64]),
    // CHARACTERS
    [ESprite.player]: new Sprite(EImage.players),
    // ENVIRONMENT
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
    [ESprite.gradeBooksToiletENV]: getSprite(EImage.environment, [128, 128], [32, 32]),
    [ESprite.bloodyToiletENV]: getSprite(EImage.environment, [128, 96], [32, 32]),
    [ESprite.bookShelf1ENV]: getSprite(EImage.environment, [0, 128], [64, 32]),
    [ESprite.bookShelf2ENV]: getSprite(EImage.environment, [64, 128], [64, 32]),
    // ENV - NPCs
    [ESprite.fizrukENV]: getSprite(EImage.environment, [160, 0], [32, 32]),
    [ESprite.pascalENV]: getSprite(EImage.environment, [160, 32], [32, 32]),
    [ESprite.nadezhdaENV]: getSprite(EImage.environment, [160, 64], [32, 32]),
    [ESprite.allaENV]: getSprite(EImage.environment, [160, 96], [32, 32]),
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
    // WALLS - blocks
    [ESprite.allSidesBlockWLL]: getSprite(EImage.walls, [0, 32], [32, 32]),
    [ESprite.cornerBlockWLL]: getSprite(EImage.walls, [32, 32], [32, 32]),
    [ESprite.threeSidesBlockWLL]: getSprite(EImage.walls, [0, 64], [32, 32]),
    [ESprite.twoSidesBlockWLL]: getSprite(EImage.walls, [32, 64], [32, 32]),
    [ESprite.oneSideBlockWLL]: getSprite(EImage.walls, [0, 96], [32, 32]),
    [ESprite.innerCornerWLL]: getSprite(EImage.walls, [32, 96], [32, 32]),
}