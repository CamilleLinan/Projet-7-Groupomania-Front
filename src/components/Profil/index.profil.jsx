import axios from "axios";
import { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import UpdatePhoto from "./UpdatePhoto";
import UpdateInfos from "./UpdateInfos";
import DeleteProfil from "./DeleteProfil";

const profilHeaderIcon = <FontAwesomeIcon icon={faAddressCard} />

// Récupérer et afficher les informations utilisateur
const IndexProfil = () => {
    const [ userPicture, setUserPicture ] = useState('');
    const [ userFirstName, setUserFirstName ] = useState('');
    const [ userLastName, setUserLastName ] = useState('');
    const [ userEmail, setUserEmail ] = useState('');

    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);

    const API_URI = process.env.REACT_APP_API_URL;

    const getUserData = async () => {
        await axios ({
            method: 'GET',
            url: `${API_URI}api/users/${authCtx.userId}`,
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
    
    getUserData();

    return (

        <div className="profil_container">
            <div className="bg_section">
                <header className="profil_container_header">
                    <h2 className="profil_container_header_title bold">Votre profil</h2>
                    <i className="profil_container_header_icon">{profilHeaderIcon}</i>
                </header>
                <section className="profil_container_update">
                    <div className="profil_container_update_photobox">
                        <h3 className="profil_container_update_title photobox_title bold">Votre photo</h3>
                        <UpdatePhoto propPicture={userPicture} />
                    </div>
                    <span className="separateBox"></span>
                    <UpdateInfos propFirstName={userFirstName} propLastName={userLastName} propEmail={userEmail} />
                </section>
            </div>
            <DeleteProfil />
        </div>

    )
}

export default IndexProfil;