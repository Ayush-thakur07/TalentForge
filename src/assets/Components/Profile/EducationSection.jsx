import { useState } from "react";
import "./EducationSection.css";

function EducationSection({ education, onAdd, onDelete }) {
    const [form, setForm] = useState({
        institution: "",
        degree: "",
        field: "",
        duration: ""
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!form.institution || !form.degree || !form.duration) {
            return;
        }

        onAdd({
            id: Date.now(),
            ...form
        });

        setForm({
            institution: "",
            degree: "",
            field: "",
            duration: ""
        });
    }

    return (
        <section className="education-section">
            <div className="education-header">
                <div>
                    <h2>Education</h2>
                    <p>Add your academic background</p>
                </div>

                <div className="education-header-icon">
                    <i className="bi bi-mortarboard-fill"></i>
                </div>
            </div>

            <form className="education-form" onSubmit={handleSubmit}>
                <div className="education-form-row">
                    <div className="education-field">
                        <label>Institution</label>
                        <input
                            type="text"
                            name="institution"
                            value={form.institution}
                            placeholder="University or college"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="education-field">
                        <label>Degree</label>
                        <input
                            type="text"
                            name="degree"
                            value={form.degree}
                            placeholder="B.Tech, BCA, MCA..."
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="education-form-row">
                    <div className="education-field">
                        <label>Field of Study</label>
                        <input
                            type="text"
                            name="field"
                            value={form.field}
                            placeholder="Computer Science"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="education-field">
                        <label>Duration</label>
                        <input
                            type="text"
                            name="duration"
                            value={form.duration}
                            placeholder="2024 - 2028"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button className="education-add-button" type="submit">
                    <i className="bi bi-plus-lg"></i>
                    Add Education
                </button>
            </form>

            <div className="education-list">
                {education.length > 0 ? (
                    education.map((item) => (
                        <article className="education-card" key={item.id}>
                            <div className="education-icon">
                                <i className="bi bi-mortarboard"></i>
                            </div>

                            <div className="education-content">
                                <div className="education-card-top">
                                    <div>
                                        <h3>{item.degree}</h3>
                                        <p>{item.institution}</p>
                                    </div>

                                    <button
                                        className="education-delete"
                                        onClick={() => onDelete(item.id)}
                                    >
                                        <i className="bi bi-trash3"></i>
                                    </button>
                                </div>

                                {item.field && (
                                    <span className="education-field-name">
                                        {item.field}
                                    </span>
                                )}

                                <span className="education-duration">
                                    <i className="bi bi-calendar3"></i>
                                    {item.duration}
                                </span>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="education-empty">
                        <i className="bi bi-mortarboard"></i>
                        <h3>No education added yet</h3>
                        <p>Add your university, degree, and academic background.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default EducationSection;