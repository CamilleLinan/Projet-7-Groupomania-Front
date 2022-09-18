import { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import axios from "axios";
import { useForm } from "react-hook-form";


// Modifier les informations de l'utilisateur
const UpdateProfilForm = ({ propFirstName, propLastName, propEmail }) => {
    const [ firstname, setFirstname ] = useState('');
    const [ lastname, setLastname ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ errorEmail, setErrorEmail ] = useState('');
    const [ errorServer, setErrorServer ] = useState('');

    // Regex pour valider les champs
    const regexNames = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i;
    const regexEmail = /^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const { register, formState: { errors }, handleSubmit } = useForm();

    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);

    const API_URI = process.env.REACT_APP_API_URL;
    const url = `${API_URI}api/users/${authCtx.userId}`;

    const onSubmit = async () => {
        await axios({
            method: "PUT",
            url: url,
            body: JSON.stringify({
                userId: authCtx.userId
            }),
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
            data: {
                firstname,
                lastname,
                email,
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response.status === 400) {
                    setErrorEmail({ ...errorEmail, message: 'Cette email est déjà utilisée' });
                } else {
                    setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' });
                }  
        })
    };

    return (
        <div className="profil_container_update_infos">
            <h3 className="profil_container_update_title updateprofil_title bold">Modifier vos informations</h3>
            <form action="" onSubmit={handleSubmit(onSubmit)} id="update-profil-form">
                <label htmlFor="firstname" className="form_label">Prénom : {propFirstName}</label>
                <input 
                    type='text'
                    name="firstname"
                    id="firstname"
                    className="form_input"
                    {...register('firstname', { minLength: 2, maxLength: 20, pattern: regexNames })}
                    onChange={(e) => setFirstname(e.target.value)}
                    value={firstname} 
                />
                <div className="error bold">{errors.firstname && "Veuillez renseigner votre prénom sans chiffre ni caractère spécial"}</div>
                <br/>
                <label htmlFor="lastname" className="form_label">Nom : {propLastName}</label>
                <input 
                    type='text'
                    name="lastname"
                    id="lastname"
                    className="form_input"
                    {...register('lastname', { minLength: 2, maxLength: 20, pattern: regexNames })}
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastname}
                />
                <div className="error bold">{errors.lastname && "Veuillez renseigner votre nom sans chiffre ni caractère spécial"}</div>
                <br/>
                <label htmlFor="email" className="form_label">Email : {propEmail}</label>
                <input 
                    type='email' 
                    name="email"
                    id="email"
                    className="form_input"
                    {...register('email', { pattern: regexEmail })}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <div className="error bold">{errors.email && `Veuillez renseigner une adresse mail valide type : exemple@mail.com`}{errorEmail.message}</div>
                <div className="error error_center bold">{errorServer.message}</div>
                <br/>
                <button type="submit" className="btn_form btn_update_infos">Modifier mes informations</button>
            </form>
        </div>
    )
}

export default UpdateProfilForm