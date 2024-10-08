# Dockerfile для бекенд-приложения (NestJS)

# Используем официальный образ Node.js
FROM node:20.17-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Собираем бекенд
RUN npm run build

# Команда для запуска приложения
CMD ["npm", "run", "start:prod"]

# Открываем порт 3001
EXPOSE 3000
