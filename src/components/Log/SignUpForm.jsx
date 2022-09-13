import React, { useState }  from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios'; 

const SignUpForm = () => {
    const [ formSubmit, setFormSubmit ] = useState(false);
    const [ firstname, setFirstname ] = useState('');
    const [ lastname, setLastname ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    
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
            .catch((err) => console.log(err));

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
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
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
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
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
                {...register('email', { required: true, pattern: /^[a-z0-9 .-]+@[a-z .-]+\.[a-z]{2,3}$/ })}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className="error bold">{errors.email && `Veuillez renseigner une adresse mail type : exemple@mail.com`}</div>
            <br/>
            <label htmlFor="password" className="form_label">Mot de passe</label>
            <br/>
            <input 
                type="password"
                name="password"
                id="password"
                className="form_input"
                {...register('password', { required: true, minLength: 4, maxLength: 30, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/ })}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="error bold">{errors.password && `Le mot de passe doit contenir entre 4 et 30 caractères, au moins une majuscule et une minuscule, et au moins un chiffre`}</div>
            <br/>
            <button type="submit" className="btn btn_form">Créer un compte</button>
        </form>
        </>
        )}
    </>
    );
};

export default SignUpForm;