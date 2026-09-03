import { useState } from "react";

function HeaderActions()
{
    const [notificationCount, setNotificationCount] = useState(3);
    const [messageCount, setMessageCount] = useState(140);
    function notify()
    {
        setNotificationCount(0);
    }
    function msgcount()
    {
        setMessageCount(0);
    }
    return(
         <div className="Headeractions">
            <button  aria-label="Notifications" onClick={notify}><i className="bi bi-bell" id="one"></i>
            {notificationCount >0 && <span id="two">{notificationCount}</span>}</button>
            <button aria-label="Messages" onClick={msgcount}><i className="bi bi-chat-dots-fill" id="three"></i>
            {messageCount >0 && (<span id="four"> {messageCount >=100 ? "99+": messageCount}
            </span>)}
            </button>
            <img src="https://pngtree.com/free-png-vectors/profile-picture"/>
            <span className="user_name">Misthi</span>
            <i className="bi bi-chevron-compact-down"></i>
         </div>
    );
}
export default HeaderActions;