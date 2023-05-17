import "./CloseModalBtn.scss"
import {IoCloseSharp} from "react-icons/io5"
function CloseModalBtn({closeModal}){
    return (
        <button className="close-modal-btn" onClick={closeModal}>
            <IoCloseSharp size={18}/>
        </button>
    )
}
export default CloseModalBtn 