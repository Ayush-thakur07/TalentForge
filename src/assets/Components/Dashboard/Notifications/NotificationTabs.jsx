function NotificationTabs({ activeTab, setActiveTab, counts }) {
    const tabs = [
        { id: 'all', label: 'All', icon: 'bi-grid', count: counts.all },
        { id: 'unread', label: 'Unread', icon: 'bi-bell', count: counts.unread },
        { id: 'applications', label: 'Applications', icon: 'bi-person-badge', count: counts.applications },
        { id: 'connections', label: 'Connections', icon: 'bi-people', count: counts.connections },
    ];

    return (
        <div className="notification-tabs-bar">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                >
                    <i className={`bi ${tab.icon}`}></i>
                    <span>{tab.label}</span>
                    {tab.count > 0 && <span className="tab-count">{tab.count}</span>}
                </button>
            ))}
        </div>
    );
}

export default NotificationTabs;
