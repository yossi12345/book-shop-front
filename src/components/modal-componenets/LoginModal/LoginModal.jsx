import {useState, useRef } from "react"
import "./LoginModal.scss"
import ModalInput from "../ModalInput/ModalInput"
import ModalContainer from "../ModalContainer/ModalContainer"
import { handleLogin,handleSignIn } from "./login-modal-functions"
import CloseModalBtn from "../CloseModalBtn/CloseModalBtn"

function LoginModal({setLoginModalShouldOpen}){
    const loginEmailRef=useRef(null)
    const loginpasswordRef=useRef(null)
    const signUpEmailRef=useRef(null)
    const signUpUsernameRef=useRef(null)
    const signUpAgeRef=useRef(null)
    const signUpPasswordRef=useRef(null)
    const signUpPasswordAgainRef=useRef(null)
    const [failLoginReason,setFailLoginReason]=useState(null)
    const [failSignUpReason,setFailSignUpReason]=useState(null)
    return (
        <ModalContainer>
            <div className="login-modal">
                <CloseModalBtn closeModal={()=>{
                    setLoginModalShouldOpen(false)
                }}/>
                <h2 className="fail-reason-login">{failLoginReason}</h2>
                <form>
                    <ModalInput label="אימייל:" inputRef={loginEmailRef}/>
                    <ModalInput label="סיסמא:" isPassword={true} inputRef={loginpasswordRef}/>
                    <button className="submit-button"
                        onClick={(event)=>{
                            event.preventDefault()
                            handleLogin({
                                email:loginEmailRef.current,
                                password:loginpasswordRef.current
                            },setFailLoginReason)
                        }}
                    >
                            התחברות
                    </button>
                </form>
                <h2 className="fail-reason-sign-up">{failSignUpReason}</h2>
                <form>
                    <ModalInput label="אימייל:" inputRef={signUpEmailRef}/>
                    <ModalInput label="שם מלא:" inputRef={signUpUsernameRef}/>
                    <ModalInput label="גיל:" inputRef={signUpAgeRef}/>
                    <ModalInput label="סיסמא:" isPassword={true} inputRef={signUpPasswordRef}/>
                    <ModalInput label="סיסמא שוב:"  isPassword={true} inputRef={signUpPasswordAgainRef}/>
                    <button className="submit-button" 
                        onClick={(event)=>{
                            event.preventDefault()
                            handleSignIn({
                                age:signUpAgeRef.current,
                                username:signUpUsernameRef.current,
                                password:signUpPasswordRef.current,
                                passwordAgain:signUpPasswordAgainRef.current,
                                email:signUpEmailRef.current
                            },setFailSignUpReason)
                        }}
                    >
                            הרשמה
                    </button>
                </form>
            </div>
       </ModalContainer>
    )
}
export default LoginModal