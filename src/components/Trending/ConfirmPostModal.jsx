const ConfirmPostModal = (props) => {
    return (
        <div className="modal_backdrop">
        <div className="modal_container modal_container_post">
            <header className="modal_container_header">
                <i className="modal_container_header_icon">{props.icon}</i>
                <h3 className="modal_container_header_title bold">{props.title}</h3>
            </header>
            <div className="modal_container_bg">
                <form action="" onSubmit={props.onSubmit} id=''> 
                    <div className="modal_container_section">
                        <label htmlFor="firstname" className="form_label bold">Modifier le message :</label>
                        <br/>
                        <input 
                            type='text'
                            name="message"
                            id="message"
                            className="form_input update_infos_input"
                            onChange={props.onChangeMessage}
                            defaultValue={props.defaultValueMessage}
                            ref={props.refMessage}
                            required
                        /> 
                        <br />

                        <label htmlFor="file" className="form_label bold">Modifier l'image :</label>
                        <br/>
                        <img src={props.postPicture} alt='' className="trending_container_post_content_image" />
                        <br/>
                        <input 
                            type="file" 
                            name="file" 
                            id="file"
                            accept=".jpg, .jpeg, .png, .gif"
                            onChange={props.onChangePicture}
                        />
                    </div>
                    
                    {props.error && <p className="error bold modal_container_section_message">{props.errorServer}</p>}
                    <footer className="modal_container_footer">
                        <button onClick={props.onCancel} className="modal_container_footer_btn btn_cancel">Annuler</button>
                        <button onClick={props.onConfirm} className="modal_container_footer_btn btn_confirm">Confirmer</button>
                    </footer>
                </form>
            </div>
        </div>
        </div>
    )
}

export default ConfirmPostModal;