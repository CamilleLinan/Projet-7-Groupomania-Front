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

    // const [ showOldPicture, setShowOldPicture ] = useState(true);
    // const [ userChoice, setUserChoice ] = useState('');
    // const [ showChoice, setShowChoice ] = useState(false);

    const [ modify, setModify ] = useState(false);

    const modifyHandler = () => {
        setModify((modify) => !modify);
    }
    
    useEffect(() => {
        setDataPicture(propDataPicture);
    }, [propDataPicture])


    const changeHandler = (e) => {
        let newPicture;

        if (e.target.files) {
            newPicture = e.target.files[0]
        }

        setDataPicture({
            ...propDataPicture,
            'userPicture': newPicture
        })
        console.log('newPicture -->');
        console.log(newPicture);
    }


    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);

    const API_URI = process.env.REACT_APP_API_URL;
    const url = `${API_URI}api/users/${authCtx.userId}/picture`;
    
    const modifyPicture = async (e) => {
        e.preventDefault();
        
        if (!modify) {
        console.log('dataPicture -->');
        console.log(dataPicture.userPicture.name);
        const data = new FormData();
        data.append('image', dataPicture.userPicture);
        
        await axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                console.log(res.data);
                setDataPicture(dataPicture.newPicture);
            })
            .catch((error) => {
                console.log(error.response);
            })
        }
    };

    // const handlePictureChanged = () => {
    //     setShowOldPicture(false);
    //     console.log('handlePictureChanged');
    // }

    //  const onUserPictureChanged = (e) => {
    //      setUserChoice(e.target.files[0]);
    //      console.log('onUserPictureChanged');
    //  }

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
                    onChange={
                        // setDataPicture(e.target.files[0])
                        changeHandler
                    }
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