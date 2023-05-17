import "./ModalContainer.scss"
function ModalContainer({children}){
    return (
        <div className="modal-container">
            {children}
        </div>
    )
}
export default ModalContainer