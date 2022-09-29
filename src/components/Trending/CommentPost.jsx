import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useContext, useState } from 'react';
import AuthContext from '../../context/authContext';
import axios from 'axios';
import DisplayComment from './DisplayComment';

const commentIcon = <FontAwesomeIcon icon={faComment} />

const CommentPost = ({ propPost, propUser }) => {
    const authCtx = useContext(AuthContext);
    const postId = propPost._id;
    const userId = authCtx.userId;

    const [ viewComment, setViewComment ] = useState(false);
    const [ comment, setComment ] = useState('');

    const modifyHandler = () => {
        setViewComment((modify) => !modify);
    }

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
            data: {
                userId: userId,
                comment: comment
            }
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
            <form action='' onSubmit={addComment} id='comment-form'>
                <label htmlFor="comment" className="form_label bold">Laisser un commentaire :</label>
                <br/>
                <input 
                    type='texte' 
                    name='comment'
                    id='comment'
                    className='form_input'
                    onChange={(e) => setComment(e.target.value)} 
                />
                <button>Publier</button>
            </form>
            
            <DisplayComment propPost={propPost} propUser={propUser} />
            
            </>}
        </>
    )
}

export default CommentPost;