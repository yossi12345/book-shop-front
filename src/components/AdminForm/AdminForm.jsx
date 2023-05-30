import { useContext, useRef,useState } from "react"
import "./AdminForm.scss"
import { useNavigate } from "react-router-dom";
import { SetRole } from "../RoleContext1";
import { handleLogin } from "./AdminForm-functions";

function AdminForm({setUsername}){
    const navigate=useNavigate()
    const inputsRefs=useRef([])
    const setRole=useContext(SetRole)
    const [loginFailMessage,setLoginFailMessage]=useState(null)
   
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
                <button onClick={(event)=>{
                    event.preventDefault()
                    handleLogin({
                        inputsRefs,
                        setUsername,
                        navigate,
                        setRole,
                        setLoginFailMessage
                    })
                }}>התחבר</button>
            </form>
        </div>
    )
}
export default AdminForm