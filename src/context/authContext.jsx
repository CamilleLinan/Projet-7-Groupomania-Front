import { useState } from "react";
import { createContext } from "react";

// Context pour stoker ensuite les données de l'utilisateur
const defaultValue = {
    userId: null,
    token: "",
    userIsLoggedIn: false,
    signin: ()=>{},
}

const AuthContext = createContext(defaultValue);

// Contrôle de la présence du token dans le localStorage
const userIdLocalStorage = localStorage.getItem('userId');
const tokenLocalStorage = localStorage.getItem('token');

export const AuthContextProvider = (props) => {
    // Stockage des informations utilisateur
    const [ userId, setUserId ] = useState(userIdLocalStorage);
    const [ token, setToken ] = useState(tokenLocalStorage);

    // Fonction pour mettre à jour le token dans le state
    const signInHandler = (token, userId) => {
        setUserId(userId);
        setToken(token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
    };
    
    // Convertion du token en booléan
    const userIsLoggedIn = !!token;
    console.log('userIsLoggedIn =')
    console.log(userIsLoggedIn);

    // Valeurs du context
    const contextValue = {
        userId: userId,
        token: token,
        isLoggedIn: userIsLoggedIn,
        signin: signInHandler,
    };

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;