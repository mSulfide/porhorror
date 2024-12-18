<?php

require_once ('gameObject\GameObject.php');

class Game {
    function __construct($db) {
        $this->db = $db;
    }

    private function getTime($startTime) {
        return floor((microtime(true) - $startTime) * 1000);
    }

    private function update($deltaTime) {
        
    }

    public function updateScene($userId, $hash) {
        $gameId = $this->db->getGamerByUserId($userId)->game_id;
        $game = $this->db->getGameById($gameId);
        if ($game) {
            $deltaTime = $this->getTime($game->start_time) - $game->timestamp;
            if ($this->db->getSettings()->game_update_timestamp < $deltaTime) {
                $this->update($deltaTime / 1000);
                $this->db->updateTimestamp($game->id, $this->getTime($game->start_time));
            }
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
}