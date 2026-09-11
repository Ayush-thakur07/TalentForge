import { useNotifications } from '../../../../context/NotificationContext';

function NotificationHeader({ searchQuery, setSearchQuery }) {
    const { unreadCount, markAllAsRead, clearReadNotifications, resetNotifications } = useNotifications();

    return (
        <div className="notifications-header-section">
            <div className="notifications-toolbar">
                <div className="search-wrapper">
                    <i className="bi bi-search search-icon"></i>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search notifications by keyword or title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            className="search-clear"
                            onClick={() => setSearchQuery('')}
                            title="Clear search"
                        >
                            <i className="bi bi-x"></i>
                        </button>
                    )}
                </div>

                <div className="toolbar-actions">
                    <button
                        className="btn-secondary"
                        onClick={markAllAsRead}
                        disabled={unreadCount === 0}
                        title="Mark all notifications as read"
                    >
                        <i className="bi bi-check2-all"></i> Mark All Read
                    </button>
                    <button
                        className="btn-outline-danger"
                        onClick={clearReadNotifications}
                        title="Clear read notifications"
                    >
                        <i className="bi bi-trash"></i> Clear Read
                    </button>
                    <button
                        className="btn-ghost"
                        onClick={resetNotifications}
                        title="Reload notifications"
                    >
                        <i className="bi bi-arrow-clockwise"></i> Reload
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotificationHeader;
