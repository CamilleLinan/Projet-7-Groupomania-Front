import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import ConfirmModal from "../Layout/ConfirmModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const modalIcon = <FontAwesomeIcon icon={faCircleExclamation} />

// Supprimer le profil
const DeleteProfil = () => {
    const [ popUpConfirm, setPopUpConfirm ] = useState(false);

    const navigate = useNavigate();

    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);
    const API_URI = process.env.REACT_APP_API_URL;
    
    const cancelConfirm = () => {
        setPopUpConfirm(false)
    }

    const deleteHandler = () => {
        setPopUpConfirm(true)
    }

    const confirmDelete = async () => {
        await axios({
            method:'DELETE',
            url: `${API_URI}api/users/${authCtx.userId}`,
            body: JSON.stringify({
                userId: authCtx.userId
            }),
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
        })
            .then((res) => {
                console.log(res);
                navigate('/');
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
            message='Êtes-vous sûr de vouloir supprimer ce profil ?'
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