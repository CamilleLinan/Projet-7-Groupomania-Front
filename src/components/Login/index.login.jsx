import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import logo from "../../styles/img/groupomania-logo.png";


// Fonction : LogIndex
const LogIndex = () => {
    const [signUpModal, setSignUpModal] = useState(true);
    const [signInModal, setSignInModal] = useState('');

    // Choix de l'affichage entre SignUpForm et SignInForm
    const handleModals = (e) => {
        setSignUpModal(e.target.id === 'signup');
        setSignInModal(e.target.id === 'signin');
    }

    return (
        <div>
            <div className="log_container_header">
                <img src={logo} alt="groupomania-logo" className="log_container_header_logo" />
            </div>
            <div className="log_container_section bg_section">
                <div className="log_container_section_header">
                    <button onClick={handleModals} id="signup" className={signUpModal ? "active bold" : "inactive bold"}>S'inscrire</button>
                    <button onClick={handleModals} id="signin" className={signInModal ? "active bold" : "inactive bold"}>Se connecter</button>
                </div>
                <br/>
                <div className="log_container_section_form">
                    {signUpModal && <SignUpForm />}
                    {signInModal && <SignInForm />}
                </div>
            </div>
        </div>
    );
};

export default LogIndex;