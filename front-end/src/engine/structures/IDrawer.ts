/*export default interface IDrawer {
    drawSprite(position: Point): void; // Метод для отрисовки спрайта на экране
}

// Определяем тип Point, если его ещё нет
export interface Point {
    x: number;
    y: number;
}*/


import { Point } from ".";
export default interface IDrawer {
    //рисует картинку в указанной позиции. Позиция передаётся в игровых координатах. Сама картинка пока отсутствет в параметрах
    drawSprite(position: Point): void;
}