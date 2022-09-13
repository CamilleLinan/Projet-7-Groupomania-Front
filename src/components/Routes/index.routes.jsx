import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../../pages/Login";

const index = () => {
    return (
        <BrowserRouter>
            <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="*" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default index;