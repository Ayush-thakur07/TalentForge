import { useState } from "react";
import "./PostsSection.css";

function PostsSection({ posts, onAdd, onDelete }) {
    const [postText, setPostText] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const text = postText.trim();

        if (!text) {
            return;
        }

        onAdd({
            id: Date.now(),
            text,
            createdAt: new Date().toLocaleString()
        });

        setPostText("");
    }

    return (
        <section className="posts-section">
            <div className="posts-header">
                <div>
                    <h2>Activity</h2>
                    <p>Share your thoughts, updates and achievements</p>
                </div>

                <div className="posts-header-icon">
                    <i className="bi bi-activity"></i>
                </div>
            </div>

            <form className="post-form" onSubmit={handleSubmit}>
                <textarea
                    value={postText}
                    placeholder="Share something with the TalentForge community..."
                    rows="4"
                    onChange={(e) => setPostText(e.target.value)}
                />

                <div className="post-form-footer">
                    <span>
                        <i className="bi bi-pencil-square"></i>
                        Create a post
                    </span>

                    <button type="submit">
                        <i className="bi bi-send"></i>
                        Post
                    </button>
                </div>
            </form>

            <div className="posts-list">
                {posts.length > 0 ? (
                    posts
                        .slice()
                        .reverse()
                        .map(post => (
                            <article
                                className="post-card"
                                key={post.id}
                            >
                                <div className="post-card-header">
                                    <div className="post-author-avatar">
                                        <i className="bi bi-person-fill"></i>
                                    </div>

                                    <div className="post-author-info">
                                        <h3>You</h3>
                                        <span>{post.createdAt}</span>
                                    </div>

                                    <button
                                        className="post-delete"
                                        onClick={() => onDelete(post.id)}
                                    >
                                        <i className="bi bi-trash3"></i>
                                    </button>
                                </div>

                                <div className="post-content">
                                    <p>{post.text}</p>
                                </div>

                                <div className="post-actions">
                                    <button>
                                        <i className="bi bi-heart"></i>
                                        Like
                                    </button>

                                    <button>
                                        <i className="bi bi-chat"></i>
                                        Comment
                                    </button>

                                    <button>
                                        <i className="bi bi-share"></i>
                                        Share
                                    </button>
                                </div>
                            </article>
                        ))
                ) : (
                    <div className="posts-empty">
                        <i className="bi bi-activity"></i>
                        <h3>No activity yet</h3>
                        <p>
                            Create your first post and share something
                            with the TalentForge community.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default PostsSection;