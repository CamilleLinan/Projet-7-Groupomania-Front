import SimpleDateTime from 'react-simple-timestamp-to-date';
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import DeletePost from "./DeletePost";
import UpdatePost from "./UpdatePost";
import LikePost from "./LikePost";


const DisplayPost = ({ propIsAdmin }) => {

    const [ postData, setPostData ] = useState([]);
    const [ errorServer, setErrorServer ] = useState('');
    
    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);
    const API_URL_POST = process.env.REACT_APP_API_URL_POST;

    // Récupérer les Posts
    const getPostData =  useCallback( async () => {
        await axios ({
            method: 'GET',
            url: `${API_URL_POST}`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            }
        })
            .then((res) => { setPostData(res.data) })
            .catch(() => setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue, merci de revenir plus tard.' }));
    
    }, [API_URL_POST, authCtx.token, errorServer]);
    
    useEffect(() => {
        getPostData();
    }, [getPostData]);

    const handleUpdatePostModified = (postModified) => {
        const index = postData.findIndex((post) => post._id === postModified._id);
        let posts = [...postData];
        postModified.User = posts[index].User;
        posts[index] = postModified;
        setPostData(posts);
    }


    return ( 
        <> {!errorServer ? 
            <> {postData.length > 0 ?   
                <> {postData.map((post, i) => (
                        <li key={post._id} className='trending_container_post bg_section'>
                            {post.User.length === 0 && 
                                <div className="trending_container_post_poster">
                                    <p className="trending_container_post_poster_infos_name unknow_user bold">Utilisateur supprimé</p>
                                </div>
                            }
                            <> {post.User?.map((poster, i) => (
                                <div key={poster._id} className="trending_container_post_poster">
                                    <> {poster._id === post.posterId && <>
                                        <img className="trending_container_post_poster_photo" src={poster.userPicture} alt='' />
                                        <div>
                                            <p className="trending_container_post_poster_infos_name bold">{poster.firstname} {poster.lastname}</p>
                                            <p className="trending_container_post_poster_infos_date"><SimpleDateTime dateFormat="DMY" dateSeparator="/"  showTime="0">{post.createdAt}</SimpleDateTime></p>
                                        </div>
                                    </> } </>
                                </div>                                 
                            ))} </> 
                                       
                            {(authCtx.userId === post.posterId || propIsAdmin) &&
                                <div className="trending_container_post_icons">
                                    <UpdatePost propPostData={post} propIsAdmin={propIsAdmin} updatePostModifed={handleUpdatePostModified} id='modify-post-icon' title='Éditer' />
                                    <DeletePost propPostId={post._id} propIsAdmin={propIsAdmin} title='Supprimer' />
                                </div>
                            }
                            <article className="trending_container_post_content">
                                <p className="trending_container_post_content_message">{post.message}</p>
                                {post.postPicture && <img className="trending_container_post_content_image" src={post.postPicture} alt='' />}
                            </article>
                    
                            <footer className='trending_container_post_btn_container'>
                                <LikePost propPost={post} />
                            </footer>
                        </li>
                    ))} 
                </> : <> {
                        <div className="bg_section nopost_container">
                            <p className="nopost_container_text bold">Aucun post actuellement !</p>
                        </div>
                    } </>   
            } </> : <> {
                    <div className="bg_section nopost_container">
                        <p className="error nopost_container_text bold">{errorServer.message}</p>
                    </div>
                } </> 
        } </>
    ) 
}


export default DisplayPost;