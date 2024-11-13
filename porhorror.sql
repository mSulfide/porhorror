-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 13 2024 г., 02:08
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
-- Структура таблицы `hashes`
--

CREATE TABLE `hashes` (
  `id` int NOT NULL,
  `chat_hash` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `hashes`
--

INSERT INTO `hashes` (`id`, `chat_hash`) VALUES
(1, '965cad4883471d9ed7a8f0ffc20cbd25');

-- --------------------------------------------------------

--
-- Структура таблицы `lobby`
--

CREATE TABLE `lobby` (
  `id` int NOT NULL,
  `name` varchar(32) NOT NULL,
  `is_started` tinyint(1) NOT NULL DEFAULT '0',
  `creator_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `lobby`
--

INSERT INTO `lobby` (`id`, `name`, `is_started`, `creator_id`) VALUES
(1, 'МегаЛобби-1', 1, 1);

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
(2, 1, 'Ой, а как удалить то?', '2024-11-06 07:23:07'),
(3, 1, 'Ну капец пипец. Как жить то теперь?', '2024-11-06 07:23:49'),
(4, 1, 'Ещё и на Enter не отправляются сообщения, вообще кринжик нереальный', '2024-11-06 07:24:17'),
(5, 1, 'Минус вайб', '2024-11-06 07:24:25'),
(7, 4, 'всем тевирп в этом чатике', '2024-11-11 16:19:23'),
(8, 4, 'абалдеть оно работает', '2024-11-11 16:19:33'),
(9, 4, 'ыыы', '2024-11-11 17:12:24');

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
(1, 'sulfide', '6f1f3d80cbb51102cf626135afbae1aa', 'Миша', 'c5f056e541a16cb0a1cdfd4ac8c0501f'),
(2, 'vasya', 'fcb03559c0317682f5d65a88aca50012', 'Вася', '6c1a35c84af6b2594544fdc5c2f52f0f'),
(3, 'petya', 'd7ba312b012b3374ef53eb2e3f9830a5', 'Петя', 'cc79d5f20b41d4728ae7eb7157cde2a0'),
(4, 'mclovin228', '66413a3ea6b587bb58fe85773307c76f', 'chris', '2e90c9d635e177ff8dfcf564bfdfa466');

-- --------------------------------------------------------

--
-- Структура таблицы `users_lobbies`
--

CREATE TABLE `users_lobbies` (
  `id` int NOT NULL,
  `lobby_id` int NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Индексы сохранённых таблиц
--

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
-- Индексы таблицы `lobby`
--
ALTER TABLE `lobby`
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
-- Индексы таблицы `users_lobbies`
--
ALTER TABLE `users_lobbies`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `hashes`
--
ALTER TABLE `hashes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `lobby`
--
ALTER TABLE `lobby`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `lobby`
--
ALTER TABLE `lobby`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `users_lobbies`
--
ALTER TABLE `users_lobbies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
