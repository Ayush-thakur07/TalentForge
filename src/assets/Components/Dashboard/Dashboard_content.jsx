import { studentData } from "./BrowseStudents/studentData";
import { calculateMatchScore } from "./BrowseStudents/matchUtils";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Dashboard_content.css";

const trendingSkills = [
  { name: "React", icon: "bi bi-code-slash", status: "High Demand" },
  { name: "Python", icon: "bi bi-filetype-py", status: "Growing" },
  { name: "UI/UX Design", icon: "bi bi-palette", status: "High Demand" },
  { name: "Machine Learning", icon: "bi bi-cpu", status: "Growing" }
];
function getPostTypeName(type) {

    switch (type) {

        case "shareProject":
            return "Share a Project";

        case "findCollaborators":
            return "Find Collaborators";

        case "availableToHelp":
            return "Available to Help";

        case "needHelp":
            return "Need Help";

        default:
            return "Community Post";
    }
}
function formatPostDate(date) {

    if (!date) {
        return "Just now";
    }

    const postDate = new Date(date);

    const now = new Date();

    const difference =
        Math.floor((now - postDate) / 1000);

    if (difference < 60) {
        return "Just now";
    }

    if (difference < 3600) {

        const minutes =
            Math.floor(difference / 60);

        return `${minutes} min ago`;
    }

    if (difference < 86400) {

        const hours =
            Math.floor(difference / 3600);

        return `${hours} hr ago`;
    }

    const days =
        Math.floor(difference / 86400);

    return `${days} day${days !== 1 ? "s" : ""} ago`;
}
function DashboardContent() {
    const navigate = useNavigate();
    const currentUser = studentData[0];
    const [posts, setPosts] = useState([]);
    useEffect(() => {
    const loadPosts = () => {
    const storedPosts =
        JSON.parse(localStorage.getItem("talentforge_posts")) || [];

    const sortedPosts = [...storedPosts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setPosts(sortedPosts);
};
    loadPosts();
    window.addEventListener("postsUpdated", loadPosts);
    window.addEventListener("storage", loadPosts);
    return () => {
        window.removeEventListener("postsUpdated", loadPosts);
        window.removeEventListener("storage", loadPosts);
    };
}, []);
    const recommendedStudents = studentData
      .slice(1)
      .map((student) => ({
        ...student,
        matchPercentage: calculateMatchScore(currentUser, student),
      }))
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 3);

    return (
        <section className="dashboard-content">
        <div className="dashboard-main-grid">
          <div className="posts-section">

    <div className="dashboard-section-header">

        <div>
            <h2>Latest from TalentForge</h2>

            <p>
                See what students are building and looking for.
            </p>
        </div>

    </div>


    <div className="posts-list">

        {posts.length === 0 ? (

            <div className="no-posts">

                <i className="bi bi-file-earmark-post"></i>

                <h3>No posts yet</h3>

                <p>
                    Be the first to share something with the TalentForge
                    community.
                </p>

            </div>

        ) : (

            posts.map((post) => (

                <div
                    className="talentforge-post"
                    key={post.id}
                >

                    {/* ====================== */}
                    {/* POST HEADER */}
                    {/* ====================== */}

                    <div className="post-author">

                        <div className="post-author-avatar">

                            {post.author?.avatar ? (

                                <img
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                />

                            ) : (

                                <i className="bi bi-person"></i>

                            )}

                        </div>


                        <div className="post-author-info">

                            <div className="post-author-name">

                                <strong>
                                    {post.author?.name || "TalentForge User"}
                                </strong>

                                <i className="bi bi-patch-check-fill"></i>

                            </div>

                            <span>
                                {formatPostDate(post.createdAt)}
                            </span>

                        </div>

                    </div>


                    {/* ====================== */}
                    {/* POST TYPE */}
                    {/* ====================== */}

                    <div className={`post-type ${post.type}`}>

                        <i
                            className={
                                post.type === "shareProject"
                                    ? "bi bi-pc-display-horizontal"
                                    : post.type === "findCollaborators"
                                    ? "bi bi-people-fill"
                                    : post.type === "availableToHelp"
                                    ? "bi bi-calendar-day-fill"
                                    : "bi bi-person-fill"
                            }
                        ></i>

                        <span>
                            {getPostTypeName(post.type)}
                        </span>

                    </div>


                    {/* ====================== */}
                    {/* POST CONTENT */}
                    {/* ====================== */}

                    <h3 className="post-title">
                        {post.title}
                    </h3>

                    <p className="post-description">
                        {post.description}
                    </p>


                    {/* ====================== */}
                    {/* EXTRA INFORMATION */}
                    {/* ====================== */}

                    {post.skillsNeeded && (

                        <div className="post-detail">

                            <strong>Skills needed:</strong>

                            <span>
                                {post.skillsNeeded}
                            </span>

                        </div>

                    )}


                    {post.skills && (

                        <div className="post-detail">

                            <strong>Skills:</strong>

                            <span>
                                {post.skills}
                            </span>

                        </div>

                    )}


                    {post.helpNeeded && (

                        <div className="post-detail">

                            <strong>Help needed:</strong>

                            <span>
                                {post.helpNeeded}
                            </span>

                        </div>

                    )}


                    {/* ====================== */}
                    {/* NEED HELP INFORMATION */}
                    {/* ====================== */}

                    {post.urgency && (

                        <span className={`post-badge ${post.urgency}`}>

                            {post.urgency === "high"
                                ? "Urgent"
                                : post.urgency === "medium"
                                ? "Needed Soon"
                                : "Not Urgent"}

                        </span>

                    )}


                    {post.helpFormat && (

                        <span className="post-badge">

                            {post.helpFormat === "chat"
                                ? "Chat / Discussion"
                                : post.helpFormat === "call"
                                ? "Call / Meeting"
                                : post.helpFormat === "collaboration"
                                ? "Work Together"
                                : "Review / Feedback"}

                        </span>

                    )}


                    {/* ====================== */}
                    {/* FOOTER */}
                    {/* ====================== */}

                    <div className="post-actions">

                        <button type="button">

                            <i className="bi bi-chat"></i>

                            Comment

                        </button>


                        <button type="button">

                            <i className="bi bi-bookmark"></i>

                            Save

                        </button>


                        <button type="button">

                            <i className="bi bi-share"></i>

                            Share

                        </button>

                    </div>

                </div>

            ))

        )}

    </div>

</div>
        <div className="recommended-section">
          <div className="dashboard-section-header">
            <div>
              <h2>Recommended for You</h2>
              <p>Students who match your interests and skills.</p>
            </div>

            <button className="section-link" onClick={() => navigate("/students")}>
              See All <i className="bi bi-arrow-right"></i>
            </button>
          </div>

          <div className="recommended-list">

            {recommendedStudents.map((student) => (
              <div className="student-card" key={student.id}>
                <div className="student-avatar">
                    <i className="bi bi-person"></i>
                    <span className="online-dot"></span>
                </div>

                <div className="student-info">

                    <div className="student-name-row">
                        <h3>{student.name}</h3>
                        <i className="bi bi-patch-check-fill verified-icon"></i>
                    </div>

                    <p className="student-meta">
                        {student.major} • {student.year}
                    </p>

                    <p className="student-university">
                        <i className="bi bi-geo-alt"></i>
                        Chitkara University
                    </p>

                    <div className="skill-tags">
                        {student.skills.slice(0, 3).map((skill) => (
                            <span key={skill}>{skill}</span>
                        ))}

                        {student.skills.length > 3 && (
                            <span className="more-skills">
                                +{student.skills.length - 3}
                            </span>
                        )}
                    </div>

                </div>

                <div className="student-match">

                    <span className="match-badge">
                        <i className="bi bi-star-fill"></i>
                        {student.matchPercentage}% Match
                    </span>

                    <button className="connect-button">
                        <i className="bi bi-person-plus"></i>
                        Connect
                    </button>

                </div>

                <button className="student-menu">
                    <i className="bi bi-three-dots-vertical"></i>
                </button>

            </div>
            ))}

          </div>
        </div>
          <div className="trending-skills">

      <div className="dashboard-section-header">
        <div>
          <h2>Trending Skills</h2>
          <p>Skills gaining attention across campus.</p>
        </div>

        <button className="section-link" onClick={() => navigate("/students")}>
          See All <i className="bi bi-arrow-right"></i>
        </button>
      </div>

      <div className="skills-list">
        {trendingSkills.map((skill) => (
          <div
            key={skill.name}
            className="trending-skill"
            onClick={() => navigate("/students", { state: { skill: skill.name } })}
            role="button"
          >
            <div className="skill-icon">
              <i className={skill.icon}></i>
            </div>

            <div className="skill-details">
              <h3>{skill.name}</h3>
              <span>{skill.status}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
    </div>
        </section>
      );
    }

    export default DashboardContent;
