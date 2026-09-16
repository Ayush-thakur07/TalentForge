import { useState } from "react";
import "./ProjectsSection.css";

function ProjectsSection({ projects, onAdd, onDelete }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        technologies: "",
        link: ""
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!form.title || !form.description) {
            return;
        }

        onAdd({
            id: Date.now(),
            title: form.title,
            description: form.description,
            technologies: form.technologies
                .split(",")
                .map(item => item.trim())
                .filter(item => item),
            link: form.link
        });

        setForm({
            title: "",
            description: "",
            technologies: "",
            link: ""
        });
    }

    return (
        <section className="projects-section">
            <div className="projects-header">
                <div>
                    <h2>Projects</h2>
                    <p>Showcase the projects you have built</p>
                </div>

                <div className="projects-header-icon">
                    <i className="bi bi-folder2-open"></i>
                </div>
            </div>

            <form className="projects-form" onSubmit={handleSubmit}>
                <div className="projects-field">
                    <label>Project Name</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        placeholder="Enter project name"
                        onChange={handleChange}
                    />
                </div>

                <div className="projects-field">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        placeholder="Describe your project"
                        rows="4"
                        onChange={handleChange}
                    />
                </div>

                <div className="projects-field">
                    <label>Technologies</label>
                    <input
                        type="text"
                        name="technologies"
                        value={form.technologies}
                        placeholder="React, Java, MongoDB"
                        onChange={handleChange}
                    />
                </div>

                <div className="projects-field">
                    <label>Project Link</label>
                    <input
                        type="url"
                        name="link"
                        value={form.link}
                        placeholder="https://github.com/..."
                        onChange={handleChange}
                    />
                </div>

                <button className="projects-add-button" type="submit">
                    <i className="bi bi-plus-lg"></i>
                    Add Project
                </button>
            </form>

            <div className="projects-list">
                {projects.length > 0 ? (
                    projects.map(project => (
                        <article className="project-card" key={project.id}>
                            <div className="project-card-icon">
                                <i className="bi bi-code-slash"></i>
                            </div>

                            <div className="project-card-content">
                                <div className="project-card-top">
                                    <h3>{project.title}</h3>

                                    <button
                                        className="project-delete"
                                        onClick={() => onDelete(project.id)}
                                    >
                                        <i className="bi bi-trash3"></i>
                                    </button>
                                </div>

                                <p>{project.description}</p>

                                {project.technologies.length > 0 && (
                                    <div className="project-technologies">
                                        {project.technologies.map(
                                            (technology, index) => (
                                                <span key={index}>
                                                    {technology}
                                                </span>
                                            )
                                        )}
                                    </div>
                                )}

                                {project.link && (
                                    <a
                                        className="project-link"
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="bi bi-box-arrow-up-right"></i>
                                        View Project
                                    </a>
                                )}
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="projects-empty">
                        <i className="bi bi-folder2-open"></i>
                        <h3>No projects added yet</h3>
                        <p>
                            Add projects to showcase your work and skills.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ProjectsSection;