<?php

require_once ('gameObject\GameObject.php');
require_once ('math\GMath.php');

class Game {
    function __construct($db) {
        $this->db = $db;
        $this->objects = [];
    }

    private function getTime($startTime) {
        return floor((microtime(true) - $startTime) * 1000);
    }

    private function update($deltaTime, $gamer) {
        foreach ($this->objects as $object) {
            if ($object->id === $gamer->objectId) {

                $axisX = $gamer->axis_x * $deltaTime; 
                $axisY = $gamer->axis_y * $deltaTime; 
    
                $object->move(new Point($axisX, $axisY));
                break;
            }
        }
    }

    public function updateScene($userId, $hash) {
        $gamer = $this->db->getGamerByUserId($userId);
        if ($gamer) {
            $gameId = $gamer->game_id;
            $game = $this->db->getGameById($gameId);
            if ($game) {
                $this->objects = $this->db->getGameObjects($game->id);
                $time = $this->getTime($game->start_time);
                $deltaTime = $time - $game->timestamp;
                if ($this->db->getSettings()->game_update_timestamp < $deltaTime) {
                    $this->update($deltaTime / 1000, $gamer);
                    $this->db->updateGameHash(md5(rand()), $game->id);
                    $this->db->updateTimestamp($game->id, $time);
                }
                if ($hash === $game->hash) {
                    return [
                        'hash' => $hash
                    ];
                }
                return [
                    'scene' => $this->objects,
                    'hash' => $game->hash
                ];
            }
        }
        return ['error' => 805];
    }
    
    public function action($userId) {
        $gamer = $this->db->getGamerByUserId($userId);
        if ($gamer) {
            $this->db->action($userId);
            return true;
        }
        return ['error'=> 810];
    }

    public function move($userId, $axisX, $axisY) {
        $gamer = $this->db->getGamerByUserId($userId);
        if ($gamer) {
            $angle = atan2($axisY, $axisX); //угол 
            // Вычисляем координаты на эллипсе
            $xEllipse = $axisX *cos($angle);
            $yEllipse = $axisY *sin($angle);

            $magnitude = sqrt($xEllipse * $xEllipse + $yEllipse * $yEllipse);
            if ($magnitude > 1) {
                $xEllipse /= $magnitude; 
                $yEllipse /= $magnitude; 
            } 
        
            $this->db->updateGamerDirection($gamer->id, $xEllipse, $yEllipse);
        
            return true;
        }
        
        return ['error' => 810];
    }
}