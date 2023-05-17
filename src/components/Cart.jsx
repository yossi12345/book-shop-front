import {GiShoppingCart} from "react-icons/gi"
import shekelSign from "../images/shekel-sign.png"
import booksPile from "../images/books-pile.png"
function Cart({containerClass,cartSize}){
    return (
        <button className={containerClass}>
            <GiShoppingCart size={cartSize}/>
            <div>
                <img src={booksPile} alt="books amount"/>
                00
            </div>
            <div>
                <img src={shekelSign} alt="total price"/>
                000
            </div>
        </button>
    )
}
export default Cart