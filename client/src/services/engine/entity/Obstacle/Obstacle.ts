import { IGameObject } from "../..";
import { TPoint } from "../..";

class Obstacle implements IGameObject {
    private func: (x: number) => number; // Функция для вычислений
    public position: TPoint; // Позиция препятствия

    constructor(func: (x: number) => number, position?: TPoint) {
        this.func = func; 
        this.position = position || { x: 0, y: 0 };
    }

    public update(): void {
        
    }

    // Метод для получения значения функции с учетом позиции
    public getValueAt(x: number): number {
        return this.func(x - this.position.x) + this.position.y; // Применяем функцию по X, смещая ее на позицию
    }

    public collideFunc(circleCenter: TPoint, circleRadius: number): TPoint | null {
        const step = 0.01; // Шаг для перебора по оси X
        const range = 100; // Диапазон для проверки (можно настроить в зависимости от ожидаемого размера графика)

        let closestPoint: TPoint | null = null;
        let minDistance = Infinity;

        // Перебираем значения X в заданном диапазоне
        for (let x = circleCenter.x - range; x <= circleCenter.x + range; x += step) {
            const closestY = this.getValueAt(x);

            // Вычисляем расстояние между текущей точкой на графике и центром круга
            const distance = Math.sqrt(Math.pow(x - circleCenter.x, 2) + Math.pow(closestY - circleCenter.y, 2));

            // Проверяем, меньше ли расстояние радиуса круга
            if (distance < circleRadius) {
                // Если нашли новую ближайшую точку, обновляем
                if (distance < minDistance) {
                    minDistance = distance;
                    closestPoint = { x: x, y: closestY };
                }
            }
        }

        return closestPoint; // Возвращаем ближайшую точку или null, если не нашли
    }

}

export default Obstacle;
