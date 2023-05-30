import { useContext, useRef, useState } from "react"
import CloseModalBtn from "../CloseModalBtn/CloseModalBtn"
import ModalContainer from "../ModalContainer/ModalContainer"
import ModalInput from "../ModalInput/ModalInput"
import "./CreateBookModal.scss"
import { useNavigate } from "react-router-dom"
import { Role, SetRole } from "../../RoleContext1"
import axios from "axios"
import { ROLE_TYPES } from "../../../global-constants"
function CreateBookModal(props){
    const navigate=useNavigate()
    const role=useContext(Role)
    const setRole=useContext(SetRole)
    const [isDiscriptionAllScreen,setIsDiscriptionAllScreen]=useState(false)
    const [isFirstChapterAllScreen,setIsFirstChapterAllScreen]=useState(false)
    const [createBookFailMessage,setCreateBookFailMessage]=useState(null)
    const bookNameRef=useRef(null)
    const authorRef=useRef(null)
    const priceRef=useRef(null)
    const discountRef=useRef(null)
    const genreRef=useRef(null)
    const descriptionRef=useRef(null)
    const firstChapterRef=useRef(null)
    const bookCoverRef=useRef(null)
    async function handleCreateBook(){
        if (!sessionStorage.getItem("token")||role!==ROLE_TYPES.admin){
            handleAuthFaild()
            return
        }
        const inputs={
            name:bookNameRef.current.value.trim(),
            author:authorRef.current.value.trim(),
            price:priceRef.current.value.trim(),
            discount:discountRef.current.value.trim(),
            genre:genreRef.current.value.trim(),
            description:descriptionRef.current.value.trim(),
            firstChapter:firstChapterRef.current.value.trim(),
            bookCover:bookCoverRef.current.value.trim()
        }
        if (!handleAllInputsValid())
            return 
        try{
            const obj={
                ...inputs,
                discount:inputs.discount===""?undefined:inputs.discount,
                firstChapter:inputs.firstChapter===""?undefined:inputs.firstChapter,
            }
            console.log("SHTUT",obj)
            const {data:book}=await axios.post(process.env.REACT_APP_BASIC_URL+"new-book",{
                ...inputs,
                discount:inputs.discount===""?undefined:inputs.discount,
                firstChapter:inputs.firstChapter===""?undefined:inputs.firstChapter,
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer "+sessionStorage.getItem("token"),
                }
            })
            props.setShouldCreateBookModalOpen(false)
            console.log(book)
        }catch(err){
            if (err.response.status===500)
                setCreateBookFailMessage("אנחנו מצטערים אין קשר עם השרת")
            else if (err.response.status===400)
                 handleAuthFaild()
            console.log(err)
        }
        function handleAuthFaild(){
            setRole("guest")
            //sessionStorage.removeItem("token")
            props.setShouldCreateBookModalOpen(false)
            navigate("/admin",{replace:true})
            alert("אנחנו מצטערים הרשאת הכניסה שלך כמנהל לא עובדת יותר אתה מוזמן לנסות להתחבר שוב ")
        }

        function handleAllInputsValid(){
            let result=true
            if (inputs.genre==="")
                handleInvalidInput(genreRef)
            
            if (inputs.description==="")
                handleInvalidInput(descriptionRef)
            
            if (inputs.name==="")
                handleInvalidInput(bookNameRef)

            if (inputs.bookCover==="")
                handleInvalidInput(bookCoverRef)
            
            if (inputs.author==="")
                handleInvalidInput(authorRef)
            
            if (inputs.price==="")
                handleInvalidInput(priceRef)
            
            if (!(/^[0-9]\d*$/.test(inputs.price))&&inputs.price!=="")
                handleInvalidInput(priceRef,"יש להכניס מספרים שלמים וחיוביים בלבד")
                
            
            if (!(/^[0-9]\d*$/.test(inputs.discount))&&inputs.discount!==""&&inputs.discount<=100)
                handleInvalidInput(discountRef,"יש להכניס מספר בין 0 ל100")  

            return result

            function handleInvalidInput(inputRef,message="*שדה חובה"){
                inputRef.current.value=""
                inputRef.current.setAttribute("placeholder",message)
                result=false
            }
        }
    }
    return (
        <ModalContainer>
            <div className="create-book-modal">
                <CloseModalBtn closeModal={()=>{
                    props.setShouldCreateBookModalOpen(false)
                }}/>
                    <div className="fail-message-container">
                        <h1>{createBookFailMessage}</h1>
                    </div>
                <form>
                    <ModalInput label="שם הספר:" inputRef={bookNameRef}/>
                    <ModalInput label="סופר:" inputRef={authorRef}/>
                    <ModalInput label="מקור לכריכה של הספר" inputRef={bookCoverRef}/>
                    <ModalInput label="מחיר:" inputRef={priceRef}/>
                    <ModalInput label=" הנחה באחוזים (אם יש):" inputRef={discountRef}/>
                    <ModalInput label="ז'אנר:" inputRef={genreRef}/>
                    <div className="textarea-container">
                        <label>
                            תיאור:
                        </label>
                        <textarea className={isDiscriptionAllScreen?"all-screen":""}
                            ref={descriptionRef} 
                            onDoubleClick={()=>{
                                const copy=isDiscriptionAllScreen
                                setIsDiscriptionAllScreen(!copy)
                            }}
                        />
                    </div>
                    <div className="textarea-container">
                        <label>
                            פרק ראשון (אם יש):
                        </label>
                        <textarea className={isFirstChapterAllScreen?"all-screen":""} 
                            ref={firstChapterRef}
                            onDoubleClick={()=>{
                                const copy=isFirstChapterAllScreen
                                setIsFirstChapterAllScreen(!copy)
                            }}
                        />
                    </div>
                    <button className="submit-button" onClick={handleCreateBook}>
                            צור ספר
                    </button>
                </form>
            </div>
        </ModalContainer>
    )
}
export default CreateBookModal