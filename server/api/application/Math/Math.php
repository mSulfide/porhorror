<?php

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

    public function getCirclesIntersect(Point $position1, Point $position2): bool {
        $dx = $position1->x - $position2->x;
        $dy = $position1->y - $position2->y;
        $distanceSquared = $dx * $dx + $dy * $dy;
        $radiusSum = $radius1 + $radius2;
        return $distanceSquared <= $radiusSum * $radiusSum;
    }

    // функция для определения точки пересечения кругов
    public function getIntersectionPoint(Point $position1, float $radius1, Point $position2, float $radius2): ?Point {
        if (!$this->getCirclesIntersect($position1, $radius1, $position2, $radius2)) {
            return null; 
        }

        $centerX = ($position1->x + $position2->x) / 2;
        $centerY = ($position1->y + $position2->y) / 2;

        $distance = sqrt(pow($position1->x - $position2->x, 2) + pow($position1->y - $position2->y, 2));

        $length1 = ($radius1 * $radius1 - $radius2 * $radius2 + $distance * $distance) / (2 * $distance);

        // вычисление координат точки пересечения
        $x = $position1->x + (($position2->x - $position1->x) / $distance) * $length1;
        $y = $position1->y + (($position2->y - $position1->y) / $distance) * $length1;

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
