import axios from "axios";
import { ROLE_TYPES } from "../../global-constants";
export async function handleLogin({inputsRefs,setUsername,navigate,setRole,setLoginFailMessage}){
    const wrongDetailsMessage="שם המשתמש או הסיסמה שגויים"
    const passwordTest=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,}$/
    const username=inputsRefs.current[0].value.trim()
    const password=inputsRefs.current[1].value
    if (username===""){
        inputsRefs.current[0].value=""
        inputsRefs.current[0].setAttribute("placeholder","*שדה חובה")
    }
    if (password===""){
        inputsRefs.current[1].value=""
        inputsRefs.current[1].setAttribute("placeholder","*שדה חובה") 
    }
    if (password===""||username==="")
        return
    if (!passwordTest.test(password)){
        setLoginFailMessage(wrongDetailsMessage)
        return
    }
    try{
        const {data}=await axios.post(process.env.REACT_APP_BASIC_URL+"admin-login"
        ,{
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
            }})
        sessionStorage.setItem("token",data.token)
        setUsername(data.username)
        setRole(ROLE_TYPES.admin)
        navigate("/",{replace:true})
        console.log(data.token)
    }catch(err){
        console.log(err)
        if (!err.response)
            setLoginFailMessage("יוסי שכחת להדליק את השרת")
        else if (err.response.status===500)
            setLoginFailMessage("אנחנו מצטערים אין קשר עם השרת")
        else
            setLoginFailMessage(wrongDetailsMessage)
    }       
}