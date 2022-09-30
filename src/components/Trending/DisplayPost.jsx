import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/authContext";
import DeletePost from "./DeletePost";
import UpdatePost from "./UpdatePost";
import LikePost from "./LikePost";


const DisplayPost = ({ propIsAdmin }) => {

    const [ postData, setPostData ] = useState([]);
    const [ userData, setUserData ] = useState([]);
    
    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);
    const API_URI = process.env.REACT_APP_API_URL;

    // Récupérer les Posts
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

    // Récupérer les Users
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

        
    return ( 
    <>
        {postData.length > 0 ?   
        <>  {postData.map((post, i) => (       
                <li key={post._id} className='trending_container_post bg_section'>
                    {userData.map((poster, i) => {
                        if (poster._id === post.posterId) {
                            return (
                                <div key={poster._id} className="trending_container_post_poster">
                                    <img className="trending_container_post_poster_photo" src={poster.userPicture} alt='' />
                                    <div>
                                        <p className="trending_container_post_poster_infos_name bold">{poster.firstname} {poster.lastname}</p>
                                        <p className="trending_container_post_poster_infos_date">{post.createdAt}</p>
                                    </div>
                                    {(authCtx.userId === post.posterId || propIsAdmin) &&
                                        <div className="trending_container_post_icons">
                                            <UpdatePost propPostData={post} propIsAdmin={propIsAdmin} id='modify-post-icon' title='Éditer' />
                                            <DeletePost propPostId={post._id} propIsAdmin={propIsAdmin} title='Supprimer' />
                                        </div>}
                                </div>
                            )   
                        } return null 
                    })}

                    <article className="trending_container_post_content">
                        <p className="trending_container_post_content_message">{post.message}</p>
                        {post.postPicture && 
                        <img className="trending_container_post_content_image" src={post.postPicture} alt='' />}
                    </article>
            
                    <footer className='trending_container_post_btn_container'>
                        <LikePost propPost={post} />
                    </footer>
                </li>
            ))} 
        </> : <> 
            {<div className="bg_section nopost_container">
                <p className="nopost_container_text bold">Aucun post actuellement !</p>
            </div>}
            </>    
        }
    </>
    ) 
}


export default DisplayPost;