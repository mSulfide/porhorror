<?php

require_once 'Circle.php';
require_once 'Point.php';

class Math {
    public function add(Point $a, Point $b): Point {
        return new Point($a->x + $b->x, $a->y + $b->y);
    }

    public function sub(Point $a, Point $b): Point {
        return new Point($a->x - $b->x, $a->y - $b->y);
    }

    public function mlt(Point $a, float $p): Point {
        return new Point($a->x * $p, $a->y * $p);
    }

    public function dot(Point $a, Point $b): float {
        return $a->x * $b->x + $a->y * $b->y;
    }

    public function smod(Point $a): float {
        return $this->dot($a, $a);
    }

    public function modl(Point $a): float {
        return sqrt($this->smod($a));
    }

    public function norm(Point $a): Point {
        $length = $this->modl($a);
        return $length !== 0 ? $this->mlt($a, 1 / $length) : new Point(0, 0);
    }

    public function zero(): Point {
        return new Point(0, 0);
    }

    public function one(): Point {
        return new Point(1, 1);
    }

    public function getCirclesIntersect(Circle $circle1, Circle $circle2): bool {
        $dx = $circle1->position->x - $circle2->position->x;
        $dy = $circle1->position->y - $circle2->position->y;
        $distanceSquared = $dx * $dx + $dy * $dy;
        $radiusSum = $circle1->radius + $circle2->radius;
        return $distanceSquared <= $radiusSum * $radiusSum;
    }

    // функция для определения точки пересечения кругов
    public function getIntersectionPoint(Circle $circle1, Circle $circle2): ?Point {
        if (!$this->getCirclesIntersect($circle1, $circle2)) {
            return null; 
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

        return new Point($x, $y);
    }

    // производная
    public static function derivative($func, $x, $eps) {
        $fx = $func($x);
        $f_plus_eps = $func($x + $eps);
        return (($f_plus_eps - $fx) / $eps);
    }
}
