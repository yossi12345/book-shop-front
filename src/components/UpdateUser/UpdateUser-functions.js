import axios from "axios"
import { ADMIN_PASSWORD_REGEX, ROLE_TYPES } from "../../global-constants"
import validator from "validator"
import jwtDecode from 'jwt-decode';
export async function handleDeleteUser(params){
    function handleWrongPassword(){
      params.inputRef.current.value=""
      params.inputRef.current.placeholder="*סיסמה שגויה"
    }
    const token=sessionStorage.getItem("token")
    const password=params.inputRef.current.value
    const isAdmin=params.role===ROLE_TYPES.admin
    if ((isAdmin&&!ADMIN_PASSWORD_REGEX.test(password))||
        (!isAdmin&&(password.length>20||password.length<8))
    ){
       handleWrongPassword()
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
        params.setRole(ROLE_TYPES.guest)
        params.navigate("/",{replace:true})
        sessionStorage.removeItem("token")
        params.closeGenericModal()
        params.setGenericModalParams({content:"חשבונך נמחק בהצלחה"})
    }catch(err){
        console.log(err)
        if (err?.response.status===404){
            handleWrongPassword()
            return
        }
        if (err?.response.status===500){
            params.setGenericModalParams({content:"אנחנו מצטערים לא הצלחנו להתחבר לשרת"})
            return 
        }
        if (isAdmin)
            params.navigate("/admin",{replace:true})
        else{
            params.navigate("/",{replace:true})
            params.openLoginModal(true)
        }
        sessionStorage.removeItem("token")
        params.closeGenericModal()
        params.setRole(ROLE_TYPES.guest)
        params.setGenericModalParams({content:"התנתקת לנו אתה מוזמן להתחבר שוב"})
    }
}
// export async function handleUpdatePassword(params){
//     const newPassword=params.inputsState.password.value
//     const passwordAgain=params.inputsState.passwordAgain.value
//     let isAllInputValid=true
//     const currentPassword=params.inputsState.currentPassword.value
//     if (newPassword===""||passwordAgain===""){
//         isAllInputValid=false
//         if (newPassword==="")
//             changeInputTextOrPassword(params,"password","","יש להכניס סיסמה חדשה")
//         if (passwordAgain==="")
//             changeInputTextOrPassword(params,"passwordAgain","","יש להכניס סיסמה חדשה שוב")
//     }
//     else if (newPassword!==passwordAgain){
//         isAllInputValid=false
//         const placeholder="יש להכניס סיסמאות תואמות"
//         changeInputTextOrPassword(params,"password","",placeholder)
//         changeInputTextOrPassword(params,"passwordAgain","",placeholder)
//     }
//     else if (params.role===ROLE_TYPES.admin&&!ADMIN_PASSWORD_REGEX.test(newPassword)){
//         isAllInputValid=false
//         const placeholder="על הסיסמה לכלול אות קטנה,אות גדולה וסימן מיוחד"
//         changeInputTextOrPassword(params,"password","",placeholder)
//         changeInputTextOrPassword(params,"passwordAgain","",placeholder)
//     }
//     else if (newPassword.length<8||newPassword.length>20||passwordAgain.length>20||passwordAgain.length<8){
//         isAllInputValid=false
//         const placeholder="על הסיסמה להיות בין 8 ל20 תווים"
//         changeInputTextOrPassword(params,"password","",placeholder)
//         changeInputTextOrPassword(params,"passwordAgain","",placeholder)
//     }
//     if (
//         (params.role!==ROLE_TYPES.admin&&(currentPassword.length<8||currentPassword.length>20))||
//         (params.role===ROLE_TYPES.admin&&!ADMIN_PASSWORD_REGEX.test(currentPassword))
//     ){
//         changeInputTextOrPassword(params,"currentPassword","","*סיסמה שגויה")
//         isAllInputValid=false
//     }
//     if (!isAllInputValid)
//         return
//     const token=sessionStorage.getItem("token")
//     try{
//         if (!token)
//             throw new Error()
//         const url=process.env.REACT_APP_BASIC_URL+(params.role===ROLE_TYPES.admin?"update-admin-account":"update-account")
//         const {data:user}=await axios.patch(url,{
//             update:["password",newPassword],
//             password:currentPassword
//         },{
//             headers:{
//                 "Content-Type":"application/json",
//                 "Authorization":"Bearer "+token
//             }
//         })
//         console.log(user)
    
