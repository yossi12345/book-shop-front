import "./UpdateUser.scss"
import { useEffect, useState } from "react"
import { ROLE_TYPES } from "../../global-constants"
import LoadingPage from "../LoadingPage/LoadingPage"
import axios from "axios"
function UpdateUser(props){
    const translations={
        password:"סיסמה",
        username:"שם משתמש",
        email:"אימייל"
    }
    const [inputsState,setInputsState]=useState({
        field:{
            value:"",
            placeholder:""
        },
        password:{
            value:"",
            placeholder:""
        }
    })
    useEffect(()=>{
        handleAuth()
    },[])
    async function updateAccount(){
        const field=inputsState.field.value.trim()
    }
    const [userId,setUserId]=useState("")
    async function handleAuth({navigate,role,setRole}){
        const token=sessionStorage.getItem("token")
        if (!token||role===ROLE_TYPES.guest||(role===ROLE_TYPES.admin&&props.fieldToChange==="email")){
            navigate("/llllllllllll",{replace:true})
            return
        }
        try{
            const {data}=await axios.get(process.env.REACT_APP_BASIC_URL+(role===ROLE_TYPES.user?"user":"admin")+"-verify-token",{
                headers: {
                    "Authorization":"Bearer "+token,
                    'Content-Type': 'application/json'
                }}
            )
            if (!data.isValidToken)
                throw new Error()
            setUserId(data.userId)
        }catch(err){
            console.log(err)
            sessionStorage.removeItem("token")
            alert("התנקת לנו אתה מוזמן להתחבר שוב")
            setRole(ROLE_TYPES.guest)
            if (role===ROLE_TYPES.admin)
                navigate("/admin",{replace:true})
            else{
                navigate("/",{replace:true})
                props.setLoginModalShouldOpen(true)
            }

        }
    }
    if (!userId){
        return (
            <LoadingPage/>
        )
    }
    else{
        return (
            <form onSubmit={updateAccount}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <labal>
                                    {translations[props.fieldToChange]+" "+(props.fieldToChange==="password"?"חדשה":"חדש")+":"}
                                </labal>
                            </td>
                            <td>
                                <input type={props.fieldToChange==="password"?"password":"text"} 
                                    value={inputsState.field.value} 
                                    placeholder={inputsState.field.placeholder}
                                    onChange={(event)=>{
                                        const inputsStateCopy={...inputsState}
                                        inputsStateCopy.field.value=event.target.value
                                        setInputsState(inputsStateCopy)
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>
                                    סיסמה הנוכחית שלך:
                                </label>
                            </td>
                            <td>
                                <input type="password"
                                    value={inputsState.password.value} 
                                    placeholder={inputsState.password.placeholder}
                                    onChange={(event)=>{
                                        const inputsStateCopy={...inputsState}
                                        inputsStateCopy.password.value=event.target.value
                                        setInputsState(inputsStateCopy)
                                    }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="submit-button">
                    עדכן שדה
                </button>
            </form>
        )
    }
}
export default UpdateUser