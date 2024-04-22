import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { HtmlWrapper, Text, LoginBox, LoginButton } from "../styles/AuthForm";

interface AuthFormProps {
    buttonText: string;
    error: string;
    onSubmit: (username: string, password: string) => void;
    showPasswordError?: boolean;
    title: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ buttonText, error, onSubmit, showPasswordError, title }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleSubmit = () => {
        onSubmit(username, password);
    };

    return (
        <HtmlWrapper
            alignItems="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            sx={{ width: '100%' }}
        >
            <Text>{title}</Text>
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
                        color={error ? "error" : "secondary"}
                        error={!!error}
                        fullWidth
                        helperText={error}
                        id="username"
                        label="Введите имя"
                        onChange={handleInputChange}
                        size="small"
                        type="text"
                        value={username}
                    />
                    <TextField
                        color={showPasswordError && error ? "error" : "secondary"}
                        error={showPasswordError && !!error}
                        fullWidth
                        helperText={showPasswordError && error}
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
                        onClick={handleSubmit}
                        variant="contained"
                    >
                        {buttonText}
                    </LoginButton>
                    <Link to={title === "Авторизация" ? "/" : "/login"}>
                        <LoginButton 
                            fullWidth 
                            variant="contained"
                        >
                            {title === "Авторизация" ? "Зарегистрироваться" : "Авторизоваться"}
                        </LoginButton>
                    </Link>
                </Box>
            </LoginBox>
        </HtmlWrapper>
    );
}

export default AuthForm;
