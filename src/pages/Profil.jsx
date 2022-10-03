import Navbar from "../components/Layout/Navbar"
import { useContext, useState, useEffect, useCallback } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import UpdatePhoto from "../components/Profil/UpdatePhoto";
import UpdateInfos from "../components/Profil/UpdateInfos";
import DeleteProfil from "../components/Profil/DeleteProfil";

const profilHeaderIcon = <FontAwesomeIcon icon={faAddressCard} />

// Récupérer et afficher les informations utilisateur
const IndexProfil = () => {

    const [ data, setData ] = useState([]);
    const [ errorServer, setErrorServer ] = useState('');

    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);
    const API_URL_USER = process.env.REACT_APP_API_URL_USER;

    const getUserData =  useCallback( async () => {
        await axios ({
            method: 'GET',
            url: `${API_URL_USER}/${authCtx.userId}`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            }
        })
            .then((res) => { setData(res.data) })
            .catch(() => {
                setErrorServer({ ...errorServer, message: 'Une erreur est survenue, merci de revenir plus tard.' })
            });
    }, [API_URL_USER, authCtx.token, authCtx.userId, setErrorServer, errorServer]);
    
    useEffect(() => {
        getUserData();
    }, [getUserData])


    return (
        <>
            <Navbar />
            <section className="profil_container">
                <div className="bg_section">
                    {!errorServer ? <>
                        <header className="profil_container_header">
                            <h2 className="profil_container_header_title bold">Votre profil</h2>
                            <i className="profil_container_header_icon">{profilHeaderIcon}</i>
                        </header>
                        <section className="profil_container_update">
                            <UpdatePhoto propDataPicture={data.userPicture} />
                            <span className="separateBox"></span>
                            <UpdateInfos propData={data} />
                        </section> 
                    </> : <>
                        <p className="error text_center bold">{errorServer.message}</p>
                    </> }
                </div>
                {!errorServer && <DeleteProfil />}
            </section>
        </>
    )
}

export default IndexProfil;