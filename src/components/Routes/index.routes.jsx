import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/authContext';
import Login from "../../pages/Login";
import Trending from "../../pages/Trending";
import ErrorAuth from "../../pages/ErrorAuth";
import Profil from "../../pages/Profil";


// Routes de l'application
const IndexRoutes = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                {isLoggedIn ? <Route path="/trending" element={<Trending/>} /> : <Route path="/trending" element={<ErrorAuth />} />}
                {isLoggedIn ? <Route path="/profil" element={<Profil/>} /> : <Route path="/profil" element={<ErrorAuth />} />}
                <Route path="*" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default IndexRoutes;