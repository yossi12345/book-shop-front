import {IoIosCloseCircle} from "react-icons/io"
import owlReading from "../../../images/owl-reading.png"
import ModalContainer from "../ModalContainer/ModalContainer"
import "./FirstChapterModal.scss"
function FirstChapterModal({firstChapter,closeModal}){
    return (
        <ModalContainer>
            <div className="first-chapter-modal">
                <div className="upper-part">
                    <img src={owlReading} alt="owl reading"/>
                    <button onClick={closeModal}>
                        <IoIosCloseCircle size={38} color="white"/>
                    </button>
                </div>
                <div className={
                        "first-chapter"+((/[א-ת]/.test(firstChapter)?"": " english"))
                    }>
                    {firstChapter}
                </div>
            </div>
        </ModalContainer>
    )
}
export default FirstChapterModal