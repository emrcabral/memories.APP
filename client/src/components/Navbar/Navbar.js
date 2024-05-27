import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import memories from '../../images/memories.png';
import { useDispatch } from 'react-redux';

import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/auth');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if(token) {
            try {
                const decodedToken = jwtDecode(token);
    
                if(decodedToken.exp * 1000 < new Date().getTime()) {
                    logout();
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Toolbar className={classes.toolbar}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
                    Memories
                    <img className={classes.image} src={memories} alt="memories" height="60" />
                </Typography>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
