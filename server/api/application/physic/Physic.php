<?php

class TPoint {
    public $x;
    public $y;

    public function __construct($x, $y) {
        $this->x = $x;
        $this->y = $y;
    }
}

class Circle {
    public $position;
    public $radius;

    public function __construct(TPoint $position, $radius) {
        $this->position = $position;
        $this->radius = $radius;
    }
}

class Physic {
    public static function doCirclesIntersect(Circle $circle1, Circle $circle2): bool {
        $dx = $circle1->position->x - $circle2->position->x;
        $dy = $circle1->position->y - $circle2->position->y;
        $distanceSquared = $dx * $dx + $dy * $dy;
        $radiusSum = $circle1->radius + $circle2->radius;
        return $distanceSquared <= $radiusSum * $radiusSum;
    }

    // функция для определения точки пересечения кругов
    public static function getIntersectionPoint(Circle $circle1, Circle $circle2): ?TPoint {
        if (!self::doCirclesIntersect($circle1, $circle2)) {
            return null; // Круги не пересекаются
        }

        // расчет координат центра линии, соединяющей центры кругов
        $centerX = ($circle1->position->x + $circle2->position->x) / 2;
        $centerY = ($circle1->position->y + $circle2->position->y) / 2;

        // расчет расстояния между центрами кругов
        $distance = sqrt(pow($circle1->position->x - $circle2->position->x, 2) + pow($circle1->position->y - $circle2->position->y, 2));

        // расчет длины отрезка от центра первого круга до точки пересечения
        $length1 = ($circle1->radius * $circle1->radius - $circle2->radius * $circle2->radius + $distance * $distance) / (2 * $distance);

        // вычисление координат точки пересечения
        $x = $circle1->position->x + (($circle2->position->x - $circle1->position->x) / $distance) * $length1;
        $y = $circle1->position->y + (($circle2->position->y - $circle1->position->y) / $distance) * $length1;

        return new TPoint($x, $y);
    }
}


