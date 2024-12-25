<?php

require_once ('gameObject\GameObject.php');
require_once ('gamer\Gamer.php');

class Game {
    private $db, $math;
    private $objects = [], $gamers = [];
    private float $deltaTime = 0;

    function __construct($db) {
        $this->db = $db;
        $this->math = new Math();
    }

    private function getTime($startTime) {
        return floor((microtime(true) - $startTime) * 1000);
    }

    public function update($deltaTime) {
        foreach ($this->gamers as $gamer) {
            $gamer->update($deltaTime, $this->objects);
        }
        foreach ($this->objects as $object) {
            $object->update($deltaTime); 
        }

        $objectA = $this->objects[0];
        $objectB = $this->objects[1];
        if ($objectA !== $objectB) {
            if ($this->math->getCirclesIntersect($objectA, $objectB)) {
                $objectA->image = 'tas1';
                $objectB->image = 'tas1';
            } else {
                $objectA->image = 'tas';
                $objectB->image = 'tas';
            }
        }
          
    }

    public function updateScene($userId, $hash) {
        $game = $this->db->getGameById($this->db->getGamerByUserId($userId)->game_id);
        if ($game) {
            $objects = $this->db->getGameObjects($game->id);
            foreach ($objects as $object) {
                $this->objects[] = new GameObject($this->db, $object);
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

            $time = $this->getTime($game->start_time);
            $deltaTime = $time - $game->timestamp;
            if ($this->db->getSettings()->game_update_timestamp < $deltaTime) {
                $this->update($deltaTime / 1000);
                $this->db->updateTimestamp($game->id, $time);
                $this->db->updateGameHash(md5(rand()), $game->id);
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
            $magnitude = sqrt($axisX * $axisX + $axisY * $axisY);
            
            if ($magnitude > 0) { 
                $xEllipse = $axisX / $magnitude; 
                $yEllipse = $axisY / $magnitude; 
            } else {
                $xEllipse = 0; 
                $yEllipse = 0; 
            }
                   
            $this->db->updateGamerDirection($gamer->id, $xEllipse, $yEllipse);
        
            return true;
        }
        
        return ['error' => 810];
    }
}