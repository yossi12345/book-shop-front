import { createContext, useEffect, useState } from "react"
import {AES} from "crypto-js"
import handleSetCartItemsFirstValue from "./cartItemsContext-function"
export const CartItems=createContext()
export const SetCartItems=createContext()
function CartItemsContext({children}){
    const [cartItems,setCartItems]=useState([])
  
    useEffect(()=>{
        handleSetCartItemsFirstValue(setCartItems)
    },[])
    useEffect(()=>{
        let newHashCartItems=""
        const secret=process.env.REACT_APP_CART_SECRET
        cartItems.forEach((book,i)=>{
            newHashCartItems+=book._id
            if (i+1!==cartItems.length)
                newHashCartItems+=";;"
        })
        newHashCartItems=AES.encrypt(newHashCartItems,secret).toString()
        localStorage.setItem("hashCartItems",newHashCartItems)
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