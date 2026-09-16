import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResults from "./SearchResults";
import { getGlobalSearchResults } from "./searchUtils";
import "./SearchPage.css";

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const results = useMemo(() => getGlobalSearchResults(query), [query]);

    return (
        <div className="global-search-page">
            <div className="global-search-page-header">
                <p>Search Results</p>
                <h1>Results for {query ? `"${query}"` : "TalentForge"}</h1>
            </div>
            <SearchResults results={results} />
        </div>
    );
}

export default SearchPage;