import { useState } from "react";
import "./ProfileTabs.css";

function ProfileTabs() {
    const [activeTab, setActiveTab] = useState("Overview");

    const tabs = [
        {
            label: "Overview",
            icon: "bi bi-grid"
        },
        {
            label: "Projects",
            icon: "bi bi-folder2-open"
        },
        {
            label: "Skills",
            icon: "bi bi-lightning"
        },
        {
            label: "Experience",
            icon: "bi bi-briefcase"
        },
        {
            label: "Education",
            icon: "bi bi-mortarboard"
        },
        {
            label: "Connections",
            icon: "bi bi-people"
        },
        {
            label: "Activity",
            icon: "bi bi-activity"
        }
    ];

    return (
        <section className="profile-tabs">
            <div className="profile-tabs-container">
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        className={`profile-tab ${
                            activeTab === tab.label ? "active" : ""
                        }`}
                        onClick={() => setActiveTab(tab.label)}
                    >
                        <i className={tab.icon}></i>
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>
        </section>
    );
}

export default ProfileTabs;