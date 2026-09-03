function Branch({ toggleSidebar })
{
    return(
        <div className="branch">
            <img src="/favicon-package/favicon.svg" width={50} alt="CampusSwap Logo"/>
            <button aria-label="Search">TalentForge</button>
            <button onClick={toggleSidebar} aria-label="menu_toggle" className="menu_toggle_icon"><i className="bi bi-list"></i></button>
        </div>
    );
}
export default Branch;
