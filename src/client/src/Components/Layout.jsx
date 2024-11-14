import React from "react";
import Sidebar from "./Sidebar/Sidebar";

const Layout = ({ content }) => {
    return (
        <div className="flex h-screen">
            <div className="w-1/10"> {/* Chiếm 30% chiều rộng cho Sidebar */}
                <Sidebar />
            </div>
            <div className="flex-grow w-9/10 overflow-y-auto bg-gray-100 p-6"> {/* Chiếm 70% chiều rộng cho nội dung */}
                {content}
            </div>
        </div>
    );
};

export default Layout;
