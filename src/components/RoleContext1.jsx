import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from 'jwt-decode';
import { ROLE_TYPES,GUEST_NAME } from "../global-constants";
export const Role=createContext()
export const SetRole=createContext()
function RoleContext1({children,setLoginModalShouldOpen,setUsername}){
   const [role1,setRole1]=useState(ROLE_TYPES.guest)
    useEffect(()=>{
        handleSetRole()
        const checkTokenValidityInterval=setInterval(handleSetRole,1800000)
        return ()=>{
            clearInterval(checkTokenValidityInterval)
        }
   },[])
   useEffect(()=>{
        if (role1===ROLE_TYPES.guest)
            setUsername(GUEST_NAME)
   },[role1])
   async function handleSetRole(){
       const token=sessionStorage.getItem("token")
        if (!token){
            setRole1(ROLE_TYPES.guest)
            //setUsername(GUEST_NAME)
            return
        } 
        const {role: newRole}=jwtDecode(token)
        try{
            if (!newRole)
                throw new Error()
            const {data}=await axios.get(process.env.REACT_APP_BASIC_URL+newRole+"-verify-token"
            ,{
                headers: {
                    "Authorization":"Bearer "+token,
                    'Content-Type': 'application/json'
                }})
            console.log("tgrt",data,newRole)
            if (!data.isValidToken)
                throw new Error()
            setRole1(newRole)   
            setUsername(data.username)
        }catch(err){
            console.log(err)
            sessionStorage.removeItem("token")
            setLoginModalShouldOpen(true)
            alert("התנקת לנו אתה מוזמן להתחבר שוב")
            //setUsername(GUEST_NAME)
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