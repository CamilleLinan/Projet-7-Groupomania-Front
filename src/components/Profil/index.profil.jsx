import axios from "axios";
import { useContext, useState, useEffect, useCallback } from "react";
import AuthContext from "../../context/authContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import UpdatePhoto from "./UpdatePhoto";
import UpdateInfos from "./UpdateInfos";
import DeleteProfil from "./DeleteProfil";

const profilHeaderIcon = <FontAwesomeIcon icon={faAddressCard} />

// Récupérer et afficher les informations utilisateur
const IndexProfil = () => {
    const [ data, setData ] = useState([]);

    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);
    const API_URI = process.env.REACT_APP_API_URL;

    const getUserData =  useCallback( async () => {
        await axios ({
            method: 'GET',
            url: `${API_URI}api/users/${authCtx.userId}`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            }
        })
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, [API_URI, authCtx.token, authCtx.userId]);
    
    useEffect(() => {
        getUserData();
    }, [getUserData])

    console.log(data);

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
                        <UpdatePhoto propData={data} />
                    </div>
                    <span className="separateBox"></span>
                    <UpdateInfos propData={data} />
                </section>
            </div>
            <DeleteProfil />
        </div>

    )
}

export default IndexProfil;