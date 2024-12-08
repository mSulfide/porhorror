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

    public function getUserByLogin($login) {
        $answer = $this->query("SELECT * FROM users WHERE login=?", [$login]);
        if ($answer) {
            settype($answer->id, "int");
        }
        return $answer;
    }

    public function getUserByToken($token) {
        $answer = $this->query("SELECT * FROM users WHERE token=?", [$token]);
        if ($answer) {
            settype($answer->id, "int");
        }
        return $answer;
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
        $item1 = new stdClass();
        $item1->id = 11;
        $item1->name = 'Шмотка 1';
        $item2 = new stdClass();
        $item2->id = 222;
        $item2->name = 'Шмотка 2';
        return [$item1, $item2];
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
        $lobbies = $this->queryAll('SELECT id, name FROM lobby WHERE status="open"');
        foreach ($lobbies as $lobby) {
            settype($lobby->id, "int");
            $lobby->members = $this->getUsersFromLobby($lobby->id);
        }
        return $lobbies;
    }

    public function getUsersFromLobby($lobbyId) {
        $users = $this->queryAll('SELECT
                    u.id AS id,
                    u.name AS name,
                    lm.is_creator AS creator
                FROM users AS u
                INNER JOIN lobby_members AS lm ON lm.lobby_id=?
                WHERE u.id = lm.user_id
        ', [$lobbyId]);
        foreach ($users as $user) {
            settype($user->id, "int");
            settype($user->creator, "bool");
        }
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
            "INSERT INTO lobby_members (lobby_id, user_id, is_creator) VALUES (?, ?, ?)",
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
        $answer = $this->query("SELECT * FROM lobby WHERE id=?", [$lobbyId]);
        if ($answer) {
            settype($answer->id, "int");
        }
        return $answer;
    }

    public function getConnectId($userId) {
        return (int)$this->query("SELECT
                l.game_id AS id 
            FROM lobby AS l 
            INNER JOIN lobby_members AS lm ON lm.user_id=?
            WHERE l.status='start game' AND l.id=lm.lobby_id;
        ", [$userId])->id;
    }

    //game
    public function getGamerByUserId($userId) {
        $gamer = $this->query("SELECT
                g.id AS id,
                g.status AS status,
                u.name AS name,
                go.game_id AS game_id
            FROM gamers AS g
            INNER JOIN users AS u ON u.id = g.user_id
            INNER JOIN game_objects AS go ON go.id = g.object_id
            WHERE u.id = ?;
        ", [$userId]);
        if ($gamer) {
            settype( $gamer->id, "int");
            settype($gamer->game_id, "int");
        }
        return $gamer;
    }

    public function createGame($hash) {
        $this->execute("INSERT INTO game (hash) VALUES (?)", [$hash]);
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
}