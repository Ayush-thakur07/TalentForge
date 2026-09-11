import DashboardLayout from "./DashboardLayout/DashboardLayout";
import Hero from "./Hero/hero";
import SignupBrandPanel from "../Authentication/Signup/SignupBrand";

function Dashboard() {
    return (
        <DashboardLayout>
            <Hero />
            <SignupBrandPanel />
        </DashboardLayout>
    );
}

export default Dashboard;