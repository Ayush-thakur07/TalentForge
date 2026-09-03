import heroImage from "../../../hero.png"
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
    let current_hours= new Date().getHours();
    const greetings=getGreeting(current_hours);
    return(
        <div className="hero_part">
            <div className="hero_image">
                <img src={heroImage} alt="hero image illustrating a boy and girl learning together"/>
            </div>
            <div className="hero_text">
                <h1 className="greetings">{greetings}, Misthi!</h1>
                <p>Find the right people,Build amazing things together</p>
                <button className="explore_matches">Explore Matches<i className="bi bi-arrow-right"></i></button>
            </div>
        </div>      
    );
}
export default Hero;