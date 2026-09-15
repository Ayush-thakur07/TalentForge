
function ProfileHeader({ profile ,edit,isEditing}) 
{

    return (
        <section className="profile-header">
            <div className="profile-cover">
                <img src={profile.coverImage} alt="cover image"/>
            </div>
            <div className="profile-main">
                <div className="profile-image">
                    <img src={profile.profileImage} alt="profile image"/>
                </div>

                <div className="profile-information">

                    <div className="profile-name">
                       <h1>{profile.name}</h1>
                        {
                        profile.isVerified&&<p>verified</p>
                        }
                    </div>

                    <div className="profile-meta">
                        <p>{profile.role}</p>
                        <p>{profile.university}</p>
                        <p>{profile.year}</p>
                    </div>

                    <div className="profile-about">
                        <p>{profile.about}</p>
                    </div>

                    <div className="profile-tags">
                        { //curly bracket ke andar react likhte hai js nhi
                            profile.tags.map((tag,index)=>
                                <p key={index}>{tag}</p>
                            )
                        }
                        
                    </div>

                </div>

                <div className="profile-actions">
                    {
                        (isEditing)?<button>Save Profile</button>:<button onClick={edit}>Edit</button>
                     
                    }
                </div>
                <p>Editing: {isEditing ? "YES" : "NO"}</p>
                <p>Editing: {isEditing ? "YES" : "NO"}</p>
                <p>Editing: {isEditing ? "YES" : "NO"}</p>
            </div>

        </section>
    );
}

export default ProfileHeader;