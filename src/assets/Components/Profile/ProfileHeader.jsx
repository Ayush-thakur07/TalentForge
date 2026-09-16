import "./ProfileHeader.css";
function ProfileHeader({ user, profile, edit, isEditing }) {
    return (
        <section className="profile-header">

            {/* COVER */}
            <div className="profile-cover">
                {profile.coverImage ? (
                    <img
                        src={profile.coverImage}
                        alt="Profile cover"
                    />
                ) : (
                    <div className="profile-cover-placeholder"></div>
                )}
            </div>


            {/* MAIN PROFILE AREA */}
            <div className="profile-main">

                {/* PROFILE IMAGE */}
                <div className="profile-image">
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt="Profile"
                        />
                    ) : (
                        <div className="profile-image-placeholder">
                            <i className="bi bi-person"></i>
                        </div>
                    )}
                </div>


                {/* PROFILE INFORMATION */}
                <div className="profile-information">

                    {/* NAME */}
                    <div className="profile-name">

                        <h1>
                            {user?.name || "Your Name"}
                        </h1>

                        {profile.isVerified && (
                            <span className="verified-badge">
                                <i className="bi bi-patch-check-fill"></i>
                            </span>
                        )}

                    </div>


                    {/* ROLE */}
                    {profile.role && (
                        <p className="profile-role">
                            {profile.role}
                        </p>
                    )}


                    {/* META INFORMATION */}
                    <div className="profile-meta">

                        {profile.university && (
                            <span>
                                <i className="bi bi-mortarboard"></i>
                                {profile.university}
                            </span>
                        )}

                        {profile.year && (
                            <span>
                                <i className="bi bi-calendar3"></i>
                                {profile.year}
                            </span>
                        )}

                        {profile.location && (
                            <span>
                                <i className="bi bi-geo-alt"></i>
                                {profile.location}
                            </span>
                        )}

                    </div>


                    {/* HEADLINE */}
                    {profile.headline && (
                        <p className="profile-headline">
                            {profile.headline}
                        </p>
                    )}


                    {/* ABOUT */}
                    {profile.about && (
                        <div className="profile-about">
                            <p>{profile.about}</p>
                        </div>
                    )}


                    {/* TAGS */}
                    {profile.tags && profile.tags.length > 0 && (
                        <div className="profile-tags">

                            {profile.tags.map((tag, index) => (
                                <span key={index}>
                                    {tag}
                                </span>
                            ))}

                        </div>
                    )}

                </div>


                {/* ACTIONS */}
                <div className="profile-actions">

                    {isEditing ? (
                        <button
                            className="profile-action-button"
                            onClick={edit}
                        >
                            <i className="bi bi-check-lg"></i>
                            Save Profile
                        </button>
                    ) : (
                        <>
                            <button
                                className="profile-action-button secondary"
                            >
                                <i className="bi bi-share"></i>
                                Share Profile
                            </button>

                            <button
                                className="profile-action-button"
                                onClick={edit}
                            >
                                <i className="bi bi-pencil"></i>
                                Edit Profile
                            </button>
                        </>
                    )}

                </div>

            </div>

        </section>
    );
}

export default ProfileHeader;