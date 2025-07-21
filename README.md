# React Admin Panel

Современная админ-панель на React 18 + TypeScript + Vite для замены legacy административного интерфейса.

## 🚀 Быстрый старт

### Первый запуск (с инициализацией)

Если папка `new-admin` пустая или проект еще не создан:

```bash
# 1. Инициализация React проекта
docker compose run --rm react-init

# 2. Запуск админки
docker compose up -d react-admin
```

### Последующие запуски

```bash
# Запустить админку
docker compose up -d react-admin

# Проверить статус
docker compose ps

# Посмотреть логи
docker compose logs -f react-admin
```

Админка будет доступна по адресу: **http://localhost:4000**

### Остановка

```bash
# Остановить контейнер
docker compose stop react-admin

# Полностью удалить контейнер
docker compose down
```

## 📋 Структура Docker

```
.docker/
└── new-admin/
    ├── Dockerfile         # Основной образ для разработки
    └── Dockerfile.init    # Образ для инициализации проекта

new-admin/                 # Исходный код React приложения
├── src/
├── public/
├── package.json
└── ...

docker-compose.yml         # В корне проекта
```

## 🛠 Полезные команды

### Пересборка после изменения Dockerfile

```bash
docker compose up -d --build react-admin
```

### Полная переинициализация проекта

```bash
# Удалить старые файлы (осторожно!)
sudo rm -rf new-admin/*

# Запустить инициализацию заново
docker compose run --rm react-init

# Запустить админку
docker compose up -d react-admin
```

### Работа с зависимостями

```bash
# Установить новый пакет
docker compose exec react-admin pnpm add axios

# Установить dev зависимость
docker compose exec react-admin pnpm add -D @types/react

# Обновить зависимости
docker compose exec react-admin pnpm update
```

### Доступ к контейнеру

```bash
# Интерактивный shell
docker compose exec react-admin sh

# Выполнить команду
docker compose exec react-admin pnpm run build
```

## 🔧 Конфигурация

### Порты
- **4000** - порт на хост-машине (http://localhost:4000)
- **3001** - внутренний порт Vite в контейнере

### Пользователь
Контейнер работает от пользователя `node` с UID/GID=1000 для корректных прав доступа к файлам.

## 🐛 Решение проблем

### Страница не открывается

1. Проверьте логи: `docker compose logs react-admin`
2. Убедитесь, что порт 4000 не занят: `lsof -i :4000`
3. Перезапустите контейнер: `docker compose restart react-admin`

### Ошибки с правами доступа

```bash
# Исправить права на существующие файлы
sudo chown -R $(id -u):$(id -g) new-admin/
```

### Hot reload не работает

Hot reload настроен и должен работать автоматически. Если нет:
1. Проверьте, что `CHOKIDAR_USEPOLLING=true` в environment
2. Перезапустите контейнер

### Контейнер не запускается после изменений

```bash
# Полная пересборка
docker compose down
docker compose up -d --build react-admin
```

## 📚 Технологический стек

- **React 18** - UI библиотека
- **TypeScript** - Типизация (strict mode)
- **Vite** - Сборщик и dev-сервер
- **PNPM** - Менеджер пакетов
- **Docker** - Контейнеризация

## 🏗 Архитектура проекта

```
new-admin/
├── src/
│   ├── components/      # React компоненты
│   ├── pages/           # Страницы приложения
│   ├── services/        # API сервисы
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript типы
│   └── App.tsx          # Главный компонент
├── public/              # Статические файлы
├── package.json         # Зависимости
├── tsconfig.json        # Настройки TypeScript
├── vite.config.ts       # Настройки Vite
└── index.html           # Входная точка
```

## 🔄 Workflow разработки

1. **Внесите изменения** в файлы в папке `new-admin/`
2. **Сохраните файл** - Hot reload автоматически обновит страницу
3. **Проверьте в браузере** на http://localhost:4000
4. **Commit изменения** в git

## 📝 Следующие шаги

После успешного запуска Hello World страницы:

1. [ ] Добавить Tailwind CSS для стилизации
2. [ ] Настроить React Router для навигации
3. [ ] Создать Layout компоненты (Header, Sidebar)
4. [ ] Подключить к Laravel API
5. [ ] Добавить авторизацию
6. [ ] Реализовать CRUD для заказов

---

**Порт:** 4000  
**Путь к коду:** `new-admin/`  
**Docker сервис:** `react-admin`
