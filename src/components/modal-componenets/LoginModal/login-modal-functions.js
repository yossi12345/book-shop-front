import axios from "axios";
import validator from "validator"
import { ROLE_TYPES } from "../../../global-constants";
export async function handleLogin({inputsObj,setRole,setUsername,setFailReason,closeModal}){
    const wrongDetailsMessage="האימייל או הסיסמא שגויים"
    const email=inputsObj.login.email.value.trim()
    const password=inputsObj.login.password.value
    if (!validator.isEmail(email)||password.length<8||password.length>20){
        handleSetFailReason(wrongDetailsMessage,setFailReason)
        return
    }
    try{
        const {data:{token,username}}=await axios.post(process.env.REACT_APP_BASIC_URL+"login",{email,password}, 
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        sessionStorage.setItem("token",token)
        setUsername(username)
        setRole(ROLE_TYPES.user)
        console.log(token)
        closeModal()
    }catch(err){
        if (err.response.status===500)
            handleSetFailReason("אנחנו מצטערים אין קשר עם השרת",setFailReason)
        else
            handleSetFailReason(wrongDetailsMessage,setFailReason)  
    }
}
export async function handleSignUp({inputsObj,setInputsObj,setRole,setUsername,setFailReason,closeModal}){
    const requiredFieldMessage="*שדה חובה"
    const age=inputsObj.signUp.age.value.trim()
    const email=inputsObj.signUp.email.value.trim()
    const username=inputsObj.signUp.username.value.trim()
    const password=inputsObj.signUp.password.value
    const passwordAgain=inputsObj.signUp.passwordAgain.value
    const newInputsObj={...inputsObj}
    let isAllFieldsValid=true
    if (!validator.isEmail(email)){
        const message=email===""?requiredFieldMessage:"*יש להכניס אימייל תקין"
        handleInvalidInput(newInputsObj.signUp.email,message)
    }
    if (!(age>=4&&age<=120)){
        const message=age===""?requiredFieldMessage:"*רק אנשים בין גיל 4 ל120 רשאים להירשם"
        handleInvalidInput(newInputsObj.signUp.age,message)
    }  
    if (username==="")
        handleInvalidInput(newInputsObj.signUp.username,requiredFieldMessage)
    else if (username.length>12)
        handleInvalidInput(newInputsObj.signUp.username,"*שם משתמש יכול להכיל עד 12 תווים")
    if (password===""||passwordAgain===""){
        handleInvalidInput(newInputsObj.signUp.password,requiredFieldMessage)
        handleInvalidInput(newInputsObj.signUp.passwordAgain,requiredFieldMessage)
    }
    else if (password.length>20||password.length<8||passwordAgain.length<8||passwordAgain.length>20){
        const message="*על הסיסמה להכיל בין 8 ל20 תווים"
        handleInvalidInput(newInputsObj.signUp.password,message)
        handleInvalidInput(newInputsObj.signUp.passwordAgain,message)
    }
    else if (password!==passwordAgain)
        handleInvalidInput(newInputsObj.signUp.passwordAgain,"*הסיסמאות שהזנת אינן תואמות")
    if (!isAllFieldsValid){
        setInputsObj(newInputsObj)
        return
    }

    try{
        const {data}=await axios.post(process.env.REACT_APP_BASIC_URL+"sign-up",{
            email,
            password,
            age,
            username
        }, {
            headers: {
              'Content-Type': 'application/json',
            }})
        sessionStorage.setItem("token",data.token)
        setUsername(data.username)
        setRole(ROLE_TYPES.user)
        closeModal()
    }
    catch(err){
        console.log("fff",err)
        if (err.response.status===500)
            handleSetFailReason("אנחנו מצטערים אין קשר עם השרת",setFailReason)
        else
            handleSetFailReason("האימייל שלך כבר קיים אצלנו אתה יכול להתחבר",setFailReason)
    } 
    function handleInvalidInput(inputState,message){
        inputState.placeholder=message
        inputState.value=""
        isAllFieldsValid=false
    }
}
function handleSetFailReason(failReason,setFailReason){
    setFailReason("")
    setTimeout(()=>{
        setFailReason(failReason)
    },500)
}
