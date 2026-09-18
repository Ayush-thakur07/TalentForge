/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext';

const MessageContext = createContext();
const STORAGE_PREFIX = 'talentforge_messages_v1';

function getUserKey(user) {
    return user?.uid || user?.id || user?.email || 'guest';
}

function readMessages(storageKey) {
    try {
        const saved = localStorage.getItem(storageKey);
        const messages = saved ? JSON.parse(saved) : [];
        return Array.isArray(messages) ? messages : [];
    } catch {
        return [];
    }
}

function MessageStore({ storageKey, children }) {
    const [messages, setMessages] = useState(() => readMessages(storageKey));
    const unreadCount = messages.filter((message) => !message.read).length;

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(messages));
    }, [messages, storageKey]);

    const markAllAsRead = () => setMessages((previous) => previous.map((message) => ({ ...message, read: true })));
    return <MessageContext.Provider value={{ messages, unreadCount, markAllAsRead }}>{children}</MessageContext.Provider>;
}

export function MessageProvider({ children }) {
    const { currentUser } = useUser();
    const userKey = getUserKey(currentUser);
    return <MessageStore key={userKey} storageKey={`${STORAGE_PREFIX}_${userKey}`}>{children}</MessageStore>;
}

export function useMessages() {
    const context = useContext(MessageContext);
    if (!context) throw new Error('useMessages must be used within a MessageProvider');
    return context;
}
