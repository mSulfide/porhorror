<?php

class Inventory {
    function __construct($db) {
        $this->db = $db;
    }

    public function getInventory($userId) {
        return $this->db->getInventory($userId);
    }

    public function changeInventory($itemId, $userId) {
        if ($this->isItemInPocket($itemId, $userId)) {
            return $this->updateItemState($itemId, $userId, 'inventory');
        } elseif ($this->isItemInInventory($itemId, $userId)) {
            return $this->updateItemState($itemId, $userId, 'pocket');
        }
        return ['error' => 'Item not found in pocket or inventory.'];
    }

}