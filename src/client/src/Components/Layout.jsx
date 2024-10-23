// Layout.js
import React from "react";
import Sidebar from "./Sidebar/Sidebar";

const Layout = ({ content }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-grow overflow-y-auto bg-gray-100  p-6">
                {content}
            </div>
        </div>
    );
};

export default Layout;
