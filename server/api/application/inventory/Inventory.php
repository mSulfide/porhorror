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

    public function takeOffItem($userId, $slotId) {
        $slot = $this->db->getSlotById($slotId);
        if ($slot) {
            if ($slot->user_id === $userId) {
                $this->db->updateSlotState($slot->id, 'inventory');
                return true; 
            }
            return ['error' => 821]; 
        }
        
        return ['error' => 820]; 
    }

    public function addItem($userId, $itemId) {
        $result = $this->db->addItemToInventory($userId, $itemId);
        if (is_array($result) && isset($result['error'])) {
            return $result;
        }
        return true; 
    }

    public function removeItem($slotId) {
        $result = $this->db->removeItemFromInventory($slotId);
        if (is_array($result) && isset($result['error'])) {
            return $result;
        }
        return true; 
    }

    public function hasFreeSpace($userId) {
        $usedSlots = $this->db->getUsedSlotsCount($userId);
        $maxSlots = $this->db->getSettings()->inventory_max_count;
        return $usedSlots < $maxSlots;
    }

    public function moveItem($slotId, $newState) {
        $this->db->updateSlotState($slotId, $newState);
    }
}
