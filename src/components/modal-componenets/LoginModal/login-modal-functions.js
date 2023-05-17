import axios from "axios";
import validator from "validator"
export async function handleLogin(inputsRefs,setFailLoginReson){
    const wrongDetailsMessage="האימייל או הסיסמא שגויים"
    const email=inputsRefs.email.value.trim()
    const password=inputsRefs.password.value
    if (!validator.isEmail(email)||password.length<8||password.length>20){
        setFailLoginReson(wrongDetailsMessage)
        return
    }
    try{
        const {data:token}=await axios.post("http://localhost:5000/login",{
            email,
            password
        }, {
            headers: {
              'Authorization': 'Bearer your_token',
              'Content-Type': 'application/json',
            }})
        localStorage.setItem("token",token)
        console.log(token)
        //window.location.reload()
    }
    catch(err){
        if (err.response.status===500)
            setFailLoginReson("אנחנו מצטערים אין קשר עם השרת")
        else
            setFailLoginReson(wrongDetailsMessage)     
    }
} 
export async function handleSignIn(inputsRefs,setFailSignUpReson){
    const inputs={
        age:inputsRefs.age.value.trim(),
        email:inputsRefs.email.value.trim(),
        password:inputsRefs.password.value,
        username:inputsRefs.username.value.trim(),
        passwordAgain:inputsRefs.passwordAgain.value
    }
    if (!handleSignUpInputsValid(inputsRefs,inputs))
        return
    

    try{
        const token=await axios.post("http://localhost:5000/sign-up",{
            email:inputs.email,
            password:inputs.password,
            age:inputs.age,
            username:inputs.username
        }, {
            headers: {
              'Authorization': 'Bearer your_token',
              'Content-Type': 'application/json',
            }})
        localStorage.setItem("token",token)
        window.location.reload()
    }
    catch(err){
        if (err.response.status===500)
            setFailSignUpReson("אנחנו מצטערים אין קשר עם השרת")
        else
            setFailSignUpReson("האימייל שלך כבר קיים אצלנו אתה יכול להתחבר")
        console.log("fff",err)
    } 
}


function handleSignUpInputsValid(inputsRefs,inputs){
    const requiredFieldMessage="*שדה חובה"
    return handleEmailInput(inputs.email)&handleAgeInput(inputs.age)&
        handleUsernameInput(inputs.username)&
        handlePasswordsInputs(inputs.password,inputs.passwordAgain) 
 
    function handleEmailInput(email){
        if (email===""||!validator.isEmail(email)){
            const message=email===""?requiredFieldMessage:"*יש להכניס אימייל תקין"
            inputsRefs.email.setAttribute("placeholder",message) 
            inputsRefs.email.value=""
            return false
        }
        return true
    }
    function handleAgeInput(age){
        if (!(age>=4&&age<=120)){
            const message=age===""?requiredFieldMessage:"*רק אנשים בין גיל 4 ל120 רשאים להירשם לאתר"
            inputsRefs.age.setAttribute("placeholder",message)
            inputsRefs.age.value="" 
            return false
        }
        return true
    }
    function handleUsernameInput(username){
        if (username===""){
            inputsRefs.username.setAttribute("placeholder",requiredFieldMessage)
            inputsRefs.username.value=""
            return false
        }
        return true
    }
    
    function handlePasswordsInputs(password,passwordAgain){
        if (password===""||passwordAgain===""){
            inputsRefs.password.setAttribute("placeholder",requiredFieldMessage)
            inputsRefs.passwordAgain.setAttribute("placeholder",requiredFieldMessage)
            return false
        }
        if (password.length>20||password.length<8||passwordAgain.length<8||passwordAgain.length>20){
            inputsRefs.password.setAttribute("placeholder","*על הסיסמה להכיל בין 8 ל20 תווים")
            inputsRefs.passwordAgain.setAttribute("placeholder","*על הסיסמה להכיל בין 8 ל20 תווים")
            inputsRefs.password.value=""
            inputsRefs.passwordAgain.value=""
            return false
        }
        if (password!==passwordAgain){
            inputsRefs.password.setAttribute("placeholder","*הסיסמאות שהזנת אינן תואמות")
            inputsRefs.passwordAgain.setAttribute("placeholder","*הסיסמאות שהזנת אינן תואמות")
            inputsRefs.password.value=""
            inputsRefs.passwordAgain.value=""
            return false
        }
        return true
    }     
}
