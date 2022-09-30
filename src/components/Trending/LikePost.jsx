import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as fullFaThumbsUp } from '@fortawesome/free-solid-svg-icons';

const likeIcon = <FontAwesomeIcon icon={faThumbsUp} />
const removeLikeIcon = <FontAwesomeIcon icon={fullFaThumbsUp} />

const LikePost = ({ propPost }) => {
    const authCtx = useContext(AuthContext);
    const userId = authCtx.userId;
    const postId = propPost._id;
    const usersLiked = propPost.usersLiked;

    const [ likeUpdate, setLikeUpdate ] = useState(propPost.likes)
    const [ isLiked, setIsLiked ] = useState(false);

    useEffect(() => {
        setLikeUpdate(propPost.likes);
    }, [propPost.likes])

    // Utilisation de dotenv
    const API_URI = process.env.REACT_APP_API_URL;

    // Fonction d'ajout d'un like
    const addLike = async () => {
        
        await axios({
            method: 'POST',
            url: `${API_URI}api/post/${postId}/like`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
            data: {
                userId: userId,
                like: 1
            }
        })
            .then((res) => {
                console.log(res);
                setIsLiked(true);
                setLikeUpdate(likeUpdate+1);
            })
            .catch((err) => {
                console.log(err.response);       
            });
    };

    // Fonction d'ajout d'un like
    const removeLike = async () => {

        await axios({
            method: 'POST',
            url: `${API_URI}api/post/${postId}/like`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
            data: {
                userId: userId,
                like: -1
            }
        })
            .then((res) => {
                console.log(res);
                setIsLiked(false);
                setLikeUpdate(likeUpdate-1);
            })
            .catch((err) => {
                console.log(err.response);       
            });
    };
    
    useEffect(() => {
        for(let i=0; i<usersLiked.length; i++) {
            if(userId === usersLiked[i]) {
                setIsLiked(true);
            }
        }
    }, [userId, usersLiked])  

    return (
        <>
            {!isLiked ?
            <button onClick={addLike} className='trending_container_post_btn trending_container_post_btn_like'>{likeIcon} {likeUpdate}</button>
            : <button onClick={removeLike} className='trending_container_post_btn trending_container_post_btn_like'>{removeLikeIcon} {likeUpdate}</button>}
        </>
    )
}

export default LikePost;