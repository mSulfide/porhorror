import { ESprite } from "../../../../game/resources";
import Tools from "./Tools/Tools";
type TPoint = { x: number, y: number };
export type TMapObject = {
    sprite: ESprite,
    position: TPoint,
    size: TPoint,
    angle: number
};

const getMap = (): TMapObject[] => {
    const map: TMapObject[] = [];
    const tools = new Tools(map);

    // точка начала, точка конца, спрайт, размер
    //tools.fill(1, 1, 8, 5, ESprite.toiletENV, 1, 1);
    //map.push({ sprite: ESprite.toiletENV, position: { x: 0, y: 0 }, size: { x: 1, y: 1 }, angle: 0});
    // ПОЛЫ
    // пол холла
    tools.fill(-3.5, -2.5, 5, 3, ESprite.linoleumPAT, 1, 1, 0);
    // пол деканата и проем
    tools.fill(-3.5, 4.5, 5, 9, ESprite.linoleumPAT, 1, 1, 0);
    map.push({ sprite: ESprite.linoleumPAT, position: { x: 0.5, y: 3.5 }, size: { x: 1, y: 1 }, angle: 0});
    // пол математики и проем
    tools.fill(6.5, 1.5, 12, 6, ESprite.linoleumPAT, 1, 1, 0);
    map.push({ sprite: ESprite.linoleumPAT, position: { x: 5.5, y: 1.5 }, size: { x: 1, y: 1 }, angle: 0});
    // пол туалета и проем
    tools.fill(6.5, -2.5, 12, 0, ESprite.slabsPAT, 1, 1, 0);
    map.push({ sprite: ESprite.linoleumPAT, position: { x: 5.5, y: -1.5 }, size: { x: 1, y: 1 }, angle: 0});
    // пол библиотеки и проем
    tools.fill(1.5, -7.5, 7, -4, ESprite.linoleumPAT, 1, 1, 0);
    map.push({ sprite: ESprite.linoleumPAT, position: { x: 2.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: 0});
    // пол печатного салона и проем
    tools.fill(-3.5, -7.5, 0, -4, ESprite.linoleumPAT, 1, 1, 0);
    map.push({ sprite: ESprite.linoleumPAT, position: { x: -1.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: 0});
    // пол склада и проем
    tools.fill(-10.5, -2.5, -5, 0, ESprite.linoleumPAT, 1, 1, 0);
    map.push({ sprite: ESprite.linoleumPAT, position: { x: -4.5, y: -1.5 }, size: { x: 1, y: 1 }, angle: 0});
    // пол паскаля и проем
    tools.fill(-10.5, 1.5, -5, 7, ESprite.linoleumPAT, 1, 1, 0);
    map.push({ sprite: ESprite.linoleumPAT, position: { x: -4.5, y: 1.5 }, size: { x: 1, y: 1 }, angle: 0});

    // СТЕНЫ
    // ряды стен
    tools.fill(-3.5, 9.5, 5, 10, ESprite.oneSideBlockWLL, 1, 1, 90);
    tools.fill(5.5, 6.5, 6, 9, ESprite.oneSideBlockWLL, 1, 1);
    tools.fill(5.5, 4.5, 6, 6, ESprite.twoSidesBlockWLL, 1, 1, 90);
    tools.fill(2.5, 3.5, 5, 4, ESprite.twoSidesBlockWLL, 1, 1);
    tools.fill(-3.5, 3.5, -1, 4, ESprite.twoSidesBlockWLL, 1, 1);
    tools.fill(-4.5, 4.5, -4, 7, ESprite.twoSidesBlockWLL, 1, 1, 90);
    tools.fill(-4.5, 7.5, -4, 9, ESprite.oneSideBlockWLL, 1, 1, 180);
    tools.fill(-10.5, 7.5, -5, 8, ESprite.oneSideBlockWLL, 1, 1, 90);
    tools.fill(-11.5, 1.5, -11, 7, ESprite.oneSideBlockWLL, 1, 1, 180);
    tools.fill(-10.5, 0.5, -5, 1, ESprite.twoSidesBlockWLL, 1, 1);
    tools.fill(-11.5, -2.5, -11, 0, ESprite.oneSideBlockWLL, 1, 1);
    tools.fill(-10.5, -3.5, -5, -3, ESprite.oneSideBlockWLL, 1, 1, -90);
    tools.fill(-4.5, -7.5, -4, -4, ESprite.oneSideBlockWLL, 1, 1, -180);
    tools.fill(-3.5, -8.5, 0, -8, ESprite.oneSideBlockWLL, 1, 1, -90);
    tools.fill(0.5, -7.5, 1, -4, ESprite.twoSidesBlockWLL, 1, 1, 90);
    tools.fill(1.5, -8.5, 7, -8, ESprite.oneSideBlockWLL, 1, 1, -90);
    tools.fill(7.5, -7.5, 8, -4, ESprite.oneSideBlockWLL, 1, 1);
    tools.fill(7.5, -3.5, 12, -3, ESprite.oneSideBlockWLL, 1, 1, -90);
    tools.fill(12.5, -2.5, 13, 0, ESprite.oneSideBlockWLL, 1, 1);
    tools.fill(6.5, 0.5, 12, 1, ESprite.twoSidesBlockWLL, 1, 1);
    tools.fill(12.5, 1.5, 13, 6, ESprite.oneSideBlockWLL, 1, 1);
    tools.fill(6.5, 6.5, 12, 7, ESprite.oneSideBlockWLL, 1, 1, 90);
    // колонны
    map.push({ sprite: ESprite.allSidesBlockWLL, position: { x: -1.5, y: 0.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.allSidesBlockWLL, position: { x: -1.5, y: -1.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.allSidesBlockWLL, position: { x: 2.5, y: -1.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.allSidesBlockWLL, position: { x: 2.5, y: 0.5 }, size: { x: 1, y: 1 }, angle: 0});
    // тройники
    map.push({ sprite: ESprite.threeSidesBlockWLL, position: { x: -2.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: -90});
    map.push({ sprite: ESprite.threeSidesBlockWLL, position: { x: -4.5, y: -2.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.threeSidesBlockWLL, position: { x: -0.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: 90});
    map.push({ sprite: ESprite.threeSidesBlockWLL, position: { x: 1.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: -90});
    map.push({ sprite: ESprite.threeSidesBlockWLL, position: { x: 3.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: 90});
    map.push({ sprite: ESprite.threeSidesBlockWLL, position: { x: 5.5, y: -2.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.threeSidesBlockWLL, position: { x: 5.5, y: -0.5 }, size: { x: 1, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.threeSidesBlockWLL, position: { x: -0.5, y: 3.5 }, size: { x: 1, y: 1 }, angle: -90});
    map.push({ sprite: ESprite.threeSidesBlockWLL, position: { x: 1.5, y: 3.5 }, size: { x: 1, y: 1 }, angle: 90});
    map.push({ sprite: ESprite.threeSidesBlockWLL, position: { x: 5.5, y: 2.5 }, size: { x: 1, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.threeSidesBlockWLL, position: { x: -4.5, y: -0.5 }, size: { x: 1, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.threeSidesBlockWLL, position: { x: -4.5, y: 2.5 }, size: { x: 1, y: 1 }, angle: 180});
    // внешние углы
    map.push({ sprite: ESprite.cornerBlockWLL, position: { x: -4.5, y: 0.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.cornerBlockWLL, position: { x: 5.5, y: 0.5 }, size: { x: 1, y: 1 }, angle: 90});
    // односторонки
    map.push({ sprite: ESprite.oneSideBlockWLL, position: { x: 5.5, y: 3.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.oneSideBlockWLL, position: { x: 0.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: -90});
    map.push({ sprite: ESprite.oneSideBlockWLL, position: { x: -4.5, y: 3.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.oneSideBlockWLL, position: { x: 5.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: 90});
    // двусторонки
    map.push({ sprite: ESprite.twoSidesBlockWLL, position: { x: -3.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.twoSidesBlockWLL, position: { x: 4.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.twoSidesBlockWLL, position: { x: 6.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: 0});
    // тонкие стены
    map.push({ sprite: ESprite.longSidesWLL, position: { x: 8.5, y: -2.5 }, size: { x: 0.25, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.threeSidesWLL, position: { x: 8.5, y: -1.5 }, size: { x: 0.25, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.longSidesWLL, position: { x: 10.5, y: -2.5 }, size: { x: 0.25, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.threeSidesWLL, position: { x: 10.5, y: -1.5 }, size: { x: 0.25, y: 1 }, angle: 0});
    // внутренние углы (обязательно поверх других стен)
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: -4.5, y: -8.5 }, size: { x: 1, y: 1 }, angle: -90});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: -4.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: -4.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: -90});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: -4.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: -11.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: -90});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: -11.5, y: 0.5 }, size: { x: 1, y: 1 }, angle: -90});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: -11.5, y: 0.5 }, size: { x: 1, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: -11.5, y: 7.5 }, size: { x: 1, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: -4.5, y: 7.5 }, size: { x: 1, y: 1 }, angle: 90});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: -4.5, y: 9.5 }, size: { x: 1, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: 5.5, y: 9.5 }, size: { x: 1, y: 1 }, angle: 90});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: 5.5, y: 6.5 }, size: { x: 1, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: 12.5, y: 6.5 }, size: { x: 1, y: 1 }, angle: 90});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: 12.5, y: 0.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: 12.5, y: 0.5 }, size: { x: 1, y: 1 }, angle: 90});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: 12.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: 7.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: 90});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: 7.5, y: -8.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: 0.5, y: -8.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: 0.5, y: -8.5 }, size: { x: 1, y: 1 }, angle: -90});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: 0.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: 90});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: 0.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: 5.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: 5.5, y: -3.5 }, size: { x: 1, y: 1 }, angle: -90});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: 5.5, y: 0.5 }, size: { x: 1, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: 5.5, y: 3.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.innerCornerWLL, position: { x: 5.5, y: 3.5 }, size: { x: 1, y: 1 }, angle: 90});
    // СТАТИЧЕСКИЕ ОБЪЕКТЫ
    // паскаль
    map.push({ sprite: ESprite.tableLeftENV, position: { x: -10, y: 5.5 }, size: { x: 2, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.tableBothENV, position: { x: -9, y: 4.5 }, size: { x: 2, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.tableBothENV, position: { x: -9, y: 2.5 }, size: { x: 2, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.tableBothENV, position: { x: -6, y: 4.5 }, size: { x: 2, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.tableBothENV, position: { x: -6, y: 2.5 }, size: { x: 2, y: 1 }, angle: 0});
    // склад
    map.push({ sprite: ESprite.tableEmptyENV, position: { x: -6.5, y: -1 }, size: { x: 2, y: 1 }, angle: 90});
    map.push({ sprite: ESprite.tableEmptyENV, position: { x: -8.5, y: -2 }, size: { x: 2, y: 1 }, angle: 90});
    map.push({ sprite: ESprite.tableEmptyENV, position: { x: -10.5, y: -1 }, size: { x: 2, y: 1 }, angle: 90});
    map.push({ sprite: ESprite.blackCoffieMachineENV, position: { x: -10.5, y: -0.5 }, size: { x: 1, y: 1 }, angle: 90});
    // печатный салон
    map.push({ sprite: ESprite.tableEmptyENV, position: { x: -3, y: -6.5 }, size: { x: 2, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.tableEmptyENV, position: { x: -0.5, y: -6 }, size: { x: 2, y: 1 }, angle: 90});
    map.push({ sprite: ESprite.xeroxENV, position: { x: -0.5, y: -6.5 }, size: { x: 1, y: 1 }, angle: -90});
    map.push({ sprite: ESprite.printerENV, position: { x: -2.5, y: -6.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.printerENV, position: { x: -3.5, y: -6.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.bookShelf2ENV, position: { x: -3.5, y: -5 }, size: { x: 2, y: 1 }, angle: 90});
    // библиотека
    map.push({ sprite: ESprite.bookShelf1ENV, position: { x: 6.5, y: -7 }, size: { x: 2, y: 1 }, angle: -90});
    map.push({ sprite: ESprite.bookShelf1ENV, position: { x: 4.5, y: -6 }, size: { x: 2, y: 1 }, angle: 90});
    map.push({ sprite: ESprite.bookShelf1ENV, position: { x: 2.5, y: -7 }, size: { x: 2, y: 1 }, angle: 90});
    // туалет
    map.push({ sprite: ESprite.toiletENV, position: { x: 7.5, y: -2.5 }, size: { x: 1, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.gradeBooksToiletENV, position: { x: 9.5, y: -2.5 }, size: { x: 1, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.bloodyToiletENV, position: { x: 11.5, y: -2.5 }, size: { x: 1, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.trashCanENV, position: { x: 6.5, y: -0.5 }, size: { x: 1, y: 1 }, angle: 0});
    // математика
    map.push({ sprite: ESprite.tableEmptyENV, position: { x: 7, y: 2.5 }, size: { x: 2, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.tableEmptyENV, position: { x: 7, y: 4.5 }, size: { x: 2, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.tableEmptyENV, position: { x: 10, y: 2.5 }, size: { x: 2, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.tableEmptyENV, position: { x: 10, y: 4.5 }, size: { x: 2, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.cookiesENV, position: { x: 6.5, y: 2.5 }, size: { x: 1, y: 1 }, angle: 0});
    // деканат
    map.push({ sprite: ESprite.tableEmptyENV, position: { x: -1, y: 4.5 }, size: { x: 2, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.tableEmptyENV, position: { x: 0, y: 6.5 }, size: { x: 2, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.tableLeftENV, position: { x: 0, y: 7.5 }, size: { x: 2, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.tableEmptyENV, position: { x: 1.5, y: 7 }, size: { x: 2, y: 1 }, angle: 90});
    map.push({ sprite: ESprite.bookShelf2ENV, position: { x: 4, y: 8.5 }, size: { x: 2, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.wardrobeENV, position: { x: -3.5, y: 8.5 }, size: { x: 1, y: 1 }, angle: 0});
    map.push({ sprite: ESprite.wardrobeENV, position: { x: -2.5, y: 8.5 }, size: { x: 1, y: 1 }, angle: 0});
    // нпс
    map.push({ sprite: ESprite.nadezhdaENV, position: { x: 0.5, y: 8.5 }, size: { x: 1, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.fizrukENV, position: { x: -5.5, y: -0.5 }, size: { x: 1, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.allaENV, position: { x: 9.5, y: 5.5 }, size: { x: 1, y: 1 }, angle: 180});
    map.push({ sprite: ESprite.pascalENV, position: { x: -9.5, y: 6.5 }, size: { x: 1, y: 1 }, angle: 180});
    return map;
};

export default getMap;