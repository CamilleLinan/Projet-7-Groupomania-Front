import { useState }  from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

const hiddenPassword = <FontAwesomeIcon icon={faEyeSlash} />
const showPassword = <FontAwesomeIcon icon={faEye} />

// Fonction : S'Enregistrer
const SignUpForm = () => {

    const [ formSubmit, setFormSubmit ] = useState();
    const [ passwordIsVisible, setPasswordIsVisible ] = useState(false);
    const [ errorEmail, setErrorEmail ] = useState('');
    const [ errorServer, setErrorServer ] = useState('');

    // Utilisation de YupResolver
    const formSchema = Yup.object().shape({
        firstname: Yup.string().trim()
            .required('Veuillez renseigner votre prénom')
            .min(2, 'Doit contenir minimum 2 caractères')
            .max(30, 'Doit contenir maximum 30 caractères')
            .matches(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i, 
            'Ne doit contenir ni chiffre ni caractère spécial'),
        lastname: Yup.string().trim()
            .required('Veuillez renseigner votre nom')
            .min(2, 'Doit contenir minimum 2 caractères')
            .max(30, 'Doit contenir maximum 30 caractères')
            .matches(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i, 
            'Ne doit contenir ni chiffre ni caractère spécial'),
        email: Yup.string().trim()
            .required('Veuillez renseigner votre adresse mail')
            .matches(/^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
            'Veuillez renseigner une adresse mail valide'),
        password: Yup.string().trim()
            .required('Veuillez renseigner un mot de passe')
            .min(4, 'Doit contenir minimum 4 caractères')
            .max(30, 'Doit contenir maximum 30 caractères')
            .matches(/(?=.*\d){1}/i, 'Doit contenir au moins un chiffre')
            .matches(/(?=.*[A-Z]){1,}.*/, 'Doit contenir au moins une majuscule')
            .matches(/(?=.*[a-z]){1,}.*/, 'Doit contenir au moins une minuscule'),
        confirmPassword: Yup.string()
            .required('Veuillez confirmer le mot de passe')
            .oneOf([Yup.ref('password')], 'Les mots de passe ne sont pas identiques'),
    });

    // Utilisation de useForm
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, formState: { errors }, handleSubmit } = useForm(formOptions, {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });

    // Utilisation de dotenv
    const API_URL_USER = process.env.REACT_APP_API_URL_USER;

    // Fonction de soumission du formulaire
    const onSubmit = async (data) => {
        await axios({
            method: "post",
            url: `${API_URL_USER}/signup`,
            data
        })
            .then(() => {
                setFormSubmit(true);
            })
            .catch((error) => {
                if (error.response.data.errors.email) {
                    setErrorEmail(error.response.data.errors.email);
                } else {
                    setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' })
                }
            });
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
                        {...register('firstname')}
                    />
                    {errors.firstname && <p className="error bold">{errors.firstname.message}</p>}

                    <label htmlFor="lastname" className="form_label bold">Nom</label>
                    <input 
                        type="text"
                        name="lastname"
                        id="lastname"
                        className="form_input"
                        {...register('lastname')}
                    />
                    {errors.lastname && <p className="error bold">{errors.lastname.message}</p>}

                    <label htmlFor="email" className="form_label bold">Email</label>
                    <input 
                        type="email"
                        name="email"
                        id="email"
                        className="form_input"
                        {...register('email')}
                    />
                    {errors.email && <p className="error bold">{errors.email.message}</p>}
                    {errorEmail && <p className="error bold">{errorEmail}</p>}

                    <label htmlFor="password" className="form_label bold">Mot de passe</label>
                    <div className="container_password_input">
                    <input 
                        type={!passwordIsVisible ? "password" : "text"}
                        name="password"
                        id="password"
                        className="form_input"
                        {...register('password')}
                    />
                        <div id="icon-password-signup" className="icon_password" onClick={() => setPasswordIsVisible(!passwordIsVisible)}>
                            {!passwordIsVisible && <><i className="icon_password_hidden">{hiddenPassword}</i><i className="icon_password_hidden_show show">{showPassword}</i></>}
                            {passwordIsVisible && <><i className="icon_password_show">{showPassword}</i><i className="icon_password_show_hidden hidden">{hiddenPassword}</i></>}
                        </div>
                    </div>
                    {errors.password && <p className="error bold">{errors.password.message}</p>}

                    <label htmlFor="confirmPassword" className="form_label bold">Confirmer le mot de passe</label>
                    <input 
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="form_input"
                        {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && <p className="error bold">{errors.confirmPassword.message}</p>}
                    
                    {errorServer && <p className="error error_center bold">{errorServer.message}</p>}

                    <button type="submit" className="btn_form bold">Créer un compte</button>
                </form>
            </>
        )}
    </>
    );
};

export default SignUpForm;