import { useState, useEffect } from "react";

function formatPostDate(date) {
    if (!date) {
        return "Just now";
    }

    const postDate = new Date(date);
    const now = new Date();
    const difference =
        Math.floor((now - postDate) / 1000);

    if (difference < 60) {
        return "Just now";
    }

    if (difference < 3600) {
        const minutes =
            Math.floor(difference / 60);
        return `${minutes} min ago`;
    }

    if (difference < 86400) {
        const hours =
            Math.floor(difference / 3600);
        return `${hours} hr ago`;
    }

    const days =
        Math.floor(difference / 86400);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
}

function getPostTypeName(type) {
    switch (type) {
        case "shareProject":
            return "Share a Project";
        case "findCollaborators":
            return "Find Collaborators";
        case "availableToHelp":
            return "Available to Help";
        case "needHelp":
            return "Need Help";
        default:
            return "Community Post";
    }
}

function PostCard({
    post,
    currentUser,
    upvoteCount,
    hasUpvoted,
    onToggleUpvote,
    onDelete,
}) {
    const isOwner =
        currentUser?.name && post.author?.name &&
        currentUser.name === post.author.name;

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!menuOpen) return;

        const handleOutsideClick = (e) => {
            if (e.target.closest(".post-menu-dropdown") || e.target.closest(".post-menu-button")) {
                return;
            }
            setMenuOpen(false);
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [menuOpen]);

    const handleMenuToggle = (e) => {
        e.stopPropagation();
        setMenuOpen((prev) => !prev);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setMenuOpen(false);
        onDelete(post.id);
    };

    const handleUpvoteClick = (e) => {
        e.stopPropagation();
        onToggleUpvote(post.id);
    };

    return (
        <div className="talentforge-post">
            <div className="post-author">
                <div className="post-author-avatar">
                    {post.author?.avatar ? (
                        <img
                            src={post.author.avatar}
                            alt={post.author.name}
                        />
                    ) : (
                        <i className="bi bi-person"></i>
                    )}
                </div>

                <div className="post-author-info">
                    <div className="post-author-name">
                        <strong>
                            {post.author?.name || "TalentForge User"}
                        </strong>
                        <i className="bi bi-patch-check-fill"></i>
                    </div>
                    <span>
                        {formatPostDate(post.createdAt)}
                    </span>
                </div>

                <button
                    type="button"
                    className="post-menu-button"
                    onClick={handleMenuToggle}
                    aria-label="Post options"
                >
                    <i className="bi bi-three-dots-vertical"></i>
                </button>

                {menuOpen && (
                    <div className="post-menu-dropdown">
                        {isOwner && (
                            <button
                                type="button"
                                className="post-menu-item post-menu-delete"
                                onClick={handleDeleteClick}
                            >
                                Delete Post
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className={`post-type ${post.type}`}>
                <i
                    className={
                        post.type === "shareProject"
                            ? "bi bi-pc-display-horizontal"
                            : post.type === "findCollaborators"
                            ? "bi bi-people-fill"
                            : post.type === "availableToHelp"
                            ? "bi bi-calendar-day-fill"
                            : "bi bi-person-fill"
                    }
                ></i>
                <span>
                    {getPostTypeName(post.type)}
                </span>
            </div>

            <h3 className="post-title">
                {post.title}
            </h3>

            <p className="post-description">
                {post.description}
            </p>

            {post.skillsNeeded && (
                <div className="post-detail">
                    <strong>Skills needed:</strong>
                    <span>
                        {post.skillsNeeded}
                    </span>
                </div>
            )}

            {post.skills && (
                <div className="post-detail">
                    <strong>Skills:</strong>
                    <span>
                        {post.skills}
                    </span>
                </div>
            )}

            {post.helpNeeded && (
                <div className="post-detail">
                    <strong>Help needed:</strong>
                    <span>
                        {post.helpNeeded}
                    </span>
                </div>
            )}

            {post.urgency && (
                <span className={`post-badge ${post.urgency}`}>
                    {post.urgency === "high"
                        ? "Urgent"
                        : post.urgency === "medium"
                        ? "Needed Soon"
                        : "Not Urgent"}
                </span>
            )}

            {post.helpFormat && (
                <span className="post-badge">
                    {post.helpFormat === "chat"
                        ? "Chat / Discussion"
                        : post.helpFormat === "call"
                        ? "Call / Meeting"
                        : post.helpFormat === "collaboration"
                        ? "Work Together"
                        : "Review / Feedback"}
                </span>
            )}

            <div className="post-actions">
                <button type="button" className="post-action-btn">
                    <i className="bi bi-chat"></i>
                    Comment
                </button>

                <button
                    type="button"
                    className={`post-action-btn post-upvote ${
                        hasUpvoted ? "post-liked" : ""
                    }`}
                    onClick={handleUpvoteClick}
                    aria-label={hasUpvoted ? "Unlike" : "Upvote"}
                >
                    <i
                        className={
                            hasUpvoted
                                ? "bi bi-heart-fill"
                                : "bi bi-heart"
                        }
                    ></i>
                    {upvoteCount || 0}
                </button>

                <button type="button" className="post-action-btn">
                    <i className="bi bi-bookmark"></i>
                    Save
                </button>

                <button type="button" className="post-action-btn">
                    <i className="bi bi-share"></i>
                    Share
                </button>
            </div>
        </div>
    );
}

export default PostCard;
