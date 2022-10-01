import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import ConfirmModal from "../Layout/ConfirmModal";

const modalIcon = <FontAwesomeIcon icon={faCircleExclamation} />

// Supprimer le profil
const DeleteProfil = () => {

    const [ popUpConfirm, setPopUpConfirm ] = useState(false);
    const [ errorServer, setErrorServer ] = useState('');

    const navigate = useNavigate();

    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);
    const API_URL_USER = process.env.REACT_APP_API_URL_USER;
    
    const cancelConfirm = () => {
        setPopUpConfirm(false)
    }

    const deleteHandler = () => {
        setPopUpConfirm(true)
    }

    const confirmDelete = async () => {
        await axios({
            method:'DELETE',
            url: `${API_URL_USER}/${authCtx.userId}`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
        })
        .then(() => {
            alert('Le profil a bien été supprimé !');
            navigate('/login');
            localStorage.clear();
        })
        .catch(() => {
            setErrorServer(...errorServer, {message: 'Une erreur est survenue, merci de revenir plus tard.'})
        })
    };

    return (
        <>
        {popUpConfirm && <ConfirmModal
            icon={modalIcon} 
            title='Confirmer la suppression'
            message='Êtes-vous sûr de vouloir supprimer ce profil ?'
            error={errorServer}
            errorServer={errorServer.message}
            onCancel={cancelConfirm}
            onConfirm={confirmDelete}
        />}
        <div className="profil_container_footer">
            <button onClick={deleteHandler} className="profil_container_footer_btn">Supprimer le profil</button>
        </div>
        </>
    )
}

export default DeleteProfil;