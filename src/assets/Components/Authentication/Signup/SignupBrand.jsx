import "./SignupBrand.css";

function SignupBrand() {
    return (
        <div className="main">

            <div className="bg_image">
                <img
                    src="/signup-image.png"
                    alt=""
                    className="back_image"
                />
            </div>

            <div className="header_logo">
                <img
                    src="/favicon.svg"
                    alt="TalentForge logo"
                    className="signup_logo"
                />

                <span className="signup_brand_name">
                    TalentForge
                </span>
            </div>

            <div className="bg_text">
                <h1>
                    More Than Just a College.
                </h1>

                <h3>
                    Join a trusted community where students
                    learn, collaborate, exchange and grow together.
                </h3>
            </div>

        </div>
    );
}

export default SignupBrand;