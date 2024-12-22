<?php

class Exchanger {
    private $db;
    
    function __construct($db) {
        $this->db = $db;
    }
    
    public function provideConsent($userId) {
        $status = $this->db->getStatusExchange($userId);
        if ($status === 'not ready') {
            $this->db->provideConsent($userId);
            return true;
        }
        return ['error' => 808];
    }
    

    public function removeConsent($userId){
        $status = $this->db->getStatusExchange($userId);
        if($status === 'ready'){
            $this->db->removeConsent($userId);
            return true;
        }
        return ['error'=> '809'];
    }

    public function deleteLot($lotId, $userId) {
        // Получить информацию о лоте
        $lot = $this->db->getLotById($lotId);
        if ($lot) {
            // Проверяем, принадлежит ли лот текущему пользователю
            if ($lot->ownerId === $userId) {
                $this->db->deleteLot($lotId); // Удаляем лот
                return ['success' => true];
            }
            return ['error' => 1008]; // Лот не принадлежит пользователю
        }
        return ['error' => 1007]; // Лот не найден
    }
}
