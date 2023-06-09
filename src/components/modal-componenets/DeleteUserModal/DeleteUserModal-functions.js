import axios from "axios"
import { ADMIN_PASSWORD_REGEX, ROLE_TYPES } from "../../../global-constants"
export function handleWrongPassword(input,setInput){
    const inputCopy={...input}
    inputCopy.value=""
    inputCopy.placeholder="*סיסמה שגויה"
    setInput(inputCopy)
}
export async function handleDeleteUser({input,setInput,closeModal,navigate,role,setRole,setLoginModalShouldOpen}){
    const token=sessionStorage.getItem("token")
    const password=input.value
    const isAdmin=role===ROLE_TYPES.admin
    if ((isAdmin&&!ADMIN_PASSWORD_REGEX.test(password))||
        (!isAdmin&&(password.length>20||password.length<8))
    ){
       handleWrongPassword(input,setInput)
        return
    }
    try{
        if (!token)
            throw new Error()
        const url=process.env.REACT_APP_BASIC_URL+(isAdmin?"admin-":"")+"delete-account"
        const {data:user}=await axios.delete(url,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            data:{password}
        })
        console.log(user)
        setRole(ROLE_TYPES.guest)
        navigate("/",{replace:true})
        sessionStorage.removeItem("token")
        closeModal()
        alert("חשבונך נמחק בהצלחה")
    }catch(err){
        console.log(err)
        if (err?.response.status===404){
            handleWrongPassword(input,setInput)
            return
        }
        if (err?.response.status===500){
            alert("אנחנו מצטערים לא הצלחנו להתחבר לשרת")
            return 
        }
        if (isAdmin)
            navigate("/admin",{replace:true})
        else{
            navigate("/",{replace:true})
            setLoginModalShouldOpen(true)
        }
        sessionStorage.removeItem("token")
        closeModal()
        setRole(ROLE_TYPES.guest)
        alert("התנתקת לנו אתה מוזמן להתחבר שוב")
    }
}