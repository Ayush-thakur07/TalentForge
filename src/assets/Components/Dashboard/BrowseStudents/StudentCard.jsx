import "./BrowseStudents.css";

function StudentCard({ student, matchScore }) {
    const formattedScore = typeof matchScore === "number" ? `${matchScore}% Match` : null;

    return (
        <div className="student-card">
            <div className="student-card-header">
                <img
                    src={student.avatar}
                    alt={student.name}
                    className="student-avatar"
                />
                <div className="student-header-info">
                    <div className="student-name-row">
                        <h3 className="student-name">{student.name}</h3>
                        {formattedScore && (
                            <span className="match-badge">{formattedScore}</span>
                        )}
                        <span className="verified-badge">
                            <i className="bi bi-check-circle-fill"></i>
                        </span>
                    </div>
                    <p className="student-college">{student.college}</p>
                    <p className="student-major-year">
                        {student.major} • {student.year}
                    </p>
                </div>
                <span className={`availability-badge ${student.availability}`}>
                    {student.availability.replace(/_/g, " ")}
                </span>
            </div>

            <div className="student-card-body">
                <div className="student-section">
                    <div className="tags">
                        {student.skills.map((skill) => (
                            <span key={skill} className="tag skill-tag">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="student-section">
                    <p className="interests-text">
                        <strong>Interests:</strong> {student.interests.join(", ")}
                    </p>
                </div>

                <div className="student-section">
                    <p className="looking-for">
                        <strong>Looking for:</strong> {student.lookingFor}
                    </p>
                </div>
            </div>

            <div className="student-card-footer">
                <button className="btn-outline">View Profile</button>
                <button className="btn-icon" aria-label="Connect">
                    <i className="bi bi-person-plus"></i>
                </button>
            </div>
        </div>
    );
}

export default StudentCard;
