import { createContext, useContext, useState, useEffect } from 'react';
import { initialNotifications } from '../assets/Components/Dashboard/Notifications/notificationData';

const NotificationContext = createContext();

const LOCAL_STORAGE_KEY = 'talentforge_notifications_v1';

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState(() => {
        try {
            const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('Failed to parse notifications from localStorage:', error);
        }
        return initialNotifications;
    });

    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notifications));
        } catch (error) {
            console.error('Failed to save notifications to localStorage:', error);
        }
    }, [notifications]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(item => (item.id === id ? { ...item, read: true } : item))
        );
    };

    const toggleReadStatus = (id) => {
        setNotifications(prev =>
            prev.map(item => (item.id === id ? { ...item, read: !item.read } : item))
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(item => ({ ...item, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(item => item.id !== id));
    };

    const clearReadNotifications = () => {
        setNotifications(prev => prev.filter(item => !item.read));
    };

    const resetNotifications = () => {
        setNotifications(initialNotifications);
    };

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                markAsRead,
                toggleReadStatus,
                markAllAsRead,
                deleteNotification,
                clearReadNotifications,
                resetNotifications
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
}

export default NotificationContext;
