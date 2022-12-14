import { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, faPenToSquare, faCheck, faKey } from '@fortawesome/free-solid-svg-icons';

const hiddenPassword = <FontAwesomeIcon icon={faEyeSlash} />
const showPassword = <FontAwesomeIcon icon={faEye} />
const penIcon = <FontAwesomeIcon icon={faPenToSquare} />
const checkIcon = <FontAwesomeIcon icon={faCheck} />
const keyIcon = <FontAwesomeIcon icon={faKey} />

// Modifier les informations de l'utilisateur
const UpdatePassword = () => {

    const authCtx = useContext(AuthContext);
    
    const [ modify, setModify ] = useState(false);
    const [ passwordIsVisible, setPasswordIsVisible ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ errorServer, setErrorServer ] = useState('');

    const modifyHandler = () => {
        setModify((modify) => !modify);
    }

    // YupResolver pour vérifier les champs du formulaire
    const formSchema = Yup.object().shape({
        password: Yup.string().trim()
            .required('')
            .min(4, 'Doit contenir minimum 4 caractères')
            .max(30, 'Doit contenir maximum 30 caractères')
            .matches(/(?=.*\d){1}/i, 'Doit contenir au moins un chiffre')
            .matches(/(?=.*[A-Z]){1,}.*/, 'Doit contenir au moins une majuscule')
            .matches(/(?=.*[a-z]){1,}.*/, 'Doit contenir au moins une minuscule'),
        confirmPassword: Yup.string()
            .required('')
            .oneOf([Yup.ref('password')], 'Les mots de passe ne sont pas identiques')
    })

    // Utilisation de useForm
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, formState: { errors }, handleSubmit } = useForm(formOptions, {
        password: '',
    });

    // Utilisation de dotenv
    const API_URL_USER = process.env.REACT_APP_API_URL_USER;

    const onSubmit = async (data) => {
        if (!modify) {
            await axios({
                method: "PUT",
                url: `${API_URL_USER}/${authCtx.userId}/password`,
                headers: {
                    Authorization: `Bearer ${authCtx.token}`,
                },
                data
            })
                .then(() => {
                    setSuccessMessage({ ...successMessage, message: 'Votre mot de passe a bien été mis à jour !' })
                })
                .catch(() => {
                    setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' });
                })
        }
    };

    return (
        <article>
            <form action="" onSubmit={handleSubmit(onSubmit)} id="update-password-form">
                <div className="profil_container_update_infos_input">
                    <h4 className="profil_container_update_infos_input_title bold">Mot de passe<i className="profil_container_update_infos_input_icon">{keyIcon}</i></h4>
                </div>

                {modify ? <>
                    <label htmlFor="password" className="form_label bold">Nouveau mot de passe</label>
                    <div className="container_password_input">
                        <input 
                            type={!passwordIsVisible ? "password" : "text"} 
                            name="password"
                            id="password"
                            className={!errors.password ? "form_input update_infos_input" : "form_input update_infos_input form_input_error"}
                            {...register('password')}
                        />
                        <div id="icon-password-update" className="icon_password" onClick={() => setPasswordIsVisible(!passwordIsVisible)}>
                            {!passwordIsVisible && <><i className="icon_password_hidden">{hiddenPassword}</i><i className="icon_password_hidden_show show">{showPassword}</i></>}
                            {passwordIsVisible && <><i className="icon_password_show">{showPassword}</i><i className="icon_password_show_hidden hidden">{hiddenPassword}</i></>}
                        </div>
                    </div>
                    {errors.password && <p className="error error_profil bold">{errors.password?.message}</p>}

                    <label htmlFor="confirmPassword" className="form_label bold">Confirmer le mot de passe</label>
                    <input 
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className={!errors.confirmPassword ? "form_input update_infos_input" : "form_input update_infos_input form_input_error"}
                        {...register('confirmPassword')}
                    />
                    <p className="error error_profil bold">{errors.confirmPassword?.message}</p>
                    
                </> : <br/>}
                
                {successMessage && <p className="success text_center bold">{successMessage.message}</p>}
                {errorServer && <p className="error text_center bold">{errorServer.message}</p>}
                
                {!modify ? 
                <button onClick={modifyHandler} className="btn_form btn_update_profil bold">
                    Modifier <i className="profil_container_update_infos_input_icon">{penIcon}</i>
                </button> : 
                <button onClick={modifyHandler} className="btn_form btn_update_profil bold">
                    Enregistrer <i className="profil_container_update_infos_input_icon">{checkIcon}</i>
                </button>}
            </form>
        </article>
    )
}

export default UpdatePassword;