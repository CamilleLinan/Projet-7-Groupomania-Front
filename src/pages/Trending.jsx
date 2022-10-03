import axios from "axios";
import { useCallback, useState, useEffect, useContext } from "react";
import Navbar from "../components/Layout/Navbar";
import CreatePost from "../components/Trending/CreatePost";
import DisplayPost from "../components/Trending/DisplayPost";
import AuthContext from "../context/AuthContext";

const Trending = () => {

    const [ userData, setUserData ] = useState('');
    const [ errorServer, setErrorServer ] = useState('');

    const authCtx = useContext(AuthContext);
    const API_URL_USER = process.env.REACT_APP_API_URL_USER;
    
    const getUserData = useCallback(async () => {
        await axios ({
            method: 'GET',
            url: `${API_URL_USER}/${authCtx.userId}`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            }
        })
            .then((res) => { setUserData(res.data) })
            .catch(() => {
                setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' });
            });
    },[API_URL_USER, authCtx.token, authCtx.userId, errorServer]);

    useEffect(() => {
        getUserData();
    }, [getUserData])


    return (
        <>
            <Navbar />
            <div className="trending_container">
                {!errorServer ? <>
                    <CreatePost propDataPicture={userData.userPicture} />
                    <ul className="posts_container">
                        <DisplayPost propIsAdmin={userData.isAdmin} />
                    </ul>
                </> : <>
                    <p className="bg_section error text_center bold">{errorServer.message}</p>
                </> }
            </div>
        </>
    );
};

export default Trending;