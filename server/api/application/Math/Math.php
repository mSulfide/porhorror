<?php

require_once 'Point.php';

class Math {
    public function add($a, $b) {
        return new Point($a->x + $b->x, $a->y + $b->y);
    }

    public function sub($a, $b) {
        return new Point($a->x - $b->x, $a->y - $b->y);
    }

    public function mlt($a, $p) {
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
        return $length !== 0 ? $this->mlt($a, 1 / $length) : new Point(0, 0);
    }

    public function zero() {
        return new Point(0, 0);
    }

    public function one() {
        return new Point(1, 1);
    }

    public function getCirclesIntersect($circleA, $circleB) {
        $distanceSquared = $this->smod($this->sub($circleA->position, $circleB->position));
        $radiusSum = $circleA->$radius + $circleB->$radius;
        return $distanceSquared <= $radiusSum * $radiusSum;
    }

    // функция для определения точки пересечения кругов
    public function getIntersectionPoint($circleA, $circleB) {
        if (!$this->getCirclesIntersect($circleA, $circleB)) {
            return null; 
        }

        $distance = $this->modl($this->sub($circleA->position, $circleB->position));

        $length = ($circleA->radius * $circleA->radius - $circleB->radius * $circleB->radius + $distance * $distance) / (2 * $distance);

        // вычисление координат точки пересечения
        $x = $circleA->position->x + (($circleB->position->x - $circleA->position->x) / $distance) * $length;
        $y = $circleA->position->y + (($circleB->position->y - $circleA->position->y) / $distance) * $length;

        return new Point($x, $y);
    }

    //функция для проверки пересечения круга и отрезка
    public function getCircleLineIntersection(Point $circleCenter, float $radius, Point $lineStart, Point $lineEnd): ?Point {
        $lineVec = $this->sub($lineEnd, $lineStart);
        $circleToLineStart = $this->sub($lineStart, $circleCenter);

        $lineLengthSquared = $this->smod($lineVec);
        
        $t = $this->dot($circleToLineStart, $lineVec) / $lineLengthSquared;// проекция центра круга на линию

        // Находим ближайшую точку на отрезке
        if ($t < 0) {
            $nearestPoint = $lineStart;
        } elseif ($t > 1) {
            $nearestPoint = $lineEnd;
        } else {
            $nearestPoint = new Point(
                $lineStart->x + $t * $lineVec->x,
                $lineStart->y + $t * $lineVec->y
            );
        }

        $nearestToCircle = $this->sub($nearestPoint, $circleCenter);

        $distanceSquared = $this->smod($nearestToCircle);

        // проверка пересечения круга и отрезка
        if ($distanceSquared > $radius * $radius) {
            return null; 
        }

        // Расчет точки пересечения
        $d = sqrt($radius * $radius - $distanceSquared);
        $intersection1 = new Point(
            $nearestPoint->x + ($d / $this->modl($lineVec)) * ($lineVec->x),
            $nearestPoint->y + ($d / $this->modl($lineVec)) * ($lineVec->y)
        );

        $intersection2 = new Point(
            $nearestPoint->x - ($d / $this->modl($lineVec)) * ($lineVec->x),
            $nearestPoint->y - ($d / $this->modl($lineVec)) * ($lineVec->y)
        );

        return $intersection1; 
    }

    // производная
    public static function derivative($func, $x, $eps) {
        $fx = $func($x);
        $f_plus_eps = $func($x + $eps);
        return (($f_plus_eps - $fx) / $eps);
    }
}
