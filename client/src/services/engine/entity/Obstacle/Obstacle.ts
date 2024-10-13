import { IGameObject } from "../.."; 
import { TPoint } from "../..";

class Obstacle implements IGameObject {
    private readonly func: (x: number) => number;
    public readonly position: TPoint; // Позиция препятствия

    constructor(func: (x: number) => number, position: TPoint) {
        this.func = func; // Записываем функцию в контекст
        this.position = position; // Указываем позицию
    }

    public update(): void {
      
    }

    // Метод для получения значения функции с учетом позиции
    public getValueAt(x: number): number {
        return this.func(x - this.position.x) + this.position.y; // Применяем функцию по X, смещая ее на позицию
    }
}

export default Obstacle;