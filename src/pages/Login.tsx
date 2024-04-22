import AuthForm from "../components/AuthForm";
import axios from "axios";
import { useState } from "react";

function Login() {
    const [error, setError] = useState("");

    const handleLogin = (username: string, password: string) => {
        axios.post("http://localhost:3001/api/login", { username, password })
            .then(response => {
                console.log(response.data.message);
                window.location.href = "/";
            })
            .catch(error => {
                console.error("Ошибка при авторизации:", error);
                setError("Введен неверный логин или пароль");
            });
    };

    return (
        <AuthForm
            title="Авторизация"
            buttonText="Авторизоваться"
            onSubmit={handleLogin}
            error={error}
            showPasswordError={true}
        />
    );
}

export default Login;
