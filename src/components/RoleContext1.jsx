import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from 'jwt-decode';
import { ROLE_TYPES,GUEST_NAME } from "../global-constants";
import { SetGenericModalParams } from "./modal-componenets/GeneiclModal/GenericModal";
export const Role=createContext()
export const SetRole=createContext()
function RoleContext1({children,openLoginModal,setUsername}){
    const [role1,setRole1]=useState(ROLE_TYPES.guest)
    const setGenericModalParams=useContext(SetGenericModalParams)
    useEffect(()=>{
        handleSetRole()
        const checkTokenValidityInterval=setInterval(handleSetRole,1800000)
        return ()=>{
            clearInterval(checkTokenValidityInterval)
        }
    },[])
    console.log(role1)
    useEffect(()=>{
        if (role1===ROLE_TYPES.guest)
            setUsername(GUEST_NAME)
        
    },[role1])
    async function handleSetRole(){
       const token=sessionStorage.getItem("token")
        if (!token){
            setRole1(ROLE_TYPES.guest)
            return
        } 
        const {role: newRole}=jwtDecode(token)
        try{
            if (!newRole)
                throw new Error()
            const {data:{username,isValidToken}}=await axios.get(process.env.REACT_APP_BASIC_URL+newRole+"-verify-token"
            ,{
                headers: {
                    "Authorization":"Bearer "+token,
                    'Content-Type': 'application/json'
                }})
            console.log("tgrt",newRole)
            if (!isValidToken)
                throw new Error()
            setRole1(newRole)   
            setUsername(username)
        }catch(err){
            console.log(err)
            sessionStorage.removeItem("token")
            openLoginModal(true)
            setGenericModalParams({content:"התנקת לנו אתה מוזמן להתחבר שוב"})
            setRole1(ROLE_TYPES.guest)
        }
    } 
    return (
        <Role.Provider value={role1}>
            <SetRole.Provider value={setRole1}>
                {children}
            </SetRole.Provider>
        </Role.Provider>
    )
}
export default RoleContext1