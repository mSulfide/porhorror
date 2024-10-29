<?php

require_once 'Circle.php';
require_once 'Point.php';

class Math {
    public static function getCirclesIntersect(Circle $circle1, Circle $circle2): bool {
        $dx = $circle1->position->x - $circle2->position->x;
        $dy = $circle1->position->y - $circle2->position->y;
        $distanceSquared = $dx * $dx + $dy * $dy;
        $radiusSum = $circle1->radius + $circle2->radius;
        return $distanceSquared <= $radiusSum * $radiusSum;
    }

    // функция для определения точки пересечения кругов
    public static function getIntersectionPoint(Circle $circle1, Circle $circle2): ?Point {
        if (!self::getCirclesIntersect($circle1, $circle2)) {
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

    // сплайны
    public static function spline(array $points) {
        $n = count($points);
        if ($n < 3) {
            return ['error' => 303];
        }

        $coefficients = [];
        for ($i = 0; $i < $n - 1; $i++) {
            $x1 = $points[$i]['x'];
            $y1 = $points[$i]['y'];
            $x2 = $points[$i + 1]['x'];
            $y2 = $points[$i + 1]['y'];

            if ($i < $n - 2) {
                $x3 = $points[$i + 2]['x'];
                $y3 = $points[$i + 2]['y'];
            } else {
                $x3 = $x2;
                $y3 = $y2; // Для последней секции используем последнюю точку
            }

            $h1 = $x2 - $x1;
            $h2 = $x3 - $x2;

            $a1 = ($y2 - $y1) / $h1;
            $a2 = ($y3 - $y2) / $h2;

            $b1 = 3 * (($y2 - $y1) / ($h1 * $h1)) - 2 * (($y3 - $y1) / ($h1 * $h2)) + (($y3 - $y2) / ($h2 * $h2));
            $b2 = 3 * (($y3 - $y2) / ($h2 * $h2)) - 2 * (($y3 - $y1) / ($h1 * $h2)) + (($y2 - $y1) / ($h1 * $h1));

            $c1 = (($y3 - $y1) / ($h1 * $h2)) - (($y2 - $y1) / ($h1 * $h1)) - $b1 * $h1 / 3;
            $c2 = (($y2 - $y1) / ($h1 * $h2)) - (($y3 - $y2) / ($h2 * $h2)) - $b2 * $h2 / 3;

            $coefficients[] = [
                'a' => $a1,
                'b' => $b1,
                'c' => $c1,
                'd' => $y1,
            ];
        }

        return $coefficients;
    }
}

?>