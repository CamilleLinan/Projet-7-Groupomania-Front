import { useState } from "react";
import { createContext } from "react";


// Context pour stoker les données de l'utilisateur
const defaultValue = {
    userId: null,
    token: null,
    isAdmin: false,
    userIsLoggedIn: false,
    signin: ()=>{},
    logout: ()=>{},
}

const AuthContext = createContext(defaultValue);

// Contrôle de la présence du token dans le localStorage
const userIdLocalStorage = localStorage.getItem('userId');
const tokenLocalStorage = localStorage.getItem('token');
const isAdminLocalStorage = localStorage.getItem('isAdmin');

export const AuthContextProvider = (props) => {
    // Stockage des informations utilisateur
    const [ userId, setUserId ] = useState(userIdLocalStorage);
    const [ token, setToken ] = useState(tokenLocalStorage);
    const [ isAdmin, setIsAdmin ] = useState(isAdminLocalStorage);

    // Fonction pour mettre à jour le token dans le state
    const signInHandler = (token, userId, isAdmin) => {
        setUserId(userId);
        setToken(token);
        setIsAdmin(isAdmin);
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
        localStorage.setItem('isAdmin', isAdmin);
    };
    
    // Fonction pour se déconnecter et supprimer le token
    const logoutHandler = () => {
        localStorage.clear();
        setUserId(null);
        setToken(null);
        setIsAdmin(null)
    }

    // Convertion du token en booléan
    const userIsLoggedIn = !!token;

    // Valeurs du context
    const contextValue = {
        userId: userId,
        token: token,
        isAdmin: isAdmin,
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