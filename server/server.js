const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const bcrypt = require("bcrypt");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

// Обработчик для корневого пути
app.get("/", (req, res) => {
    res.send("Server is up and running!");
});

// Функция для проверки пароля
const checkPassword = (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
};

// Регистрация пользователя
app.post("/api/register", (req, res) => {
    const { username, password } = req.body;  
    const db = JSON.parse(fs.readFileSync("./database.json", "utf8"));// Чтение базы данных из JSON файла
    const user = db.find((user) => user.username === username);// Проверка наличия пользователя с таким же именем
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }  
    const hashedPassword = bcrypt.hashSync(password, 10);// Хэширование пароля
    const newUser = { username: username, password: hashedPassword };
    db.push(newUser);// Добавление нового пользователя в массив базы данных    
    fs.writeFileSync("database.json", JSON.stringify(db, null, 2));// Запись обновленных данных в файл
    return res.status(201).json({ message: "Registration successful" });
});

// Вход пользователя
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;  
    const db = JSON.parse(fs.readFileSync("./database.json", "utf8"));// Чтение базы данных из JSON файла
    const user = db.find((user) => user.username === username);// Поиск пользователя по имени
    if (user && checkPassword(user.password, password)) {
        return res.status(200).json({ message: "Login successful" });// Успешный вход
    } else {    
        return res.status(401).json({ message: "Login failed" });// Неверные данные
    }
});

// Запуск сервера
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});