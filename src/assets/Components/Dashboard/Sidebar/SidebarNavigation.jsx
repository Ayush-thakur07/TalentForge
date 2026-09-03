import SidebarItem from "./SidebarItem";
function SidebarNavigation()
{
    return(
        <nav>
            <SidebarItem 
            label="Dashboard" 
            href="/dashboard" 
            icon="bi bi-house"
            active={true}
            />

             <SidebarItem
                label="Browse Students"
                href="/students"
                icon="bi bi-search"
            />

            <SidebarItem
                label="Browse Projects"
                href="/projects"
                icon="bi bi-folder2-open"
            />

            <SidebarItem
                label="My Listings"
                href="/listings"
                icon="bi bi-card-list"
            />

            <SidebarItem
                label="Connections"
                href="/connections"
                icon="bi bi-people"
            />

            <SidebarItem
                label="Messages"
                href="/messages"
                icon="bi bi-chat"
            />

            <SidebarItem
                label="Saved"
                href="/saved"
                icon="bi bi-bookmark"
            />

            <SidebarItem
                label="Notifications"
                href="/notifications"
                icon="bi bi-bell"
            />

            <SidebarItem
                label="Profile"
                href="/profile"
                icon="bi bi-person"
            />

            <SidebarItem
                label="Analytics"
                href="/analytics"
                icon="bi bi-graph-up"
            />

            <SidebarItem
                label="Settings"
                href="/settings"
                icon="bi bi-gear"
            />

        </nav>
    );
}
export default SidebarNavigation;