const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = "login_key";

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
    const {
        username,
        password
    } = req.body;
    const db = JSON.parse(fs.readFileSync("./database.json", "utf8"));
    const user = db.find((user) => user.username === username);
    if (user) {
        return res.status(400).json({
            message: "Username already exists"
        });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
        username: username,
        password: hashedPassword
    };
    db.push(newUser);  
    fs.writeFileSync("database.json", JSON.stringify(db, null, 2));
    return res.status(201).json({
        message: "Registration successful"
    });
});

// Вход пользователя
app.post("/api/login", (req, res) => {
    const {
        username,
        password
    } = req.body;
    const db = JSON.parse(fs.readFileSync("./database.json", "utf8"));
    const user = db.find((user) => user.username === username);
    if (user && checkPassword(user.password, password)) {
        const token = jwt.sign({
            username: user.username
        }, JWT_SECRET);
        return res.status(200).json({
            message: "Login successful",
            token
        });
    } else {
        return res.status(401).json({
            message: "Login failed"
        });
    }
});

// Добавляем маршрут для разлогинивания пользователя
app.post("/api/logout", (req, res) => {
    return res.status(200).json({
        message: "Logout successful"
    });
});

// Проверка валидности токена
const checkToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: 'Authorization token is missing'
        });
    }
    try {
        jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
};

// Маршрут для проверки валидности токена
app.get('/api/checkToken', checkToken, (req, res) => {
    res.status(200).json({
        message: 'Token is valid'
    });
});

// Запуск сервера
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});