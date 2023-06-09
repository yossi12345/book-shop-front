import axios from "axios"
import { ROLE_TYPES } from "../global-constants"
export async function handleUpdateBook({book,update,setRole,navigate,updateBookRealTime,setGenericModalParams}){

    const token=sessionStorage.getItem("token")
    try{
        if (!token)
            throw new Error()
        const {data:updatedBook}=await axios.patch(process.env.REACT_APP_BASIC_URL+"update-book?_id="+book._id,
            update,{
            headers:{
                "Authorization":"Bearer "+token,
                'Content-Type': 'application/json'
            }
        })
        console.log(updatedBook)
        updateBookRealTime(update)
    }catch(err){
        console.log(err)
        if (err?.response?.status===500)
            setGenericModalParams({content:"מצטערים לא הצלחנו להתקשר עם השרת ולכן העדכון נכשל"})
        else if (err?.response?.status===400) {
            navigate("/admin",{replace:true})
            setGenericModalParams({content:"התנתקת לנו אתה מוזמן להתחבר שוב"})
            setRole(ROLE_TYPES.guest)
            sessionStorage.removeItem("token")
        }
    }
    
}