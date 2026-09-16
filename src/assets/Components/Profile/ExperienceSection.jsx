import "./ExperienceSection.css";

function ExperienceSection({ experiences, onAdd, onDelete }) {
    return (
        <section className="experience-section">
            <div className="experience-header">
                <div>
                    <h2>Experience</h2>
                    <p>Your professional and project experience</p>
                </div>

                <button
                    className="add-experience-button"
                    onClick={onAdd}
                >
                    <i className="bi bi-plus-lg"></i>
                    Add Experience
                </button>
            </div>

            {experiences.length > 0 ? (
                <div className="experience-list">
                    {experiences.map((experience) => (
                        <article
                            className="experience-card"
                            key={experience.id}
                        >
                            <div className="experience-icon">
                                <i className="bi bi-briefcase-fill"></i>
                            </div>

                            <div className="experience-content">
                                <div className="experience-top">
                                    <div>
                                        <h3>{experience.role}</h3>
                                        <p>{experience.company}</p>
                                    </div>

                                    <button
                                        className="delete-experience-button"
                                        onClick={() =>
                                            onDelete(experience.id)
                                        }
                                    >
                                        <i className="bi bi-trash3"></i>
                                    </button>
                                </div>

                                <span className="experience-duration">
                                    <i className="bi bi-calendar3"></i>
                                    {experience.duration}
                                </span>

                                {experience.description && (
                                    <p className="experience-description">
                                        {experience.description}
                                    </p>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="experience-empty">
                    <div className="experience-empty-icon">
                        <i className="bi bi-briefcase"></i>
                    </div>

                    <h3>No experience added</h3>

                    <p>
                        Add internships, jobs, freelance work, or other
                        professional experience.
                    </p>

                    <button
                        className="experience-empty-button"
                        onClick={onAdd}
                    >
                        <i className="bi bi-plus-lg"></i>
                        Add Experience
                    </button>
                </div>
            )}
        </section>
    );
}

export default ExperienceSection;