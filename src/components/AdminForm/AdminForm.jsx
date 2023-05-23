import { useContext, useRef,useState } from "react"
import "./AdminForm.scss"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SetRole } from "../RoleContext1";
function AdminForm(){
    const navigate=useNavigate()
    const inputsRefs=useRef([])
    const setRole=useContext(SetRole)
    const [loginFailMessage,setLoginFailMessage]=useState(null)
    async function handleLogin(event){
        event.preventDefault()
        const wrongDetailsMessage="שם המשתמש או הסיסמה שגויים"
        const regex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,}$/
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
        if (!regex.test(password)){
            setLoginFailMessage(wrongDetailsMessage)
            return
        }
        try{
            const {data:token}=await axios.post("http://localhost:5000/admin-login"
            ,{
                username,
                password
            }, {
                headers: {
                  'Content-Type': 'application/json',
                }})
            sessionStorage.setItem("token",token)
            setRole("admin")
            navigate("/",{replace:true})
            console.log(token)

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
    return (
        <div className="admin-form-container">
            <div className="login-fail-message-container">
                <h1>{loginFailMessage}</h1>
            </div>
            <form>
                <div>
                    <label>שם משתמש:</label>
                    <input ref={el=>inputsRefs.current[0]=el}/>
                </div>
                <div>
                    <label>סיסמה:</label>
                    <input type="password" ref={el=>inputsRefs.current[1]=el}/>
                </div>
                <button onClick={handleLogin}>התחבר</button>
            </form>
        </div>
    )
}
export default AdminForm