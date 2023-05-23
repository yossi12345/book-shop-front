import "./ModalInput.scss"
function ModalInput(props){
    return (
        <div className="modal-input">
            <label>
                {props.label}
            </label>
            <input type={props.isPassword?"password":"text"} ref={props.inputRef}/>
        </div>
    )
}
export default ModalInput