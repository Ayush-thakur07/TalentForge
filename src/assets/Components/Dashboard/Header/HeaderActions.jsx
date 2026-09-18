import { useState } from "react";
import { useNotifications } from "../../../../context/NotificationContext";
import NotificationDropdown from "./NotificationDropdown";
import { auth } from "../../../../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext";
import { useMessages } from "../../../../context/MessageContext";
function HeaderActions() {
    const { currentUser: user, setCurrentUser } = useUser();
    const[profileOpen,setProfileOpen]=useState(false);
    const navigate=useNavigate();
    function toggleProfile()
    {
        setProfileOpen(!profileOpen);
    }
    const { unreadCount } = useNotifications();
    const { unreadCount: unreadMessageCount, markAllAsRead } = useMessages();
    const [dropdownOpen, setDropdownOpen] = useState(false);
 
    function toggleDropdown() {
        setDropdownOpen(!dropdownOpen);
    } 
    //to logout user from local storage,firebase
    async function UserLogout()
    {
        await signOut(auth);
        setCurrentUser(null);
        
        navigate("/login");

    }
    function msgcount() {
        markAllAsRead();
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
                {unreadMessageCount > 0 && (
                    <span id="four">{unreadMessageCount >= 100 ? "99+" : unreadMessageCount}</span>
                )}
            </button>
            <div className="profile-wrapper">
            <button onClick={toggleProfile} className="profile-trigger">
                {user?.avatar ? (
        <img
            src={user.avatar}
            alt={user?.name || "Profile"}
            className="header-avatar"
        />
    ) : (
        <i className="bi bi-person-circle"></i>
    )}
            <span className="user_name">{user?.name || "User"}</span>
            <i className="bi bi-chevron-compact-down"></i>
            </button>
            {profileOpen && (<div className="profile-dropdown">
                <div className="head">
                    {user?.avatar ? <img src={user.avatar} alt="Profile"/> : <i className="bi bi-person-circle"></i>}
                    <h1>{user?.name || "User"}</h1>
                    <p>{user?.email}</p>
                </div>
                    <div className="buttons_profile">
                        <button onClick={() => navigate("/profile")}><i className="bi bi-person"></i>View Profile</button>
                        <button onClick={() =>navigate("/profile", {state: { openEdit: true }})}><i className="bi bi-pencil"></i>Edit Profile</button>
                        <button><i className="bi bi-gear"></i>Account Settings</button>
                    </div>
                    <div className="Logout">
                        <button onClick={UserLogout}><i className="bi bi-box-arrow-left"></i>Logout</button>
                        <p>Sign out from TalentForge</p>
                    </div>
            </div>)}
        </div>
        </div>
    );
    
}

export default HeaderActions;
