import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../../../context/NotificationContext';
import { useApplications } from '../../../../context/ApplicationContext';

function NotificationItem({ notification }) {
    const { toggleReadStatus, deleteNotification, markAsRead } = useNotifications();
    const { openApplication } = useApplications();
    const navigate = useNavigate();

    const getTypeDetails = (type) => {
        switch (type) {
            case 'applications':
                return {
                    icon: 'bi-person-badge-fill',
                    badgeClass: 'badge-applications',
                    label: 'Application'
                };
            case 'connections':
            default:
                return {
                    icon: 'bi-people-fill',
                    badgeClass: 'badge-connections',
                    label: 'Connection'
                };
        }
    };

    const details = getTypeDetails(notification.type);

    const handleActionClick = () => {
        if (!notification.read) {
            markAsRead(notification.id);
        }
        if (notification.applicationId) {
            openApplication(notification.applicationId);
        } else if (notification.actionUrl && typeof notification.actionUrl === 'string' && notification.actionUrl.startsWith('/') && !notification.actionUrl.includes('://')) {
            navigate(notification.actionUrl);
        }
    };

    return (
        <div className={`notification-card ${!notification.read ? 'unread' : ''}`}>
            <div className="card-left">
                <div className={`icon-avatar ${details.badgeClass}`}>
                    <i className={`bi ${details.icon}`}></i>
                </div>
            </div>

            <div className="card-center">
                <div className="card-header-row">
                    <span className={`type-badge ${details.badgeClass}`}>
                        <i className={`bi ${details.icon}`}></i> {details.label}
                    </span>
                    <span className="card-time">{notification.timestamp}</span>
                </div>

                <h3 className="card-title">{notification?.title || "Notification"}</h3>
                <p className="card-message">{notification?.message || ""}</p>

                {notification?.user && (
                    <div className="user-subtitle">
                        <i className="bi bi-person"></i> {notification.user.name || "User"} • {notification.user.role || ""}
                    </div>
                )}
            </div>

            <div className="card-right">
                {(notification.actionUrl || notification.applicationId) && (
                    <button className="btn-action" onClick={handleActionClick}>
                        View Details <i className="bi bi-arrow-right-short"></i>
                    </button>
                )}

                <button
                    className="btn-icon-action"
                    onClick={() => toggleReadStatus(notification.id)}
                    title={notification.read ? "Mark as unread" : "Mark as read"}
                >
                    <i className={`bi ${notification.read ? 'bi-envelope' : 'bi-envelope-open'}`}></i>
                </button>

                <button
                    className="btn-icon-action delete"
                    onClick={() => deleteNotification(notification.id)}
                    title="Delete notification"
                >
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        </div>
    );
}

export default NotificationItem;
