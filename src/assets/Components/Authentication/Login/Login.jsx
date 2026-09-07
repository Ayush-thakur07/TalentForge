// import auth from "/firebase"
import {GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, setPersistence} from "firebase/auth";
import {browserLocalPersistence, browserSessionPersistence} from "firebase/auth";
import "./Login.css";
import {useState}from "react";
import {auth} from "../../../../config/firebase";
function Login(){
    const [show,setshow]=useState(false);
    const a = new GoogleAuthProvider();
    const [check, setcheck] = useState(false);
    const [loading, setLoading] = useState(false);

    async function applyPersistence(){
        await setPersistence(
            auth,
            check ? browserLocalPersistence : browserSessionPersistence,
        );
    }

    async function google(){
    if(loading){
        return;
    }

    try{
        setLoading(true);

        await applyPersistence();

        const pop = await signInWithPopup(auth, a);
        const user = pop.user;

        console.log(user);
        window.alert("Successfully entered mail");
    }
    catch(error){
        console.log(error);
        window.alert(error.message);
    }
    finally{
        setLoading(false);
    }
}
    async function handleSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        if(loading){
            return;
        }

        try{
            setLoading(true);
            await applyPersistence();
            await signInWithEmailAndPassword(auth, email, password);
            window.alert("Successfully logged in");
        }
        catch(error){
            console.log(error);
            window.alert(error.message);
        }
        finally{
            setLoading(false);
        }
    }
    return(
        <div className="data">
            <div className="head">
                <h1>Welcome Back!</h1>
                <p><b>Login to continue to TalentForge</b></p>
            </div>
            <div className="input">
                <form className="form-sign" onSubmit={handleSubmit}>
                    <label>Email Address</label>
                    <i className="bi bi-envelope"></i><input name="email" type = "email" placeholder="Enter your college email" required pattern="[A-Za-z0-9._%+-]+@chitkara\.edu\.in"/>
                    <div>
                        <label>Password</label>
                        <i className="bi bi-lock"></i><input name="password" type = {show? "text":"password"} placeholder="Enter your password" required/>
                        <button type="button" onClick={() => setshow(!show)}><i className={ show ? "bi bi-eye" : "bi bi-eye-slash"}></i></button>
                    </div>
                    <div>
                        <label className="remember">Remember me
                            <input type="checkbox" className="checkbox" checked = {check} onChange={() => setcheck(!check)}/>
                        </label>
                    </div>
                    <button type="button">Forgot Password?</button>
                    <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
                    <div className="divider">
                        <span>or continue with</span>
                    </div>
                    <button
                    type="button"
                    className="google"
                    onClick={google}
                    disabled={loading}>
                    <i className="bi bi-google"></i>
                    {loading ? "Signing in..." : "Continue with Google"}
                    </button>
                    <p className="signup">Don't have an account? <button type="button">Sign up</button></p>
                </form>
            </div>
        </div>
    );
}
export default Login;