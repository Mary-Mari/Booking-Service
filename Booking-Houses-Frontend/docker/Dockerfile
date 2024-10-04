# Dockerfile для фронтенд-приложения (React)

# Используем официальный образ Node.js
FROM node:20.17-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта в контейнер
COPY . .

# Собираем фронтенд для продакшн-окружения
RUN npm run build

# Используем serve для обслуживания собранного приложения
RUN npm install -g serve

# Команда для запуска приложения
CMD ["serve", "-l", "3000", "-s", "build"]

