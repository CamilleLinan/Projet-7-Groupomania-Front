import { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import axios from "axios";
import { useForm } from "react-hook-form";


// Modifier les informations de l'utilisateur
const UpdateProfilForm = ({ propFirstName, propLastName, propEmail }) => {
    const authCtx = useContext(AuthContext);
    
    const [ firstname, setFirstname ] = useState(propFirstName);
    const [ lastname, setLastname ] = useState(propLastName);
    const [ email, setEmail ] = useState(propEmail);
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ errorConfirmPassword, setErrorConfirmPassword ] = useState('');
    const [ errorEmail, setErrorEmail ] = useState('');
    const [ errorServer, setErrorServer ] = useState('');

    // Regex pour valider les champs
    const regexNames = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i;
    const regexEmail = /^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

    const { register, formState: { errors }, handleSubmit } = useForm();

    // Fonction pour vérifier que les mots de passe sont identiques
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        if (password === e.target.value) {
            setErrorConfirmPassword({ ...errorConfirmPassword, message: '' });
        } else {
            setErrorConfirmPassword({ ...errorConfirmPassword, message: 'Les mots de passe ne sont pas identiques' });
        }
    };

    // Utilisation de dotenv
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
                password,
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
            <h3 className="profil_container_update_title updateprofil_title bold">Vos informations</h3>
            <form action="" onSubmit={handleSubmit(onSubmit)} id="update-profil-form">
                <label htmlFor="firstname" className="form_label">Prénom :</label>
                <input 
                    type='text'
                    name="firstname"
                    id="firstname"
                    className="form_input"
                    {...register('firstname', { required: true, minLength: 2, maxLength: 20, pattern: regexNames })}
                    onChange={(e) => setFirstname(e.target.value)}
                    value={firstname}
                    required
                />
                <div className="error bold">{errors.firstname && "Veuillez renseigner votre prénom sans chiffre ni caractère spécial"}</div>
                <br/>
                <label htmlFor="lastname" className="form_label">Nom :</label>
                <input 
                    type='text'
                    name="lastname"
                    id="lastname"
                    className="form_input"
                    {...register('lastname', { required: true, minLength: 2, maxLength: 20, pattern: regexNames })}
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastname}
                />
                <div className="error bold">{errors.lastname && "Veuillez renseigner votre nom sans chiffre ni caractère spécial"}</div>
                <br/>
                <label htmlFor="email" className="form_label">Email :</label>
                <input 
                    type='email' 
                    name="email"
                    id="email"
                    className="form_input"
                    {...register('email', { required: true, pattern: regexEmail })}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <div className="error bold">{errors.email && `Veuillez renseigner une adresse mail valide type : exemple@mail.com`}{errorEmail.message}</div>
                <br/>
                <label htmlFor="password" className="form_label">Mot de passe</label>
                    <br/>
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        className="form_input"
                        {...register('password', { required: true, minLength: 4, maxLength: 30, pattern: regexPassword })}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className="error bold">{errors.password && `Le mot de passe doit contenir entre 4 et 30 caractères, au moins une majuscule et une minuscule, et au moins un chiffre`}</div>
                    <br/>
                    <label htmlFor="confirmPassword" className="form_label">Confirmer le mot de passe</label>
                    <br/>
                    <input 
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="form_input"
                        onChange={handleConfirmPassword}
                        value={confirmPassword}
                        required
                    />
                    <div className="error bold">{errorConfirmPassword.message}</div>
                <div className="error error_center bold">{errorServer.message}</div>
                <br/>
                <button type="submit" className="btn_form btn_update_profil">Modifier vos informations</button>
            </form>
        </div>
    )
}

export default UpdateProfilForm