import { useState }  from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const hiddenPassword = <FontAwesomeIcon icon={faEyeSlash} />
const showPassword = <FontAwesomeIcon icon={faEye} />

// Fonction : S'Enregistrer
const SignUpForm = () => {

    const [ formSubmit, setFormSubmit ] = useState();
    const [ errorEmail, setErrorEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordIsVisible, setPasswordIsVisible ] = useState(false);
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ errorConfirmPassword, setErrorConfirmPassword ] = useState('');
    const [ errorServer, setErrorServer ] = useState('');

    // RegExp pour valider le formulaire
    const regexNames = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i;
    const regexEmail = /^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,30}$/;

    // Utilisation de useForm
    const { register, formState: { errors }, handleSubmit } = useForm({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });

    // Fonction pour vérifier que les mots de passe sont identiques
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        if (password === e.target.value) {
            setErrorConfirmPassword({ ...errorConfirmPassword, message: '' });
        } else {
            setFormSubmit(false);
            setErrorConfirmPassword({ ...errorConfirmPassword, message: 'Les mots de passe ne sont pas identiques' });
        }
    };

    // Utilisation de dotenv
    const API_URI = process.env.REACT_APP_API_URL;

    // Fonction de soumission du formulaire
    const onSubmit = async (data) => {
        if (data.password !== confirmPassword) {
            return;
        } else {
        await axios({
            method: "post",
            url: `${API_URI}api/users/signup`,
            data
        })
            .then((res) => {
                console.log(res);
                setFormSubmit(true);
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response.status === 400) {
                    setErrorEmail({ ...errorEmail, message: 'Cette adresse email est déjà utilisée' });
                } else {
                    setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' })
                }
            });
        }
    };


    return (
    <>
        {formSubmit ? (
            <>
                <h4 className="success bold">Inscription réussie ! Veuillez vous connecter.</h4>
            </>
        ) : (
            <>
                <form action="" onSubmit={handleSubmit(onSubmit)} id="sign-up-form">
                    
                    <label htmlFor="firstname" className="form_label bold">Prénom</label>
                    <input 
                        type="text"
                        name="firstname"
                        id="firstname"
                        className="form_input"
                        {...register('firstname', { required: true, minLength: 2, maxLength: 20, pattern: regexNames })}
                    />
                    {errors.firstname && <p className="error bold">Veuillez renseigner votre prénom sans chiffre ni caractère spécial</p>}

                    <label htmlFor="lastname" className="form_label bold">Nom</label>
                    <input 
                        type="text"
                        name="lastname"
                        id="lastname"
                        className="form_input"
                        {...register('lastname', { required: true, minLength: 2, maxLength: 20, pattern: regexNames })}
                    />
                    {errors.lastname && <p className="error bold">Veuillez renseigner votre nom sans chiffre ni caractère spécial</p>}

                    <label htmlFor="email" className="form_label bold">Email</label>
                    <input 
                        type="email"
                        name="email"
                        id="email"
                        className="form_input"
                        {...register('email', { required: true, pattern: regexEmail })}
                    />
                    {errors.email && <p className="error bold">Veuillez renseigner une adresse mail valide type : exemple@mail.com</p>}
                    {errorEmail && <p className="error bold">{errorEmail.message}</p>}

                    <label htmlFor="password" className="form_label bold">Mot de passe</label>
                    <div className="container_password_input">
                    <input 
                        type={!passwordIsVisible ? "password" : "text"}
                        name="password"
                        id="password"
                        className="form_input"
                        {...register('password', { required: true, pattern: regexPassword })}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                        <div id="icon-password-signup" className="icon_password" onClick={() => setPasswordIsVisible(!passwordIsVisible)}>
                            {!passwordIsVisible && <><i className="icon_password_hidden">{hiddenPassword}</i><i className="icon_password_hidden_show show">{showPassword}</i></>}
                            {passwordIsVisible && <><i className="icon_password_show">{showPassword}</i><i className="icon_password_show_hidden hidden">{hiddenPassword}</i></>}
                        </div>
                    </div>
                    {errors.password && <p className="error bold">Le mot de passe doit contenir entre 4 et 30 caractères, au moins une majuscule et une minuscule, et au moins un chiffre</p>}

                    <label htmlFor="confirmPassword" className="form_label bold">Confirmer le mot de passe</label>
                    <input 
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="form_input"
                        onChange={handleConfirmPassword}
                        value={confirmPassword}
                        required
                    />
                    {errorConfirmPassword && <p className="error bold">{errorConfirmPassword.message}</p>}
                    
                    {errorServer && <p className="error error_center bold">{errorServer.message}</p>}

                    <button type="submit" className="btn_form bold">Créer un compte</button>
                </form>
            </>
        )}
    </>
    );
};

export default SignUpForm;