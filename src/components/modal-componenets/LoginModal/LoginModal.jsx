import {useState, useRef } from "react"
import "./LoginModal.scss"
import ModalInput from "../ModalInput/ModalInput"
import ModalContainer from "../ModalContainer/ModalContainer"
import { handleLogin, handleSignUp } from "./login-modal-functions"
import CloseModalBtn from "../CloseModalBtn/CloseModalBtn"
import { SetRole } from "../../RoleContext1";
import { useContext } from "react"
function LoginModal({setLoginModalShouldOpen,setUsername}){

    const [inputsObj,setInputsObj]=useState({
        login:{
            email:{
                key:Math.random(),
                label:"אימייל:",
                value:"",
                type:"text"
            },
            password:{
                key:Math.random(),
                label:"סיסמה:",
                value:"",
                type:"password"
            }
        },
        signUp:{
            email:{
                key:Math.random(),
                label:"אימייל:",
                value:"",
                placeholder:"",
                type:"text"
            },
            username:{
                key:Math.random(),
                label:"שם מלא:",
                value:"",
                placeholder:"",
                type:"text"
            },
            age:{
                key:Math.random(),
                label:"גיל:",
                value:"",
                placeholder:"",
                type:"text"
            },
            password:{
                key:Math.random(),
                label:"סיסמה:",
                value:"",
                placeholder:"",
                type:"password"
            },
            passwordAgain:{
                key:Math.random(),
                label:"סיסמה שוב:",
                value:"",
                placeholder:"",
                type:"password"
                
            }
        }
    })
    const [failLoginReason,setFailLoginReason]=useState(null)
    const [failSignUpReason,setFailSignUpReason]=useState(null)
    const setRole=useContext(SetRole)
    return (
        <ModalContainer>
            <div className="login-modal">
                <CloseModalBtn closeModal={()=>{
                    setLoginModalShouldOpen(false)
                }}/>
                <div className="fail-reason-login-container">
                    <h2>{failLoginReason}</h2>
                </div>
                <form className="login-form">
                    {Object.keys(inputsObj.login).map((field)=>(
                         <div className="modal-input2" key={inputsObj.login[field].key}>
                            <label>
                                {inputsObj.login[field].label}
                            </label>
                            <input type={inputsObj.login[field].type} 
                                value={inputsObj.login[field].value} 
                                onChange={(event)=>{
                                    const inputsObjCopy={...inputsObj} 
                                    inputsObjCopy.login[field].value=event.target.value
                                    setInputsObj(inputsObjCopy)
                        
                                }}
                            />
                        </div>
                    ))}
                    <button className="submit-button"
                        onClick={(event)=>{
                            event.preventDefault()
                            handleLogin({
                                inputsObj,
                                setRole,
                                setUsername,
                                setFailLoginReason,
                                closeModal:()=>{setLoginModalShouldOpen(false)}
                            })
                        }}>
                            התחברות
                    </button>
                </form>
                <div className="horizontal-line"></div>
                <div className="fail-reason-sign-up-container">
                    <h2>{failSignUpReason}</h2>
                </div>
                <form className="sign-up-form">
                    {Object.keys(inputsObj.signUp).map((field)=>(
                         <div className="modal-input2" key={inputsObj.signUp[field].key}>
                            <label>
                                {inputsObj.signUp[field].label}
                            </label>
                            <input type={inputsObj.signUp[field].type} 
                                value={inputsObj.signUp[field].value} 
                                placeholder={inputsObj.signUp[field].placeholder} 
                                onChange={(event)=>{
                                    const inputsObjCopy={...inputsObj} 
                                    inputsObjCopy.signUp[field].value=event.target.value
                                    setInputsObj(inputsObjCopy)
                                }}
                            />
                        </div>
                    ))}
                    <button className="submit-button" 
                        onClick={(event)=>{
                            event.preventDefault()
                            handleSignUp({
                                inputsObj,
                                setInputsObj,
                                setRole,
                                setUsername,
                                setFailSignUpReason,
                                closeModal:()=>{setLoginModalShouldOpen(false)}
                            })
                        }}>
                            הרשמה
                    </button>
                </form>
            </div>
       </ModalContainer>
    )
}
export default LoginModal