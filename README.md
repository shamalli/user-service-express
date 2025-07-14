# User Service API (TypeScript + Express)

Сервис для управления пользователями с поддержкой ролей и авторизации через JWT. Реализованы базовые функции: регистрация, вход, просмотр, блокировка.

---

## Стек технологий

- **Node.js** + **TypeScript**
- **Express**
- **MySQL** + **Sequelize**
- **JWT** (аутентификация)
- **Swagger UI** (документация)

---

## Установка

1. Клонируйте репозиторий или скачайте архив.
2. Установите зависимости:

```bash
npm install
```

3. Настройте `.env`:

```dotenv
PORT=3000
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=userservice
DB_PORT=3306

ADMIN_EMAIL=contact@salephpscripts.com
```

---

## Скрипты

| Скрипт         | Назначение                    |
|----------------|-------------------------------|
| `npm run dev`  | Запуск в режиме разработки    |
| `npm run build`| Компиляция TypeScript в JS    |
| `npm start`    | Запуск production-версии      |

---

## Swagger-документация

Swagger доступен по адресу:

```
http://localhost:3000/docs
```

---

## Роли и доступ

| Endpoint                   | Доступ                         |
|----------------------------|--------------------------------|
| POST `/api/register`       | Все                            |
| POST `/api/login`          | Все                            |
| GET `/api/users/:id`       | Пользователь сам или админ     |
| GET `/api/users`           | Только админ                   |
| POST `/api/users/:id/block`| Сам пользователь или админ     |

---

## Структура проекта

```
user-service-express/
├── src/
│   ├── config/              # Подключение к базе данных
│   ├── controllers/         # Логика API
│   ├── dtos/                # DTO
│   ├── middleware/          # Авторизация, роли, проверка уникальности email
│   ├── models/              # Sequelize-модели
│   ├── routes/              # Определение маршрутов
│   ├── types/               # Определение Типов
│   ├── utils/               # JWT утилиты
│   ├── validators/          # Валидаторы данных
│   ├── app.ts               # Приложение Express
│   └── server.ts            # Точка входа
├── global.d.ts              # Расширение запроса пользовательскими данными
├── swagger.yaml             # OpenAPI документация
├── tsconfig.json            # Конфигурация TypeScript
├── package.json             # Скрипты и зависимости
└── .env                     # Переменные окружения
```

---

## Примечание

- Что бы зарегистрировать админа - введите email указанный в .env.ADMIN_EMAIL

- Все запросы, кроме регистрации и входа, требуют `Bearer`-токена в заголовке:
  ```
  Authorization: Bearer <token>
  ```