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

**Таблица global_settings**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
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
| login | string | unique |
| password | string | |
| name | string | |
| token | string | |



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
| game_id | integer | |


**Таблица lobby_members**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| lobby_id | integer | |
| user_id | integer | |
| status | string | | 


**Таблица game**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| status | string | 'open', 'end', etc. |
| hash | string | |
| timestamp | integer | |
| borders | string | массив коэффициентов для сплайна |
| quest_count | integer | количество выполненных квестов |
| start_time | integer | |


**Таблица gamers**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| user_id | integer | |
| object_id | integer | |
| status | string | 'gaming', 'dead', etc. |
| hp | integer | |
| quest_count | integer | количество выполненных квестов |
| is_action | boolen| |
| axis_x | float | |
| axis_y | float | |



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
| object_id | integer | |
| item_id | integer | |
| hp | integer | |


**Таблица game_objects**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| game_id | integer | |
| image | string | |
| x | float | |
| y | float | |
| velocity_x | float | |
| velocity_y | float | |
| radius | angle | радиус коллайдера |
| angle | float | угол поворота игрока на сцене |

**Таблица exchange**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| user_id | integer | |
| status | string | |

**Таблица messages**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| user_id | integer | |
| message | string | |
| created | date | |