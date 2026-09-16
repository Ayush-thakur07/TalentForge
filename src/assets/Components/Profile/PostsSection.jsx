import "./PostsSection.css";

function PostsSection({ posts = [] }) {
    return (
        <section className="posts-section">
            <div className="posts-header">
                <div>
                    <h2>Activity</h2>
                    <p>Recent activity and posts</p>
                </div>

                <i className="bi bi-activity"></i>
            </div>

            {posts.length > 0 ? (
                <div className="posts-list">
                    {posts.map((post, index) => (
                        <article className="post-card" key={post.id || index}>
                            <div className="post-author">
                                <div className="post-avatar">
                                    {post.avatar ? (
                                        <img
                                            src={post.avatar}
                                            alt={post.name}
                                        />
                                    ) : (
                                        <i className="bi bi-person"></i>
                                    )}
                                </div>

                                <div>
                                    <h3>{post.name}</h3>
                                    <span>{post.date}</span>
                                </div>
                            </div>

                            <div className="post-content">
                                <p>{post.content}</p>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="posts-empty">
                    <div className="posts-empty-icon">
                        <i className="bi bi-chat-square-text"></i>
                    </div>

                    <h3>No activity yet</h3>

                    <p>
                        Your posts and recent activity will appear here.
                    </p>
                </div>
            )}
        </section>
    );
}

export default PostsSection;