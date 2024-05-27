import React from "react";
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";


const App = () => {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Container maxWidth="xl">
                    <Navbar />
                    <Routes>
                        <Route path="/" exact element={<Navigate to="/posts" />} />
                        <Route path="/posts" exact element={<Home />} />
                        <Route path="/posts/search" exact element={<Home />} />
                        <Route path="/posts/:id" exact element={<PostDetails />} />
                        <Route path="/auth" exact element={<Auth />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </ThemeProvider>
        
    );
}

export default App;