//         changeInputTextOrPassword(params,"password")
//         changeInputTextOrPassword(params,"passwordAgain")
//         alert("הסיסמה שלך עודכנה בהצלחה ")
//     } catch(err){
//         handleErrors(params,err,()=>{})
//     }
// }
export async function handleUpdateUser(params){
    const isAdmin=params.role===ROLE_TYPES.admin
    const newInputsState={...params.inputsState}
    const email=params.inputsState.email.value.trim()
    const username=params.inputsState.username.value.trim()
    const password=params.inputsState.password.value
    const passwordAgain=params.inputsState.passwordAgain.value
    const currentPassword=params.inputsState.currentPassword.value
    let isAllUpdatesValid=true
    const updates={}
    if (email!==""&&!validator.isEmail(email))
        handleInvalidInput("email","*המייל שהכנסת לא תקין")
    else if (email!=="")
        updates.email=email
    if (username.length>12)
        handleInvalidInput("username","שם משתמש יכול להכיל עד 12 תווים")
    else if (username!=="")
        updates.username=username
    if (password!==""||passwordAgain!==""){
        if (password!==passwordAgain)
            handleInvalidInput("passwordAgain","על הסיסמאות להיות תואמות")
        else if (isAdmin&&!ADMIN_PASSWORD_REGEX.test(password)){
            const placeholder="על הסיסמה לכלול אות קטנה,אות גדולה וסימן מיוחד"
            handleInvalidInput("password",placeholder)
            handleInvalidInput("passwordAgain",placeholder)
        }
        else if (!isAdmin&&(password.length>20||password.length<8)){
            const placeholder="על הסיסמה להיות בין 8 ל20 תווים"
            handleInvalidInput("password",placeholder)
            handleInvalidInput("passwordAgain",placeholder)
        }
    }
    if (currentPassword==="")
        handleInvalidInput("currentPassword","*שדה חובה")
    else if  (   (!isAdmin&&(currentPassword.length>20||currentPassword<8))||  
            (isAdmin&&!ADMIN_PASSWORD_REGEX.test(currentPassword)) 
        )
        handleInvalidInput("currentPassword","*סיסמה שגויה")
    if (!isAllUpdatesValid){
        params.setInputsState(newInputsState)
        return
    }
    if (!updates.username&&!updates.email&&!updates.password){
        params.setGenericModalParams({content:"שכחת להזין שדות לעדכון"})
        return
    }
    const token=sessionStorage.getItem("token")
    try{
        if (!token)
            throw new Error()
        const url=process.env.REACT_APP_BASIC_URL+(isAdmin?"update-admin-account":"update-account")
        const {data:user}=await axios.patch(url,{
            updates,
            password:currentPassword
        },{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
            }
        })
        console.log(user)
        params.setGenericModalParams({content:"המשתמש שלך עודכן בהצלחה"})
        if (updates.username)
            params.setUsername(updates.username)
        params.navigate(-1)
    } catch(err){
        console.log(err)
        const status=err?.response?.status
        switch(status){
            case 404:
                handleInvalidInput("currentPassword","*הסיסמא שגויה")
                params.setInputsState(newInputsState)
                break
            case 500:
                params.setGenericModalParams({content:"אנחנו מצטערים לא הצלחנו להתחבר לשרת"})
                break
            case 401:
                const content=isAdmin?"שם המשתמש שהזנת כבר קיים במאגר":"האימייל שהזנת כבר קיים אצלנו בחר אימייל אחר"
                params.setGenericModalParams({content})
                break
            case 400:
                params.navigate((isAdmin?"/admin":"/"),{replace:true})
                params.setGenericModalParams({content:"התנתקת לנו אתה מוזמן להחבר שוב"})
                params.setRole(ROLE_TYPES.guest)
                sessionStorage.removeItem("token")
                break
        }
    }
    function handleInvalidInput(fieldNameInState,newPlaceholder=""){
        newInputsState[fieldNameInState].value=""
        newInputsState[fieldNameInState].placeholder=newPlaceholder
        isAllUpdatesValid=false
    }
}
// export function changeInputTextOrPassword(params,fieldNameInState,newValue="",newPlaceholder=""){
//     const newInputsState={...params.inputsState}
//     newInputsState[fieldNameInState].value=newValue
//     newInputsState[fieldNameInState].placeholder=newPlaceholder
//     params.setInputsState(newInputsState)
// }
// export async function handleUpdateUsername(params,setUsername){
//     const newUsername=params.inputsState.username.value.trim()
//     let isAllInputValid=true
//     const currentPassword=params.inputsState.currentPassword.value
//     if (newUsername===""){
//         changeInputTextOrPassword(params,"username","","יש להכניס שם משתמש חדש")
//         isAllInputValid=false
//     }
//     if (
//         (params.role!==ROLE_TYPES.admin&&(currentPassword.length<8||currentPassword.length>20))||
//         (params.role===ROLE_TYPES.admin&&!ADMIN_PASSWORD_REGEX.test(currentPassword))
//     ){
//         changeInputTextOrPassword(params,"currentPassword","","*סיסמה שגויה")
//         isAllInputValid=false
//     }
//     if (!isAllInputValid)
//         return
//     const token=sessionStorage.getItem("token")
//     try{
//         if (!token)
//             throw new Error()
//         const url=process.env.REACT_APP_BASIC_URL+(params.role===ROLE_TYPES.admin?"update-admin-account":"update-account")
//         const {data:user}=await axios.patch(url,{
//             update:["username",newUsername],
//             password:currentPassword
//         },{
//             headers:{
//                 "Content-Type":"application/json",
//                 "Authorization":"Bearer "+token
//             }
//         })
//         console.log(user)
//         setUsername(user.username)
//         changeInputTextOrPassword(params,"username")
//         alert("שם המשתמש שלך עודכן בהצלחה ל-"+user.username)
//     } catch(err){
//         handleErrors(params,err,()=>{
//             if (params.role===ROLE_TYPES.admin)
//                 changeInputTextOrPassword("username","","*שם המשתמש הזה כבר קיים במאגר")
//         })
//     }
// }
export async function handleAuth(params,setIsAuthSucceeded){
    const token=sessionStorage.getItem("token")
    if (!token){
        params.navigate("/llllllllllll",{replace:true})
        return
    }
    const {role:roleFromToken}=jwtDecode(token)
    const url=process.env.REACT_APP_BASIC_URL+(roleFromToken===ROLE_TYPES.user?"user":"admin")+"-verify-token"
    console.log("LKJ",params,url)
    try{
        const {data}=await axios.get(url,{
            headers: {
                "Authorization":"Bearer "+token,
                'Content-Type': 'application/json'
            }}
        )
        if (!data.isValidToken)
            throw new Error()
        setIsAuthSucceeded(true)
    }catch(err){
        console.log(err)
        sessionStorage.removeItem("token")
        alert("התנקת לנו אתה מוזמן להתחבר שוב")
        if (params.role===ROLE_TYPES.admin)
            params.navigate("/admin",{replace:true})
        else{
            params.navigate("/",{replace:true})
            params.openLoginModal(true)
        }
        params.setRole(ROLE_TYPES.guest)
        console.log("lkjujh")

    }
}
// export async function handleUpdateEmail(params){
//     const newEmail=params.inputsState.email.value.trim()
//     let isAllInputValid=true
//     const currentPassword=params.inputsState.currentPassword.value
//     if (newEmail===""){
//         changeInputTextOrPassword(params,"email","","יש להכניס שם אימייל חדש")
//         isAllInputValid=false
//     }
//     else if (!validator.isEmail(newEmail)){
//         changeInputTextOrPassword(params,"email","","המייל שהכנסת לא תקין")
//         isAllInputValid=false
//     }
//     if (currentPassword.length<8||currentPassword.length>20){
//         changeInputTextOrPassword(params,"currentPassword","","*סיסמה שגויה")
//         isAllInputValid=false
//     }
//     if (!isAllInputValid)
//         return
//     const token=sessionStorage.getItem("token")
//     try{
//         if (!token)
//             throw new Error()
//         const {data:user}=await axios.patch(process.env.REACT_APP_BASIC_URL+"update-account",{
//             update:["email",newEmail],
//             password:currentPassword
//         },{
//             headers:{
//                 "Content-Type":"application/json",
//                 "Authorization":"Bearer "+token
//             }
//         })
//         console.log(user)
//         changeInputTextOrPassword(params,"email")
//         alert("האימייל שלך עודכן בהצלחה ל-"+user.email)
//     } catch(err){
//         handleErrors(params,err,()=>{
//             changeInputTextOrPassword(params,"email","","*האימייל הזה כבר קיים במאגר")
//         })
//     }
// }
// function handleErrors(params,err,funcForErr401){
//     console.log(err)
//     if (err?.response?.status===404){
//         changeInputTextOrPassword(params,"currentPassword","","*הסיסמא שגויה")
//         return
//     }
//     if (err?.response?.status===500){
//         alert("אנחנו מצטערים לא הצלחנו להתחבר לשרת")
//         return 
//     }
//     if (err?.response?.status===401){
//         funcForErr401()
//         return
//     }
//     if (err?.response?.status===400){
//         if (params.role===ROLE_TYPES.admin)
//             params.navigate("/admin",{replace:true})
//         else{
//             params.navigate("/")
//             params.openLoginModal(true)
//         }
//         params.setRole(ROLE_TYPES.guest)
//         alert("התנתקת לנו אתה מוזמן להתחבר שוב")
//     }
// }