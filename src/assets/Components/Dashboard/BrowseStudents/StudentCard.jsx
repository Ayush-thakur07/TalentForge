import "./BrowseStudents.css";

function getMatchColor(score) {
    if (score >= 90) return { background: "#dcfce7", color: "#166534" };
    if (score >= 80) return { background: "#dbeafe", color: "#1e40af" };
    if (score >= 70) return { background: "#fef3c7", color: "#92400e" };
    return { background: "#fee2e2", color: "#991b1b" };
}

function StudentCard({ student, matchScore }) {
    const formattedScore = typeof matchScore === "number" ? `${matchScore}% Profile Match` : null;
    const matchColor = typeof matchScore === "number" ? getMatchColor(matchScore) : null;

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
                        <span className="verified-badge">
                            <i className="bi bi-check-circle-fill"></i>
                        </span>
                    </div>
                    <p className="student-college">{student.college}</p>
                    <p className="student-major-year">
                        {student.major} • {student.year}
                    </p>
                </div>
                {formattedScore && matchColor && (
                    <span
                        className="match-badge"
                        style={{ background: matchColor.background, color: matchColor.color }}
                    >
                        {formattedScore}
                    </span>
                )}
            </div>

            <div className="student-card-body">
                <div className="student-section">
                    <span className={`availability-badge ${student.availability}`}>
                        {student.availability.replace(/_/g, " ")}
                    </span>
                </div>

                <div className="student-section">
                    <div className="tags">
                        {(student.skills || []).map((skill) => (
                            <span key={skill} className="tag skill-tag">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="student-section">
                    <p className="interests-text">
                        <strong>Interests:</strong> {(student.interests || []).join(", ")}
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
