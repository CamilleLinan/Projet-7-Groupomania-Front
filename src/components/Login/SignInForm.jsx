import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../context/authContext";
import axios from 'axios';


// Fonction : Se Connecter
const SignInForm = () => {
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
                    type="password" 
                    name="password" 
                    id="password"
                    className="form_input" 
                    {...register('password', { required: true })}
                />
                {errors.password && <p className="error bold">Veuillez renseigner un mot de passe</p>}

                {errorSignIn && <p className="error error_center bold">La paire identifiant/mot de passe est incorrecte.</p>}
                {errorServer && <p className="error error_center bold">Une erreur interne est survenue. Merci de revenir plus tard.</p>}

                <button type="submit" className="btn_form">Se connecter</button>
            </form>

        </>
    );
};

export default SignInForm;