<?php

class DB {
    private $pdo;

    function __construct() {
        // MySQL
        $host = '127.0.0.1';
        $port = '3306';
        $user = 'root';
        $pass = '';
        $db = 'porhorror';
        $connect = "mysql:host=$host;port=$port;dbname=$db;charset=utf8";
        $this->pdo = new PDO($connect, $user, $pass);
        

        // Postgres
        /*
        $host = 'localhost';
        $port = '5432';
        $user = 'postgres';
        $pass = '---';
        $db = 'nopainnogame';
        $connect = "pgsql:host=$host;port=$port;dbname=$db;";
        //$this->pdo = new PDO($connect, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        */
    }

    public function __destruct() {
        $this->pdo = null;
    }

    // выполнить запрос без возвращения данных
    private function execute($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        return $sth->execute($params);
    }

    // получение ОДНОЙ записи
    private function query($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
        return $sth->fetch(PDO::FETCH_OBJ);
    }

    // получение НЕСКОЛЬКИХ записей
    private function queryAll($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
        return $sth->fetchAll(PDO::FETCH_OBJ);
    }

    public function getSettings() {
        return $this->query("SELECT * FROM global_settings");
    }

    public function getUserByLogin($login) {
        return $this->query("SELECT * FROM users WHERE login=?", [$login]);
    }

    public function getUserByToken($token) {
        return $this->query("SELECT * FROM users WHERE token=?", [$token]);
    }

    public function updateToken($userId, $token) {
        $this->execute("UPDATE users SET token=? WHERE id=?", [$token, $userId]);
    }

    public function registration($login, $hash, $name) {
        $this->execute(
            "INSERT INTO users (login,password,name) VALUES (?, ?, ?)",
            [$login, $hash, $name]
        );
    }

    public function getChatHash() {
        return $this->query("SELECT chat_hash AS answer FROM hashes WHERE id=1")->answer;
    }

    public function updateChatHash($hash) {
        $this->execute("UPDATE hashes SET chat_hash=? WHERE id=1", [$hash]);
    }

    public function addMessage($userId, $message) {
        $this->execute('INSERT INTO messages (user_id, message, created) VALUES (?,?, now())', [$userId, $message]);
    }

    public function getMessages() {
        return $this->queryAll("SELECT
                u.name AS author, 
                m.message AS message,
                m.created AS created 
            FROM messages as m 
            LEFT JOIN users as u on u.id = m.user_id 
            ORDER BY m.created DESC"
        );
    }

