<?php

require_once 'Circle.php';
require_once 'Point.php';

class Math {
    public function add($a, $b) {
        return new Point($a->x + $b->x, $a->y + $b->y);
    }

    public function sub($a, $b) {
        return new Point($a->x - $b->x, $a->y - $b->y);
    }

    public function mlt(Point $a, float $p) {
        return new Point($a->x * $p, $a->y * $p);
    }

    public function dot($a, $b) {
        return $a->x * $b->x + $a->y * $b->y;
    }

    public function smod($a) {
        return $this->dot($a, $a);
    }

    public function modl($a) {
        return sqrt($this->smod($a));
    }

    public function norm($a) {
        $length = $this->modl($a);
        return $length != 0 ? $this->mlt($a, 1 / $length) : new Point(0, 0);
    }

    public function zero() {
        return new Point(0, 0);
    }

    public function one() {
        return new Point(1, 1);
    }

    public function getCirclesIntersect($circle1, $circle2): bool {
        $dx = $circle1->position->x - $circle2->position->x;
        $dy = $circle1->position->y - $circle2->position->y;
        $distanceSquared = $dx * $dx + $dy * $dy;
        $radiusSum = $circle1->radius + $circle2->radius;
        return $distanceSquared <= $radiusSum * $radiusSum;
    }

    public function check() {
        $answer = $this->mlt(new Point(1, 1), 5);

        return ['answer' => $answer];
    }

    // функция для определения точки пересечения кругов
    public function getIntersectionPoint($circle1, $circle2) {
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
    public function derivative($func, $x, $eps) {
        $fx = $func($x);
        $f_plus_eps = $func($x + $eps);
        return (($f_plus_eps - $fx) / $eps);
    }

    public function getAngle($point) {
        $angle = atan2($point->y, $point->x);
        return $angle;
    }
}
