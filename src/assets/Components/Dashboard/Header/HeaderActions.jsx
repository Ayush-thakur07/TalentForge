import { useState,useEffect } from "react";
import { useNotifications } from "../../../../context/NotificationContext";
import NotificationDropdown from "./NotificationDropdown";
import { auth } from "../../../../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function HeaderActions() {
    const[user,setUserName]=useState(null);
    const[profileOpen,setProfileOpen]=useState(false);
    const navigate=useNavigate();
    function toggleProfile()
    {
        setProfileOpen(!profileOpen);
    }
    //we are using useEffect here because components are generating side effects outside their component renders
    useEffect(()=>
{
   const storeduser=localStorage.getItem("user");
   if(storeduser)
    {
        setUserName(JSON.parse(storeduser));
    } 
},[]);

console.log(user);
    const { unreadCount } = useNotifications();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [messageCount, setMessageCount] = useState(3);
 
    function toggleDropdown() {
        setDropdownOpen(!dropdownOpen);
    } 
    //to logout user from local storage,firebase
    async function UserLogout()
    {
        await signOut(auth);
        localStorage.removeItem("user");
        
        navigate("/login");

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
            <div className="profile-wrapper">
            <button onClick={toggleProfile} className="profile-trigger">
                {user?.avatar ? (
        <img
            src={user.avatar}
            alt={user.name || "Profile"}
            className="header-avatar"
        />
    ) : (
        <i className="bi bi-person-circle"></i>
    )}
            <span className="user_name">{user?.name}</span>
            <i className="bi bi-chevron-compact-down"></i>
            </button>
            {profileOpen && (<div className="profile-dropdown">
                <div className="head">
                    <img src={user?.avatar} alt="Profile"/>
                    <h1>{user?.name}</h1>
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