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
            $maxItems = 3;
            $equippedItems = $this->db->getEquippedItems($gamer->id);
            if (count($equippedItems) < $maxItems) {
                $item = $this->db->getItemById($itemId);
                if ($item) {
                    $this->db->updateItemState($itemId, 'pocket');
                    return [
                        'success' => true,
                        'message' => 'Шмотка успешно надета.'
                    ];
                } else {
                    return ['error' => 820]; 
                }
            } else {
                return ['error' => 815]; 
            }
        }
        return ['error' => 705]; 
    }
    
}