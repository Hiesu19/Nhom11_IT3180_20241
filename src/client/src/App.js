import React, { useState, useEffect } from "react";
import {
    Route,
    Routes,
    useNavigate,
    BrowserRouter as Router,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Layout from "./Components/Layout";
import UserList from "./Components/Page/Profile/UserList";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={<Layout content={<UserList />} />}
                    
                />
                <Route
                    path="/employee_management"
                    element={<Layout content={<UserList />} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
