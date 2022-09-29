import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/authContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import DeletePost from "./DeletePost";
import UpdatePost from "./UpdatePost";
import LikePost from "./LikePost";

const commentIcon = <FontAwesomeIcon icon={faComment} />

const DisplayPost = () => {

    const [ postData, setPostData ] = useState([]);
    const [ userData, setUserData ] = useState([]);
    
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

    const getUserData =  useCallback( async () => {
        await axios ({
            method: 'GET',
            url: `${API_URI}api/users/`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            }
        })
            .then(res => {
                setUserData(res.data);
            })
            .catch(err => console.log(err));
    }, [API_URI, authCtx.token]);
    
    useEffect(() => {
        getUserData();
    }, [getUserData])

    console.log('userData -->');
    console.log(userData);

    if (postData.length > 0) {
        return (
            postData.map((post, i) => {
                return ( 
                    <>
                    <div className='trending_container_post bg_section'>
                        <div className="trending_container_post_poster">
                            {userData.map((poster, i) => {
                                if (poster._id === post.posterId && poster.userPicture) {
                                return <img key={poster.userPicture} className="trending_container_post_poster_photo" src={poster.userPicture} alt='' />
                                } return null 
                            })}
                            <div className="trending_container_post_poster_infos">
                            {userData.map((poster, i) => {
                                if (poster._id === post.posterId) {
                                return <p key={poster.names} className="trending_container_post_poster_infos_name bold">{poster.firstname} {poster.lastname}</p>
                                } return null 
                            })}
                                <p key={post.createdAt} className="trending_container_post_poster_infos_date">{post.createdAt}</p>
                            </div>
                            {authCtx.userId === post.posterId &&
                            <div className="trending_container_post_icons">
                                <UpdatePost propPostData={post} id='modify-post-icon' title='Éditer' />
                                <DeletePost propPostId={post._id} title='Supprimer' />
                            </div>}
                        </div>
        
                        <div className="trending_container_post_content">
                            <p key={post.message} className="trending_container_post_content_message">{post.message}</p>
                            {post.postPicture && 
                            <img key={post.postPicture} className="trending_container_post_content_image" src={post.postPicture} alt='' />}
                        </div>
        
                        <div className='trending_container_post_btn_container'>
                            <LikePost propPost={post} />
                            <button className='trending_container_post_btn trending_container_post_btn_comment'>{commentIcon}</button>
                        </div>
                    </div>
                    </>
                )
            })
        )
    }
}



export default DisplayPost;