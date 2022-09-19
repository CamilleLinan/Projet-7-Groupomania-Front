import axios from "axios";
import { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import DeleteProfil from "./DeleteProfil";
import UpdatePhoto from "./UpdatePhoto";
import UpdateProfilForm from "./UpdateProfilForm";


// Récupérer et afficher les informations utilisateur
const IndexProfil = () => {

    const [ userPicture, setUserPicture ] = useState('');
    const [ userFirstName, setUserFirstName ] = useState('');
    const [ userLastName, setUserLastName ] = useState('');
    const [ userEmail, setUserEmail ] = useState('');

    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);

    const API_URI = process.env.REACT_APP_API_URL;
    const url = `${API_URI}api/users/${authCtx.userId}`;

    const fetchHandler = async () => {
        await axios ({
            method: 'GET',
            url: url,
            body: JSON.stringify({
                userId: authCtx.userId
            }),
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            }
        })
            .then(res => {
                setUserPicture(res.data.userPicture);
                setUserFirstName(res.data.firstname);
                setUserLastName(res.data.lastname);
                setUserEmail(res.data.email);
            })
            .catch(err => console.log(err));
    };

    fetchHandler();

    return (
        <div className="profil_container">
            <div className="bg_section">
                <h2 className="profil_container_title bold">Votre profil</h2>
                <div className="profil_container_update">
                    <div className="profil_container_update_photobox">
                        <h3 className="profil_container_update_title photobox_title bold">Votre photo</h3>
                        <img src={userPicture} alt="" className="profil_container_update_photobox_photo" />
                        <UpdatePhoto />
                    </div>
                    <span className="separateBox"></span>
                    <UpdateProfilForm propFirstName={userFirstName} propLastName={userLastName} propEmail={userEmail} />
                </div>
            </div>
            <DeleteProfil />
        </div>
    )
}

export default IndexProfil