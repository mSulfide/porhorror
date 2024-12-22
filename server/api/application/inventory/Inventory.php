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
        if (!$gamer) {
            return ['error' => 705]; 
        }
        $maxSlots = $this->db->getSettings()->max_equipped_slots;
        $equippedSlots = $this->db->equippedSlots($gamer->id);
        if (count($equippedSlots) >= $maxSlots) {
            return ['error' => 830]; 
        }
        $slot = $this->db->getSlotById($slotId);
        if (!$slot) {
            return ['error' => 820]; 
        }
        $this->db->updateSlotState($slotId, 'pocket');
        return true; 
    }
}