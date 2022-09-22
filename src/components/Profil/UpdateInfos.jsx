import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/authContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import UpdatePassword from "./UpdatePassword";

const penIcon = <FontAwesomeIcon icon={faPenToSquare} />

// Modifier les informations de l'utilisateur

const UpdateInfos = ({ propFirstName, propLastName, propEmail }) => {
    const authCtx = useContext(AuthContext);
    
    const [ inputFirstName, setInputFirstName ] = useState(false);
    const [ inputLastName, setInputLastName ] = useState(false);
    const [ inputEmail, setInputEmail ] = useState(false);

    const [ updateFirstName, setUpdateFirstName ] = useState(propFirstName);
    const [ updateLastName, setUpdateLastName ] = useState(propLastName);
    const [ updateEmail, setUpdateEmail ] = useState(propEmail);

    const [ errorEmail, setErrorEmail ] = useState('');
    const [ errorServer, setErrorServer ] = useState('');

    // Utilisation de useEffect pour garder les données dans le state
    useEffect(() => {
        setUpdateFirstName(propFirstName);
        setUpdateLastName(propLastName);
        setUpdateEmail(propEmail);
    }, [propFirstName, propLastName, propEmail])

    // Regex pour valider les champs
    const regexNames = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i;
    const regexEmail = /^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Utilisation de useForm
    const { register, formState: { errors }, handleSubmit } = useForm({
        firstname: '',
        lastname: '',
        email: '',
    });

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
                if (error.response.status === 400) {
                    setErrorEmail({ ...errorEmail });
                } else {
                    setErrorServer({ ...errorServer });
                }  
            })
    };

    return (
        <div className="profil_container_update_infos">
            <h3 className="profil_container_update_title updateprofil_title bold">Vos informations</h3>
            <form action="" onSubmit={handleSubmit(onSubmit)} id="update-infos-form">
                
                <label htmlFor="firstname" className="form_label bold">Prénom :</label>
                <div className="profil_container_update_infos_input">
                    <p className="profil_container_update_infos_input_subtitle">{updateFirstName}</p>
                    <i className="profil_container_update_infos_input_icon" onClick={() => setInputFirstName(!inputFirstName)}>{penIcon}</i>
                </div>
                {inputFirstName ? <>
                <input 
                    type='text'
                    name="firstname"
                    id="firstname"
                    className="form_input update_infos_input"
                    {...register('firstname', { minLength: 2, maxLength: 20, pattern: regexNames })}
                /> 
                {errors.firstname && <p className="error error_profil bold">Veuillez renseigner votre prénom sans chiffre ni caractère spécial</p>}
                </> : <br/>}
                
                <label htmlFor="lastname" className="form_label bold">Nom :</label>
                <div className="profil_container_update_infos_input">
                    <p className="profil_container_update_infos_input_subtitle">{updateLastName}</p>
                    <i className="profil_container_update_infos_input_icon" onClick={() => setInputLastName(!inputLastName)}>{penIcon}</i>
                </div>
                {inputLastName ? <>
                <input 
                    type='text'
                    name="lastname"
                    id="lastname"
                    className="form_input update_infos_input"
                    {...register('lastname', { minLength: 2, maxLength: 20, pattern: regexNames })}
                /> 
                {errors.lastname && <p className="error error_profil bold">Veuillez renseigner votre nom sans chiffre ni caractère spécial</p>}
                </> : <br/>}

                <label htmlFor="email" className="form_label bold">Email :</label>
                <div className="profil_container_update_infos_input">
                    <p className="profil_container_update_infos_input_subtitle">{updateEmail}</p>
                    <i className="profil_container_update_infos_input_icon" onClick={() => setInputEmail(!inputEmail)}>{penIcon}</i>
                </div>
                {inputEmail ? <>
                <input 
                    type='email' 
                    name="email"
                    id="email"
                    className="form_input update_infos_input"
                    {...register('email', { pattern: regexEmail })}
                /> 
                {errors.email && <p className="error error_profil bold">Veuillez renseigner une adresse mail valide type : exemple@mail.com</p>}
                {errorEmail && <p className="error error_profil bold">Cette email est déjà utilisée</p>}
                </> : <br/>}

                {errorServer && <p className="error error_center bold">Une erreur interne est survenue. Merci de revenir plus tard.</p>}
                <button type="submit" className="btn_form btn_update_profil bold">Modifier vos informations</button>
            </form>
            <UpdatePassword />
        </div>
    )
}

export default UpdateInfos;