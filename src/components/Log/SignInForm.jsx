import React, { useState } from "react";
import axios from 'axios';
import Trending from '../../pages/Trending';

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

const SignInForm = () => {
    const [ formSubmit, setFormSubmit ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorSignIn, setErrorSignIn ] = useState('');
    const [ errorServer, setErrorServer ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios ({
            method: "post",
            url: `http://localhost:3001/api/users/signin`,
            data: {
                email,
                password
            },
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        })

        .then((res) => {
            console.log(res);
            localStorage.setItem('token', res.data.token);
            setFormSubmit(true);

        })
        .catch((error) => {
            console.log(error.response);
            if (error.response.status === 401) {
                setErrorSignIn({ ...errorSignIn, message: 'La paire identifiant/mot de passe est incorrecte.' })
            } else {
                setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' })
            }
        });
    }

    return (
    <>
        {formSubmit ? (
            <>
                <Trending />
            </>
        ) : (
        <>
        <form onSubmit={handleSubmit} id="sign-up-form">
            <label htmlFor="email" className="form_label">Email</label>
            <input 
                type="email" 
                name="email" 
                id="email" 
                className="form_input"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <div className="error bold"></div>
            <br/>
            <label htmlFor="password" className="form_label">Mot de passe</label>
            <input 
                type="password" 
                name="password" 
                id="password"
                className="form_input" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <div className="error bold"></div>
            <div className="error error_center bold">{errorSignIn.message}{errorServer.message}</div>
            <br/>
            <button type="submit" className="btn btn_form">Se connecter</button>
        </form>
        </>
        )}
    </>
    );
};

export default SignInForm;