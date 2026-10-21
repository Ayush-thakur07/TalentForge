import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext";
import "./UpgradeCard.css";

function UpgradeCard() {
    const navigate = useNavigate();
    const { isPro, openUpgradeModal } = useUser();

    if (isPro) {
        return (
            <div className="upgrade-card pro-active-card">
                <div className="upgrade-icon pro-active-icon">
                    <i className="bi bi-crown-fill"></i>
                </div>

                <div className="upgrade-content">
                    <div className="pro-card-title-row">
                        <h3>TalentForge Pro</h3>
                        <span className="pro-active-tag">ACTIVE</span>
                    </div>

                    <p>
                        Your Pro membership is active. Enjoy unlimited connections, advanced filters, and AI tools.
                    </p>

                    <button
                        type="button"
                        className="upgrade-button pro-manage-btn"
                        onClick={() => navigate("/manage-plan")}
                    >
                        Manage Plan
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="upgrade-card">
            <div className="upgrade-icon">
                <i className="bi bi-stars"></i>
            </div>

            <div className="upgrade-content">
                <h3>Upgrade to Pro</h3>

                <p>
                    Unlock premium features and take your campus
                    collaboration to the next level.
                </p>

                <button
                    type="button"
                    className="upgrade-button"
                    onClick={() => openUpgradeModal()}
                >
                    Upgrade Now
                    <i className="bi bi-arrow-right"></i>
                </button>
            </div>
        </div>
    );
}

export default UpgradeCard;