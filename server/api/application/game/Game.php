<?php

require_once ('gameObject\GameObject.php');
require_once ('gamer\Gamer.php');

class Game {
    private $db;
    private $objects = [], $gamers = [];
    private float $deltaTime = 0;

    function __construct($db) {
        $this->db = $db;
    }

    private function getTime($startTime) {
        return floor((microtime(true) - $startTime) * 1000);
    }

    public function update($deltaTime) {
        foreach ($this->gamers as $gamer) {
            $gamer->update($deltaTime, $this->objects);
        }
    }

    public function updateScene($userId, $hash) {
        $game = $this->db->getGameById($this->db->getGamerByUserId($userId)->game_id);
        if ($game) {
            $time = $this->getTime($game->start_time);
            $deltaTime = $time - $game->timestamp;
            if ($this->db->getSettings()->game_update_timestamp < $deltaTime) {
                $objects = $this->db->getGameObjects($game->id);
                foreach ($objects as $object) {
                    //$this->objects[] = new GameObject($this->db, $this->id);
                }

                $gamers = $this->db->getGamers($game->id);
                foreach ($gamers as $gamer) {
                    $currentObject = null;
                    foreach ($this->objects as $object) {
                        if ($object->id === $gamer->objectId) {
                            $currentObject = $object;
                            break;
                        }
                    }
                    if ($currentObject) {
                        $this->gamers[] = new Gamer($gamer, $currentObject);
                    }
                }

                $this->update($deltaTime / 1000);
                $this->db->updateTimestamp($game->id, $time);
            }
            if ($hash === $game->hash) {
                return [
                    'hash' => $hash
                ];
            }
            return [
                'scene' => $this->objects,
                'gamers' => $this->gamers,
                'hash' => $game->hash
            ];
        }
        return ['error' => 805];
    }
    
    public function action($userId) {
        $gamer = $this->db->getGamerByUserId($userId);
        if ($gamer) {
            $this->db->action($userId);
            $this->db->updateGameHash(md5(rand()), $gamer->game_id);
            return true;
        }
        return ['error'=> 810];
    }

    public function move($userId, $axisX, $axisY) {
        $gamer = $this->db->getGamerByUserId($userId);
        if ($gamer) {
            $magnitude = sqrt($axisX * $axisX + $axisY * $axisY);
            
            if ($magnitude > 0) { 
                $xEllipse = $axisX / $magnitude; 
                $yEllipse = $axisY / $magnitude; 
            } else {
                $xEllipse = 0; 
                $yEllipse = 0; 
            }
                   
            $this->db->updateGamerDirection($gamer->id, $xEllipse, $yEllipse);
            $this->db->updateGameHash(md5(rand()), $gamer->game_id);
        
            return true;
        }
        
        return ['error' => 810];
    }
}