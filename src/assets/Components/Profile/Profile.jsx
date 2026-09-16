import { useState, useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileTabs from "./ProfileTabs";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import ConnectionsSection from "./ConnectionsSection";
import PostsSection from "./PostsSection";
import EditProfileModal from "./EditProfileModal";

function Profile() {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("Overview");

    const getStoredUser = () => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            return null;
        }

        try {
            return JSON.parse(storedUser);
        } catch (error) {
            return null;
        }
    };

    const initialUser = getStoredUser();
    const userKey = initialUser?.uid || initialUser?.email || "guest";

    const profileStorageKey = `talentforge_profile_${userKey}`;
    const projectsStorageKey = `talentforge_projects_${userKey}`;
    const educationStorageKey = `talentforge_education_${userKey}`;
    const experiencesStorageKey = `talentforge_experiences_${userKey}`;

    const defaultProfile = {
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
    };

    const [profile, setProfile] = useState(() => {
        const savedProfile = localStorage.getItem(profileStorageKey);

        if (!savedProfile) {
            return defaultProfile;
        }

        try {
            return {
                ...defaultProfile,
                ...JSON.parse(savedProfile)
            };
        } catch (error) {
            return defaultProfile;
        }
    });

    const [projects, setProjects] = useState(() => {
        const savedProjects = localStorage.getItem(projectsStorageKey);

        if (!savedProjects) {
            return [];
        }

        try {
            return JSON.parse(savedProjects);
        } catch (error) {
            return [];
        }
    });

    const [education, setEducation] = useState(() => {
        const savedEducation = localStorage.getItem(educationStorageKey);

        if (!savedEducation) {
            return [];
        }

        try {
            return JSON.parse(savedEducation);
        } catch (error) {
            return [];
        }
    });

    const [experiences, setExperiences] = useState(() => {
        const savedExperiences = localStorage.getItem(experiencesStorageKey);

        if (!savedExperiences) {
            return [];
        }

        try {
            return JSON.parse(savedExperiences);
        } catch (error) {
            return [];
        }
    });
    const [connections, setConnections] = useState(() => {
    const savedConnections = localStorage.getItem(
        `talentforge_connections_${userKey}`
    );

    if (!savedConnections) {
        return [];
    }

    try {
        return JSON.parse(savedConnections);
    } catch (error) {
        return [];
    }
});
useEffect(() => {
    localStorage.setItem(
        `talentforge_connections_${userKey}`,
        JSON.stringify(connections)
    );
}, [connections, userKey]);
const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem(
        `talentforge_posts_${userKey}`
    );

    if (!savedPosts) {
        return [];
    }

    try {
        return JSON.parse(savedPosts);
    } catch (error) {
        return [];
    }
});
useEffect(() => {
    localStorage.setItem(
        `talentforge_posts_${userKey}`,
        JSON.stringify(posts)
    );
}, [posts, userKey]);
    const [isEditing, setIsEditing] = useState(false);
    const [skillsInput, setSkillsInput] = useState("");
    const [interestsInput, setInterestsInput] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                setUser(null);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            profileStorageKey,
            JSON.stringify(profile)
        );
    }, [profile, profileStorageKey]);

    useEffect(() => {
        localStorage.setItem(
            projectsStorageKey,
            JSON.stringify(projects)
        );
    }, [projects, projectsStorageKey]);

    useEffect(() => {
        localStorage.setItem(
            educationStorageKey,
            JSON.stringify(education)
        );
    }, [education, educationStorageKey]);

    useEffect(() => {
        localStorage.setItem(
            experiencesStorageKey,
            JSON.stringify(experiences)
        );
    }, [experiences, experiencesStorageKey]);

    useEffect(() => {
        if (isEditing) {
            setSkillsInput(profile.skills.join(", "));
            setInterestsInput(profile.interests.join(", "));
        }
    }, [isEditing, profile.skills, profile.interests]);

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
    function handleAddPost(post) {
    setPosts(prev => [
        ...prev,
        post
    ]);
}

