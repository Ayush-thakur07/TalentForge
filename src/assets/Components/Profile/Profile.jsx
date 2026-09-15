import ProfileHeader from "./ProfileHeader";
import { useState } from "react";
function Profile()
{
        const[profile,setprofile]=useState({
        name:"Misthi",
        role:"UI/UX Designer",
        university:"Chitakara",
        year:"2nd",
        about:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, corporis. Qui explicabo eligendi ex unde ullam alias in dolore delectus id, doloribus cupiditate voluptate voluptates. Dignissimos, nobis. Nesciunt, voluptates expedita!",
        tags:["UI/UX DESIGNER","REACT","WEB DEVELOPMENT","FIGMA"],
        profileImage: "https://picsum.photos/id/237/536/354>",
        coverImage: "https://picsum.photos/id/237/536/354",
        isVerified:true
    });
    const[isEditing,setIsEdititng]=useState(false);
    function handleEdit()
    {
        setIsEdititng(!isEditing);
    }
    return(
        <>
        <ProfileHeader profile={profile} edit={handleEdit} isEditing={isEditing}/>
        </>
    );
}
export default Profile;