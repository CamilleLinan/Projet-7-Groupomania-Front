import { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const penIcon = <FontAwesomeIcon icon={faPenToSquare} />
const hiddenPassword = <FontAwesomeIcon icon={faEyeSlash} />
const showPassword = <FontAwesomeIcon icon={faEye} />

// Modifier les informations de l'utilisateur
const UpdatePassword = () => {

    const authCtx = useContext(AuthContext);
    
    const [ inputPassword, setInputPassword ] = useState(false);
    const [ passwordIsVisible, setPasswordIsVisible ] = useState(false);

    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ errorConfirmPassword, setErrorConfirmPassword ] = useState('');
    
    const [ errorServer, setErrorServer ] = useState('');

    // Regex pour valider les champs
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,30}$/;

    // Utilisation de useForm
    const { register, formState: { errors }, handleSubmit } = useForm({
        password: '',
    });

    // Fonction pour vérifier que les mots de passe sont identiques
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        if (password === e.target.value) {
            setErrorConfirmPassword({ ...errorConfirmPassword, message: '' });
        } else {
            setErrorConfirmPassword({ ...errorConfirmPassword });
        }
    };

    // Utilisation de dotenv
    const API_URI = process.env.REACT_APP_API_URL;

    const onSubmit = async (data) => {
        await axios({
            method: "PUT",
            url: `${API_URI}api/users/${authCtx.userId}`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
            data
        })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error.response);
                setErrorServer({ ...errorServer });
        })
    };

    return (
            <form action="" onSubmit={handleSubmit(onSubmit)} id="update-password-form">
                
                <div className="profil_container_update_infos_input">
                    <h4 className="profil_container_update_infos_input_title bold">Modifier le mot de passe</h4>
                    <i className="profil_container_update_infos_input_icon" onClick={() => setInputPassword(!inputPassword)}>{penIcon}</i>
                </div>

                {inputPassword ? <>
                    <label htmlFor="password" className="form_label bold">Nouveau mot de passe</label>
                    <input 
                        type={!passwordIsVisible ? "password" : "text"} 
                        name="password"
                        id="password"
                        className="form_input update_infos_input"
                        {...register('password', { required: true, pattern: regexPassword })}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div id="icon-password-update" className="icon_password" onClick={() => setPasswordIsVisible(!passwordIsVisible)}>
                        {!passwordIsVisible && <><i className="icon_password_hidden">{hiddenPassword}</i><i className="icon_password_hidden_show show">{showPassword}</i></>}
                        {passwordIsVisible && <><i className="icon_password_show">{showPassword}</i><i className="icon_password_show_hidden hidden">{hiddenPassword}</i></>}
                    </div>
                    {errors.password && <p className="error error_profil bold">Le mot de passe doit contenir entre 4 et 30 caractères, au moins une majuscule et une minuscule, et au moins un chiffre</p>}

                    <label htmlFor="confirmPassword" className="form_label bold">Confirmer le mot de passe</label>
                    <input 
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="form_input update_infos_input"
                        onChange={handleConfirmPassword}
                        value={confirmPassword}
                        required
                    />
                    {errorConfirmPassword && <p className="error error_profil bold">Les mots de passe ne sont pas identiques</p>}
                    {errorServer && <p className="error error_center bold">Une erreur interne est survenue. Merci de revenir plus tard.</p>}
                </> : <br/>}
                <button type="submit" className="btn_form btn_update_profil bold">Modifier votre mot de passe</button>
            </form>
    )
}

export default UpdatePassword;