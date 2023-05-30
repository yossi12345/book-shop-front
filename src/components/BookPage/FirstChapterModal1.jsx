import ModalContainer from "../modal-componenets/ModalContainer/ModalContainer"
import {IoIosCloseCircle} from "react-icons/io"
import owlReading from "../../images/owl-reading.png"
function FirstChapterModal1({book,setShouldModalOpen}){
    return (
        <ModalContainer>
            <div className="first-chapter-modal">
                <div className="upper-part">
                    <img src={owlReading} alt="owl reading"/>
                    <button onClick={()=>{
                        setShouldModalOpen(false)
                    }}>
                        <IoIosCloseCircle size={38} color="white"/>
                    </button>
                </div>
                <div className={
                        "first-chapter"+((/[א-ת]/.test(book.firstChapter)?"": " english"))
                    }>
                    {book.firstChapter}
                </div>
            </div>
        </ModalContainer>
    )
}
export default FirstChapterModal1