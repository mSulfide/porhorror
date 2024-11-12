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
        return $sth->fetchAll(PDO::FETCH_ASSOC);
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
        return $this->query("SELECT * FROM hashes WHERE id=1");
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

    public function getEquipment($userId) {
        $item1 = new stdClass();
        $item1->id = 333;
        $item1->name = 'Шмотка 3';
        $item2 = new stdClass();
        $item2->id = 4444;
        $item2->name = 'Шмотка 4';
        return [$item1, $item2];
    }

    public function getGroupById($lobbyId) {
        return $this->query("SELECT * FROM lobby WHERE id=?", [$lobbyId]);
    }

    public function getUser LobbyEntry($userId, $lobbyId) {
        return $this->query("SELECT * FROM users_lobbies WHERE user_id=? AND lobby_id=?", [$userId, $lobbyId]);
    }

    public function addUser ToLobby($userId, $lobbyId) {
        $this->execute("INSERT INTO users_lobbies (lobby_id, user_id) VALUES (?, ?)", [$lobbyId, $userId]);
    }
}