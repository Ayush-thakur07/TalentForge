import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileTabs from "./ProfileTabs";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import ConnectionsSection from "./ConnectionsSection";
import PostsSection from "./PostsSection";
import { useState, useEffect } from "react";

function Profile() {
    const [user, setUser] = useState(null);

    const [profile, setProfile] = useState({
        role: "",
        university: "",
        year: "",
        location: "",
        headline: "",
        about: "",
        skills: [],
        interests: [],
        tags: [],
        coverImage: "",
        isVerified: false
    });

    const [stats, setStats] = useState({
        projects: 0,
        connections: 0,
        profileViews: 0
    });

    const [isEditing, setIsEditing] = useState(false);
    const [skillsInput, setSkillsInput] = useState("");
    const [interestsInput, setInterestsInput] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error reading user from localStorage:", error);
            }
        }
    }, []);

    function handleEdit() {
        setIsEditing(prev => !prev);
    }

    function handleProfileChange(field, value) {
        setProfile(prev => ({
            ...prev,
            [field]: value
        }));
    }

    function handleSkillsChange(value) {
        setSkillsInput(value);

        const skills = value
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill.length > 0);

        setProfile(prev => ({
            ...prev,
            skills
        }));
    }

    function handleInterestsChange(value) {
        setInterestsInput(value);

        const interests = value
            .split(",")
            .map(interest => interest.trim())
            .filter(interest => interest.length > 0);

        setProfile(prev => ({
            ...prev,
            interests
        }));
    }

    function handleSaveProfile() {
        setIsEditing(false);
    }

    if (!user) {
        return (
            <div className="profile-loading">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="profile-page">

            <ProfileHeader
                user={user}
                profile={profile}
                edit={handleEdit}
                isEditing={isEditing}
            />

            <ProfileStats stats={stats} />

            <ProfileTabs />

            <AboutSection profile={profile} />

            <ProjectsSection />

            <ConnectionsSection />

            <PostsSection />

            {isEditing && (
                <div className="profile-edit-form">

                    <h2>Edit Profile</h2>

                    <div className="profile-form-group">
                        <label>Role</label>
                        <input
                            type="text"
                            value={profile.role}
                            placeholder="e.g. Software Developer"
                            onChange={(e) =>
                                handleProfileChange(
                                    "role",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="profile-form-group">
                        <label>University</label>
                        <input
                            type="text"
                            value={profile.university}
                            placeholder="Enter your university"
                            onChange={(e) =>
                                handleProfileChange(
                                    "university",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="profile-form-group">
                        <label>Year</label>
                        <input
                            type="text"
                            value={profile.year}
                            placeholder="e.g. 2nd Year"
                            onChange={(e) =>
                                handleProfileChange(
                                    "year",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="profile-form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            value={profile.location}
                            placeholder="e.g. Punjab, India"
                            onChange={(e) =>
                                handleProfileChange(
                                    "location",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="profile-form-group">
                        <label>Headline</label>
                        <input
                            type="text"
                            value={profile.headline}
                            placeholder="e.g. Coder | Learner | Builder"
                            onChange={(e) =>
                                handleProfileChange(
                                    "headline",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="profile-form-group">
                        <label>About Me</label>
                        <textarea
                            value={profile.about}
                            placeholder="Tell people about yourself..."
                            rows="5"
                            onChange={(e) =>
                                handleProfileChange(
                                    "about",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="profile-form-group">
                        <label>Skills</label>
                        <input
                            type="text"
                            value={skillsInput}
                            placeholder="React, Java, SQL, Python"
                            onChange={(e) =>
                                handleSkillsChange(e.target.value)
                            }
                        />
                    </div>

                    <div className="profile-form-group">
                        <label>Interests</label>
                        <input
                            type="text"
                            value={interestsInput}
                            placeholder="AI, Web Development, Startups"
                            onChange={(e) =>
                                handleInterestsChange(e.target.value)
                            }
                        />
                    </div>

                    <button
                        className="save-profile-button"
                        onClick={handleSaveProfile}
                    >
                        Save Profile
                    </button>

                </div>
            )}

        </div>
    );
}

export default Profile;