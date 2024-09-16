import { Point } from ".";

export default interface IDrawer {
    //рисует картинку в указанной позиции. Позиция передаётся в игровых координатах. Сама картинка пока отсутствет в параметрах
    drawSprite(position: Point): void;
}