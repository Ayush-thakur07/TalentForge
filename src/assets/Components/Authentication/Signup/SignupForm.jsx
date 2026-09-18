import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../config/firebase";
import "./Signup.css";
import { useUser } from "../../../../context/UserContext";

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useUser();

  /* this was the previous line which i changed so that the exsisting year mail id can only be accepted
  const chitkaraEmailPattern =/^[a-z]+[0-9]{4}\.[a-z]+[0-9]{2}@chitkara\.edu\.in$/;
*/
  const chitkaraEmailPattern =/^[a-z]+[0-9]{4}\.[a-z]+(23|24|25|26)@chitkara\.edu\.in$/;
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    const cleanEmail = email.trim().toLowerCase();
    if (!chitkaraEmailPattern.test(cleanEmail)) {
      setEmailError(
        "Please use your valid Chitkara University student email."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      const result = await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        password
      );

      setCurrentUser(result.user);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      const code = err?.code || "";
      if (code.includes("email-already-in-use")) {
        setError("This email is already registered. Try logging in instead.");
      } else if (code.includes("invalid-email")) {
        setError("Please enter a valid college email address.");
      } else if (code.includes("weak-password")) {
        setError("Password is too weak. Use at least 6 characters.");
      } else if (code.includes("operation-not-allowed")) {
        setError("Firebase signup is disabled.");
      } else if (code.includes("network-request-failed")) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(err?.message || "Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      <p>Sign up to get started with TalentForge</p>

      {error && (
        <div className="signup-error" role="alert">
          <i className="bi bi-exclamation-circle-fill"></i>
          <span>{error}</span>
        </div>
      )}

      <label>Email Address</label>
      <input
        name="email"
        type="email"
        placeholder="Enter your college email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError("");
          setError("");
        }}
        required
        pattern="[A-Za-z0-9._%+-]+@chitkara\.edu\.in"
      />
      {emailError && (
        <div className="signup-error" role="alert">
          <i className="bi bi-exclamation-circle-fill"></i>
          <span>{emailError}</span>
        </div>
      )}

      <div className="form-field">
        <label htmlFor="password">Password</label>
        <div className="password-input-wrapper">
          <i className="bi bi-lock password-lock"></i>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            required
            minLength={6}
          />
          <button
            type="button"
            className="password-eye"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <i
              className={
                showPassword
                  ? "bi bi-eye-slash"
                  : "bi bi-eye"
              }
            ></i>
          </button>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="password-input-wrapper">
          <i className="bi bi-lock password-lock"></i>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            required
            minLength={6}
          />
          <button
            type="button"
            className="password-eye"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
          >
            <i
              className={
                showConfirmPassword
                  ? "bi bi-eye-slash"
                  : "bi bi-eye"
              }
            ></i>
          </button>
        </div>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Sign Up"}
      </button>

      <p className="signup-login">
        Already have an account?{" "}
        <button type="button" onClick={() => navigate("/login")}>
          Log in
        </button>
      </p>
    </form>
  );
}

export default SignupForm;
