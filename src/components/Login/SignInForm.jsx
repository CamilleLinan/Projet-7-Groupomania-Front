import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../context/authContext";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const hiddenPassword = <FontAwesomeIcon icon={faEyeSlash} />
const showPassword = <FontAwesomeIcon icon={faEye} />

// Fonction : Se Connecter
const SignInForm = () => {

    const [ passwordIsVisible, setPasswordIsVisible ] = useState(false);
    const [ errorSignIn, setErrorSignIn ] = useState('');
    const [ errorServer, setErrorServer ] = useState('');

    // Utilisation du context
    const authCtx = useContext(AuthContext);
    const API_URI = process.env.REACT_APP_API_URL;

    // Utilisation de useNavigate
    const navigate = useNavigate();

    const { register, formState: { errors }, handleSubmit } = useForm({
        email: '',
        password: '',
    });

    // Fonction de soumission du formulaire
    const onSubmit = async (data) => {

        await axios ({
            method: "post",
            url: `${API_URI}api/users/signin`,
            data
        })

        .then((res) => {
            console.log(res);
            authCtx.signin(res.data.token, res.data.userId);
            navigate('/trending');

        })
        .catch((error) => {
            console.log(error.response);
            if (error.response.status === 401) {
                setErrorSignIn({ ...errorSignIn })
            } else {
                setErrorServer({ ...errorServer })
            }
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} id="sign-up-form">
                
                <label htmlFor="email" className="form_label bold">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className="form_input"
                    {...register('email', { required: true })}
                />
                {errors.mail && <p className="error bold">Veuillez renseigner une adresse mail</p>}

                <label htmlFor="password" className="form_label bold">Mot de passe</label>
                <input 
                    type={!passwordIsVisible ? "password" : "text"} 
                    name="password" 
                    id="password"
                    className="form_input" 
                    {...register('password', { required: true })}
                />
                <div id="icon-password-signin" className="icon_password" onClick={() => setPasswordIsVisible(!passwordIsVisible)}>
                    {!passwordIsVisible && <><i className="icon_password_hidden">{hiddenPassword}</i><i className="icon_password_hidden_show show">{showPassword}</i></>}
                    {passwordIsVisible && <><i className="icon_password_show">{showPassword}</i><i className="icon_password_show_hidden hidden">{hiddenPassword}</i></>}
                 </div>
                {errors.password && <p className="error bold">Veuillez renseigner un mot de passe</p>}

                {errorSignIn && <p className="error error_center bold">La paire identifiant/mot de passe est incorrecte.</p>}
                {errorServer && <p className="error error_center bold">Une erreur interne est survenue. Merci de revenir plus tard.</p>}

                <button type="submit" className="btn_form bold">Se connecter</button>
            </form>

        </>
    );
};

export default SignInForm;