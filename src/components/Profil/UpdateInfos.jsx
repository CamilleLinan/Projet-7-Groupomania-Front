import { useContext, useState, useRef, useEffect } from "react";
import AuthContext from "../../context/authContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import UpdatePassword from "./UpdatePassword";

const penIcon = <FontAwesomeIcon icon={faPenToSquare} />
const checkIcon = <FontAwesomeIcon icon={faCheck} />

// Modifier les informations de l'utilisateur

const UpdateInfos = ({ propData }) => {
    const authCtx = useContext(AuthContext);

    const [ dataUpdate, setDataUpdate ] = useState(propData);
    const [ modify, setModify ] = useState(false);
    const [ errorEmail, setErrorEmail ] = useState('');
    const [ errorServer, setErrorServer ] = useState('');

    const firstnameInputRef = useRef();
    const lastnameInputRef = useRef(null);
    const emailInputRef = useRef();

    // Utilisation de useEffect pour mettre à jour les données dans le state
    useEffect(() => {
        setDataUpdate(propData);
    }, [propData])

    const modifyHandler = () => {
        setModify((modify) => !modify);
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
    
    // Utilisation de YupResolver
    const formSchema = Yup.object().shape({
        firstname: Yup.string().trim()
            .min(2, 'Doit contenir minimum 2 caractères')
            .max(30, 'Doit contenir maximum 30 caractères')
            .matches(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i, 
            'Ne doit contenir ni chiffre ni caractère spécial'),
        lastname: Yup.string().trim()
            .min(2, 'Doit contenir minimum 2 caractères')
            .max(30, 'Doit contenir maximum 30 caractères')
            .matches(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i, 
            'Ne doit contenir ni chiffre ni caractère spécial'),
        email: Yup.string().trim()
            .matches(/^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
            'Veuillez renseigner une adresse mail valide'),
    });
    
    // Utilisation de useForm
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, formState: { errors }, handleSubmit } = useForm(formOptions, {
        defaultValue: {    
            firstname: '',
            lastname: '',
            email: '',
        }
    });

    // Utilisation de dotenv
    const API_URI = process.env.REACT_APP_API_URL;

    const onSubmit = async (data) => {
        if (!modify) {
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
                    setDataUpdate(data);
                })
                .catch((error) => {
                    console.log(error.response);
                    if (error.response.data.err.code === 11000) {
                        setErrorEmail( ...errorEmail, {message: 'Cette adresse email est déjà utilisée'});
                    } else {
                        setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' });
                    }  
                })
        }
    };

    const registerHandler = () => {
        if (!errors.firstname & !errors.lastname & !errorEmail & !errorServer.message) {
            console.log('ok')
            setErrorEmail('');
            handleSubmit(onSubmit());
            setModify(!modify);
        } else {
            console.log('not ok')
            console.log(errorEmail)
        }
    }

    return (
        <article className="profil_container_update_infos">
            <h3 className="profil_container_update_title updateprofil_title bold">Vos informations</h3>
            <form action="" onSubmit={handleSubmit(onSubmit)} id="update-infos-form">
                
                <label htmlFor="firstname" className="form_label bold">Prénom :</label>
                {!modify ? <>
                    <p className="profil_container_update_infos_input">{dataUpdate.firstname}</p>
                </> : <>
                <input 
                    type='text'
                    name="firstname"
                    id="firstname"
                    className="form_input update_infos_input"
                    onChange={changeHandler}
                    defaultValue={dataUpdate.firstname}
                    ref={firstnameInputRef}
                    {...register('firstname')}
                /> 
                {errors.firstname && <p className="error error_profil bold">{errors.firstname.message}</p>}
                </>}
                
                <label htmlFor="lastname" className="form_label bold">Nom :</label>
                {!modify ? <>
                    <p className="profil_container_update_infos_input">{dataUpdate.lastname}</p>
                </> : <>
                <input 
                    type='text'
                    name="lastname"
                    id="lastname"
                    className="form_input update_infos_input"
                    onChange={changeHandler}
                    defaultValue={dataUpdate.lastname}
                    ref={lastnameInputRef}
                    {...register('lastname')}
                /> 
                {errors.lastname && <p className="error error_profil bold">{errors.lastname.message}</p>}
                </>}

                <label htmlFor="email" className="form_label bold">Email :</label>
                {!modify ? <>
                    <p className="profil_container_update_infos_input">{dataUpdate.email}</p>
                </> : <>
                <input 
                    type='email' 
                    name="email"
                    id="email"
                    className="form_input update_infos_input"
                    onChange={changeHandler}
                    defaultValue={dataUpdate.email}
                    ref={emailInputRef}
                    {...register('email')}
                /> 
                {errors.email && <p className="error error_profil bold">{errors.email.message}</p>}
                {errorEmail && <p className="error error_profil bold">{errorEmail.message}</p>}
                </>}

                {errorServer && <p className="error error_center bold">{errorServer.message}</p>}
                {!modify ? 
                <button onClick={modifyHandler} className="btn_form btn_update_profil bold">
                    Modifier <i className="profil_container_update_infos_input_icon">{penIcon}</i>
                </button> : 
                <button onClick={registerHandler} className="btn_form btn_update_profil bold">
                    Enregistrer <i className="profil_container_update_infos_input_icon">{checkIcon}</i>
                </button>}
            </form>
            <UpdatePassword />
        </article>
    )
}

export default UpdateInfos;