import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { useNotifications } from "../../../../context/NotificationContext";

function SidebarNavigation() {
    const location = useLocation();
    const { unreadCount } = useNotifications();

    const currentPath = location.pathname;

    return (
        <nav>
            <SidebarItem
                label="Dashboard"
                href="/dashboard"
                icon="bi bi-house"
                active={currentPath === "/dashboard"}
            />

            <SidebarItem
                label="Browse Students"
                href="/students"
                icon="bi bi-search"
                active={currentPath === "/students"}
            />

            <SidebarItem
                label="Browse Projects"
                href="/projects"
                icon="bi bi-folder2-open"
                active={currentPath === "/projects"}
            />

            <SidebarItem
                label="My Listings"
                href="/listings"
                icon="bi bi-card-list"
                active={currentPath === "/listings"}
            />

            <SidebarItem
                label="Connections"
                href="/connections"
                icon="bi bi-people"
                active={currentPath === "/connections"}
            />

            <SidebarItem
                label="Messages"
                href="/messages"
                icon="bi bi-chat"
                active={currentPath === "/messages"}
            />

            <SidebarItem
                label="Saved"
                href="/saved"
                icon="bi bi-bookmark"
                active={currentPath === "/saved"}
            />

            <SidebarItem
                label="Notifications"
                href="/notifications"
                icon="bi bi-bell"
                active={currentPath === "/notifications"}
                badge={unreadCount}
            />

            <SidebarItem
                label="Profile"
                href="/profile"
                icon="bi bi-person"
                active={currentPath === "/profile"}
            />

            <SidebarItem
                label="Analytics"
                href="/analytics"
                icon="bi bi-graph-up"
                active={currentPath === "/analytics"}
            />

            <SidebarItem
                label="Settings"
                href="/settings"
                icon="bi bi-gear"
                active={currentPath === "/settings"}
            />
        </nav>
    );
}

export default SidebarNavigation;