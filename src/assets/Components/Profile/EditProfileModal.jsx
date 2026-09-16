import "./EditProfileModal.css";

function EditProfileModal({
    profile,
    skillsInput,
    interestsInput,
    onChange,
    onSkillsChange,
    onInterestsChange,
    onSave,
    onClose
}) {
    return (
        <div className="edit-profile-overlay" onClick={onClose}>
            <div
                className="edit-profile-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="edit-profile-header">
                    <div>
                        <h2>Edit Profile</h2>
                        <p>Update your TalentForge profile</p>
                    </div>

                    <button
                        className="edit-profile-close"
                        onClick={onClose}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <div className="edit-profile-body">

                    <div className="edit-profile-row">

                        <div className="edit-profile-field">
                            <label>Role</label>
                            <input
                                type="text"
                                value={profile.role}
                                placeholder="Software Developer"
                                onChange={(e) =>
                                    onChange("role", e.target.value)
                                }
                            />
                        </div>

                        <div className="edit-profile-field">
                            <label>Year</label>
                            <input
                                type="text"
                                value={profile.year}
                                placeholder="2nd Year"
                                onChange={(e) =>
                                    onChange("year", e.target.value)
                                }
                            />
                        </div>

                    </div>

                    <div className="edit-profile-field">
                        <label>University</label>
                        <input
                            type="text"
                            value={profile.university}
                            placeholder="Enter your university"
                            onChange={(e) =>
                                onChange("university", e.target.value)
                            }
                        />
                    </div>

                    <div className="edit-profile-field">
                        <label>Location</label>
                        <input
                            type="text"
                            value={profile.location}
                            placeholder="City, Country"
                            onChange={(e) =>
                                onChange("location", e.target.value)
                            }
                        />
                    </div>

                    <div className="edit-profile-field">
                        <label>Headline</label>
                        <input
                            type="text"
                            value={profile.headline}
                            placeholder="Coder | Learner | Builder"
                            onChange={(e) =>
                                onChange("headline", e.target.value)
                            }
                        />
                    </div>

                    <div className="edit-profile-field">
                        <label>About Me</label>
                        <textarea
                            value={profile.about}
                            placeholder="Tell people about yourself..."
                            rows="5"
                            onChange={(e) =>
                                onChange("about", e.target.value)
                            }
                        />
                    </div>

                    <div className="edit-profile-field">
                        <label>Skills</label>
                        <input
                            type="text"
                            value={skillsInput}
                            placeholder="React, Java, SQL, Python"
                            onChange={(e) =>
                                onSkillsChange(e.target.value)
                            }
                        />
                        <span>Separate skills with commas</span>
                    </div>

                    <div className="edit-profile-field">
                        <label>Interests</label>
                        <input
                            type="text"
                            value={interestsInput}
                            placeholder="AI, Startups, Web Development"
                            onChange={(e) =>
                                onInterestsChange(e.target.value)
                            }
                        />
                        <span>Separate interests with commas</span>
                    </div>

                </div>

                <div className="edit-profile-footer">
                    <button
                        className="edit-profile-cancel"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="edit-profile-save"
                        onClick={onSave}
                    >
                        <i className="bi bi-check-lg"></i>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditProfileModal;