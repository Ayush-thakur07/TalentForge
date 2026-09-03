import { useState } from "react";
function Searchbar(props)
{
    const [searchText,setSearchText]=useState("");
    function handlechange(event)
    {
        setSearchText(event.target.value)
    }
    function handlesubmit(event)
    {
        event.preventDefault();
        if(searchText.trim()==="")
        {
           return; //do not make it call props.on Search()
        }
        else{
            props.onSearch(searchText.trim());
        }
    }
    return(
        <form onSubmit={handlesubmit}>
            <div className="search_icons"><i className="bi bi-search"></i>
            <input type="text"  className="search_bar" placeholder={props.placeholder}
            onChange={handlechange} value={searchText}/>
            </div>
        </form>
    );
}
export default Searchbar;