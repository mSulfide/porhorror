<?php

class Inventory {
    function __construct($db) {
        $this->db = $db;
    }

    public function getInventory($userId) {
        $inventory = $this->db->getInventory($userId);
        return ['slots' => $inventory];
    }

    public function equipItem($userId, $itemId) {
        $gamer = $this->db->getGamerByUser Id($userId);
        if ($gamer) {
            $maxItems = $this->db->getSettings()->max_equipped_items;
            $equippedItems = $this->db->getEquippedItems($gamer->id);
            if (count($equippedItems) < $maxItems) {
                $item = $this->db->getItemById($itemId);
                if ($item) {
                    $this->db->updateItemState($itemId, 'pocket');
                    return true;
                } else {
                    return ['error' => 820]; 
                }
            } else {
                return ['error' => 830]; 
            }
        }
        return ['error' => 705]; 
    }
    
}