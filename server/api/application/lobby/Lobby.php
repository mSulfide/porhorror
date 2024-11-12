<?php

class Lobby {
    function __construct($db) {
        $this->db = $db;
    }

    public function createGroup($name, $status, $creatorId) {
        $existingGroup = $this->db->getGroupByName($name); 
        if ($existingGroup) {
            return ['error' => 228];
        }

        $this->db->insertGroup($name, $status, $creatorId);
        $newGroup = $this->db->getGroupByName($name);

        return [
            'id' => $newGroup->id,
            'name' => $newGroup->name,
            'status' => $newGroup->status,
            'creatorId' => $newGroup->creatorId
        ]
    }

    public function deleteGroup($groupId) {
        $group = $this->db->getGroupById($groupId); 
        if (!$group) {
            return ['error' => 229];
        }

        this->db->deleteGroup($groupId); 

        this->db->deleteUsersFromGroup($groupId); 

        return [
            'success' => 'Группа успешно удалена';
        ]
    }

}