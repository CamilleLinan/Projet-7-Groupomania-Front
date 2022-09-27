import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/authContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';

const penIcon = <FontAwesomeIcon icon={faPenToSquare} />
const checkIcon = <FontAwesomeIcon icon={faCheck} />

// Modifier la photo de profil
const UpdatePhoto = ({ propDataPicture }) => {
     
    const [ dataPicture, setDataPicture ] = useState(propDataPicture);
    const [ newDataPicture, setNewDataPicture ] = useState('');
    const [ modify, setModify ] = useState(false);

    // modifyHandler
    const modifyHandler = () => {
        setModify((modify) => !modify);
    }
    
    // useEffect
    useEffect(() => {
        setDataPicture(propDataPicture);
    }, [propDataPicture])

    // change
    const changeHandler = (e) => {
        let newPicture;

        // Checker file
        if (e.target.files) {
            newPicture = URL.createObjectURL(e.target.files[0])
            setNewDataPicture(e.target.files[0])
            
        }
        setDataPicture(newPicture)
    }

    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);

    const API_URI = process.env.REACT_APP_API_URL;
    const url = `${API_URI}api/users/${authCtx.userId}/picture`;
    
    const modifyPicture = async (e) => {
        e.preventDefault();
        
        if (!modify) {
            const data = new FormData();
            data.append('image', newDataPicture);
            
            await axios.put(url, data, {
                headers: {
                    Authorization: `Bearer ${authCtx.token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error.response);
                })
        }
    };

    return (
        <div className="profil_container_update_photobox">
            <h3 className="profil_container_update_title photobox_title bold">Votre photo</h3>
            <form action="" onSubmit={modifyPicture} className="update-photo-form">
            <img src={dataPicture} alt="" className="profil_container_update_photobox_photo" />
            
            {modify && <>
                <label htmlFor="file"></label>
                <input 
                    type="file" 
                    name="file" 
                    id="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={changeHandler}
                />
                <div className="error bold"></div>
            </>}
            
            {!modify ? 
                <button onClick={modifyHandler} className="btn_form btn_update_profil bold">
                    Modifier <i className="profil_container_update_infos_input_icon">{penIcon}</i>
                </button> : 
                <button onClick={modifyHandler} className="btn_form btn_update_profil bold">
                    Enregistrer <i className="profil_container_update_infos_input_icon">{checkIcon}</i>
                </button>}
            </form>
        </div>
    )
}

export default UpdatePhoto;