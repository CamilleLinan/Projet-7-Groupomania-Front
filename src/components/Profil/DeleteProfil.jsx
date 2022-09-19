import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";


// Supprimer le profil
const DeleteProfil = () => {
    const navigate = useNavigate();

    // Utilisation du context et dotenv
    const authCtx = useContext(AuthContext);

    const API_URI = process.env.REACT_APP_API_URL;
    const url = `${API_URI}api/users/${authCtx.userId}`;
    
    const deleteUser = async () => {
        
        await axios({
            method:'DELETE',
            url: url,
            body: JSON.stringify({
                userId: authCtx.userId
            }),
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
        })
            .then((res) => {
                console.log(res);
                navigate('/');
            })
            .catch((error) => {
                console.log(error.response);
            })
    };

    return (
        <div className="profil_container_footer">
            <button onClick={deleteUser} className="profil_container_footer_btn btn_deleteprofil">Delete profil</button>
        </div>
    )
}

export default DeleteProfil