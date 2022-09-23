import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/authContext';
import axios from 'axios';
import logo from '../../styles/img/groupomania-logo-navbar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const homeIcon = <FontAwesomeIcon icon ={faHouse} />
const profilIcon = <FontAwesomeIcon icon={faCircleUser} />
const logoutIcon = <FontAwesomeIcon icon={faRightFromBracket} />

const Navbar = (props) => {
    const authCtx = useContext(AuthContext);  

    const fetchHandler = async () => {
        await axios ({
            method: 'GET',
            url: `http://localhost:3001/api/users/${authCtx.userId}`,
            body: JSON.stringify({
                userId: authCtx.userId
            }),
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            }
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    fetchHandler();

    return(
        <nav className="nav_container">
            <div className="nav_container_logo">
                 <img src={logo} alt="groupomania-logo" className="nav_container_logo_img" />
            </div>
            <div className="nav_container_title">
                <h1 className="nav_container_title_welcome bold">{props.message}</h1>
            </div>
            <div className="nav_container_link">
                <NavLink 
                    className={({ isActive }) => (isActive ? "active_link link_icon" : "inactive_link link_icon")}
                    title="Fil d'actualité"
                    end to="/trending"
                >
                    {homeIcon}
                </NavLink>
                <NavLink  
                    className={({ isActive }) => (isActive ? "active_link link_icon" : "inactive_link link_icon")}
                    title="Profil" 
                    end to="/profil"
                >
                    {profilIcon}
                </NavLink>
                <NavLink 
                    className="link_icon"
                    title="Déconnexion" 
                    end to="/"
                >
                    <div onClick={authCtx.logout}>
                        {logoutIcon}
                    </div>
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar