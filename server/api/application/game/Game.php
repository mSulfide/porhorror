<?php

require_once ('gameObject/GameObject.php');
require_once ('gamer/Gamer.php');
require_once ('physic/Physic.php');
require_once ('droppedItem/DroppedItem.php'); 

class Game {
    private $db;
    private $math;

    function __construct($db) {
        $this->db = $db;
        $this->math = new Math();
    }

    private function getTime($startTime) {
        return floor((microtime(true) - $startTime) * 1000);
    }

    private function getGamers($gameId) {
        $answer = [];
        $gamers = $this->db->getGamers($gameId);
        foreach ($gamers as $gamer) {
            $answer[] = new Gamer($this->db, $gamer->id);
        }
        return $answer;
    }

    public function endGame($gameId) {
        $game = $this->db->getGameById($gameId);
        if ($game) {
            $this->db->deleteGame($gameId);
            $this->db->deleteGamers($gameId);
            $this->db->deleteLobbyByGameId($gameId);
            //$this->db->deleteGameItems($gameId);
            return true;
        }
        return ['error' => 805];
    }

    public function update($deltaTime, $gameId) {
        $gamers = $this->getGamers($gameId);
        foreach ($gamers as $gamer) {
            $gamer->setDirection($deltaTime);
        }

        $physic = new Physic();
        $collisions = $physic->findCollisions($gamers);
        foreach ($collisions as $collision) {
            $norm = $collision->norm;
            $velocity = $collision->gamer->getVelocity();
            $scal = $this->math->dot($norm, $velocity);
            if ($scal < 0) {
                $collision->gamer->setVelocity($this->math->sub($velocity, $this->math->mlt($norm, $scal)));
            }
        }
        
        foreach ($gamers as $gamer) {
            $gamer->move($deltaTime);
        }
    }

    public function updateScene($userId, $hash) {
        $game = $this->db->getGameById($this->db->getGamerByUserId($userId)->game_id);
        if ($game) {
            $time = $this->getTime($game->start_time);
            $deltaTime = $time - $game->timestamp;
           
            if ($this->db->getSettings()->game_update_timestamp < $deltaTime) {
                $this->update($deltaTime / 1000, $game->id);
                $this->db->updateTimestamp($game->id, $time);
                $this->db->updateGameHash(md5(rand()), $game->id);
            }
            $objects = $this->db->getGameObjects($game->id);

            $allTime = $this->db->getSettings()->game_timestamp;
            if ($time > $allTime * 1000) {
                $this->endGame($game->id);
            }

            if ($hash === $game->hash) {
                return [
                    'hash' => $hash
                ];
            }
            return [
                'scene' => $objects,
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

    public function dropItem($itemId) {
        $droppedItemId = $this->db->insertDroppedItem($this->id, $itemId);
        $droppedItem = new DroppedItem($this->db, $droppedItemId);
    }
}