import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../../pages/Login";
import Trending from "../../pages/Trending";


// Routes de l'application
const index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/trending" element={<Trending/>} />
                <Route path="*" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default index;