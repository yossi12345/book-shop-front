import { createContext, useEffect, useState } from "react"
import {handleSetCartItemsFirstValue,  setHashCartItems } from "./cartItemsContext-function"
import { useContext } from "react"
import { Role } from "../RoleContext1"
import { ROLE_TYPES } from "../../global-constants"

export const CartItems=createContext()
export const SetCartItems=createContext()

function CartItemsContext({children}){
    const role=useContext(Role)
    const [cartItems,setCartItems]=useState([])
  
    useEffect(()=>{
        if (role!==ROLE_TYPES.admin)
            handleSetCartItemsFirstValue(setCartItems)
    },[])

    useEffect(()=>{
        setHashCartItems(cartItems)
    },[cartItems])

    return (
        <CartItems.Provider value={cartItems}>
            <SetCartItems.Provider value={setCartItems}>
                {children}
            </SetCartItems.Provider>
        </CartItems.Provider>
    )
}
export default CartItemsContext