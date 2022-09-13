import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import logo from "../../styles/img/groupomania-logo.png";

const LogIndex = ( props ) => {
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login") {
            setSignUpModal(false);
            setSignInModal(true);
        }
    }

    return (
        <div>
            <div className="log_container_header">
                <img src={logo} alt="groupomania-logo" className="log_container_header_logo" />
            </div>
            <div className="log_container_section">
                <div className="log_container_section_header">
                    <button onClick={handleModals} id="register" className={signUpModal ? "btn active btn_signup bold" : "btn inactive btn_signup bold"}>S'inscrire</button>
                    <button onClick={handleModals} id="login" className={signInModal ? "btn active btn_signin bold" : "btn inactive btn_signin bold"}>Se connecter</button>
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