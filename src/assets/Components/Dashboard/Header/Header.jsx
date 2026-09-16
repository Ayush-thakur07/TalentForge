import Searchbar from "./SearchBar";
import HeaderActions from "./HeaderActions";
import Branch from "./Branch";
import { useNavigate } from "react-router-dom";
function Header({ toggleSidebar })
{
    const navigate = useNavigate();
    function onSearch(value_entered)
    {
        navigate(`/search?q=${encodeURIComponent(value_entered)}`);
    }
    return(
        <>
        <header className="main-header">
            <Branch toggleSidebar={toggleSidebar} />
            <Searchbar placeholder="Search Skills, projects, people..." onSearch={onSearch}/>
            <HeaderActions/>
        </header>
        </>
    );

}
export default Header;
