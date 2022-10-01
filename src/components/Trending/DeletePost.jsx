import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ConfirmModal from "../Layout/ConfirmModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faTrash } from '@fortawesome/free-solid-svg-icons';

const modalIcon = <FontAwesomeIcon icon={faCircleExclamation} />
const trashIcon = <FontAwesomeIcon icon={faTrash} />

// Supprimer le profil
const DeletePost = ({ propPostId, propIsAdmin }) => {
    
    const [ popUpConfirm, setPopUpConfirm ] = useState(false);
    const [ errorServer, setErrorServer ] = useState('');
    
    const cancelConfirm = () => {
        setPopUpConfirm(false)
    }

    const deleteHandler = () => {
        setPopUpConfirm(true)
    }

    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);
    const API_URL_POST = process.env.REACT_APP_API_URL_POST;

    const confirmDelete = async (e) => {
        e.preventDefault();

        await axios({
            method:'DELETE',
            url: `${API_URL_POST}/${propPostId}`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
            body: propIsAdmin
        })
            .then(() => {
                alert('Le post a bien été supprimé !');
                window.location.reload();
            })
            .catch(() => {
                setErrorServer({ ...errorServer, message: 'Une erreur est survenue, merci de revenir plus tard.' })
            })
    };

    return (
        <>
        {popUpConfirm && <ConfirmModal
            icon={modalIcon} 
            title='Confirmer la suppression'
            message='Êtes-vous sûr de vouloir supprimer ce post ?'
            error={errorServer}
            errorServer={errorServer.message}
            onCancel={cancelConfirm}
            onConfirm={confirmDelete}
        />}
            <i onClick={deleteHandler} title='Supprimer' className='trending_container_post_icons_icon trending_container_post_icons_icon_delete'>{trashIcon}</i>
        </>
    )
}

export default DeletePost;