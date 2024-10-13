import { TPoint } from "../..";
 

export class Obstacle {
    private static obstacleIdCounter = 0; // Генерация уникальных идентификаторов для препятствий
    public readonly id: number; // Уникальный идентификатор
    private readonly function: (x: number) => number; // Функция, задающая препятствие

    constructor(func: (x: number) => number) {
        this.id = Obstacle.obstacleIdCounter++;
        this.function = func;
    }

    // Метод для проверки пересечения с окружностью
    public doesIntersect(circle: { position: TPoint; radius: number }): boolean {
        // По логике, нужно будет пройтись по значению x и проверить условия для функции
        // Пример (при условии, что circle.position.x будет в определенном диапазоне)
        const step = 0.1; // Шаг для проверки
        for (let x = circle.position.x - circle.radius; x <= circle.position.x + circle.radius; x += step) {
            const y = this.function(x);
            const distanceSquared = (x - circle.position.x) ** 2 + (y - circle.position.y) ** 2;
            if (distanceSquared <= circle.radius ** 2) {
                return true; // Нашли пересечение
            }
        }
        return false; // Нет пересечения
    }
}

// Функция для создания препятствия
export function createObstacle(func: (x: number) => number): Obstacle {
    return new Obstacle(func);
}

// Функция для проверки всех пересечений
export function checkCollisions(circle: { position: TPoint; radius: number }, obstacles: Obstacle[]): void {
    for (const obstacle of obstacles) {
        if (obstacle.doesIntersect(circle)) {
            console.log(`Столкновение с препятствием ID: ${obstacle.id}`);
        }
    }
}