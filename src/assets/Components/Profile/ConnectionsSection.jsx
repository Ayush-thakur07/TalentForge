import { useState } from "react";
import "./ConnectionsSection.css";

function ConnectionsSection({ connections, onAdd, onDelete }) {
    const [form, setForm] = useState({
        name: "",
        role: "",
        email: ""
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!form.name || !form.role) {
            return;
        }

        onAdd({
            id: Date.now(),
            name: form.name,
            role: form.role,
            email: form.email
        });

        setForm({
            name: "",
            role: "",
            email: ""
        });
    }

    return (
        <section className="connections-section">
            <div className="connections-header">
                <div>
                    <h2>Connections</h2>
                    <p>People you're connected with</p>
                </div>

                <div className="connections-header-icon">
                    <i className="bi bi-people-fill"></i>
                </div>
            </div>

            <form
                className="connections-form"
                onSubmit={handleSubmit}
            >
                <div className="connections-form-row">
                    <div className="connections-field">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            placeholder="Enter name"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="connections-field">
                        <label>Role</label>
                        <input
                            type="text"
                            name="role"
                            value={form.role}
                            placeholder="Student, Developer..."
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="connections-field">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        placeholder="Enter email"
                        onChange={handleChange}
                    />
                </div>

                <button
                    className="connections-add-button"
                    type="submit"
                >
                    <i className="bi bi-person-plus"></i>
                    Add Connection
                </button>
            </form>

            <div className="connections-list">
                {connections.length > 0 ? (
                    connections.map(connection => (
                        <article
                            className="connection-card"
                            key={connection.id}
                        >
                            <div className="connection-avatar">
                                {connection.name
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div className="connection-content">
                                <div className="connection-top">
                                    <div>
                                        <h3>{connection.name}</h3>
                                        <p>{connection.role}</p>
                                    </div>

                                    <button
                                        className="connection-delete"
                                        onClick={() =>
                                            onDelete(connection.id)
                                        }
                                    >
                                        <i className="bi bi-trash3"></i>
                                    </button>
                                </div>

                                {connection.email && (
                                    <span className="connection-email">
                                        <i className="bi bi-envelope"></i>
                                        {connection.email}
                                    </span>
                                )}
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="connections-empty">
                        <i className="bi bi-people"></i>
                        <h3>No connections yet</h3>
                        <p>
                            Your connections will appear here.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ConnectionsSection;