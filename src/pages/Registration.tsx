import { HtmlWrapper, Text, LoginBox, LoginButton } from "../styles/Authorization";
import { useState, ChangeEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from "axios";

function Registration() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [usernameError, setUsernameError] = useState("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === "username") {
            setUsername(value);
        } else if (id === "password") {
            setPassword(value);
        }
    };

    useEffect(() => {
        setIsButtonDisabled(!(username.trim() && password.trim()));
    }, [username, password]);

    const handleRegistration = () => {
        axios.post("http://localhost:3001/api/register", { username, password })
            .then(response => {
                console.log(response.data.message);
                window.location.href = "/login";
            })
            .catch(error => {
                console.error("Ошибка при регистрации:", error);
                if (error.response.status === 400) {
                    setUsernameError("Имя пользователя уже занято");
                }
            });
    };

    return (
        <HtmlWrapper
            alignItems="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            sx={{ width: '100%' }}
        >
            <Text>Регистрация</Text>
            <LoginBox
                my={5}
                p={5}
                sx={{ width: '25%', border: '2px solid #4B0082' }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    sx={{ width: '100%' }}
                >
                    <TextField
                        color={usernameError ? "error" : "secondary"}
                        error={!!usernameError}
                        fullWidth
                        helperText={usernameError}
                        id="username"
                        label="Введите имя"
                        onChange={handleInputChange}
                        size="small"
                        type="text"
                        value={username}
                    />
                    <TextField
                        color="secondary"
                        fullWidth
                        id="password"
                        label="Введите пароль"
                        onChange={handleInputChange}
                        size="small"
                        type="password"
                        value={password}
                    />
                    <LoginButton
                        disabled={isButtonDisabled}
                        fullWidth
                        onClick={handleRegistration}
                        variant="contained"
                    >Зарегистрироваться</LoginButton>
                    <Link to="/login">
                        <LoginButton
                            fullWidth
                            variant="contained"
                        >Авторизоваться</LoginButton>
                    </Link>
                </Box>
            </LoginBox>
        </HtmlWrapper>
    );
}

export default Registration;
