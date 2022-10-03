import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import AuthContext from "../../context/AuthContext";

const CreatePost = ({ propDataPicture }) => {
    const authCtx = useContext(AuthContext);
    
    const [ dataPicture, setDataPicture ] = useState(propDataPicture);
    const [ userMessage, setUserMessage ] = useState('');
    const [ previewPicture, setPreviewPicture ] = useState('');
    const [ postPicture, setPostPicture ] = useState('');
    const [ errorServer, setErrorServer ] = useState('');
    
    useEffect(() => {
        setDataPicture(propDataPicture);
    }, [propDataPicture])

    // Avoir un apperçu de l'image
    const changeHandler = (e) => {
        let newPicture;

        if (e.target.files) {
            newPicture = URL.createObjectURL(e.target.files[0])
            setPreviewPicture(newPicture)
        }
        setPostPicture(e.target.files[0]) 
    }

    // Utilisation de dotenv
    const API_URL_POST = process.env.REACT_APP_API_URL_POST;
    const url = `${API_URL_POST}`;

    // Fonction de soumission du formulaire
    const onSubmit = async (e) => {
        e.preventDefault();

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
            .then(() => {
                alert('Votre post va être publié !');
                window.location.reload();
            })
            .catch(() => {
                setErrorServer({ ...errorServer, message: 'Une erreur interne est survenue. Merci de revenir plus tard.' })        
            });
    };

    return (
        <>
            <section className="bg_section trending_container_newpost">
                <div className="trending_container_newpost_header">
                    <div className="trending_container_newpost_photobox">
                        <img src={dataPicture} alt="" className="trending_container_newpost_photo" />
                    </div>
                    <article className="trending_container_newpost_form">
                        <form onSubmit={onSubmit} id="newpost_form">
                            <label htmlFor="newpost" className="trending_container_newpost_form_label bold"></label>
                            
                            <input 
                                type="text" 
                                name="newpost" 
                                id="newpost" 
                                className="form_input trending_container_newpost_form_input" 
                                placeholder="Quoi de neuf ?" 
                                onChange={(e) => setUserMessage(e.target.value)}
                                value={userMessage}
                                required
                            />
                            
                            {userMessage && <>
                            {previewPicture && <img src={previewPicture} alt='' />}
                            <label htmlFor="file" className="trending_container_newpost_file_label"></label>
                            <input 
                                type="file" 
                                name="file" 
                                id="file_newpost"
                                accept=".jpg, .jpeg, .png, .gif" 
                                className="trending_container_newpost_file_btn"
                                onChange={changeHandler}
                            />
                            </>}
                            {postPicture && <img src={postPicture} alt='' />}

                            {errorServer && <p className="error bold">{errorServer.message}</p>}
                            <button type="submit" disabled={!userMessage} className={!userMessage ? "btn_newpost btn_newpost_disabled" : "btn_newpost btn_newpost_active"}>Publier</button>
                        </form>
                    </article>
                </div>     
            </section>
        </>
    )
}

export default CreatePost