import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/authContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const checkIcon = <FontAwesomeIcon icon={faCheck} />

// Modifier la photo de profil
const UpdatePhoto = ({ propData }) => {
     
    const [ dataPicture, setDataPicture ] = useState(propData);
    const [ showOldPicture, setShowOldPicture ] = useState(true);
    const [ userChoice, setUserChoice ] = useState('');
    const [ showChoice, setShowChoice ] = useState(false);

    useEffect(() => {
        setDataPicture(propData);
    }, [propData])

    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);

    const API_URI = process.env.REACT_APP_API_URL;
    const url = `${API_URI}api/users/${authCtx.userId}/picture`;
    
    const modifyPicture = async () => {
        const data = new FormData();
        data.append('image', dataPicture);

        await axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error.response);
            })
    };

    const handlePictureChanged = () => {
        setShowOldPicture(false);
        console.log('handlePictureChanged');
    }

    const onUserPictureChanged = () => {
        setShowChoice(true);
        console.log('onUserPictureChanged');
    }

    return (
        <>
        {showOldPicture && <img src={dataPicture.userPicture} alt="" className="profil_container_update_photobox_photo" />}
        {showChoice && <img src={userChoice} alt="" className="profil_container_update_photobox_photo" />}
        <form action="" onSubmit={modifyPicture} className="update-photo-form">
            <label htmlFor="file" className="profil_container_update_photobox_label"></label>
            <input 
                type="file" 
                name="file" 
                id="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                    setDataPicture(e.target.files[0]);
                    setUserChoice(e.target.files);
                    handlePictureChanged();
                    onUserPictureChanged();
                }}
            />
            <div className="error bold"></div>
            <br/>
            <button type="submit" className="btn_form btn_update_profil bold">
                Enregistrer <i className="profil_container_update_infos_input_icon">{checkIcon}</i>
            </button>
        </form>
        </>
    )
}

export default UpdatePhoto;