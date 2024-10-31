import { IUpdatable, IRenderer } from "../..";
import { TPoint } from "../..";
import { add, derivative, mlt, norm } from "../../math";
import { CircleCollider, ICollider, THitInfo } from "../../structures/Physic";

class FuncCollider implements IUpdatable, ICollider, IRenderer {
    private func: (x: number) => number; // Функция для вычислений
    private width: number;
    public position: TPoint; // Позиция препятствия
    size?: TPoint | undefined;
    viewRadius: number = Infinity;

    constructor(func: (x: number) => number, position?: TPoint, width: number = 0) {
        this.func = func;
        this.width = Math.max(0, width)
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

        const range = collider.radius;
        const step = range / 500;

        let closestPoint: TPoint | null = null;
        let minDistance = Infinity;

        // Перебираем значения X в заданном диапазоне
        for (let x = pos.x - range; x <= pos.x + range; x += step) {
            const closestY = this.getValueAt(x);

            // Вычисляем квадрат расстояния между текущей точкой на графике и центром круга
            const sqrDistance = Math.pow(x - pos.x, 2) + Math.pow(closestY - pos.y, 2);

            // Проверяем, меньше ли расстояние радиуса круга
            if (sqrDistance < (collider.radius + this.width) ** 2) {
                // Если нашли новую ближайшую точку, обновляем
                if (sqrDistance < minDistance) {
                    minDistance = sqrDistance;
                    closestPoint = { x: x, y: closestY };
                }
            }
        }

        if (closestPoint)
            return {
                point: closestPoint,
                normal: mlt(this.getNormal(closestPoint.x), (this.getValueAt(closestPoint.x) < pos.y) ? 1 : -1)
            };
        else
            return null;
    }

    private getNormal(x0: number): TPoint {
        const f = (x: number) => this.getValueAt(x0) - (x - x0) / derivative((x: number) => this.getValueAt(x), x0);
        const f1 = f(x0);
        const f2 = f(x0 - 1);
        return norm((f1 > f2 ? { x: 1, y: f1 - f2 } : { x: -1, y: f2 - f1}) || { x: 0, y: 1 });
    }
}

export default FuncCollider;
