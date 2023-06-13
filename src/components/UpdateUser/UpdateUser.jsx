import "./UpdateUser.scss"
import { useEffect, useRef, useState } from "react"
import {  ROLE_TYPES } from "../../global-constants"
import LoadingPage from "../LoadingPage/LoadingPage"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { Role, SetRole } from "../RoleContext1"
import {  handleAuth, handleDeleteUser,handleUpdateUser } from "./UpdateUser-functions"
import { SetGenericModalParams } from "../modal-componenets/GeneiclModal/GenericModal"
function UpdateUser(props){
    const setGenericModalParams=useContext(SetGenericModalParams)
    const deleteUserInputRef=useRef(null)
    const role=useContext(Role)
    const setRole=useContext(SetRole)
    const navigate=useNavigate()
    const [isAuthSucceeded,setIsAuthSucceeded]=useState(false)
    const [inputsState,setInputsState]=useState({
        email:{
            value:"",
            placeholder:"",
        },
        password:{
            value:"",
            placeholder:"",
        },
        passwordAgain:{
            value:"",
            placeholder:"",
        },
        username:{
            value:"",
            placeholder:"",
        },
        currentPassword:{
            value:"",
            placeholder:"",
        }
    })
    const params={
        inputsState,
        setInputsState,
        role,
        setRole,
        openLoginModal:props.openLoginModal,
        navigate
    }
    useEffect(()=>{
        handleAuth(params,setIsAuthSucceeded)
    },[])
    function handleChangeInput(fieldNameInState,input){
        const inputsStateCopy={...inputsState}
        inputsStateCopy[fieldNameInState].value=input
        setInputsState(inputsStateCopy)
    }
  
    if (!isAuthSucceeded){
        return (
            <LoadingPage/>
        )
    }
    else{
        return (
            <form className="edit-account-form" onSubmit={(event)=>{
                event.preventDefault()
                handleUpdateUser({
                    ...params,
                    setUsername:props.setUsername,
                    setGenericModalParams
                })
            }}>
                <ul>
                    {role!==ROLE_TYPES.admin&&
                        <li>
                            <label>
                                <u>
                                    שינוי אימייל
                                </u>
                            </label>
                            <div className="field-change-container">
                                <label className="change-label">
                                    האימייל החדש:
                                </label>
                                <input
                                    placeholder={inputsState.email.placeholder} 
                                    value={inputsState.email.value} 
                                    onChange={event=>{
                                        handleChangeInput("email",event.target.value)
                                    }}
                                />
                            </div>
                        </li>
                    }
                    <li>
                        <label>
                            <u>
                                שינוי שם משתמש
                            </u>
                        </label>
                        <div className="field-change-container">
                            <label  className="change-label">
                                שם משתמש חדש:
                            </label>
                            <input
                                placeholder={inputsState.username.placeholder} 
                                value={inputsState.username.value} 
                                onChange={event=>{
                                    handleChangeInput("username",event.target.value)
                                }}
                            />
                        </div>
                    </li>
                    <li>
                        <label>
                            <u>
                                שינוי סיסמה
                            </u>
                        </label>
                        <div className="field-change-container">
                            <label className="change-label">
                                סיסמה החדשה:
                            </label>
                            <input type="password"
                                placeholder={inputsState.password.placeholder} 
                                value={inputsState.password.value} 
                                onChange={event=>{
                                    handleChangeInput("password",event.target.value)
                                }}     
                            />
                            <br/>
                            <label className="change-label">
                                סיסמה החדשה שוב:
                            </label>
                            <input type="password"
                                placeholder={inputsState.passwordAgain.placeholder} 
                                value={inputsState.passwordAgain.value} 
                                onChange={event=>{
                                    handleChangeInput("passwordAgain",event.target.value)
                                }}
                            />
                        </div>
                    </li>
                </ul>
                <div>
                    <label>
                        הסיסמה הנוכחית שלך:
                    </label>
                    <input type="password"
                        placeholder={inputsState.currentPassword.placeholder} 
                        value={inputsState.currentPassword.value} 
                        onChange={event=>{
                            handleChangeInput("currentPassword",event.target.value)
                        }}
                    />
                </div>
                <div className="center">
                    <button className="submit-button" type="submit" >
                        עדכן שדות   
                    </button>
                </div>
                <button type="button" className="delete-user-button" onClick={()=>{
                    setGenericModalParams({
                        content:
                            <form className="delete-user-form">
                                <h2>היזהר! זאת פעולה בלתי הפיכה</h2>
                                <div>
                                    <label>
                                        הסיסמה שלך:  
                                    </label>
                                    <input type="password" ref={deleteUserInputRef}/>
                                </div>
                            </form>,
                        confirmButtonContent:"מחק משתמש",
                        cancelButtonNeeded:true,
                        confirmFunc:({closeGenericModal})=>{
                            handleDeleteUser({
                                inputRef:deleteUserInputRef,
                                closeGenericModal,
                                navigate,
                                role,
                                setRole,
                                openLoginModal:props.openLoginModal,
                                setGenericModalParams
                            })
                        }
                    })
                }}>
                    מחיקת משתמש
                </button>
            </form>
        )
    }
}
export default UpdateUser