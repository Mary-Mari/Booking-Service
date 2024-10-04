// Переключаемся на БД с именем 'booking-houses'
db = db.getSiblingDB('booking-houses');

// Создаем коллекцию 'users'
db.createCollection('users');

// Вставляем один документ в коллекцию 'users'
db.users.insertOne({
  email: 'admin@house.ru',
  password: 'qwerty123',
  role: 'admin'
});
