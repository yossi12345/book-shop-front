import {GiShoppingCart} from "react-icons/gi"
import shekelSign from "../images/shekel-sign.png"
import booksPile from "../images/books-pile.png"
import { useContext, useEffect, useState } from "react"
import getActualBookPrice from "./getActualBookPrice"
import { Role } from "./RoleContext1"
import { CartItems } from "./CartItemsContext/CartItemsContext"
function Cart({containerClass,cartSize}){
    const cartItems=useContext(CartItems)
    const role=useContext(Role)
    const [totalPrice,setTotalPrice]=useState(0)
    useEffect(()=>{
        let newTotalPrice=0
        cartItems.forEach(book => {
            newTotalPrice+=getActualBookPrice(book,role)
        })
        setTotalPrice(newTotalPrice)
    },[cartItems,role])
    console.log(cartItems)
    return (
        <button className={containerClass}>
            <GiShoppingCart size={cartSize}/>
            <div>
                <img src={booksPile} alt="books amount"/>
                {cartItems.length}
            </div>
            <div>
                <img src={shekelSign} alt="total price"/>
                {totalPrice}
            </div>
        </button>
    )
}
export default Cart