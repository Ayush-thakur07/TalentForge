import { useState, useMemo } from 'react';
import { useNotifications } from '../../../../context/NotificationContext';
import NotificationHeader from './NotificationHeader';
import NotificationTabs from './NotificationTabs';
import NotificationItem from './NotificationItem';
import './Notifications.css';

function NotificationsPage() {
    const { notifications, resetNotifications } = useNotifications();
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const counts = useMemo(() => {
        return {
            all: notifications.length,
            unread: notifications.filter(n => !n.read).length,
            applications: notifications.filter(n => n.type === 'applications' && !n.read).length,
            connections: notifications.filter(n => n.type === 'connections' && !n.read).length,
        };
    }, [notifications]);

    const filteredNotifications = useMemo(() => {
        return notifications.filter(item => {
            if (activeTab === 'unread' && item.read) return false;
            if (activeTab !== 'all' && activeTab !== 'unread' && item.type !== activeTab) return false;

            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                const titleMatch = typeof item.title === 'string' ? item.title.toLowerCase().includes(query) : false;
                const messageMatch = typeof item.message === 'string' ? item.message.toLowerCase().includes(query) : false;
                const userName = typeof item.user?.name === 'string' ? item.user.name : '';
                const userMatch = userName.toLowerCase().includes(query);
                return titleMatch || messageMatch || userMatch;
            }

            return true;
        });
    }, [notifications, activeTab, searchQuery]);

    return (
        <div className="notifications-page">
            <NotificationHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <NotificationTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                counts={counts}
            />

            <div className="notifications-list-container">
                {filteredNotifications.length === 0 ? (
                    <div className="notifications-empty-state">
                        <div className="empty-icon-circle">
                            <i className="bi bi-bell-slash"></i>
                        </div>
                        <h3>No Notifications Found</h3>
                        <p>
                            {searchQuery
                                ? `No notifications matching "${searchQuery}"`
                                : `You don't have any notifications in the "${activeTab}" category right now.`}
                        </p>
                        <div className="empty-actions">
                            {searchQuery && (
                                <button className="btn-primary" onClick={() => setSearchQuery('')}>
                                    Clear Search
                                </button>
                            )}
                            {notifications.length === 0 && (
                                <button className="btn-secondary" onClick={resetNotifications}>
                                    <i className="bi bi-arrow-clockwise"></i> Reload Notifications
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="notifications-list">
                        {filteredNotifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default NotificationsPage;
