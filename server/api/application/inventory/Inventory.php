<?php

class Inventory {
    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function getInventory($userId) {
        $inventory = $this->db->getInventory($userId);
        return ['slots' => $inventory];
    }

    public function equipItem($userId, $slotId) {
        
        $slot = $this->db->getSlotById($slotId);
        if (!$slot | $slot->user_id !== $userId) {
            return ['error' => 820]; 
        }
    
        if ($slot->status === 'pocket') {
            return ['error' => 821]; 
        }
    
        $maxPocketItems = $this->db->getSettings()->inventory_max_count;
    
      
        $equippedSlotsCount = count($this->db->equippedSlots($userId));
        // $equippedSlotsCount = $this->db->query("SELECT COUNT(*) AS count FROM inventory WHERE user_id = ? AND status = 'pocket'", [$userId])->count;
       
        if ($equippedSlotsCount >= $maxPocketItems) {
            return ['error' => 830]; 
        }
    
        $this->db->updateSlotState($slotId, 'pocket');
        // $this->db->execute("UPDATE inventory SET status = ? WHERE id = ?", ['pocket', $slotId]);
    
        return true; 
    }

    public function takeOffItem($userId, $slotId) {
        $slot = $this->db->getSlotById($slotId);
        if ($slot) {
            if ($slot->user_id === $userId) {
                $this->db->updateSlotState($slot->id, 'inventory');
                return true; 
            }
            return ['error' => $slot->user_id]; 
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
