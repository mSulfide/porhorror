<?php

class Lobby {
    function __construct($db) {
        $this->db = $db;
    }

    public function createGroup($name/*, $status, $creatorId*/) {
        $newGroup = $this->db->insertGroup($name/*, $status, $creatorId*/);

        return [
            //'id' => $newGroup->id,
            'name' => $newGroup->name,
            /*'status' => $newGroup->status,
            'creatorId' => $newGroup->creatorId*/
        ];
    }

    public function deleteGroup($groupId) {
        $group = $this->db->getGroupById($groupId); 
        if (!$group) {
            return ['error' => 1105];
        }

        $this->db->deleteGroup($groupId); 

        $this->db->deleteUsersFromGroup($groupId); 

        return true;
    }

    public function startGame($userId) {
        $lobby = $this->db->getLobbyByCreatorId($userId);
        if ($lobby) {
            $this->db->startGame($lobby->id);
            return true;
        }
        return ['error' => 1105];
    }
}