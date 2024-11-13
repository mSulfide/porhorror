<?php

class Lobby {
    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function dropFromGroup($userId, $groupId) {
        // Удаляем пользователя из группы
        $this->db->execute("DELETE FROM group_members WHERE user_id=? AND group_id=?", [$userId, $groupId]);

        // Обновляем количество участников в группе
        $this->db->execute("UPDATE groups SET members_count = (SELECT COUNT(*) FROM group_members WHERE group_id=?) WHERE id=?", [$groupId, $groupId]);

        return true;
    }

}