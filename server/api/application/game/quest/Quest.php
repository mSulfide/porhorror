<?php

class Quest {
    private $db;
    private int $id, $nextQuestId, $gamerId;
    private bool $completed;
    private string $description;
    
    function __construct($db, $id) {
        $params = $db->getQuestById($id);

        $this->nextQuestId = $params->next_quest_id;
        $this->completed = $params->completed;
        $this->gamerId = $params->gamer_id;
        $this->description = $params->description;

        $this->db = $db;
        $this->id = $id;
    }

    public function create($gamerId, $nextQuestId) {
        return $this->db->createQuest($gamerId, $nextQuestId);
    }

    public function getProgress($gamerId) {
        $progress = $this->db->getCompletedGamerQuests($gamerId) / $this->db->getAllGamerQuests($gamerId);
        return $progress;
    }
}