    public function getInventory($userId) {
        return $this->queryAll("SELECT
                inv.id AS id,
                inv.status AS status,
                inv.item_id AS itemId,
                i.name AS name,
                i.image AS image,
                i.boost_type AS boostType
            FROM inventory AS inv
            INNER JOIN items AS i ON i.id = inv.item_id
            WHERE inv.user_id = ?;
        ", [$userId]);
    }

    public function getLobbyByUserId($userId) {
        $lobbyId = $this->query('SELECT lobby_id FROM lobby_members WHERE user_id=?', [$userId])->lobby_id;
        return $this->getLobbyById($lobbyId);
    }

    public function startGame($lobbyId, $gameId) {
        $this->execute('UPDATE lobby SET status="start game", game_id=? WHERE id=?', [$gameId, $lobbyId]);
    }

    public function getLobbyHash() {
        return $this->query("SELECT lobby_hash AS answer FROM hashes WHERE id=1")->answer;
    }

    public function getLobbies() {
        $lobbies = $this->queryAll('SELECT
                id,
                name,
                status,
                game_id AS gameId
            FROM lobby WHERE status="open" OR status="start game"');
        foreach ($lobbies as $lobby) {
            $lobby->members = $this->getUsersFromLobby($lobby->id);
        }
        return $lobbies;
    }

    public function getUsersFromLobby($lobbyId) {
        $users = $this->queryAll('SELECT
                    u.id AS id,
                    u.name AS name,
                    lm.status AS status  
                FROM users AS u
                INNER JOIN lobby_members AS lm ON lm.lobby_id=?
                WHERE u.id = lm.user_id
        ', [$lobbyId]);
        return $users;
    }

    public function updateLobbyHash($hash) {
        $this->execute("UPDATE hashes SET lobby_hash=? WHERE id=1", [$hash]);
    }

    public function createGroup($name) {
        $this->execute(
            "INSERT INTO lobby (name, status) VALUES (?, 'open')",
            [$name]
        );
        return $this->pdo->lastInsertId();
    }

    public function addMemberToLobby($lobbyId, $userId, $isCreator) {
        $this->execute(
            "INSERT INTO lobby_members (lobby_id, user_id, status) VALUES (?, ?, ?)", 
            [$lobbyId, $userId, $isCreator]
        );
    }

    public function removeMembersFromLobby($lobbyId) {
        $this->execute("DELETE FROM lobby_members WHERE lobby_id=?", [$lobbyId]);
    }

    public function removeMemberFromLobby($lobbyId, $userId) {
        $this->execute("DELETE FROM lobby_members WHERE lobby_id=? AND user_id=?", [$lobbyId, $userId]);
    }
    
    public function removeLobby($lobbyId) {
        $this->execute("DELETE FROM lobby WHERE id=?", [$lobbyId]);
    }

    public function getLobbyById($lobbyId) {
        return $this->query("SELECT * FROM lobby WHERE id=?", [$lobbyId]);
    }

    //game
    public function getGamerByUserId($userId) {
        $gamer = $this->query("SELECT
                g.id AS id,
                g.status AS status,
                u.name AS name,
                go.game_id AS game_id,
                g.object_id AS objectId,
                g.axis_x AS axis_x, 
                g.axis_y AS axis_y,
                g.item_id AS item_id
            FROM gamers AS g
            INNER JOIN users AS u ON u.id = g.user_id
            INNER JOIN game_objects AS go ON go.id = g.object_id
            WHERE u.id = ?;
        ", [$userId]);
        return $gamer;
    }

    public function createGame($hash) {
        $this->execute("INSERT INTO game (hash, start_time) VALUES (?, ?)", [$hash, time()]);
        return $this->pdo->lastInsertId();
    }

    public function addGamer($objectId, $userId) {
        $this->execute("INSERT INTO gamers (object_id, user_id) VALUES (?, ?)", [$objectId, $userId]);
        return $this->pdo->lastInsertId();
    }

    public function createObject($gameId) {
        $this->execute("INSERT INTO game_objects (game_id) VALUES (?)", [$gameId]);
        return $this->pdo->lastInsertId();
    }

    public function updateGameHash($hash, $gameId) {
        $this->execute("UPDATE game SET hash=? WHERE id=?", [$hash, $gameId]);
    }

    public function getGameHash($gameId) {
        return $this->query("SELECT hash AS answer FROM game WHERE id=?", [$gameId])->answer;
    }

    public function getGameObjects($gameId) {
        $objects = $this->queryAll("SELECT * FROM game_objects WHERE game_id=?", [$gameId]);
        $answers = [];
        foreach ($objects as $object) {
            $answer = new stdClass();
            $answer->id = $object->id;
            $answer->gameId = $object->game_id;
            $answer->image = $object->image;
            $position = new stdClass();
            $position->x = $object->x;
            $position->y = $object->y;
            $answer->position = $position;
            $velocity = new stdClass();
            $velocity->x = $object->velocity_x;
            $velocity->y = $object->velocity_y;
            $answer->velocity = $velocity;
            $answer->radius = $object->radius;
            $answer->angle = $object->angle;
            $answers[] = $answer;
        }
        return $answers;
    }

    public function getGameObjectById($objectId) {
        $object = $this->query("SELECT * FROM game_objects WHERE id=?", [$objectId]);
        return $object;
    }
    
    public function getGamerById($gamerId) {
        return $this->query("SELECT * FROM gamers WHERE id=?", [$gamerId]);
    }

    public function getGamers($gameId) {
        $gamers = $this->queryAll("SELECT
                g.id,
                g.user_id AS userId,
                g.object_id AS objectId,
                g.status,
                g.hp,
                g.is_action AS isAction,
                g.axis_x AS axisX,
                g.axis_y AS axisY,
                g.item_id AS itemId
            FROM gamers AS g
            INNER JOIN game_objects AS go ON g.object_id=go.id
            WHERE go.game_id=?
        ", [$gameId]);    
        return $gamers;
    }

    public function getGameById($gameId) {
        return $this->query("SELECT * FROM game WHERE id=?", [$gameId]);
    }

    public function getGameIdByGamerId($gamerId) {
        return $this->query("SELECT
                go.game_id AS gameId
            FROM game_objects AS go
            INNER JOIN gamers AS g ON g.object_id = go.id
            WHERE g.id=?
        ", [$gamerId]);
    }

    public function action($userId) {
        $this->execute("UPDATE gamers SET is_action=1 WHERE user_id=?", [$userId]);
    }

    public function updateTimestamp($gameId, $time) {
        $this->execute("UPDATE game SET timestamp=? WHERE id=?", [$time, $gameId]);
    }
    
    public function updateGamerDirection($gamerId, $axisX, $axisY) {
        $this->execute(
            "UPDATE gamers SET axis_x = ?, axis_y = ? WHERE id = ?",
            [$axisX, $axisY, $gamerId]
        );
    }
    
    public function provideConsent($userId) {
        $user = $this->getUserByToken($userId);
    if (!$user) {
        return ['error' => 808]; 
    }
        $this->execute("UPDATE exchange SET status='ready' WHERE user_id=?", [$userId]);
    }
    
    public function removeConsent($userId){
        $this->execute("UPDATE exchange SET status='not ready' WHERE user_id=?", [$userId]);
    }

    public function getLotById($lotId) {
        return $this->query("SELECT * FROM exchanger_lots WHERE id=?", [$lotId]);
    }

    public function addLotComment($lotId, $userId, $comment) {
        $this->execute(
            "INSERT INTO exchanger_comments (lot_id, user_id, content) VALUES (?, ?, ?)",
            [$lotId, $userId, $comment]
        );
    }
    
    public function getStatusExchange($userId) {
        return $this->query("SELECT status AS answer FROM exchange WHERE user_id=?", [$userId])->answer;
    }
    
    public function updateLotStatus($lotId, $status) {
        $this->execute("UPDATE exchanger_lots SET status = ? WHERE id = ?", [$status, $lotId]);
    }
    
    public function deleteLot($lotId) {
        $query = "DELETE FROM exchanger_lots WHERE id = :lotId";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':lotId', $lotId, PDO::PARAM_INT);
        $stmt->execute();   
    }
    
    public function setPosition($objectId, $position) {
        $this->execute("UPDATE game_objects SET x=?, y=? WHERE id=?", [$position->x, $position->y, $objectId]);
    }

    public function setVelocity($objectId, $velocity) {
        $this->execute(
            "UPDATE game_objects SET velocity_x=?, velocity_y=? WHERE id=?", 
            [$velocity->x, $velocity->y, $objectId]
        );
    }

    public function setAngle($objectId, $angle) {
        $this->execute("UPDATE game_objects SET angle=? WHERE id=?", [$angle, $objectId]);
    }

    public function setIsAction($userId, $isAction) {
        $this->execute("UPDATE gamers SET isAction=? WHERE user_id=?", [$isAction, $userId]);
    }

    public function setRadius($objectId, $radius) {
        $this->execute("UPDATE game_objects SET radius=? WHERE id=?", [$radius, $objectId]);
    }

    public function setImage($objectId, $image) {
        $this->execute("UPDATE game_objects SET image=? WHERE id=?", [$image, $objectId]);
    }

    public function setItem($itemId, $gamerId) {
        $this->execute(
            "UPDATE gamers SET item_id=? WHERE id=?",
            [$itemId, $gamerId]
        );
    }

    public function getItemById($itemId) {
        $item = $this->query("SELECT * FROM game_items WHERE item_id=?", [$itemId]);
        return $item;
    }

    public function addDropppedItem($objectId, $itemId) {
        $this->execute("INSERT INTO game_items (object_id, item_id) VALUES (?, ?)", [$objectId, $itemId]);
        return $this->pdo->lastInsertId();
    }

    public function deleteDroppedItem($gameItemId) {
        $this->execute("DELETE gi.*, go.* 
                FROM game_items AS gi 
                INNER JOIN game_objects AS go ON go.id = gi.object_id 
            WHERE gi.id=?"
        , [$gameItemId]);
    }

    public function getDispenserById($dispenserId) {
        $dispenser = $this->query("SELECT * FROM dispenser WHERE id=?", [$dispenserId]);
        return $dispenser;
    }

    public function getReceiverById($receiverId) {
        $receiver = $this->query("SELECT * FROM receiver WHERE id=?", [$receiverId]);
        return $receiver;
    }

    public function equippedSlots($userId) {
        return $this->queryAll("SELECT * FROM inventory WHERE user_id = ? AND status = 'pocket'", [$userId]);
    }
    
    public function getSlotById($slotId) {
        return $this->query("SELECT * FROM inventory WHERE id = ?", [$slotId]);
    }
    
    public function updateSlotState($slotId, $newState) {
        $this->execute("UPDATE inventory SET status = ? WHERE id = ?", [$newState, $slotId]);
    }

    public function deleteGame($gameId) {
        $this->execute("DELETE FROM game WHERE id=?", [$gameId]);
    }

    public function deleteGamers($gameId) {
        $this->execute("DELETE g.*, go.* 
                FROM gamers AS g 
                INNER JOIN game_objects AS go ON go.id = g.object_id 
            WHERE go.game_id=?"
        , [$gameId]);
    }

    public function deleteLobbyByGameId($gameId) {
        $this->execute("DELETE lm.*, l.* 
                FROM lobby_members AS lm 
                INNER JOIN lobby AS l ON l.id = lm.lobby_id 
            WHERE l.game_id=?"
        , [$gameId]);
    }

    public function createLot($sellerId, $sellItemId, $needItemId) {
        $this->execute("INSERT INTO exchanger_lots (seller_id, sell_inv_id, need_item_id) VALUES (?, ?, ?)", [$sellerId, $sellItemId, $needItemId]);
        return $this->pdo->lastInsertId();
    }
    
    public function addLotItem($lotId, $itemId, $type) {
        $this->execute("INSERT INTO exchanger_lot_items (lot_id, item_id, type) VALUES (?, ?, ?)", 
                       [$lotId, $itemId, $type]);
    }

    public function setLotOwner($lotId, $userId) {
        return $this->execute("UPDATE exchanger_lots SET user_id=? WHERE id=?", [$userId, $lotId]);
    }

    public function removeLotItem($lotId, $itemId) {
        $lot = $this->getLotById($lotId);
        if (!$lot) {
            return ['error' => 813]; 
        }
        $this->execute("DELETE FROM exchanger_lot_items WHERE lot_id=? AND item_id=?", [$lotId, $itemId]);
    }

    public function addItemToInventory($userId, $itemId) {
        $user = $this->getUserByToken($userId);
        if (!$user) {
            return ['error' => 825];
        }
        $this->execute("INSERT INTO inventory (user_id, item_id, status) VALUES (?, ?, ?)", 
                       [$userId, $itemId, 'inventory']);
    }

    public function removeItemFromInventory($slotId) {
        $slot = $this->getSlotById($slotId);
        if (!$slot) {
            return ['error' => 820]; 
        }
        $this->execute("DELETE FROM inventory WHERE id=?", [$slotId]);
    }

    public function getUsedSlotsCount($userId) {
        return $this->query("SELECT COUNT(*) AS count FROM inventory WHERE user_id=? AND status='inventory'", [$userId])->count;
    }
    
    public function getExchangerHash() {
        return $this->query("SELECT exchanger_hash AS answer FROM hashes WHERE id=1")->answer;
    }

    public function updateExchangerHash($hash) {
        $this->execute("UPDATE hashes SET exchanger_hash=?", [$hash]);
    }

    public function getLotTime($lotId) {
        $result = $this->query("SELECT create_date FROM exchanger_lots WHERE id=?", [$lotId]);
        
        if (!$result || !isset($result->create_date)) {
            throw new Exception("Лот не найден или дата не установлена");
        }
        
        return new DateTime($result->create_date); // Преобразуем строку в DateTime
    }

    public function getLots() {
        return $this->queryAll("SELECT
              el.id AS id,
              s.id AS sellerId,
              s.name AS sellerName,
              sii.id AS id1,
              si.name AS n1,
              si.image AS i1,
              ni.id AS id2,
              ni.name AS n2,
              ni.image AS i2,
              el.create_date AS createTime
            FROM exchanger_lots el
            JOIN users AS s ON el.seller_id = s.id
            JOIN inventory AS sii ON el.sell_inv_id = sii.id
            JOIN items AS si ON sii.item_id = si.id
            JOIN items AS ni ON el.need_item_id = ni.id
            WHERE el.status = ?;
        ", ["active"]
        );
    }

    public function getItemsList() {
        return $this->queryAll("SELECT * FROM items");
    }

    public function changeItemOwner($invId, $userId) {
        return $this->execute("UPDATE inventory SET user_id=? where id=?", [$userId, $invId]);
    }

    public function getUserById($userId) {
        return $this->query("SELECT * FROM users WHERE id=?", [$userId]);
    }

    public function getInventoryHash($userId) {
        return $this->query("SELECT inventory_hash FROM users WHERE id=?", [$userId]);
    }

    public function updateInventoryHash($hash, $userId) {
        return $this->query("UPDATE users SET inventory_hash=? WHERE id=?", [$hash, $userId]);
    }

}