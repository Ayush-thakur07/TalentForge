import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Hero from "./Hero/hero";
import SignupBrandPanel from "../Authentication/Signup/SignupBrand";

function Dashboard()
{
    const [sidebarOpen, setSidebarOpen] = useState(true);

    function toggleSidebar()
    {
        setSidebarOpen(!sidebarOpen);
    }
    return(
        <div className="dashboard">

            <Header toggleSidebar={toggleSidebar} />

            <div className="dashboard_body">

                <Sidebar sidebarOpen={sidebarOpen} />

                <main className="dashboard_main">
                    <Hero />
                    
                </main>
                <SignupBrandPanel/>
            </div>
        </div>
    );
}

export default Dashboard;
