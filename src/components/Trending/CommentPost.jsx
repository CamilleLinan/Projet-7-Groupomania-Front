import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useContext, useState } from 'react';
import AuthContext from '../../context/authContext';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const commentIcon = <FontAwesomeIcon icon={faComment} />

const CommentPost = ({ propPost }) => {
    const authCtx = useContext(AuthContext);
    const postId = propPost._id;
    const userId = authCtx.userId;
    const comments = propPost.comments;

    const [ viewComment, setViewComment ] = useState(false);

    const modifyHandler = () => {
        setViewComment((modify) => !modify);
    }

    // Utilisation de useForm
    const { register, handleSubmit } = useForm({
        userId: userId,
        comment: '',
    });

    // Utilisation de dotenv
    const API_URI = process.env.REACT_APP_API_URL;

    // Fonction d'ajout d'un like
    const addComment = async (data) => {
        
        await axios({
            method: 'POST',
            url: `${API_URI}api/post/${postId}/comment`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
            data
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);       
            });
    };

    return(
        <>
            <button onClick={modifyHandler} className='trending_container_post_btn trending_container_post_btn_comment'>{commentIcon}</button>
            {viewComment && <>
            <form action='' onSubmit={handleSubmit(addComment)} id='comment-form'>
                <label htmlFor="comment" className="form_label bold">Laisser un commentaire :</label>
                <br/>
                <input 
                    type='texte' 
                    name='comment'
                    id='comment'
                    className='form_input'
                    {...register('comment')} 
                />
                <button onClick={addComment}>Publier</button>
            </form>
            
            {comments.length > 0 &&
                comments.map((comment, i) => {
                    return ( 
                        <>
                            <p key={comment.comment}>{comment.comment}</p>
                        </>
                    )
                })
            }
            
            </>}
        </>
    )
}

export default CommentPost;