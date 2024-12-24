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
        $maxSlots = $this->db->getSettings()->max_equipped_slots;
        $equippedSlots = $this->db->equippedSlots($userId);
        if (!$equippedSlots || count($equippedSlots) < $maxSlots) {
            $slot = $this->db->getSlotById($slotId);
            if ($slot) {
                if ($slot->user_id === $userId) {
                    $this->db->updateSlotState($slot->id, 'pocket');
                    return true; 
                }
                return ['error' => 821]; 
            }
            return ['error' => 820];
        }
        return ['error' => 830]; 
    }
}
