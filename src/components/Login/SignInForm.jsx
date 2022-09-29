import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AuthContext from "../../context/authContext";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

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

    // Utilisation de YupResolver
    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required('Veuillez renseigner votre adresse mail'),
        password: Yup.string()
            .required('Veuillez renseigner votre mot de passe'),
    });

    // Utilisation de useForm
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, formState: { errors }, handleSubmit } = useForm(formOptions, {
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
            authCtx.signin(res.data.token, res.data.userId, res.data.isAdmin);
            navigate('/trending');

        })
        .catch((error) => {
            console.log(error.response);
            if (error.response.status === 401) {
                setErrorSignIn({ ...errorSignIn, message: 'La paire identifiant/mot de passe est incorrecte.' })
            } else {
                setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' })
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
                    {...register('email')}
                />
                {errors.mail && <p className="error bold">{errors.email.message}</p>}

                <label htmlFor="password" className="form_label bold">Mot de passe</label>
                <div className="container_password_input">
                <input 
                    type={!passwordIsVisible ? "password" : "text"} 
                    name="password" 
                    id="password"
                    className="form_input" 
                    {...register('password')}
                />
                    <div id="icon-password-signin" className="icon_password" onClick={() => setPasswordIsVisible(!passwordIsVisible)}>
                        {!passwordIsVisible && <><i className="icon_password_hidden">{hiddenPassword}</i><i className="icon_password_hidden_show show">{showPassword}</i></>}
                        {passwordIsVisible && <><i className="icon_password_show">{showPassword}</i><i className="icon_password_show_hidden hidden">{hiddenPassword}</i></>}
                    </div>
                 </div>
                {errors.password && <p className="error bold">{errors.password.message}</p>}

                {errorSignIn && <p className="error error_center bold">{errorSignIn.message}</p>}
                {errorServer && <p className="error error_center bold">{errorServer.message}</p>}

                <button type="submit" className="btn_form bold">Se connecter</button>
            </form>
        </>
    );
};

export default SignInForm;