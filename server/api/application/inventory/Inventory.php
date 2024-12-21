<?php

class Inventory {
    function __construct($db) {
        $this->db = $db;
    }

    public function getInventory($userId) {
        $inventory = $this->db->getInventory($userId);
        return ['slots' => $inventory];
    }

}