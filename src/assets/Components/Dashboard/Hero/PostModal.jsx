import {useState} from "react";
import "./Hero.css";
function PostModal({onClose})
{
    const[selecteddiv,setSeleectedDiv]=useState("shareProject");
    const[text,setText]=useState('');
    const words=text.trim().split(/\s+/).filter(Boolean);
    const wordlength=words.length;
    const isInvalid= wordlength<10||wordlength>50;
    const[descripti,setDescripti]=useState('');
    const descriptiWords=descripti.trim().split(/\s+/).filter(Boolean);
    const descriptilength=descriptiWords.length;
    const isssssinvalid= descriptilength<50 || descriptilength>500;
    return(
        <div className="post-modal-overlay">
        <div className="post-modal">
            <div className="post-modal-header">
                <div className="Heading">
                <h1>CREATE A POST</h1>
                <p>Share what you're working on or what kind of collaboration you're looking for</p>
                </div>
            <button type="button" className="post-modal-close" onClick={onClose} aria-label="Close">×</button>
            </div>
            <div className="post-modal-content">
            <div className="tabs">
                <div className={selecteddiv==="shareProject"?"shareProject active": "shareProject"} onClick={()=>setSeleectedDiv("shareProject")}>
                    <i className="bi bi-pc-display-horizontal"></i>
                    <h1>Share a Project</h1>
                    <p>Showcase your idea or project</p>
                </div>
                <div className={selecteddiv==="findcollaborators"?"findcollaborators active":"findcollaborators"} onClick={()=>setSeleectedDiv("findcollaborators")}>
                    <i className="bi bi-people-fill"></i>
                    <h1>Find collaborators</h1>
                    <p>Looking for people to work with?</p>
                </div>
                <div className={selecteddiv==="AvailableToHelp"?"AvailableToHelp active": "AvailableToHelp"} onClick={()=>setSeleectedDiv("AvailableToHelp")}>
                    <i className="bi bi-calendar-day-fill"></i>
                    <h1>Available to Help</h1>
                    <p>Let others know you're free</p>
                </div>
                <div className={selecteddiv==="NeedHelp"?"NeedHelp active": "NeedHelp"}onClick={()=>setSeleectedDiv("NeedHelp")}>
                    <i className="bi bi-person-fill"></i>
                    <h1>Need Help</h1>
                    <p>Get support from the community</p>
                </div>
            </div>
            <div className="post-form">
                {selecteddiv==="shareProject" && (
                    <form action="/submit">
                        <label htmlFor="Title">TITLE</label>
                        <textarea id="TITLE"className="titles" value={text}onChange={(e)=>{setText(e.target.value)}}placeholder="Give your post a short clear title..." required></textarea>
                        <div><span>Words: {wordlength}</span>
                        {text && isInvalid && (<span style={{ color: 'red' }}>
                            {wordlength < 10 ? 'Too short (min 10)' : 'Too long (max 500)'}</span> )}
                        </div>


                        <label htmlFor="Description">Description</label>
                        <textarea id="DESCRIPTION"className="desc" value={descripti}onChange={(e)=>{setDescripti(e.target.value)}}placeholder="Tell us more about your project,what you're looking for,your skills,timeline etc..." required></textarea>
                        <div><span>Words: {descriptilength}</span>
                        {descripti && isssssinvalid && (<span style={{ color: 'red' }}>
                            {descriptilength < 50 ? 'Too short (min 50)' : 'Too long (max 500)'}</span> )}
                        </div>
                        <button disabled={isInvalid} type="submit">Post Project</button>
                    </form>

                )}
                </div>
            </div>
        </div>
        </div>
    );
}
export default PostModal;