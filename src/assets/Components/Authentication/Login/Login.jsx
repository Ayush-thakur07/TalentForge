
import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    setPersistence
} from "firebase/auth";

import {
    browserLocalPersistence,
    browserSessionPersistence
} from "firebase/auth";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import { auth } from "../../../../config/firebase";
import background from "../../../Background_image.png";

function Login({ setuser }) {

    const navigate = useNavigate();

    const [show, setshow] = useState(false);
    const a = new GoogleAuthProvider();
    const [check, setcheck] = useState(false);
    const [loading, setLoading] = useState(false);

    async function applyPersistence() {
        await setPersistence(
            auth,
            check ? browserLocalPersistence : browserSessionPersistence,
        );
    }

    async function google() {

        if (loading) {
            return;
        }

        try {
            setLoading(true);

            await applyPersistence();

            const pop = await signInWithPopup(auth, a);
            const user = pop.user;

            setuser(user);

            console.log(user);
            window.alert("Successfully entered mail");
            navigate("/dashboard");
        }
        catch (error) {
            console.log(error);
            window.alert(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    async function handleSubmit(event) {

        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        if (loading) {
            return;
        }
        
        try {
            setLoading(true);
            await applyPersistence();
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            setuser(result.user);

            window.alert("Successfully logged in");
            navigate("/dashboard");
        }
        catch (error) {
            const code = error?.code || "";

        if (
            code.includes("user-not-found") ||
            code.includes("wrong-password") ||
            code.includes("invalid-credential")
        ) {
            window.alert("Invalid email or password.");
        } else if (code.includes("operation-not-allowed")) {
            window.alert("Firebase login is disabled.");
        } else {
            console.log(error);
            window.alert(error.message);
        }
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="data">

            <div className="card">

                <img src={background} alt="" />

                <div className="card-content">

                    <h1>Your Campus.</h1>
                    <h1>Your People.</h1>
                    <h1>Your Opportunities.</h1>

                    <div className="card-description">
                        <p>
                            <i>Connect, collaborate and create</i>
                        </p>

                        <p>
                            <i>amazing things together.</i>
                        </p>
                    </div>

                    <div className="feature">
                        <div className="feature-title">
                            <i className="bi bi-people-fill"></i>
                            <span>Connect with students</span>
                        </div>
                    </div>

                    <div className="feature">
                        <div className="feature-title">
                            <i className="bi bi-suitcase-lg-fill"></i>
                            <span>Build & share projects</span>
                        </div>
                    </div>

                    <div className="feature">
                        <div className="feature-title">
                            <i className="bi bi-search"></i>
                            <span>Explore Opportunities</span>
                        </div>
                    </div>

                </div>

            </div>

            <div className="login-box">

                <div className="head">
                    <h1>Welcome Back!</h1>

                    <p>
                        <b>Login to continue to TalentForge</b>
                    </p>
                </div>

                <div className="input">

                    <form
                        className="form-sign"
                        onSubmit={handleSubmit}
                    >

                        <label>Email Address</label>

                        <i className="bi bi-envelope"></i>

                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your college email"
                            required
                            pattern="[A-Za-z0-9._%+-]+@chitkara\.edu\.in"
                        />

                        <div>

                            <label>Password</label>

                            <i className="bi bi-lock"></i>

                            <input
                                name="password"
                                type={show ? "text" : "password"}
                                placeholder="Enter your password"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setshow(!show)}
                            >
                                <i
                                    className={
                                        show
                                            ? "bi bi-eye"
                                            : "bi bi-eye-slash"
                                    }
                                ></i>
                            </button>

                        </div>

                        <div>

                            <label className="remember">
                                Remember me

                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={check}
                                    onChange={() => setcheck(!check)}
                                />
                            </label>

                        </div>

                        <button type="button">
                            Forgot Password?
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"
                            }
                        </button>

                        <div className="divider">

                            <span>
                                or continue with
                            </span>

                        </div>

                        <button
                            type="button"
                            className="google"
                            onClick={google}
                            disabled={loading}
                        >

                            <i className="bi bi-google"></i>

                            {loading
                                ? "Signing in..."
                                : "Continue with Google"
                            }

                        </button>

                        <p className="signup">

                            Don't have an account?

                            <button
                                type="button"
                                onClick={() => navigate("/signup")}
                            >
                                Sign up
                            </button>

                        </p>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default Login;