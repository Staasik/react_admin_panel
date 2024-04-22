import { HtmlWrapper, Text, LoginBox, LoginButton } from "../styles/Authorization";
import { useState, ChangeEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from "axios";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isError, setIsError] = useState("");

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

    const handleLogin = () => {
        axios.post("http://localhost:3001/api/login", { username, password })
            .then(response => {
                console.log(response.data.message);
                window.location.href = "/";
            })
            .catch(error => {
                console.error("Ошибка при авторизации:", error);
                setIsError("Введен неверный логин или пароль");
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
            <Text>Авторизация</Text>
            <LoginBox
                alignItems="center"
                display="flex"
                flexDirection="column"
                gap={4}
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
                        color={isError ? "error" : "secondary"}
                        error={!!isError}
                        fullWidth
                        helperText={isError}
                        id="username"
                        label="Введите имя"
                        onChange={handleInputChange}
                        size="small"
                        type="text"
                        value={username}
                    />
                    <TextField
                        color={isError ? "error" : "secondary"}
                        error={!!isError}
                        fullWidth
                        helperText={isError}
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
                        onClick={handleLogin}
                        variant="contained"
                    >Авторизоваться</LoginButton>
                    <Link to="/">
                        <LoginButton
                            fullWidth
                            variant="contained"
                        >Зарегистрироваться</LoginButton>
                    </Link>
                </Box>
            </LoginBox>
        </HtmlWrapper>
    );
}

export default Login;
