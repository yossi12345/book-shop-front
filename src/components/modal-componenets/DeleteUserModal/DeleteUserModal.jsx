import CloseModalBtn from "../CloseModalBtn/CloseModalBtn"
import ModalContainer from "../ModalContainer/ModalContainer"
import ModalInput from "../ModalInput/ModalInput"
import "./DeleteUserModal.scss"
function DeleteUserModal(props){
    return (
        <ModalContainer>
            <div className="delete-user-modal">
                <CloseModalBtn closeModal={()=>{
                    props.setShouldDeleteUserModalOpen(false)
                }}/>
                <h1>היזהר! פעולה זאת היא בלתי הפיכה </h1>  
                <form>
                    <ModalInput label="האימייל של היוזר למחיקה"/>
                    <ModalInput label="הסיסמה שלך" isPassword={true}/>
                    <button className="submit-button" 
                        onClick={async(event)=>{
                            event.preventDefault()
                            
                        }}
                    >
                            מחק משתמש
                    </button>
                </form>
            </div>
        </ModalContainer>
    )
}
export default DeleteUserModal