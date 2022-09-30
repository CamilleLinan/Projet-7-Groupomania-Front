import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../../context/authContext";
import ConfirmModal from "../Layout/ConfirmModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faTrash } from '@fortawesome/free-solid-svg-icons';

const modalIcon = <FontAwesomeIcon icon={faCircleExclamation} />
const trashIcon = <FontAwesomeIcon icon={faTrash} />

// Supprimer le profil
const DeletePost = ({ propPostId, propIsAdmin }) => {
    
    const [ popUpConfirm, setPopUpConfirm ] = useState(false);
    
    const cancelConfirm = () => {
        setPopUpConfirm(false)
    }

    const deleteHandler = () => {
        setPopUpConfirm(true)
    }

    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);
    const API_URI = process.env.REACT_APP_API_URL;

    const confirmDelete = async () => {
        await axios({
            method:'DELETE',
            url: `${API_URI}api/post/${propPostId}`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
            body: propIsAdmin
        })
            .then((res) => {
                console.log(res);
                setPopUpConfirm(false);
            })
            .catch((error) => {
                console.log(error.response);
            })
    };

    return (
        <>
        {popUpConfirm && <ConfirmModal
            icon={modalIcon} 
            title='Confirmer la suppression'
            message='Êtes-vous sûr de vouloir supprimer ce post ?'
            onCancel={cancelConfirm}
            onConfirm={confirmDelete}
        />}
            <i onClick={deleteHandler} title='Supprimer' className='trending_container_post_icons_icon trending_container_post_icons_icon_delete'>{trashIcon}</i>
        </>
    )
}

export default DeletePost;