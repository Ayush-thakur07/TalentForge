const sortOptions = [
    { label: "Default", value: "default" },
    { label: "Name: A → Z", value: "name_asc" },
    { label: "Name: Z → A", value: "name_desc" }
];

function StudentSort({ sort, onSortChange }) {
    return (
        <div className="student-sort">
            <select
                id="sort-select"
                value={sort}
                onChange={(event) => onSortChange(event.target.value)}
            >
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default StudentSort;
