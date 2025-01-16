<?php

class DroppedItem extends GameObject {
    private string $name, $image;

    public function __construct($db, int $itemId) {
        parent::__construct($db, $itemId);

        $itemData = $this->db->getItemById($itemId);
        if ($itemData) {
            $this->name = $itemData->name;
            $this->image = $itemData->image;
        } else {
            throw new Exception("Item not found");
        }
    }

    public function save() {
        // сохр сост выпавшего предмета в бд
        $this->db->insertDroppedItem($this->id, $this->getPosition()->x, $this->getPosition()->y);
    }

    public function delete() {
        $this->db->deleteDroppedItem($this->id);
    }

    // Геттеры
    public function getName() {
        return $this->name;
    }

    public function getImage() {
        return $this->image;
    }

    public function setPosition(Point $position) {
        parent::setPosition($position);
        $this->save(); // Сохр
    }
}
