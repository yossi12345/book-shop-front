import "./ModalInput.scss"
function ModalInput(props){
    return (
        <div className="modal-input">
            <div>
                {props.label}
            </div>
            <input type={props.isPassword?"password":"text"} ref={props.inputRef}/>
        </div>
    )
}
export default ModalInput