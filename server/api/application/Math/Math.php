<?php

header('Content-Type: application/json; charset=utf-8');

//производная
function der($func, $x, $eps) {
    $fx = $func($x);
    $f_plus_eps = $func($x + $eps);
    return (($f_plus_eps - $fx) / $eps);
}

function derivative($func, $x, $eps) {
    return der($func, $x, $eps)
}
//сплайны
function spline(array $points) {
    $n = count($points);
    if ($n < 3) {
        throw new InvalidArgumentException("Необходимо минимум 3 точки для сплайна.");
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
            $y3 = $y2; //  Для последней секции используем последнюю точку
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
            'x_start' => $x1,
            'x_end' => $x2,
        ];
    }

    return $coefficients;
}