<?php

class GMath {
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
}