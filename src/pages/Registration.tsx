import { useState } from "react";
import AuthForm from "../components/AuthForm";
import axios from "axios";

function Registration() {
    const [error, setError] = useState("");

    const handleRegistration = (username: string, password: string) => {
        axios.post("http://localhost:3001/api/register", { username, password })
            .then(response => {
                console.log(response.data.message);
                window.location.href = "/login";
            })
            .catch(error => {
                console.error("Ошибка при регистрации:", error);
                if (error.response.status === 400) {
                    setError("Имя пользователя уже занято");
                }
            });
    };

    return (
        <AuthForm
            title="Регистрация"
            buttonText="Зарегистрироваться"
            onSubmit={handleRegistration}
            error={error}
        />
    );
}

export default Registration;
