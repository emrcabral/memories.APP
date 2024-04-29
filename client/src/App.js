import React from "react";
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';


import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";


const App = () => {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Container maxWidth="lg">
                    <Navbar />
                    <Routes>
                        <Route path="/" exact component={Home} />
                        <Route path="/auth" exact component={Auth} />
                    </Routes>
                    <Home />
                </Container>
            </BrowserRouter>
        </ThemeProvider>
        
    );
}

export default App;
