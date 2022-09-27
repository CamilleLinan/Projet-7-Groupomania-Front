import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import AuthContext from "../../context/authContext";

const CreatePost = ({ propDataPicture }) => {
    const authCtx = useContext(AuthContext);
    
    const [ dataPicture, setDataPicture ] = useState(propDataPicture);
    const [ userMessage, setUserMessage ] = useState('');
    const [ postPicture, setPostPicture ] = useState('');
    const [ errorServer, setErrorServer ] = useState('');
    
    useEffect(() => {
        setDataPicture(propDataPicture);
    }, [propDataPicture])



    // Utilisation de dotenv
    const API_URI = process.env.REACT_APP_API_URL;
    const url = `${API_URI}api/post/`;

    // Fonction de soumission du formulaire
    const onSubmit = async () => {

        let formData = new FormData();
        formData.append('posterId', authCtx.userId);
        formData.append('message', userMessage);
        formData.append('image', postPicture);

        await axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
                'Content-Type': `multipart/form-data`,
            },
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
                    setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' })        
            });
    };

    return (
        <>
            <div className="bg_section trending_container_newpost">
                    <div className="trending_container_newpost_header">
                        <div className="trending_container_newpost_photobox">
                            <img src={dataPicture} alt="" className="trending_container_newpost_photo" />
                        </div>
                        <div className="trending_container_newpost_form">
                            <form onSubmit={onSubmit} id="newpost_form">
                                <label htmlFor="newpost" className="trending_container_newpost_form_label bold"></label>
                                
                                <input 
                                    type="text" 
                                    name="newpost" 
                                    id="newpost" 
                                    className="trending_container_newpost_form_input" 
                                    placeholder="Quoi de neuf ?" 
                                    onChange={(e) => setUserMessage(e.target.value)}
                                    value={userMessage}
                                    required
                                />
                                
                                {userMessage && <>
                                <label htmlFor="file" className="trending_container_newpost_file_label"></label>
                                <input 
                                    type="file" 
                                    name="file" 
                                    id="file_newpost" 
                                    className="trending_container_newpost_file_btn"
                                    onChange={(e) => setPostPicture(e.target.files[0])}
                                />
                                </>}
                                {postPicture && <img src={postPicture} alt='' />}

                                {errorServer && <p className="error bold">{errorServer.message}</p>}
                                {userMessage ? <button type="submit"  className="btn_newpost">Publier</button> : <button type="submit" disabled={true} className="btn_newpost btn_newpost_disabled">Publier</button>}
                            </form>
                        </div>
                    </div>
                    
            </div>
        </>
    )
}

export default CreatePost