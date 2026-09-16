import { useState } from "react";
import "./UpgradeCard.css";

function UpgradeCard() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
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
                        onClick={() => setShowModal(true)}
                    >
                        Upgrade Now
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
            </div>

            {showModal && (
                <div
                    className="coming-soon-overlay"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="coming-soon-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="coming-soon-close"
                            onClick={() => setShowModal(false)}
                            aria-label="Close"
                        >
                            ×
                        </button>

                        <div className="coming-soon-icon">
                            <i className="bi bi-stars"></i>
                        </div>

                        <span className="coming-soon-badge">
                            COMING SOON
                        </span>

                        <h2>Pro is on the way</h2>

                        <p>
                            We're working on powerful premium features
                            to make your TalentForge experience even better.
                        </p>

                        <div className="coming-soon-features">
                            <div>
                                <i className="bi bi-lightning-charge-fill"></i>
                                <span>Advanced matching</span>
                            </div>

                            <div>
                                <i className="bi bi-bar-chart-fill"></i>
                                <span>Detailed analytics</span>
                            </div>

                            <div>
                                <i className="bi bi-stars"></i>
                                <span>Premium features</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="coming-soon-button"
                            onClick={() => setShowModal(false)}
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default UpgradeCard;