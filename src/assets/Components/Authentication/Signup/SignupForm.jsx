import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../config/firebase";
import "./Signup.css";

function SignupForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
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
        setError("Email/password sign-up is disabled in Firebase. Enable it in Firebase Console > Authentication.");
      } else if (code.includes("network-request-failed")) {
        setError("Network error. Please check your connection and try again.");
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

      {error && <p className="signup-error">{error}</p>}

      <label>Email Address</label>
      <input
        name="email"
        type="email"
        placeholder="Enter your college email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        pattern="[A-Za-z0-9._%+-]+@chitkara\.edu\.in"
      />

      <label>Password</label>
      <input
        name="password"
        type="password"
        placeholder="Create a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />

      <label>Confirm Password</label>
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        minLength={6}
      />

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
