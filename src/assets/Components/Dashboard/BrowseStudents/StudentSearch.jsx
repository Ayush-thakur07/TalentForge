import "./BrowseStudents.css";

function StudentSearch({ search, onSearchChange }) {
    return (
        <div className="search-wrapper">
            <i className="bi bi-search search-icon"></i>
            <input
                type="text"
                placeholder="Search by name, skills, projects, or interests..."
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                className="search-input"
            />
            {search && (
                <button
                    type="button"
                    className="search-clear"
                    onClick={() => onSearchChange("")}
                >
                    <i className="bi bi-x"></i>
                </button>
            )}
        </div>
    );
}

export default StudentSearch;
