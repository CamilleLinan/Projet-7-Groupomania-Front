import { NavLink } from 'react-router-dom';

const ErrorAuth = () => {
    return(
        <div className='bg_section errorAuth_container'>
            <h1 className='errorAuth_container_title'>Vous devez avoir un compte pour accéder à cette page !</h1>
            <NavLink end to='/' title='login'>
                <button className='errorAuth_container_btn'>S'inscrire / Se connecter</button>
            </NavLink>
        </div>
    )
}

export default ErrorAuth