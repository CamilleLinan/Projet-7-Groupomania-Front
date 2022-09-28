import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/authContext";
import PostCard from "./PostCard";

const DisplayPost = () => {

    const [ postData, setPostData ] = useState([]);
    const [ posterData, setPosterData ] = useState([]);
    
    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);
    const API_URI = process.env.REACT_APP_API_URL;

    const getPostData =  useCallback( async () => {
        await axios ({
            method: 'GET',
            url: `${API_URI}api/post/`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            }
        })
            .then(res => {
                setPostData(res.data);
            })
            .catch(err => console.log(err));
    
    }, [API_URI, authCtx.token]);
    
    useEffect(() => {
        getPostData();
    }, [getPostData])
    
    console.log('postData -->');
    console.log(postData);

    const getPosterData =  useCallback( async () => {
        const posterID = postData[0].posterId;
        await axios ({
            method: 'GET',
            url: `${API_URI}api/users/${posterID}`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            }
        })
            .then(res => {
                setPosterData(res.data);
            })
            .catch(err => console.log(err));
    }, [API_URI, authCtx.token, postData]);
    
    useEffect(() => {
        getPosterData();
    }, [getPosterData])

    console.log('posterData -->');
    console.log(posterData);

    return (
        <div className="post_container">
            {postData && 
                <PostCard posts={postData} posters={posterData} />
            }
        </div>
    )
}



export default DisplayPost;