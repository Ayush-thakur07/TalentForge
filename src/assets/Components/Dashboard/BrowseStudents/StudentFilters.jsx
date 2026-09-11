import { useState, useMemo } from "react";

const availabilityOptions = [
    { label: "Open", value: "open" },
    { label: "Open to Collaborate", value: "open_to_collaborate" },
    { label: "Busy", value: "busy" }
];

function StudentFilters({ students, onFilterChange }) {
    const [selectedSkill, setSelectedSkill] = useState("");
    const [selectedField, setSelectedField] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedAvailability, setSelectedAvailability] = useState("");

    const allSkills = useMemo(() => {
        const skillSet = new Set();
        students.forEach((student) => {
            student.skills.forEach((skill) => skillSet.add(skill));
        });
        return Array.from(skillSet).sort();
    }, [students]);

    const allFields = useMemo(() => {
        const fieldSet = new Set();
        students.forEach((student) => fieldSet.add(student.major));
        return Array.from(fieldSet).sort();
    }, [students]);

    const allYears = useMemo(() => {
        const yearSet = new Set();
        students.forEach((student) => yearSet.add(student.year));
        return Array.from(yearSet).sort();
    }, [students]);

    function handleSkillChange(event) {
        const skill = event.target.value;
        setSelectedSkill(skill);
        onFilterChange({ skill, field: selectedField, year: selectedYear, availability: selectedAvailability });
    }

    function handleFieldChange(event) {
        const field = event.target.value;
        setSelectedField(field);
        onFilterChange({ skill: selectedSkill, field, year: selectedYear, availability: selectedAvailability });
    }

    function handleYearChange(event) {
        const year = event.target.value;
        setSelectedYear(year);
        onFilterChange({ skill: selectedSkill, field: selectedField, year, availability: selectedAvailability });
    }

    function handleAvailabilityChange(event) {
        const availability = event.target.value;
        setSelectedAvailability(availability);
        onFilterChange({ skill: selectedSkill, field: selectedField, year: selectedYear, availability });
    }

    return (
        <div className="student-filters">
            <div className="filter-group">
                <label htmlFor="skill-filter">Skills</label>
                <select
                    id="skill-filter"
                    value={selectedSkill}
                    onChange={handleSkillChange}
                >
                    <option value="">All Skills</option>
                    {allSkills.map((skill) => (
                        <option key={skill} value={skill}>
                            {skill}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="field-filter">Field</label>
                <select
                    id="field-filter"
                    value={selectedField}
                    onChange={handleFieldChange}
                >
                    <option value="">All Fields</option>
                    {allFields.map((field) => (
                        <option key={field} value={field}>
                            {field}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="year-filter">Year</label>
                <select
                    id="year-filter"
                    value={selectedYear}
                    onChange={handleYearChange}
                >
                    <option value="">All Years</option>
                    {allYears.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="availability-filter">Availability</label>
                <select
                    id="availability-filter"
                    value={selectedAvailability}
                    onChange={handleAvailabilityChange}
                >
                    <option value="">All Availability</option>
                    {availabilityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default StudentFilters;
