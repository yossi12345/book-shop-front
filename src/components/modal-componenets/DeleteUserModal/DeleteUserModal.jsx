import { useState } from "react"
import CloseModalBtn from "../CloseModalBtn/CloseModalBtn"
import ModalContainer from "../ModalContainer/ModalContainer"
import "./DeleteUserModal.scss"
import { useContext } from "react"
import { Role, SetRole } from "../../RoleContext1"
import { useNavigate } from "react-router-dom"
import { handleDeleteUser } from "./DeleteUserModal-functions"
function DeleteUserModal(props){
    const navigate=useNavigate()
    const [input,setInput]=useState({
        value:"",
        placeholder:""
    })
    const role=useContext(Role)
    const setRole=useContext(SetRole)
    function closeModal(){
        props.setShouldDeleteUserModalOpen(false)
    }
    return (
        <ModalContainer>
            <div className="delete-user-modal">
                <CloseModalBtn closeModal={closeModal}/>
                <h1>היזהר! פעולה זאת היא בלתי הפיכה </h1>  
                <form>
                    <div>
                        <label>
                            הסיסמה שלך:
                        </label>
                        <input type="password" value={input.value} placeholder={input.placeholder} onChange={event=>{
                            const inputCopy={...input}
                            inputCopy.value=event.target.value
                            setInput(inputCopy)
                        }}/>
                    </div>
                    <button className="submit-button" 
                        onClick={(event)=>{
                            event.preventDefault()
                            handleDeleteUser({
                                input,
                                setInput,
                                closeModal,
                                navigate,
                                role,
                                setRole,
                                setLoginModalShouldOpen:props.setLoginModalShouldOpen
                            })
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