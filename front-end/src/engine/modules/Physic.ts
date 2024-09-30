import { TPoint, TCircle } from "../types";

export module Physic {
    // Проверка на пересечение двух кругов
    export function doCirclesIntersect(circle1: TCircle, circle2: TCircle): boolean {
        const dx = circle1.position.x - circle2.position.x;
        const dy = circle1.position.y - circle2.position.y;
        const distanceSquared = dx * dx + dy * dy;
        const radiusSum = circle1.radius + circle2.radius;
        return distanceSquared <= radiusSum * radiusSum;
    }

    // Проверка на пересечение круга и отрезка
    export function doesCircleIntersectSegment(circle: TCircle, pointA: TPoint, pointB: TPoint): boolean {
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
