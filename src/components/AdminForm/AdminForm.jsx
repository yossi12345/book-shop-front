import { useRef } from "react"
import "./AdminForm.scss"
function AdminForm(){
    const inputsRefs=useRef([])
    function handleLogin(event){
        event.preventDefault()
        const username=inputsRefs.current[0].value.trim()
        if (username===""){
            inputsRefs.current[0].value=""
            inputsRefs.current[0].setAttribute("placeholder","*שדה חובה")
        }
        const password=inputsRefs.current[1].value.trim()
        if (password===""){
            inputsRefs.current[1].value=""
            inputsRefs.current[1].setAttribute("placeholder","*שדה חובה")
        }
    }
    return (
        <div className="admin-form-container">
            <form>
                <div>
                    <label>שם משתמש:</label>
                    <input ref={el=>inputsRefs.current[0]=el}/>
                </div>
                <div>
                    <label>סיסמה:</label>
                    <input ref={el=>inputsRefs.current[1]=el}/>
                </div>
                <button onClick={handleLogin}>התחבר</button>
            </form>
        </div>
    )
}
export default AdminForm