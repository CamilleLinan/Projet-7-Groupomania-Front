import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fullFaHeart } from '@fortawesome/free-solid-svg-icons';

const likeIcon = <FontAwesomeIcon icon={faHeart} />
const removeLikeIcon = <FontAwesomeIcon icon={fullFaHeart} />

const LikePost = ({ propPost }) => {
    const authCtx = useContext(AuthContext);
    const userId = authCtx.userId;
    const postId = propPost._id;
    const usersLiked = propPost.usersLiked;

    const [ likeUpdate, setLikeUpdate ] = useState(propPost.likes)
    const [ isLiked, setIsLiked ] = useState(false);
    const [ errorServer, setErrorServer ] = useState('');

    useEffect(() => {
        setLikeUpdate(propPost.likes);
    }, [propPost.likes])

    // Utilisation de dotenv
    const API_URL_POST = process.env.REACT_APP_API_URL_POST;

    // Fonction d'ajout d'un like
    const addLike = async () => {
        
        await axios({
            method: 'POST',
            url: `${API_URL_POST}/${postId}/like`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
            data: {
                userId: userId,
                like: 1
            }
        })
            .then(() => {
                setIsLiked(true);
                setLikeUpdate(likeUpdate+1);
            })
            .catch(() => {
                setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' });       
            });
    };

    // Fonction d'ajout d'un like
    const removeLike = async () => {

        await axios({
            method: 'POST',
            url: `${API_URL_POST}/${postId}/like`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
            data: {
                userId: userId,
                like: -1
            }
        })
            .then(() => {
                setIsLiked(false);
                setLikeUpdate(likeUpdate-1);
            })
            .catch(() => {
                setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' });       
            });
    };
    
    useEffect(() => {
        const userFound = usersLiked.find(userLiked => userLiked === userId);
        if(userFound) {
            setIsLiked(true);
        }
    }, [userId, usersLiked])  

    return (
        <>
            {errorServer && <p className='error text_center bold'>{errorServer.message}</p>}
            {!isLiked ?
                <button onClick={addLike} className='trending_container_post_btn trending_container_post_btn_like'>{likeIcon} {likeUpdate}</button>
                : <button onClick={removeLike} className='trending_container_post_btn trending_container_post_btn_like'>{removeLikeIcon} {likeUpdate}</button>
            }
        </>
    )
}

export default LikePost;