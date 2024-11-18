import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import Login from "./Components/Login/Login";
import Layout from "./Components/Layout";

import Dashboard from "./Components/Page/Dashboard/Dashboard";

import UserList from "./Components/Page/Profile/UserList";
import EditEmployee from "./Components/Page/Profile/EditEmployee";
import DetailEmployee from "./Components/Page/Profile/DetailEmployee";

import ProductManagement from "./Components/Page/ProductManagement/ProductList";
import ProductDetail from "./Components/Page/ProductManagement/ProductDetail";

import CreateInvoicet from "./Components/Page/CreateInvoicet/CreateInvoicet";
import InvoicePreview from "./Components/Page/CreateInvoicet/InvoicePreview";
import CashPayment from "./Components/Page/CreateInvoicet/CashPayment";
import BankPayment from "./Components/Page/CreateInvoicet/BankPayment";

import ShowNotification from "./Components/Page/Notification/ShowNotification";

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
                    path="/employee_management/edit/:id"
                    element={<Layout content={<EditEmployee />} />}
                />
                <Route
                    path="/employee_management/detail/:id"
                    element={<Layout content={<DetailEmployee />} />}
                />
                <Route
                    path="/create_invoicet"
                    element={<Layout content={<CreateInvoicet />} />}
                />
                <Route
                    path="/invoice_preview"
                    element={<Layout content={<InvoicePreview />} />}
                />
                <Route
                    path="/invoice_preview/cash"
                    element={<Layout content={<CashPayment />} />}
                />
                <Route
                    path="/invoice_preview/bank"
                    element={<Layout content={<BankPayment />} />}
                />
                <Route
                    path="/product_management"
                    element={<Layout content={<ProductManagement />} />}
                />
                <Route
                    path="/product/:id"
                    element={<Layout content={<ProductDetail />} />}
                />
                <Route
                    path="/notification"
                    element={<Layout content={<ShowNotification />} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
