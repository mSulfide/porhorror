<?php

class Game {
    function __construct($db) {
        $this->db = $db;
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
}