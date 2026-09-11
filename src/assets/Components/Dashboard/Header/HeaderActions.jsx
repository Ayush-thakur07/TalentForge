import { useState } from "react";
import { useNotifications } from "../../../../context/NotificationContext";
import NotificationDropdown from "./NotificationDropdown";

function HeaderActions() {
    const { unreadCount } = useNotifications();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [messageCount, setMessageCount] = useState(3);

    function toggleDropdown() {
        setDropdownOpen(!dropdownOpen);
    }

    function msgcount() {
        setMessageCount(0);
    }

    return (
        <div className="Headeractions">
            <div className="notification-wrapper" style={{ position: 'relative' }}>
                <button
                    aria-label="Notifications"
                    onClick={toggleDropdown}
                    className={dropdownOpen ? 'active' : ''}
                >
                    <i className="bi bi-bell" id="one"></i>
                    {unreadCount > 0 && <span id="two">{unreadCount}</span>}
                </button>

                <NotificationDropdown
                    isOpen={dropdownOpen}
                    onClose={() => setDropdownOpen(false)}
                />
            </div>

            <button aria-label="Messages" onClick={msgcount}>
                <i className="bi bi-chat-dots-fill" id="three"></i>
                {messageCount > 0 && (
                    <span id="four">{messageCount >= 100 ? "99+" : messageCount}</span>
                )}
            </button>

            <i className="bi bi-person-circle" style={{ fontSize: '28px', color: '#4f46e5' }}></i>
            <span className="user_name">Misthi</span>
            <i className="bi bi-chevron-compact-down"></i>
        </div>
    );
}

export default HeaderActions;