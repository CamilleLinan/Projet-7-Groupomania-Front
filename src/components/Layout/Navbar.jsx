import logo from '../../styles/img/groupomania-logo-navbar.png';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import AuthContext from '../../context/authContext';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const profilIcon = <FontAwesomeIcon icon={faCircleUser} />
const logoutIcon = <FontAwesomeIcon icon={faRightFromBracket} />

const Navbar = () => {
    const [ userFirstName, setUserFirstName ] = useState('');

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
                setUserFirstName(res.data.firstname);
            })
            .catch(err => console.log(err));
    };

    fetchHandler();

    return(
        <nav>
            <div className="nav_container">
                <div className="nav_container_logo">
                    <img src={logo} alt="groupomania-logo" className="nav_container_logo_img" />
                </div>
                <div className="nav_container_title">
                    <h2 className="nav_container_title_welcome bold">Bonjour {userFirstName} !</h2>
                </div>
                <div className="nav_container_link">
                    <NavLink end to="/profil" title='Profil'>
                        <i className='nav_container_link_icon nav_container_link_icon_profil'>{profilIcon}</i>
                    </NavLink>
                    <NavLink end to="/">
                        <div onClick={authCtx.logout} className="nav_container_link_logout" title="Déconnexion">
                            <i className='nav_container_link_icon nav_container_link_icon_logout'>{logoutIcon}</i>
                        </div>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar