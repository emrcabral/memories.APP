import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

import Icon from './icon';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles';
import Input from './Input';

// Separate Google login button component
const GoogleSignInButton = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const googleSuccess = async tokenResponse => {
        const userInfo = await axios
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            })
            .then(res => res.data);
        
        const result = userInfo;
        const token = userInfo.sub;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = () => {
        console.log("Google Sign In was unsuccessful. Try again later.");
    };

    const login = useGoogleLogin({
        onSuccess: googleSuccess,
        onError: googleFailure,
        clientId: "673026358049-h3psc7l3rlf595c3cr9nslkotglgfcan.apps.googleusercontent.com", 
        scope: 'profile email openid',
    });

    return (
        <Button className={classes.googleButton} color="primary" fullWidth onClick={() => login()} startIcon={<Icon />} variant="contained">
            Google Login
        </Button>
    );
};

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => { 
        e.preventDefault();
        
        if(isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
     };

    const handleChange = (e) => { 
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };

    return (
        <GoogleOAuthProvider clientId="673026358049-h3psc7l3rlf595c3cr9nslkotglgfcan.apps.googleusercontent.com">
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            { isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                            )}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                        </Grid>
                        <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                            { isSignup ? 'Sign Up' : "Sign In" }
                        </Button>
                        <GoogleSignInButton />
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    { isSignup ? 'Already have and account? Sign In' : "Don't have an account? Sign Up" }
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </GoogleOAuthProvider>
    );
}

export default Auth;
