const express = require('express');
const path = require('path');

const app = express();

// Папка со статическими файлами (HTML, CSS, картинки)
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница (например, news.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/news.html'));
});

// Остальные страницы
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/about.html'));
});

app.get('/sports', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/sports.html'));
});

app.get('/statya', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/statya.html'));
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
