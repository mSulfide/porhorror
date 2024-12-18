<?php

class GameObject {
    function __construct($params) {
        $this->position = new Point($params->posX, $params->posY);
        $this->velocity = new Point($params->velX, $params->velY);
        $this->game_id = $params->game_id;
        $this->radius = $params->radius;
        $this->angle = $params->angle;
    }
}