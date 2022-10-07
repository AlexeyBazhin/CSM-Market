import React from 'react';

import './style.scss';
import {
    Button,
    Container,
    TextField,
    Typography,
    Alert,
    Backdrop,
    CircularProgress,
} from '@mui/material';

const Auth = ({
    error,
    isLoading,
    password,
    email,
    
    auth,
    setPassword,
    setEmail,
}) => {
    return (
        <>
            <Typography
                sx={{
                    marginTop: 2,
                    marginBottom: 20,
                }}
                align="center"
                variant="h4"
                component="div">
                Авторизация
            </Typography>
            <Container
                maxWidth="xs"
                className="auth-container">
                <TextField
                    required
                    label="Почта"
                    type="email"
                    variant="standard"
                    value={email || ''}
                    onChange={({target: {value}}) => setEmail(value)}/>
                <TextField
                    required
                    label="Пароль"
                    type="password"
                    variant="standard"
                    value={password || ''}
                    onChange={({target: {value}}) => setPassword(value)}/>
                <Button
                    disabled={!email || !password}
                    variant="outlined"
                    onClick={auth}>
                    Войти
                </Button>
                {error && (
                    <Alert
                        severity="error"
                        variant="outlined"
                        sx={{
                            marginTop: 2,
                        }}>
                        {error}
                    </Alert>
                )}
            </Container>
            <Backdrop
                sx={{color: '#fff', zIndex: theme => theme.zIndex.drawer + 1}}
                open={isLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
};

export default Auth;
