import { useState, createContext } from "react";


// Context pour stoker les données de l'utilisateur
const defaultValue = {
    userId: null,
    token: null,
    userIsLoggedIn: false,
    signin: ()=>{},
    logout: ()=>{},
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
    
    // Fonction pour se déconnecter et supprimer le token
    const logoutHandler = () => {
        localStorage.clear();
        setUserId(null);
        setToken(null);
    }

    // Convertion du token en booléan
    const userIsLoggedIn = !!token;

    // Valeurs du context
    const contextValue = {
        userId: userId,
        token: token,
        isLoggedIn: userIsLoggedIn,
        signin: signInHandler,
        logout: logoutHandler,
    };

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;