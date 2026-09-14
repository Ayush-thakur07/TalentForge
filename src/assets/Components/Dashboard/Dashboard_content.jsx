import { studentData } from "./BrowseStudents/studentData";
import { calculateMatchScore } from "./BrowseStudents/matchUtils";
import { useNavigate } from "react-router-dom";
import "./Dashboard_content.css";

const trendingSkills = [
  { name: "React", icon: "bi bi-code-slash", status: "High Demand" },
  { name: "Python", icon: "bi bi-filetype-py", status: "Growing" },
  { name: "UI/UX Design", icon: "bi bi-palette", status: "High Demand" },
  { name: "Machine Learning", icon: "bi bi-cpu", status: "Growing" }
];

function DashboardContent() {
    const navigate = useNavigate();
    const currentUser = studentData[0];
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
