import { useState } from "react";
import logo from "../styles/img/groupomania-logo.png";
import SignInForm from "../components/Login/SignInForm";
import SignUpForm from "../components/Login/SignUpForm";

const Login = () => {
    const [signUpModal, setSignUpModal] = useState(true);
    const [signInModal, setSignInModal] = useState('');

    // Choix de l'affichage entre SignUpForm et SignInForm
    const handleModals = (e) => {
        setSignUpModal(e.target.id === 'signup');
        setSignInModal(e.target.id === 'signin');
    }

    return (
        <>
            <header className="log_container_header">
                <img src={logo} alt="groupomania-logo" className="log_container_header_logo" />
            </header>
            <section className="log_container_section bg_section">
                <div className="log_container_section_header">
                    <button onClick={handleModals} id="signup" className={signUpModal ? "active bold" : "inactive bold"}>S'inscrire</button>
                    <button onClick={handleModals} id="signin" className={signInModal ? "active bold" : "inactive bold"}>Se connecter</button>
                </div>
                <br/>
                <div className="log_container_section_form">
                    {signUpModal && <SignUpForm />}
                    {signInModal && <SignInForm />}
                </div>
            </section>
        </>
    );
};

export default Login;