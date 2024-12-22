<?php

class Inventory {
    function __construct($db) {
        $this->db = $db;
    }

    public function getInventory($userId) {
        $inventory = $this->db->getInventory($userId);
        return ['slots' => $inventory];
    }

    public function equipItem($userId, $slotId) {
        $gamer = $this->db->getGamerByUserId($userId);
        if ($gamer) {
            $maxSlots = $this->db->getSettings()->max_equipped_slots;
            $equippedSlots = $this->db->equippedSlots($gamer->id);
            if (count($equippedSlots) < $maxSlots) {
                $slot = $this->db->getSlotById($slotId);
                if ($slot) {
                    $this->db->updateSlotState($slotId, 'pocket');
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