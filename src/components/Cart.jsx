import {GiShoppingCart} from "react-icons/gi"
import shekelSign from "../images/shekel-sign.png"
import booksPile from "../images/books-pile.png"
import { useContext, useMemo } from "react"
import getActualBookPrice from "./getActualBookPrice"
import { Role } from "./RoleContext1"
import { CartItems } from "./CartItemsContext/CartItemsContext"
function Cart({containerClass,cartSize}){
    const cartItems=useContext(CartItems)
    const role=useContext(Role)
    const totalPrice=useMemo(()=>{
        return cartItems.reduce((accumulator,book)=>(
            accumulator+getActualBookPrice(book,role)
        ),0)
    },[cartItems,role])
    return (
        <button className={containerClass+" relative"}>
            <GiShoppingCart size={cartSize}/>
            <div className="books-amount">
                {cartItems.length}
            </div>
            <div>
                <img src={shekelSign} alt="total price"/>
                {totalPrice.toLocaleString("en-US",{maximumFractionDigits:2})} 
            </div>
        </button>
    )
}
export default Cart