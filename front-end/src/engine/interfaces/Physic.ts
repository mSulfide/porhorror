import { TPoint } from "../types";
import { TDrawRequest } from "../types";

/*export default interface IInput {
    cursorPosition: TPoint; //The current cursor position in pixel coordinates

    getAxisX(): number; //Returns the value of the virtual X axis ∈ [-1; 1]

    getAxisY(): number; //Returns the value of the virtual Y axis ∈ [-1; 1]

    getActionButton(): boolean; //Returns true while the user holds down the button

    // Добавляем функции для проверки пересечения
    checkCircleIntersection(circle1: { center: TPoint; radius: number }, circle2: { center: TPoint; radius: number }): boolean;
    checkCircleLineSegmentIntersection(circle: { center: TPoint; radius: number }, lineSegment: { start: TPoint; end: TPoint }): boolean;
}

// Реализуем интерфейс IInput
export class Input implements IInput {
  cursorPosition: TPoint = { x: 0, y: 0 };
  physic = new Physic();

  getAxisX(): number {
    // Реализуйте логику для получения значения оси X
    return 0; 
  }

  getAxisY(): number {
    // Реализуйте логику для получения значения оси Y
    return 0; 
  }

  getActionButton(): boolean {
    // Реализуйте логику для получения состояния кнопки
    return false;
  }

  // Реализуем функции для проверки пересечения
  checkCircleIntersection(circle1: { center: TPoint; radius: number }, circle2: { center: TPoint; radius: number }): boolean {
    return this.physic.checkCircleIntersection(circle1, circle2);
  }

  checkCircleLineSegmentIntersection(circle: { center: TPoint; radius: number }, lineSegment: { start: TPoint; end: TPoint }): boolean {
    return this.physic.checkCircleLineSegmentIntersection(circle, lineSegment);
  }
} */

export module Physic {
    // Проверка на пересечение двух кругов
    export function doCirclesIntersect(circle1: TDrawRequest, circle2: TDrawRequest): boolean {
        const dx = circle1.position.x - circle2.position.x;
        const dy = circle1.position.y - circle2.position.y;
        const distanceSquared = dx * dx + dy * dy;
        const radiusSum = circle1.radius + circle2.radius;
        return distanceSquared <= radiusSum * radiusSum;
    }

    // Проверка на пересечение круга и отрезка
    export function doesCircleIntersectSegment(circle: TDrawRequest, pointA: TPoint, pointB: TPoint): boolean {
        // Вектор от одной точки отрезка к другой
        const segmentVector = { x: pointB.x - pointA.x, y: pointB.y - pointA.y };
        const circleVector = { x: circle.position.x - pointA.x, y: circle.position.y - pointA.y };

        const segmentLengthSquared = segmentVector.x * segmentVector.x + segmentVector.y * segmentVector.y;
        if (segmentLengthSquared === 0) {
            // Если отрезок сведен к одной точке
            return doCirclesIntersect(circle, { position: pointA, radius: 0 });
        }

        // Проекция круга на отрезок
        const t = Math.max(0, Math.min(1, (circleVector.x * segmentVector.x + circleVector.y * segmentVector.y) / segmentLengthSquared));
        const closestPoint = {
            x: pointA.x + t * segmentVector.x,
            y: pointA.y + t * segmentVector.y
        };

        // Проверим расстояние от круга до ближайшей точки отрезка
        const dx = circle.position.x - closestPoint.x;
        const dy = circle.position.y - closestPoint.y;
        const distanceSquared = dx * dx + dy * dy;

        return distanceSquared <= circle.radius * circle.radius;
    }
}
