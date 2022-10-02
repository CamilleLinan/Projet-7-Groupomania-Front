import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';

const penIcon = <FontAwesomeIcon icon={faPenToSquare} />
const checkIcon = <FontAwesomeIcon icon={faCheck} />

// Modifier la photo de profil
const UpdatePhoto = ({ propDataPicture }) => {
     
    const [ modify, setModify ] = useState(false);
    const [ dataPicture, setDataPicture ] = useState(propDataPicture);
    const [ newDataPicture, setNewDataPicture ] = useState('');
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ errorServer, setErrorServer ] = useState('');

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

        if (e.target.files) {
            newPicture = URL.createObjectURL(e.target.files[0])
            setNewDataPicture(e.target.files[0])
            
        }
        setDataPicture(newPicture)
    }

    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);

    const API_URL_USER = process.env.REACT_APP_API_URL_USER;
    const url = `${API_URL_USER}/${authCtx.userId}/picture`;
    
    const modifyPicture = async (e) => {
        e.preventDefault();
        
        if (!modify) {
            const formData = new FormData();
            formData.append('image', newDataPicture);
            
            await axios.put(url, formData, {
                headers: {
                    Authorization: `Bearer ${authCtx.token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(() => {
                    setSuccessMessage({ ...successMessage, message: 'Votre photo a bien été mise à jour !' });
                })
                .catch(() => {
                    setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' });
                })
        }
    };

    return (
        <article className="profil_container_update_photobox">
            <h3 className="profil_container_update_title photobox_title bold">Votre photo</h3>
            <form action="" onSubmit={modifyPicture} className="update-photo-form">
            <img src={dataPicture} alt="" className="profil_container_update_photobox_photo" />
            <br/>
            
            <div className="profil_container_update_infos_inputs">
                {modify && <>
                    <label htmlFor="file"></label>
                    <input 
                        type="file" 
                        name="file" 
                        id="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={changeHandler}
                    />
                </>}

                {successMessage && <p className="success error_center bold">{successMessage.message}</p>}
                {errorServer && <p className="error error_center bold">{errorServer.message}</p>}
                
                {!modify ? 
                    <button onClick={modifyHandler} className="btn_form btn_update_profil bold">
                        Modifier <i className="profil_container_update_infos_input_icon">{penIcon}</i>
                    </button> 
                    : 
                    <button onClick={modifyHandler} className="btn_form btn_update_profil bold">
                        Enregistrer <i className="profil_container_update_infos_input_icon">{checkIcon}</i>
                    </button>
                }
                </div>
            </form>
        </article>
    )
}

export default UpdatePhoto;