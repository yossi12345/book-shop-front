import {useState } from "react"
import "./LoginModal.scss"
import ModalContainer from "../ModalContainer/ModalContainer"
import { handleLogin, handleSignUp } from "./login-modal-functions"
import CloseModalBtn from "../CloseModalBtn/CloseModalBtn"
import { SetRole } from "../../RoleContext1";
import { useContext } from "react"
import { useEffect } from "react"
function LoginModal({loginModalParams,setLoginModalParams,setUsername}){

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
                label:"שם משתמש:",
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
    const [failReason,setFailReason]=useState("")
    const setRole=useContext(SetRole)
    useEffect(()=>{
        setFailReason("")
    },[loginModalParams])
    function closeModal(){
        setLoginModalParams({
            ...loginModalParams,
            shouldOpen:false,
        })
    }
    return (
        <ModalContainer>
            <div className="login-modal">
                <CloseModalBtn closeModal={closeModal}/>
                <div className="fail-reason-container">
                    <h2>{failReason}</h2>
                </div>
                <form className={"login-form"+(loginModalParams.isSignIn?" real-height":"")}>
                    <h3>התחברות</h3>
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
                                setFailReason,
                                closeModal
                            })
                        }}>
                            התחברות
                    </button>
                    <button type="button" className="toggle-modal-btn" onClick={()=>{
                        setLoginModalParams({
                            ...loginModalParams,
                            isSignIn:false
                        })
                    }}>
                        הירשם
                    </button>
                </form>
                <form className={"sign-up-form"+(!loginModalParams.isSignIn?" real-height":"")}>
                    <h3>הרשמה</h3>
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
                                setFailReason,
                                closeModal
                            })
                        }}>
                            הרשמה
                    </button>
                    <button type="button" className="toggle-modal-btn" onClick={()=>{
                        setLoginModalParams({
                            ...loginModalParams,
                            isSignIn:true
                        })
                    }}>
                        התחבר
                    </button>
                </form>
            </div>
       </ModalContainer>
    )
}
export default LoginModal