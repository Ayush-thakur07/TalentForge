import "./ConnectionsSection.css";

function ConnectionsSection({ connections = [] }) {
    return (
        <section className="connections-section">

            <div className="connections-header">
                <div>
                    <h2>Connections</h2>
                    <p>People I'm connected with</p>
                </div>

                <span className="connections-count">
                    {connections.length}
                </span>
            </div>

            {connections.length > 0 ? (
                <div className="connections-grid">
                    {connections.map((connection, index) => (
                        <article
                            className="connection-card"
                            key={connection.id || index}
                        >
                            <div className="connection-avatar">
                                {connection.avatar ? (
                                    <img
                                        src={connection.avatar}
                                        alt={connection.name}
                                    />
                                ) : (
                                    <i className="bi bi-person"></i>
                                )}
                            </div>

                            <div className="connection-information">
                                <h3>{connection.name}</h3>

                                {connection.role && (
                                    <p>{connection.role}</p>
                                )}

                                {connection.university && (
                                    <span>{connection.university}</span>
                                )}
                            </div>

                            <button className="connection-view-button">
                                View
                            </button>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="connections-empty">

                    <div className="connections-empty-icon">
                        <i className="bi bi-people"></i>
                    </div>

                    <h3>No connections yet</h3>

                    <p>
                        Connect with students and start building your network.
                    </p>

                    <button className="connections-empty-button">
                        <i className="bi bi-search"></i>
                        Find People
                    </button>

                </div>
            )}

        </section>
    );
}

export default ConnectionsSection;