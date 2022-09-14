import React, { useState }  from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';

const SignUpForm = () => {
    const [ formSubmit, setFormSubmit ] = useState(false);
    const [ firstname, setFirstname ] = useState('');
    const [ lastname, setLastname ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorEmail, setErrorEmail ] = useState('');
    const [ errorServer, setErrorServer ] = useState('');

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = () => 
        
        axios({
            method: "post",
            url: `http://localhost:3001/api/users/signup`,
            data: {
                firstname,
                lastname,
                email,
                password
            }
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

    return (
    <>
        {formSubmit ? (
            <>
                <h4 className="success bold">Inscription réussie ! Veuillez vous connecter.</h4>
            </>
        ) : (
            <>
                <form action="" onSubmit={handleSubmit(onSubmit)} id="sign-up-form">
                    <label htmlFor="firstname" className="form_label">Prénom</label>
                    <br/>
                    <input 
                        type="text"
                        name="firstname"
                        id="firstname"
                        className="form_input"
                        {...register('firstname', { required: true, minLength: 2, maxLength: 20, pattern: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i })}
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                    />
                    <div className="error bold">{errors.firstname && "Veuillez renseigner votre prénom sans chiffre ni caractère spécial"}</div>
                    <br/>
                    <label htmlFor="lastname" className="form_label">Nom</label>
                    <br/>
                    <input 
                        type="text"
                        name="lastname"
                        id="lastname"
                        className="form_input"
                        {...register('lastname', { required: true, minLength: 2, maxLength: 20, pattern: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i })}
                        onChange={(e) => setLastname(e.target.value)}
                        value={lastname}
                    />
                    <div className="error bold">{errors.lastname && "Veuillez renseigner votre nom sans chiffre ni caractère spécial"}</div>
                    <br/>
                    <label htmlFor="email" className="form_label">Email</label>
                    <br/>
                    <input 
                        type="email"
                        name="email"
                        id="email"
                        className="form_input"
                        {...register('email', { required: true, pattern: /^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
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
                        {...register('password', { required: true, minLength: 4, maxLength: 30, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/ })}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className="error bold">{errors.password && `Le mot de passe doit contenir entre 4 et 30 caractères, au moins une majuscule et une minuscule, et au moins un chiffre`}</div>
                    <div className="error error_center bold">{errorServer.message}</div>
                    <br/>
                    <button type="submit" className="btn btn_form">Créer un compte</button>
                </form>
            </>
        )}
    </>
    );
};

export default SignUpForm;