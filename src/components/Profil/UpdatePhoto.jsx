import axios from "axios";
import { useContext, useState } from "react";
import AuthContext from "../../context/authContext";

const UpdatePhoto = ({ propPicture }) => {
    const [ userPicture, setUserPicture ] = useState('');

    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);

    const API_URI = process.env.REACT_APP_API_URL;
    const url = `${API_URI}api/users/${authCtx.userId}`;
    
    const onSubmit = async () => {

        await axios({
            method: "PUT",
            url: url,
            body: JSON.stringify({
                userId: authCtx.userId
            }),
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
                'Content-Type': 'image'/'files',
            },
            data: {
                userPicture,
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error.response);
            })
    };

    return (
        <div className="profil_container_update_photobox">
            <h3 className="profil_container_update_title photobox_title bold">Modifier votre photo</h3>
            <img src={propPicture} alt="" className="profil_container_update_photobox_photo" />
            <form onSubmit={onSubmit}>
            <label htmlFor="file" className="profil_container_update_photobox_label"></label>
            <input 
                type="file" 
                name="file" 
                id="file"
                onChange={(e) => setUserPicture(e.target.files)}
                value={userPicture}
            />
            <br/>
            </form>
            <button type="submit" className="btn_form btn_update_infos">Modifier ma photo</button>
        </div>
    )
}

export default UpdatePhoto