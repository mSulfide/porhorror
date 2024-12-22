<?php

class GMath {
    public static function add(Point $a, Point $b): Point {
        return new Point($a->x + $b->x, $a->y + $b->y);
    }

    public static function sub(Point $a, Point $b): Point {
        return new Point($a->x - $b->x, $a->y - $b->y);
    }

    public static function mlt(Point $a, $p): Point {
        return new Point($a->x * $p, $a->y * $p);
    }

    public static function dot(Point $a, Point $b): float {
        return $a->x * $b->x + $a->y * $b->y;
    }

    public static function smod(Point $a): float {
        return self::dot($a, $a);
    }

    public static function modl(Point $a): float {
        return sqrt(self::smod($a));
    }

    public static function norm(Point $a): Point {
        $length = self::modl($a);
        return self::mlt($a, 1 / $length);
    }

    public static function zero(): Point {
        return new Point(0, 0);
    }

    public static function one(): Point {
        return new Point(1, 1);
    }
}