const ConfirmModal = (props) => {
    return (
        <div className="modal_backdrop">
            <div className="modal_container">
                <header className="modal_container_header">
                    <i className="modal_container_header_icon">{props.icon}</i>
                    <h3 className="modal_container_header_title bold">{props.title}</h3>
                </header>
                <div className="modal_container_bg">
                    <div className="modal_container_section">
                        <p className="modal_container_section_message">{props.message}</p>
                    </div>
                    {props.error && <p className="error bold modal_container_section_message">{props.errorServer}</p>}
                    <footer className="modal_container_footer">
                        <button onClick={props.onCancel} className="modal_container_footer_btn btn_cancel">Annuler</button>
                        <button onClick={props.onConfirm} className="modal_container_footer_btn btn_confirm">Confirmer</button>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal