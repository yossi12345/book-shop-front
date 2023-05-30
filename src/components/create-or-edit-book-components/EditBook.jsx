import { useNavigate, useParams } from "react-router-dom"
import CreateOrEditBookForm from "./CreateOrEditBookForm"
import { useContext, useEffect, useState } from "react"
import { Role, SetRole } from "../RoleContext1"
import { handleAuth } from "./CreateOrEditBook-functions"
import axios from "axios"
import LoadingPage from "../LoadingPage/LoadingPage"
function EditBook({setUsername}){
    const navigate=useNavigate()
    const {bookId}=useParams()
    const [book,setBook]=useState({})
    const [isEdit,setIsEdit]=useState(false)
    const role=useContext(Role)
    const setRole=useContext(SetRole)
    const [isAuthSucceded,setIsAuthSucceded]=useState(false)
    useEffect(()=>{
      handleSetBook()
    },[])
    useEffect(()=>{
        handleAuth({
            navigate,
            role,
            setRole,
            setIsAuthSucceded,
            setUsername
        })
    },[role])
    async function handleSetBook(){
        try{
            const {data:result}=await axios.get(process.env.REACT_APP_BASIC_URL+"get?_id="+bookId,{
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setBook(result)
            setIsEdit(true)
        }catch(err){
            console.log("klui",err)
            if (err?.response?.status===500){
                alert("לא הצלחנו להתקשר עם השרת ולכן לא נוכל לעדכן את הספר")
                navigate("/")
            }
            else
                navigate("/lllllllllllll",{replace:true})
        }
    }
    if (!isAuthSucceded||!isEdit)
        return (
           <LoadingPage/>
        )
    else
        return (
            <CreateOrEditBookForm book={book} isEdit={isEdit} />
        )
}
export default EditBook