import { useState } from "react";
import { useUser } from "../../../context/UserContext";
import "./SkillsSection.css";

function SkillsSection({ skills, onAddSkill, onRemoveSkill }) {
    const { isPro } = useUser();
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
                    <h2>
                        Skills {isPro && <span className="pro-skills-badge"><i className="bi bi-patch-check-fill"></i> Verified Showcase</span>}
                    </h2>
                    <p>{isPro ? "Skills validated by mentor reviews & project evaluations" : "Showcase what you can do"}</p>
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
                        <div className={`skill-item ${isPro ? "verified-pro-skill" : ""}`} key={`${skill}-${index}`}>
                            {isPro && (
                                <span className="skill-verified-icon" title="Verified Skill (Pro Member)">
                                    <i className="bi bi-patch-check-fill"></i>
                                </span>
                            )}
                            <span>{skill}</span>
                            {isPro && <span className="verified-mentor-tag">Verified</span>}
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
                        <p>No skills added yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default SkillsSection;