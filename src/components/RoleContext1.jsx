import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from 'jwt-decode';
export const Role=createContext()
export const SetRole=createContext()
function RoleContext1({children,setLoginModalShouldOpen}){
   const [role1,setRole1]=useState("guest")
   async function setNewRole(){
       const newRole=await handleCheckTokenValidity()
       setRole1(newRole) 
   }
   useEffect(()=>{
        setNewRole()
    },[])
    useEffect(()=>{
        const checkTokenValidityInterval=setInterval(setNewRole,1800000)
        return ()=>{
            clearInterval(checkTokenValidityInterval)
        }
   },[])
   async function handleCheckTokenValidity(){
       const token=sessionStorage.getItem("token")
        if (!token)
            return "guest"
        const {role: result}=jwtDecode(token)
        console.log("!!",result)
        try{
            if (!result)
                throw new Error()
            const {data:isTokenValid}=await axios.get("http://localhost:5000/"+result+"-verify-token"
            ,{
                headers: {
                    "Authorization":"Bearer "+token,
                    'Content-Type': 'application/json'
                }})
            console.log(result)
            if (isTokenValid===true)
                return result
            throw new Error()
        }catch(err){
            console.log(err)
            sessionStorage.removeItem("token")
            setLoginModalShouldOpen(true)
            alert("התנקת לנו אתה מוזמן להתחבר שוב")
            return "guest"
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