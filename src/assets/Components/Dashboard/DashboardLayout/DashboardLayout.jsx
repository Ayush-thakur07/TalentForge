import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    //useState it will toggle between opening an closing the sodebar
    function toggleSidebar() {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <div className="dashboard">
            <Header toggleSidebar={toggleSidebar} />

            <div className="dashboard_body">
                <Sidebar sidebarOpen={sidebarOpen} />

                <main className="dashboard_main">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;