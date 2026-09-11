import { useState, useMemo } from "react";
import { getAllStudents } from "./studentUtils";
import { calculateMatchScore } from "./matchUtils";
import StudentList from "./StudentList";
import StudentFilters from "./StudentFilters";
import StudentSearch from "./StudentSearch";
import StudentSort from "./StudentSort";

const CURRENT_USER_ID = "stu_001";

function matchesSearch(student, search) {
    const term = (search || "").trim().toLowerCase();
    if (!term) return true;
    const searchable = [
        student.name,
        student.college,
        student.major,
        student.year,
        student.lookingFor,
        student.bio,
        ...student.skills,
        ...student.interests,
        ...student.projects.map((project) => project.title),
        ...student.projects.map((project) => project.stack)
    ];
    return searchable.some((value) => String(value || "").toLowerCase().includes(term));
}

function sortStudents(students, sort) {
    const list = [...students];
    if (sort === "name_asc") {
        list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name_desc") {
        list.sort((a, b) => b.name.localeCompare(a.name));
    }
    return list;
}

function BrowseStudents() {
    const allStudents = getAllStudents();
    const currentUser = allStudents.find((student) => student.id === CURRENT_USER_ID) || allStudents[0];
    const [filters, setFilters] = useState({ search: "", skill: "", field: "", year: "", availability: "" });
    const [sort, setSort] = useState("default");

    const filteredStudents = useMemo(() => {
        return allStudents.filter((student) => {
            const matchesSearchTerm = matchesSearch(student, filters.search);

            const matchesSkill =
                !filters.skill ||
                student.skills.some((skill) => skill === filters.skill);

            const matchesField =
                !filters.field || student.major === filters.field;

            const matchesYear =
                !filters.year || student.year === filters.year;

            const matchesAvailability =
                !filters.availability || student.availability === filters.availability;

            return matchesSearchTerm && matchesSkill && matchesField && matchesYear && matchesAvailability;
        });
    }, [allStudents, filters]);

    const sortedStudents = useMemo(() => sortStudents(filteredStudents, sort), [filteredStudents, sort]);

    const studentsWithMatchScore = useMemo(() => {
        return sortedStudents.map((student) => ({
            ...student,
            matchScore: calculateMatchScore(currentUser, student)
        }));
    }, [sortedStudents, currentUser]);

    function handleFilterChange({ search, skill, field, year, availability }) {
        setFilters({ search, skill, field, year, availability });
    }

    return (
        <div className="browse-students">
            <div className="browse-students-header">
                <h1>
                    Browse Amazing <span className="highlight">Students</span>
                </h1>
                <p>Find and connect with talented students to collaborate on projects, hackathons, and more.</p>
            </div>

            <div className="browse-students-banner">
                <div className="banner-content">
                    <h2>Great ideas grow faster together</h2>
                    <p>Find your next teammate today.</p>
                </div>
                <div className="banner-illustration">
                    <img src="/signup-image.png" alt="Collaboration" />
                </div>
            </div>

            <div className="browse-students-controls">
                <div className="controls-row">
                    <StudentSearch search={filters.search} onSearchChange={(search) => handleFilterChange({ ...filters, search })} />
                    <StudentFilters
                        students={allStudents}
                        onFilterChange={handleFilterChange}
                    />
                    <StudentSort sort={sort} onSortChange={setSort} />
                </div>
                <div className="results-bar">
                    <span>{studentsWithMatchScore.length} students found</span>
                    <div className="view-toggle">
                        <button className="view-btn active" aria-label="Grid view">
                            <i className="bi bi-grid"></i>
                        </button>
                        <button className="view-btn" aria-label="List view">
                            <i className="bi bi-list"></i>
                        </button>
                    </div>
                </div>
            </div>

            <StudentList students={studentsWithMatchScore} />
        </div>
    );
}

export default BrowseStudents;
