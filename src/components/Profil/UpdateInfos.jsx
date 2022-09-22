import { useContext, useState, useRef, useEffect } from "react";
import AuthContext from "../../context/authContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import UpdatePassword from "./UpdatePassword";

const penIcon = <FontAwesomeIcon icon={faPenToSquare} />

// Modifier les informations de l'utilisateur

const UpdateInfos = ({ propData }) => {
    const authCtx = useContext(AuthContext);

    const [ dataUpdate, setDataUpdate ] = useState(propData);
    const [ modify, setModify ] = useState(false);

    const [ errorEmail, setErrorEmail ] = useState('');
    const [ errorServer, setErrorServer ] = useState('');

    const firstnameInputRef = useRef();
    const lastnameInputRef = useRef();
    const emailInputRef = useRef();

    // Utilisation de useEffect pour mettre à jour les données dans le state
    useEffect(() => {
        setDataUpdate(propData);
    }, [propData])

    const modifyHandler = () => {
        setModify((modify) => !modify);
        console.log(modify);
    }

    // Surveiller les modifications faites
    const changeHandler = () => {
        const enteredFirstname = firstnameInputRef.current.value;
        const enteredLastname = lastnameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;

        setDataUpdate({
            ...propData,
            'firstname': enteredFirstname,
            'lastname': enteredLastname,
            'email': enteredEmail,
        })
    }

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
        if (modify) {
            return
        } else {
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
        }
    };

    return (
        <div className="profil_container_update_infos">
            <h3 className="profil_container_update_title updateprofil_title bold">Vos informations</h3>
            <form action="" onSubmit={handleSubmit(onSubmit)} id="update-infos-form">
                
                <label htmlFor="firstname" className="form_label bold">Prénom :</label>
                {!modify ? <>
                <div className="profil_container_update_infos_input">
                    <p className="profil_container_update_infos_input_subtitle">{dataUpdate.firstname}</p>
                </div>
                <br/>
                </> : <>
                <input 
                    type='text'
                    name="firstname"
                    id="firstname"
                    className="form_input update_infos_input"
                    {...register('firstname', { minLength: 2, maxLength: 20, pattern: regexNames })}
                    onChange={changeHandler}
                    value={dataUpdate.firstname}
                    ref={firstnameInputRef}
                /> 
                {errors.firstname && <p className="error error_profil bold">Veuillez renseigner votre prénom sans chiffre ni caractère spécial</p>}
                </>}
                
                <label htmlFor="lastname" className="form_label bold">Nom :</label>
                {!modify ? <>
                <div className="profil_container_update_infos_input">
                    <p className="profil_container_update_infos_input_subtitle">{dataUpdate.lastname}</p>
                </div>
                <br/>
                </> : <>
                <input 
                    type='text'
                    name="lastname"
                    id="lastname"
                    className="form_input update_infos_input"
                    {...register('lastname', { minLength: 2, maxLength: 20, pattern: regexNames })}
                    onChange={changeHandler}
                    value={dataUpdate.lastname}
                    ref={lastnameInputRef}
                /> 
                {errors.lastname && <p className="error error_profil bold">Veuillez renseigner votre nom sans chiffre ni caractère spécial</p>}
                </>}

                <label htmlFor="email" className="form_label bold">Email :</label>
                {!modify ? <>
                <div className="profil_container_update_infos_input">
                    <p className="profil_container_update_infos_input_subtitle">{dataUpdate.email}</p>
                </div>
                <br/>
                </> : <>
                <input 
                    type='email' 
                    name="email"
                    id="email"
                    className="form_input update_infos_input"
                    {...register('email', { pattern: regexEmail })}
                    onChange={changeHandler}
                    value={dataUpdate.email}
                    ref={emailInputRef}
                /> 
                {errors.email && <p className="error error_profil bold">Veuillez renseigner une adresse mail valide type : exemple@mail.com</p>}
                {errorEmail && <p className="error error_profil bold">Cette email est déjà utilisée</p>}
                </>}

                {errorServer && <p className="error error_center bold">Une erreur interne est survenue. Merci de revenir plus tard.</p>}
                {!modify ? 
                <button onClick={modifyHandler} className="btn_form btn_update_profil bold">
                    Modifier <i className="profil_container_update_infos_input_icon">{penIcon}</i>
                </button> : 
                <button onClick={modifyHandler} className="btn_form btn_update_profil bold">
                    Enregistrer
                </button>}
            </form>
            <UpdatePassword />
        </div>
    )
}

export default UpdateInfos;