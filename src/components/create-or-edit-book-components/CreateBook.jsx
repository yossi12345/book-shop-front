// import { useEffect } from "react"

// import { useNavigate  } from "react-router-dom"
// import { useContext } from "react"
// import { Role, SetRole } from "../RoleContext1"
// import { handleAuth } from "./CreateOrEditBook-functions"
import { useContext, useEffect, useState } from "react"
import { Role, SetRole } from "../RoleContext1"
import { handleAuth } from "./CreateOrEditBook-functions"
import CreateOrEditBookForm from "./CreateOrEditBookForm"
import { useNavigate } from "react-router-dom"
import LoadingPage from "../LoadingPage/LoadingPage"
import { SetGenericModalParams } from "../modal-componenets/GeneiclModal/GenericModal"
function CreateBook({setUsername}){
    const navigate=useNavigate()
    const role=useContext(Role)
    const setRole=useContext(SetRole)
    const setGenericModalParams=useContext(SetGenericModalParams)
    const [isAuthSucceded,setIsAuthSucceded]=useState(false)
    useEffect(()=>{
        handleAuth({
            navigate,
            role,
            setRole,
            setIsAuthSucceded,
            setUsername,
            setGenericModalParams
        })
    },[role])
    if (!isAuthSucceded)
        return (
            <LoadingPage/>
        )
    else 
        return (
            <CreateOrEditBookForm isEdit={false}/>
        )    
}
export default CreateBook