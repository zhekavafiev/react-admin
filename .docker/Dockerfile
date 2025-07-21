# Используем официальный образ Node.js
FROM node:20-alpine

RUN npm install -g pnpm@8

ARG USER_ID=1000
ARG GROUP_ID=82

WORKDIR /app

# Добавляем пользователя node в группу www-data
RUN adduser node www-data

# Даем права группе www-data
RUN chown -R node:www-data /app

# Переключаемся на пользователя node
USER node

# Копируем файлы с правами www-data
COPY --chown=node:www-data ./package*.json ./
COPY --chown=node:www-data ./pnpm-lock.yaml* ./

RUN if [ -f package.json ]; then pnpm install --frozen-lockfile || pnpm install; fi

COPY --chown=node:www-data ./ .

EXPOSE 4000

CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "4000"]
