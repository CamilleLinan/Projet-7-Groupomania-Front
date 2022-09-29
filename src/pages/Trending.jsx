import axios from "axios";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Navbar from "../components/Layout/Navbar";
import CreatePost from "../components/Trending/CreatePost";
import DisplayPost from "../components/Trending/DisplayPost";
import AuthContext from "../context/authContext";

const Trending = () => {
    const [ userData, setUserData ] = useState('');

    const authCtx = useContext(AuthContext);
    const API_URI = process.env.REACT_APP_API_URL;
    
    const getUserData = useCallback(async () => {
        await axios ({
            method: 'GET',
            url: `${API_URI}api/users/${authCtx.userId}`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            }
        })
            .then(res => {
                setUserData(res.data);
            })
            .catch(err => console.log(err));
    },[API_URI, authCtx.token, authCtx.userId]);

    useEffect(() => {
        getUserData();
    }, [getUserData])

    return (
        <>
        <div className="trending_background">
            <Navbar />
            <div className="trending_container">
                <CreatePost propDataPicture={userData.userPicture} />
                <div className="posts_container">
                    <DisplayPost />
                </div>
            </div>
        </div>
        </>
    );
};

export default Trending;