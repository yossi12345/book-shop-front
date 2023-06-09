import axios from "axios"
import { ROLE_TYPES } from "../global-constants"

export async function handleDeleteBook(params){
    const token=sessionStorage.getItem("token")
    try{
        if (!token)
            throw new Error()
        const {data:deletedBook}=await axios.delete(process.env.REACT_APP_BASIC_URL+"delete-book?_id="+params.book._id,{
            headers:{
                'Content-Type': 'application/json',
                "Authorization":"Bearer "+token
            }
        })
        console.log(deletedBook)
        params.deleteBookRealTime()
        params.closeGenericModal()
    }catch(err){
        console.log(err)
        if (err?.response?.status===500){
            params.closeGenericModal()
            params.setGenericModalParams({content:"מצטערים לא הצלחנו להתקשר עם השרת ולכן הספר לא נמחק"})
        }
        else {
            params.navigate("/admin",{replace:true})
            params.closeGenericModal()
            params.setGenericModalParams({content:"התנתקת לנו אתה מוזמן להתחבר שוב"})
            params.setRole(ROLE_TYPES.guest)
        }
    }
}