<?php

require_once ('gameObject\GameObject.php');

class Game {
    function __construct($db) {
        $this->db = $db;
        $this->objects = [];
    }

    private function getTime($startTime) {
        return floor((microtime(true) - $startTime) * 1000);
    }

    private function update($time) {
        foreach ($this->objects as $object) {
            $object->x += $object->velocity_x * $time; 
            $object->y += $object->velocity_y * $time; 
        }
    }

    public function updateScene($userId, $hash) {
        $gameId = $this->db->getGamerByUserId($userId)->game_id;
        $game = $this->db->getGameById($gameId);
        if ($game) {
            $this->objects = $this->db->getGameObjects($game->id);
            $time = $this->getTime($game->start_time);
            $deltaTime = $time - $game->timestamp;
            if ($this->db->getSettings()->game_update_timestamp < $deltaTime) {
                $this->update($time / 1000);
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