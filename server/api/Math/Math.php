<?php

header('Content-Type: application/json; charset=utf-8');

//производная
function der($func, $x, $eps) {
    $fx = $func($x);
    $f_plus_eps = $func($x + $eps);
    return (($f_plus_eps - $fx) / $eps);
}

function derivative($func, $x, $eps) {
    return array (
        'result' => 'ok',
        'data' => der($func, $x, $eps)
    );
}
//сплайны
function spline($x1, $y1, $x2, $y2, $x3, $y3) {
    $h1 = $x2 - $x1;
    $h2 = $x3 - $x2;
    
    $a1 = ($y2 - $y1) / $h1;
    $a2 = ($y3 - $y2) / $h2;
    
    $b1 = 3 * (($y2 - $y1) / ($h1 * $h1)) - 2 * (($y3 - $y1) / ($h1 * $h2)) + (($y3 - $y2) / ($h2 * $h2));
    $b2 = 3 * (($y3 - $y2) / ($h2 * $h2)) - 2 * (($y3 - $y1) / ($h1 * $h2)) + (($y2 - $y1) / ($h1 * $h1));
    
    $c1 = (($y3 - $y1) / ($h1 * $h2)) - (($y2 - $y1) / ($h1 * $h1)) - $b1 * $h1 / 3;
    $c2 = (($y2 - $y1) / ($h1 * $h2)) - (($y3 - $y2) / ($h2 * $h2)) - $b2 * $h2 / 3;
    
    $splinePoints = [];
    $x = $x1;
    while ($x <= $x3) {
        if ($x <= $x2) {
            $y = $y1 + $a1 * ($x - $x1) + $b1 * pow($x - $x1, 2) / 2 + $c1 * pow($x - $x1, 3) / 6;
        } else {
            $y = $y2 + $a2 * ($x - $x2) + $b2 * pow($x - $x2, 2) / 2 + $c2 * pow($x - $x2, 3) / 6;
        }
        $splinePoints[] = ['x' => $x, 'y' => $y];
        $x += 0.01; //шаг для отрисовки графика
    }
return $splinePoints
        
}