function handleDeletePost(id) {
    setPosts(prev =>
        prev.filter(post => post.id !== id)
    );
}

    function handleSaveProfile() {
        setIsEditing(false);
    }

    function handleCoverChange(imageUrl) {
        setProfile(prev => ({
            ...prev,
            coverImage: imageUrl
        }));
    }

    function handleAddSkill(skill) {
        const normalizedSkill = skill.trim();

        if (!normalizedSkill) {
            return;
        }

        setProfile(prev => {
            const exists = prev.skills.some(
                existingSkill =>
                    existingSkill.toLowerCase() === normalizedSkill.toLowerCase()
            );

            if (exists) {
                return prev;
            }

            return {
                ...prev,
                skills: [...prev.skills, normalizedSkill]
            };
        });
    }

    function handleRemoveSkill(skillToRemove) {
        setProfile(prev => ({
            ...prev,
            skills: prev.skills.filter(
                skill => skill !== skillToRemove
            )
        }));
    }

    function handleAddProject(project) {
        setProjects(prev => [
            ...prev,
            project
        ]);
    }

    function handleDeleteProject(id) {
        setProjects(prev =>
            prev.filter(project => project.id !== id)
        );
    }

    function handleAddExperience() {
        const role = window.prompt("Enter your role");

        if (!role) {
            return;
        }

        const company = window.prompt(
            "Enter company or organization"
        );

        if (!company) {
            return;
        }

        const duration = window.prompt(
            "Enter duration"
        );

        if (!duration) {
            return;
        }

        const description = window.prompt(
            "Enter description"
        );

        const newExperience = {
            id: Date.now(),
            role,
            company,
            duration,
            description: description || ""
        };

        setExperiences(prev => [
            ...prev,
            newExperience
        ]);
    }

    function handleDeleteExperience(id) {
        setExperiences(prev =>
            prev.filter(
                experience => experience.id !== id
            )
        );
    }

    function handleAddEducation(newEducation) {
        setEducation(prev => [
            ...prev,
            newEducation
        ]);
    }

    function handleDeleteEducation(id) {
        setEducation(prev =>
            prev.filter(item => item.id !== id)
        );
    }
    function handleAddConnection(connection) {
    setConnections(prev => [
        ...prev,
        connection
    ]);
}

function handleDeleteConnection(id) {
    setConnections(prev =>
        prev.filter(connection => connection.id !== id)
    );
}

    const stats = {
    projects: projects.length,
    connections: connections.length,
    profileViews: 0
};

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
                onCoverChange={handleCoverChange}
            />

            <ProfileStats stats={stats} />

            <ProfileTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === "Overview" && (
                <AboutSection profile={profile} />
            )}

            {activeTab === "Projects" && (
                <ProjectsSection
                    projects={projects}
                    onAdd={handleAddProject}
                    onDelete={handleDeleteProject}
                />
            )}

            {activeTab === "Skills" && (
                <SkillsSection
                    skills={profile.skills}
                    onAddSkill={handleAddSkill}
                    onRemoveSkill={handleRemoveSkill}
                />
            )}

            {activeTab === "Experience" && (
                <ExperienceSection
                    experiences={experiences}
                    onAdd={handleAddExperience}
                    onDelete={handleDeleteExperience}
                />
            )}

            {activeTab === "Education" && (
                <EducationSection
                    education={education}
                    onAdd={handleAddEducation}
                    onDelete={handleDeleteEducation}
                />
            )}

            {activeTab === "Connections" && (
    <ConnectionsSection
        connections={connections}
        onAdd={handleAddConnection}
        onDelete={handleDeleteConnection}
    />
)}

            {activeTab === "Activity" && (
    <PostsSection
        posts={posts}
        onAdd={handleAddPost}
        onDelete={handleDeletePost}
    />
)}

            {isEditing && (
                <EditProfileModal
                    profile={profile}
                    skillsInput={skillsInput}
                    interestsInput={interestsInput}
                    onChange={handleProfileChange}
                    onSkillsChange={handleSkillsChange}
                    onInterestsChange={handleInterestsChange}
                    onSave={handleSaveProfile}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </div>
    );
}

export default Profile;