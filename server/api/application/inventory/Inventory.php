<?php

class Inventory {
    function __construct($db) {
        $this->db = $db;
    }

    public function getInventory($userId) {
        return array(
            'inventory' => $this->db->getInventory($userId),
            'equipment' => $this->db->getEquipment($userId)
        );
    }

}