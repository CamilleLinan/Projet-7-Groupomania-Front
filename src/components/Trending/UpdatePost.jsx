import { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../context/authContext";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faPen } from '@fortawesome/free-solid-svg-icons';
import ConfirmPostModal from "../Layout/ConfirmPostModal";

const modalIcon = <FontAwesomeIcon icon={faCircleExclamation} />
const penIcon = <FontAwesomeIcon icon={faPen} />

// Modifier les informations de l'utilisateur
const UpdatePost = ({ propPostData }) => {
    const authCtx = useContext(AuthContext);

    const [ popUpConfirm, setPopUpConfirm ] = useState(false);

    const [ dataMessage, setDataMessage ] = useState(propPostData.message);
    const [ newDataMessage, setNewDataMessage ] = useState('')
    const [ dataPicture, setDataPicture ] = useState(propPostData.postPicture);
    const [ newDataPicture, setNewDataPicture ] = useState('');

    const [ errorServer, setErrorServer ] = useState('');

    const messageInputRef = useRef();

    useEffect(() => {
        setDataMessage(propPostData.message);
        setDataPicture(propPostData.postPicture);
    }, [propPostData.message, propPostData.postPicture])

    // Surveiller les modifications faites
    const changeHandlerMessage = (e) => {
        let newMessage;

        if (e.target.value) {
            newMessage = e.target.value;
            setNewDataMessage(newMessage);
        }

        setDataMessage(newMessage);
    }

    const changeHandlerPicture = (e) => {
        let newPicture;

        if (e.target.files) {
            newPicture = URL.createObjectURL(e.target.files[0])
            setNewDataPicture(e.target.files[0])
            
        }
        setDataPicture(newPicture)
    }

    const cancelConfirm = () => {
        setPopUpConfirm(false)
    }

    const updateHandler = () => {
        setPopUpConfirm(true)
    }

    // Utilisation de dotenv
    const API_URI = process.env.REACT_APP_API_URL;
    const url = `${API_URI}api/post/${propPostData._id}`;

    const confirmUpdate = async () => {
        let formData = new FormData();
        formData.append('message', newDataMessage);
        formData.append('image', newDataPicture);
            
        await axios.put(url, formData, {
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
        })
            .then((res) => {
                console.log(res);
                setPopUpConfirm(false);
            })
            .catch((error) => {
                console.log(error.response);
                setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' });
            })
    };

    return (
        <>
        {popUpConfirm && <ConfirmPostModal
            icon={modalIcon}
            title='Éditer le post'
            // Input message
            onChangeMessage={changeHandlerMessage}
            defaultValueMessage={dataMessage}
            refMessage={messageInputRef}
            // Input image
            postPicture={dataPicture}
            onChangePicture={changeHandlerPicture}
            // Buttons
            onCancel={cancelConfirm}
            onConfirm={confirmUpdate}
        />}
            <i onClick={updateHandler} title='Éditer' className='trending_container_post_icons_icon trending_container_post_icons_icon_modify'>{penIcon}</i>
        </>
        
    )
}

export default UpdatePost;