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
import Dashboard from "./Components/Page/Dashboard/Dashboard";

import ProductManagement from "./Components/Page/ProductManagement/ProductList";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={<Layout content={<Dashboard />} />}
                    
                />
                <Route
                    path="/employee_management"
                    element={<Layout content={<UserList />} />}
                />
                <Route
                    path="/product_management"
                    element={<Layout content={<ProductManagement />} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
