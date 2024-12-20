<?php

class Game {
    function __construct($db) {
        $this->db = $db;
    }

    private function addUser($gameId, $userId) {
        $objectId = $this->db->createObject($gameId);
        $this->db->addGamer($objectId, $userId);
    }

    public function connect($gameId, $userId) {
        $gamer = $this->db->getGamerByUserId($userId);
        if (!$gamer) {
            $lobby = $this->db->getLobbyByUserId($userId);
            if ($lobby->game_id === $gameId) {
                $this->db->removeMemberFromLobby($lobby->id, $userId);
                $this->addUser($gameId, $userId);
                return true;
            }
            return ['error' => 500];
        }
        return ['error'=> 905];
    }

    public function updateScene($userId, $hash) {
        $gameId = $this->db->getGamerByUserId($userId)->game_id;
        $game = $this->db->getGameById($gameId);
        if ($game) {
            if ($hash === $game->hash) {
                return [
                    'hash' => $hash
                ];
            }
            $objects = $this->db->getGameObjects($game->id);
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
            if ($magnitude > 1) {
                $axisX /= $magnitude;
                $axisY /= $magnitude;
            }

            $angle = atan2($axisY, $axisX); //угол 

            $xEllipse = $axisX * cos($angle);
            $yEllipse = $axisY * sin($angle); 
        
            $this->db->updateGamerDirection($gamer->id, $xEllipse, $yEllipse);
        
            return true;

        }
        
        return ['error' => 705];

    }
}