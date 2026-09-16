import "./ProjectSection.css";

function ProjectsSection({ projects = [] }) {
    return (
        <section className="projects-section">

            <div className="projects-header">
                <div>
                    <h2>Projects</h2>
                    <p>Projects I've worked on</p>
                </div>

                <button className="add-project-button">
                    <i className="bi bi-plus-lg"></i>
                    Add Project
                </button>
            </div>

            {projects.length > 0 ? (
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <article className="project-card" key={project.id || index}>

                            <div className="project-image">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                    />
                                ) : (
                                    <div className="project-image-placeholder">
                                        <i className="bi bi-folder2-open"></i>
                                    </div>
                                )}
                            </div>

                            <div className="project-card-content">

                                <h3>{project.title}</h3>

                                {project.description && (
                                    <p>{project.description}</p>
                                )}

                                {project.technologies?.length > 0 && (
                                    <div className="project-technologies">
                                        {project.technologies.map(
                                            (technology, technologyIndex) => (
                                                <span key={technologyIndex}>
                                                    {technology}
                                                </span>
                                            )
                                        )}
                                    </div>
                                )}

                            </div>

                        </article>
                    ))}
                </div>
            ) : (
                <div className="projects-empty">

                    <div className="projects-empty-icon">
                        <i className="bi bi-folder-plus"></i>
                    </div>

                    <h3>No projects yet</h3>

                    <p>
                        Add your projects to showcase your work and skills.
                    </p>

                    <button className="projects-empty-button">
                        <i className="bi bi-plus-lg"></i>
                        Add Your First Project
                    </button>

                </div>
            )}

        </section>
    );
}

export default ProjectsSection;