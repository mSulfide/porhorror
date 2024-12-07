-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 07 2024 г., 15:26
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `porhorror`
--

-- --------------------------------------------------------

--
-- Структура таблицы `game`
--

CREATE TABLE `game` (
  `id` int NOT NULL,
  `status` varchar(32) NOT NULL DEFAULT 'open',
  `hash` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'rwt3412'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `gamers`
--

CREATE TABLE `gamers` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `object_id` int NOT NULL,
  `status` varchar(32) NOT NULL DEFAULT 'gaming'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `game_objects`
--

CREATE TABLE `game_objects` (
  `id` int NOT NULL,
  `game_id` int NOT NULL,
  `x` float NOT NULL DEFAULT '0',
  `y` float NOT NULL DEFAULT '0',
  `velocity_x` float NOT NULL DEFAULT '0',
  `velocity_y` float NOT NULL DEFAULT '0',
  `radius` float NOT NULL DEFAULT '0',
  `angle` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `hashes`
--

CREATE TABLE `hashes` (
  `id` int NOT NULL,
  `chat_hash` varchar(32) NOT NULL,
  `lobby_hash` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `hashes`
--

INSERT INTO `hashes` (`id`, `chat_hash`, `lobby_hash`) VALUES
(1, '6a3fe40ac0cd020c168534b13a4da91d', 'fa28a124983d5970007e4cdac8d324fd');

-- --------------------------------------------------------

--
-- Структура таблицы `lobby`
--

CREATE TABLE `lobby` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'open'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `lobby`
--

INSERT INTO `lobby` (`id`, `name`, `status`) VALUES
(1, 'aboba', 'start game'),
(2, '1212', 'open');

-- --------------------------------------------------------

--
-- Структура таблицы `lobby_members`
--

CREATE TABLE `lobby_members` (
  `id` int NOT NULL,
  `lobby_id` int NOT NULL,
  `user_id` int NOT NULL,
  `is_creator` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `lobby_members`
--

INSERT INTO `lobby_members` (`id`, `lobby_id`, `user_id`, `is_creator`) VALUES
(1, 1, 1, 1),
(2, 2, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `message` varchar(256) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `messages`
--

INSERT INTO `messages` (`id`, `user_id`, `message`, `created`) VALUES
(1, 1, 'Я ЛюБлю жРАтЬ С0баЧиЕ ДеРЬмО', '2024-11-06 07:22:45'),
(2, 4, 'всем тевирп!', '2024-11-23 14:43:19'),
(3, 1, '123', '2024-12-04 14:40:51');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `login` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `name` varchar(32) NOT NULL,
  `token` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `name`, `token`) VALUES
(1, 'sulfide', '6f1f3d80cbb51102cf626135afbae1aa', 'Миша', 'f7477ada33ee089a61019d444463034a'),
(2, 'vasya', 'fcb03559c0317682f5d65a88aca50012', 'Вася', '18685462b2f563fca81b1b7011d83a6a'),
(3, 'petya', 'd7ba312b012b3374ef53eb2e3f9830a5', 'Петя', 'cc79d5f20b41d4728ae7eb7157cde2a0'),
(4, 'mclovin228', '66413a3ea6b587bb58fe85773307c76f', 'chris', '4627722d496dff63a06c1dc456467fdb'),
(5, 'admin', 'bbad8d72c1fac1d081727158807a8798', 'Админчик', 'd3ed3676021d70ecdfefa203462ccced'),
(6, 'OREL', '2da7d9988b511f3e37808c8636abcd2c', 'Лев', '31d359b58e0aced66a482d2d2e2f08eb');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `gamers`
--
ALTER TABLE `gamers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `game_objects`
--
ALTER TABLE `game_objects`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `hashes`
--
ALTER TABLE `hashes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `lobby`
--
ALTER TABLE `lobby`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `lobby_members`
--
ALTER TABLE `lobby_members`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `game`
--
ALTER TABLE `game`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `gamers`
--
ALTER TABLE `gamers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `game_objects`
--
ALTER TABLE `game_objects`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `hashes`
--
ALTER TABLE `hashes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `lobby`
--
ALTER TABLE `lobby`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `lobby_members`
--
ALTER TABLE `lobby_members`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
