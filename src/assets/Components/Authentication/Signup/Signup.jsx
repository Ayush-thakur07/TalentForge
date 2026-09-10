import SignupBrandPanel from "./SignupBrand";
import SignupForm from "./SignupForm";
import CollegeSelector from "./CollegeSelector";
import "./Signup.css";

function Signup() {
  return (
    <div className="signup-page">
      <SignupBrandPanel />
      <div className="signup-form-area">
        <CollegeSelector />
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;
