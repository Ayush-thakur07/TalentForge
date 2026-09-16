import { useState } from "react";
import "./SkillsSection.css";

function SkillsSection({ skills, onAddSkill, onRemoveSkill }) {
    const [skillInput, setSkillInput] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const skill = skillInput.trim();

        if (!skill) {
            return;
        }

        onAddSkill(skill);
        setSkillInput("");
    }

    return (
        <section className="skills-section">
            <div className="skills-section-header">
                <div>
                    <h2>Skills</h2>
                    <p>Showcase what you can do</p>
                </div>
                <div className="skills-section-icon">
                    <i className="bi bi-lightning-charge-fill"></i>
                </div>
            </div>

            <form className="skills-add-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={skillInput}
                    placeholder="Add a skill..."
                    onChange={(e) => setSkillInput(e.target.value)}
                />
                <button type="submit">
                    <i className="bi bi-plus-lg"></i>
                    Add Skill
                </button>
            </form>

            <div className="skills-list">
                {skills.length > 0 ? (
                    skills.map((skill, index) => (
                        <div className="skill-item" key={`${skill}-${index}`}>
                            <span>{skill}</span>
                            <button
                                type="button"
                                onClick={() => onRemoveSkill(skill)}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="skills-empty">
                        <i className="bi bi-lightning"></i>
                        <h3>No skills added yet</h3>
                        <p>Add your skills to help other students discover you.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default SkillsSection;