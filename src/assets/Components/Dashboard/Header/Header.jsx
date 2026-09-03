import Searchbar from "./SearchBar";
import HeaderActions from "./HeaderActions";
import Branch from "./Branch";
function Header({ toggleSidebar })
{
    function onSearch(value_entered)
    {
        console.log(value_entered);
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
