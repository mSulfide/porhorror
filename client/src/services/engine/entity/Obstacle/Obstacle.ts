import { IGameObject } from "../..";
import { TPoint } from "../..";
import { add, derivative, norm, sub } from "../../math";
import { CircleCollider, ICollider, THitInfo } from "../../structures/Physic";

class Obstacle implements IGameObject, ICollider {
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

    collide(collider: CircleCollider, offset: TPoint): THitInfo | null {
        const pos: TPoint = add(collider.position, offset);

        const step = 0.05; // Шаг для перебора по оси X
        const range = 1; // Диапазон для проверки (можно настроить в зависимости от ожидаемого размера графика)

        let closestPoint: TPoint | null = null;
        let minDistance = Infinity;

        // Перебираем значения X в заданном диапазоне
        for (let x = pos.x - range; x <= pos.x + range; x += step) {
            const closestY = this.getValueAt(x);

            // Вычисляем расстояние между текущей точкой на графике и центром круга
            const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(closestY - pos.y, 2));

            // Проверяем, меньше ли расстояние радиуса круга
            if (distance < collider.radius) {
                // Если нашли новую ближайшую точку, обновляем
                if (distance < minDistance) {
                    minDistance = distance;
                    closestPoint = { x: x, y: closestY };
                }
            }
        }

        if (closestPoint)
            return { point: closestPoint, normal: this.getNormal(closestPoint.x) };
        else
            return null;
    }

    private getNormal(x0: number): TPoint {
        const f = (x: number) => this.getValueAt(x0) - 1 / derivative((x: number) => this.getValueAt(x), x0) * (x - x0);
        return norm(sub({ x: x0, y: f(x0) }, { x: x0 - 1, y: f(x0 - 1) }));
    }
}

export default Obstacle;
