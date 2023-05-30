import axios from "axios"
import { ROLE_TYPES } from "../global-constants"
export async function handleUpdateBook({book,update,setRole,navigate}){

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
        window.location.reload()
    }catch(err){
        console.log(err)
        if (err?.response?.status===500)
            alert("מצטערים לא הצלחנו להתקשר עם השרת ולכן הספר נשאר זמין")
        else if (err?.response?.status===400) {
            navigate("/admin",{replace:true})
            alert("התנתקת לנו אתה מוזמן להתחבר שוב")
            setRole(ROLE_TYPES.guest)
        }
    }
    
}