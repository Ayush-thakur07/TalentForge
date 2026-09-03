function SidebarItem({ label, href, icon, active })
{
    return(
        <a
            href={href}
            className={active ? "sidebar-item active" : "sidebar-item"}
        >
            <i className={icon}></i>
            <span>{label}</span>
        </a>
    );
}

export default SidebarItem;