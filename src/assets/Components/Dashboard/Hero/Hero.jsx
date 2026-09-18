import heroImage from "../../../hero.png";
import { useNavigate } from "react-router-dom";
import PostModal from "./PostModal";
import { useState, useEffect } from "react";
import { useUser } from "../../../../context/UserContext";
import { useMessages } from "../../../../context/MessageContext";
import "./Hero.css";

function getGreeting(current_hour) {
    if (current_hour >= 5 && current_hour < 12) {
        return "Good morning";
    } else if (current_hour >= 12 && current_hour <= 16) {
        return "Good afternoon";
    } else if (current_hour > 16 && current_hour <= 19) {
        return "Good evening";
    } else {
        return "Good night";
    }
}

function Hero() {
    const navigate = useNavigate();
    const [postModalOpen, setPostModalOpen] = useState(false);
    const { currentUser } = useUser();
    const { unreadCount: newMessages } = useMessages();
    let current_hours = new Date().getHours();
    const dashboardUser = currentUser;
    const connections = dashboardUser?.connections?.length || 0;

    const [savedCount, setSavedCount] = useState(() => {
        try {
            const savedIds = JSON.parse(localStorage.getItem("talentforge_saved_posts") || "[]");
            return Array.isArray(savedIds) ? savedIds.length : 0;
        } catch {
            return 0;
        }
    });

    useEffect(() => {
        const updateSavedCount = () => {
            try {
                const savedIds = JSON.parse(localStorage.getItem("talentforge_saved_posts") || "[]");
                setSavedCount(Array.isArray(savedIds) ? savedIds.length : 0);
            } catch {
                setSavedCount(0);
            }
        };

        window.addEventListener("storage", updateSavedCount);
        window.addEventListener("postsUpdated", updateSavedCount);

        return () => {
            window.removeEventListener("storage", updateSavedCount);
            window.removeEventListener("postsUpdated", updateSavedCount);
        };
    }, []);

    const ongoingProjects = dashboardUser?.ongoingProjects?.length || 0;
    const greetings = getGreeting(current_hours);
    const userName = typeof currentUser?.name === "string" ? currentUser.name.trim() : "";

    return (
        <div className="hero_part">
            <div className="hero_image">
                <img src={heroImage} alt="hero image illustrating a boy and girl learning together" />
            </div>
            <div className="hero_text">
                <h1 className="greetings">
                    {greetings}{userName && <>, <span className="greeting-name">{userName}</span></>}!
                </h1>
                <p>Find the right people, Build amazing things together</p>
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

                    <div
                        className="hero_stat_card"
                        onClick={() => navigate("/saved")}
                        style={{ cursor: "pointer" }}
                        title="View Saved Posts"
                    >
                        <div className="hero_stat_icon">
                            <i className="bi bi-bookmark"></i>
                        </div>
                        <div className="hero_stat_info">
                            <strong>{savedCount}</strong>
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

                    <button className="post_project" onClick={() => setPostModalOpen(true)}>
                        <i className="bi bi-plus-lg"></i>
                        Post a Project
                    </button>

                    {postModalOpen && (
                        <PostModal onClose={() => setPostModalOpen(false)} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Hero;
