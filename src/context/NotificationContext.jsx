/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { initialNotifications } from '../assets/Components/Dashboard/Notifications/notificationData';
import { useUser } from './UserContext';

const NotificationContext = createContext();
const STORAGE_PREFIX = 'talentforge_notifications_v1';

function getUserKey(user) {
    return user?.uid || user?.id || user?.email || 'guest';
}

function normalizeNotifications(value) {
    if (!Array.isArray(value)) return initialNotifications;
    return value.map((notification) => (
        notification.id === 'n1' && !notification.applicationId
            ? { ...notification, applicationId: 'app_001', actionUrl: undefined }
            : notification
    ));
}

function readNotifications(storageKey) {
    try {
        const saved = localStorage.getItem(storageKey);
        return saved ? normalizeNotifications(JSON.parse(saved)) : initialNotifications;
    } catch (error) {
        console.error('Failed to parse notifications from localStorage:', error);
        return initialNotifications;
    }
}

function NotificationStore({ storageKey, children }) {
    const [notifications, setNotifications] = useState(() => readNotifications(storageKey));

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(notifications));
        } catch (error) {
            console.error('Failed to save notifications to localStorage:', error);
        }
    }, [notifications, storageKey]);

    const unreadCount = notifications.filter((notification) => !notification.read).length;
    const markAsRead = (id) => setNotifications((previous) => previous.map((item) => item.id === id ? { ...item, read: true } : item));
    const toggleReadStatus = (id) => setNotifications((previous) => previous.map((item) => item.id === id ? { ...item, read: !item.read } : item));
    const markAllAsRead = () => setNotifications((previous) => previous.map((item) => ({ ...item, read: true })));
    const deleteNotification = (id) => setNotifications((previous) => previous.filter((item) => item.id !== id));
    const clearReadNotifications = () => setNotifications((previous) => previous.filter((item) => !item.read));
    const resetNotifications = () => setNotifications(initialNotifications);
    const addNotification = (notification) => setNotifications((previous) => (
        previous.some((item) => item.id === notification.id) ? previous : [notification, ...previous]
    ));

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, toggleReadStatus, markAllAsRead, deleteNotification, clearReadNotifications, resetNotifications, addNotification }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function NotificationProvider({ children }) {
    const { currentUser } = useUser();
    const userKey = getUserKey(currentUser);
    return <NotificationStore key={userKey} storageKey={`${STORAGE_PREFIX}_${userKey}`}>{children}</NotificationStore>;
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
    return context;
}

export default NotificationContext;
