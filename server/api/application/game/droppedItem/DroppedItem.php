<?php

class DroppedItem extends GameObject {
    private $db;
    private int $id, $itemId;

    public function __construct($db, $id) {
        $this->db = $db;
        $this->id = $id;

        $params = $this->db->getItemById($this->id); 
        $this->itemId = $params->item_id;
        
        parent::__construct($db, $params->object_id);
    }

    public function deleteDroppedItem() {
        $this->db->deleteDroppedItem($this->id);
    }
}
