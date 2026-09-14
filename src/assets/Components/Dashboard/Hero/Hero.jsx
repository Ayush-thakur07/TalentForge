import heroImage from "../../../hero.png"
import { studentData } from "../BrowseStudents/studentData";
import { useNavigate } from "react-router-dom";
import "./Hero.css"
   function getGreeting(current_hour)
{
    if((current_hour)>=5 &&(current_hour<12))
    {
        return "Good morning";
    }
    else if(current_hour>=12 && current_hour<=16)
    {
        return "Good afternoon";
    }
    else if(current_hour>16 && current_hour<=19)
    {
        return "Good evening";
    }
    else{
        return "good night";
    }
}
function Hero()
{
    const navigate = useNavigate();
    let current_hours= new Date().getHours();
    const currentUser = studentData[0];
    const connections = currentUser?.connections?.length || 0;
    const saved = currentUser?.saved?.length || 0;
    const ongoingProjects = currentUser?.ongoingProjects?.length || 0;
    const newMessages = currentUser?.unreadMessages || 0;
    const greetings=getGreeting(current_hours);
    return(
        <div className="hero_part">
            <div className="hero_image">
                <img src={heroImage} alt="hero image illustrating a boy and girl learning together"/>
            </div>
            <div className="hero_text">
                <h1 className="greetings">{greetings}, Misthi!</h1>
                <p>Find the right people,Build amazing things together</p>
                <div className="hero_stats">
                    <div className="hero_stat_card">
                        <div className="hero_stat_icon">
                            <i className="bi bi-people"></i>
                        </div>
                        <div className="hero_stat_info">
                            <strong>{connections}</strong>
                            <span>Connections</span>
                        </div>
                    </div>
                    <div className="hero_stat_card">
                        <div className="hero_stat_icon">
                            <i className="bi bi-bookmark"></i>
                        </div>
                        <div className="hero_stat_info">
                            <strong>{saved}</strong>
                            <span>Saved</span>
                        </div>
                    </div>

    <div className="hero_stat_card">
        <div className="hero_stat_icon">
            <i className="bi bi-folder2-open"></i>
        </div>
        <div className="hero_stat_info">
            <strong>{ongoingProjects}</strong>
            <span>Ongoing Projects</span>
        </div>
    </div>

    <div className="hero_stat_card">
        <div className="hero_stat_icon">
            <i className="bi bi-chat-dots"></i>
        </div>
        <div className="hero_stat_info">
            <strong>{newMessages}</strong>
            <span>New Message</span>
        </div>
    </div>
</div>
<div className="hero_actions">

    <button className="explore_matches" onClick={() => navigate("/students")}>
        Explore Matches
        <i className="bi bi-arrow-right"></i>
    </button>

    <button className="post_project">
        <i className="bi bi-plus-lg"></i>
        Post a Project
    </button>

</div>
            </div>
            
        </div> 
             
    );
}
export default Hero;