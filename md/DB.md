# Описание БД porhorror

## Сущности

* Пользователь-Игрок
* Инвентарь
* Игровая комната

## Формализация сущностей

### Общеигровые таблицы

**Таблица hashes**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| chat_hash | string | |
| lobby_hash | string | |
| ... | string | какие-то другие хеши |


**Таблица global_settings**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| version | integer | |
| lobby_max_count | integer | 4 by default |
| quest_max_count | integer | 4 by default |
| game_timestamp | integer | длительность игры |
| game_update_timestamp | integer | минимальный промежуток для обновления игры |
| inventory_max_count | integer | 3 by default |


### Пользователь-Игрок

**Таблица users**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| name | string | |
| login | string | unique |
| password | string | |
| token | string | |
| rating | integer | |


### Инвентарь


**Таблица inventory**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| user_id | integer | |
| item_id | integer | |
| status | string | 'pocket', 'inventory' |


### Игровая комната

**Таблица lobby**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| name | string | |
| status | string | 'open', 'cancel', 'start game', etc. |


**Таблица lobby_members**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| lobby_id | integer | |
| user_id | integer | |
| is_creator | bool | false by default |


**Таблица game**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| start_time | integer | |
| timestamp | integer | |
| borders | string | массив коэффициентов для сплайна |
| quest_count | integer | количество выполненных квестов |
| status | string | 'open', 'end', etc. |
| hash | string | |


**Таблица gamers**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| game_id | integer | |
| user_id | integer | |
| hp | integer | |
| x | float | |
| y | float | |
| angle | float | угол поворота игрока на сцене |
| speed | float | скорость перемещения |
| quest_count | integer | количество выполненных квестов |
| status | string | 'gaming', 'dead', etc. |


**Таблица items**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| name | string | |
| image | string | |
| type | string | 'boost', 'quest' |
| quest_id | integer | ссылка на квестовый предмет из ЭТОЙ же таблицы |
| boost_type | string | 'speed_boost', 'speed_nerf', etc. |


**Таблица game_items**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| game_id | integer | |
| item_id | integer | |


**Таблица game_mobs**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| game_id | integer | |
| item_id | integer | |
| hp | integer | |
| x | float | |
| y | float | |
| angle | float | угол поворота игрока на сцене |
| speed | float | скорость перемещения |
