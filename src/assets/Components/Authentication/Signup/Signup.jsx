import SignupBrandPanel from "./SignupBrand";
import SignupForm from "./SignupForm";
import "./Signup.css";

function Signup({ setuser }) {
  return (
    <div className="signup-page">
      <SignupBrandPanel />
      <div className="signup-form-area">
        <SignupForm setuser={setuser} />
      </div>
    </div>
  );
}

export default Signup;
