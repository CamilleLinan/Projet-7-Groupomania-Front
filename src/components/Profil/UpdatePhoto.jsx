import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/authContext";


// Modifier la photo de profil
const UpdatePhoto = ({ propPicture }) => {
     
    const [ userPicture, setUserPicture ] = useState(propPicture);
    const [ showOldPicture, setShowOldPicture ] = useState(true);
    const [ userChoice, setUserChoice ] = useState('');
    const [ showChoice, setShowChoice ] = useState(false);

    useEffect(() => {
        setUserPicture(propPicture);
    }, [propPicture])

    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);

    const API_URI = process.env.REACT_APP_API_URL;
    const url = `${API_URI}api/users/${authCtx.userId}/picture`;
    
    const modifyPicture = async () => {
        const data = new FormData();
        data.append('image', userPicture);

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
        {showOldPicture && <img src={userPicture} alt="" className="profil_container_update_photobox_photo" />}
        {showChoice && <img src={userChoice} alt="" className="profil_container_update_photobox_photo" />}
        <form action="" onSubmit={modifyPicture} className="update-photo-form">
            <label htmlFor="file" className="profil_container_update_photobox_label"></label>
            <input 
                type="file" 
                name="file" 
                id="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                    setUserPicture(e.target.files[0]);
                    setUserChoice(e.target.files);
                    handlePictureChanged();
                    onUserPictureChanged();
                }}
            />
            <div className="error bold"></div>
            <br/>
            <button type="submit" className="btn_form btn_update_profil bold">Modifier votre photo</button>
        </form>
        </>
    )
}

export default UpdatePhoto;