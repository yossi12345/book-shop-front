import axios from "axios";
import validator from "validator"
import { ROLE_TYPES } from "../../../global-constants";
export async function handleLogin({inputsObj,setRole,setUsername,setFailLoginReason,closeModal}){
    const wrongDetailsMessage="האימייל או הסיסמא שגויים"
    const email=inputsObj.login.email.value.trim()
    const password=inputsObj.login.password.value
    if (!validator.isEmail(email)||password.length<8||password.length>20){
        setFailLoginReason(wrongDetailsMessage)
        return
    }
    try{
        const {data}=await axios.post(process.env.REACT_APP_BASIC_URL+"login",{email,password}, 
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        sessionStorage.setItem("token",data.token)
        setUsername(data.username)
        setRole(ROLE_TYPES.user)
        console.log(data.token)
        closeModal()
    }catch(err){
        if (err.response.status===500)
            setFailLoginReason("אנחנו מצטערים אין קשר עם השרת")
        else
            setFailLoginReason(wrongDetailsMessage)  
    }
}
export async function handleSignUp({inputsObj,setInputsObj,setRole,setUsername,setFailSignUpReason,closeModal}){
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

    if (password===""||passwordAgain===""){
        handleInvalidInput(newInputsObj.signUp.password,requiredFieldMessage)
        handleInvalidInput(newInputsObj.signUp.passwordAgain,requiredFieldMessage)
    }
    else if (password.length>20||password.length<8||passwordAgain.length<8||passwordAgain.length>20){
        const message="*על הסיסמה להכיל בין 8 ל20 תווים"
        handleInvalidInput(newInputsObj.signUp.password,message)
        handleInvalidInput(newInputsObj.signUp.passwordAgain,message)
    }
    else if (password!==passwordAgain){
        const message="*הסיסמאות שהזנת אינן תואמות"
        handleInvalidInput(newInputsObj.signUp.password,message)
        handleInvalidInput(newInputsObj.signUp.passwordAgain,message)
    }
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
        if (err.response.status===500)
            setFailSignUpReason("אנחנו מצטערים אין קשר עם השרת")
        else
            setFailSignUpReason("האימייל שלך כבר קיים אצלנו אתה יכול להתחבר")
        console.log("fff",err)
    } 
    function handleInvalidInput(inputState,message){
        inputState.placeholder=message
        inputState.value=""
        isAllFieldsValid=false
    }
}
// export async function handleLogin({inputsRefs,setRole,setUsername,setFailLoginReson,closeModal}){
//     const wrongDetailsMessage="האימייל או הסיסמא שגויים"
//     const email=inputsRefs.email.value.trim()
//     const password=inputsRefs.password.value
//     if (!validator.isEmail(email)||password.length<8||password.length>20){
//         setFailLoginReson(wrongDetailsMessage)
//         return
//     }
//     try{
//         const {data}=await axios.post(process.env.REACT_APP_BASIC_URL+"login",{
//             email,
//             password
//         }, {
//             headers: {
//               'Content-Type': 'application/json',
//             }})
//         localStorage.setItem("token",data.token)
//         setUsername(data.username)
//         setRole(ROLE_TYPES.user)
//         console.log(data.token)
//         closeModal()
//     }
//     catch(err){
//         if (err.response.status===500)
//             setFailLoginReson("אנחנו מצטערים אין קשר עם השרת")
//         else
//             setFailLoginReson(wrongDetailsMessage)     
//     }
// } 
// export async function handleSignIn({inputsRefs,setRole,setUsername,setFailSignUpReson,closeModal}){
//     const inputs={
//         age:inputsRefs.age.value.trim(),
//         email:inputsRefs.email.value.trim(),
//         password:inputsRefs.password.value,
//         username:inputsRefs.username.value.trim(),
//         passwordAgain:inputsRefs.passwordAgain.value
//     }
//     if (!handleSignUpInputsValid(inputsRefs,inputs))
//         return
    

//     try{
//         const {data}=await axios.post(process.env.REACT_APP_BASIC_URL+"sign-up",{
//             email:inputs.email,
//             password:inputs.password,
//             age:inputs.age,
//             username:inputs.username
//         }, {
//             headers: {
//               'Content-Type': 'application/json',
//             }})
//         sessionStorage.setItem("token",data.token)
//         setUsername(data.username)
//         setRole(ROLE_TYPES.user)
//         closeModal()
//     }
//     catch(err){
//         if (err.response.status===500)
//             setFailSignUpReson("אנחנו מצטערים אין קשר עם השרת")
//         else
//             setFailSignUpReson("האימייל שלך כבר קיים אצלנו אתה יכול להתחבר")
//         console.log("fff",err)
//     } 
// }


// function handleSignUpInputsValid(inputsRefs,inputs){
//     const requiredFieldMessage="*שדה חובה"
//     return handleEmailInput(inputs.email)&handleAgeInput(inputs.age)&
//         handleUsernameInput(inputs.username)&
//         handlePasswordsInputs(inputs.password,inputs.passwordAgain) 
 
//     function handleEmailInput(email){
//         if (email===""||!validator.isEmail(email)){
//             const message=email===""?requiredFieldMessage:"*יש להכניס אימייל תקין"
//             inputsRefs.email.setAttribute("placeholder",message) 
//             inputsRefs.email.value=""
//             return false
//         }
//         return true
//     }
//     function handleAgeInput(age){
//         if (!(age>=4&&age<=120)){
//             const message=age===""?requiredFieldMessage:"*רק אנשים בין גיל 4 ל120 רשאים להירשם לאתר"
//             inputsRefs.age.setAttribute("placeholder",message)
//             inputsRefs.age.value="" 
//             return false
//         }
//         return true
//     }
//     function handleUsernameInput(username){
//         if (username===""){
//             inputsRefs.username.setAttribute("placeholder",requiredFieldMessage)
//             inputsRefs.username.value=""
//             return false
//         }
//         return true
//     }
    
//     function handlePasswordsInputs(password,passwordAgain){
//         if (password===""||passwordAgain===""){
//             inputsRefs.password.setAttribute("placeholder",requiredFieldMessage)
//             inputsRefs.passwordAgain.setAttribute("placeholder",requiredFieldMessage)
//             return false
//         }
//         if (password.length>20||password.length<8||passwordAgain.length<8||passwordAgain.length>20){
//             inputsRefs.password.setAttribute("placeholder","*על הסיסמה להכיל בין 8 ל20 תווים")
//             inputsRefs.passwordAgain.setAttribute("placeholder","*על הסיסמה להכיל בין 8 ל20 תווים")
//             inputsRefs.password.value=""
//             inputsRefs.passwordAgain.value=""
//             return false
//         }
//         if (password!==passwordAgain){
//             inputsRefs.password.setAttribute("placeholder","*הסיסמאות שהזנת אינן תואמות")
//             inputsRefs.passwordAgain.setAttribute("placeholder","*הסיסמאות שהזנת אינן תואמות")
//             inputsRefs.password.value=""
//             inputsRefs.passwordAgain.value=""
//             return false
//         }
//         return true
//     }     
// }
