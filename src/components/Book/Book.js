import "./Book.scss"
import {MdOutlineAddShoppingCart} from "react-icons/md"
import {BsCartDash} from "react-icons/bs"
import { useContext } from "react"
import { Role } from "../RoleContext1"
import getActualBookPrice from "../getActualBookPrice"
import { CartItems, SetCartItems } from "../CartItemsContext/CartItemsContext"
function Book({book}){
    const cartItems=useContext(CartItems)
    const setCartItems=useContext(SetCartItems)
    const role=useContext(Role)
    return (
        <div className="book" >
            <label className="label">
                {book.name}
            </label>
                <div className="book-buttons-container">
                    {cartItems.includes(book)?
                        <button onClick={()=>{
                            const cartItemsCopy=[...cartItems]
                            cartItemsCopy.splice(cartItems.indexOf(book),1)
                            setCartItems(cartItemsCopy)
                        }}>
                            <BsCartDash size={33} color="white"/>
                        </button>:
                        <button onClick={()=>{
                            const cartItemsCopy=[...cartItems]
                            cartItemsCopy.push(book)
                            setCartItems(cartItemsCopy)
                        }}>
                            <MdOutlineAddShoppingCart color="white" size={33}/>
                        </button>
                    }
                </div>
            <img src={book.bookCover} alt="book cover" onDoubleClick={()=>{
                console.log("HGHGGH")
            }}/>
            <label className="label price">
                
                {role==="admin"?
                    <>
                        {"מחיר אמיתי: "+book.price}
                            <br/>
                        {"מחיר לאחר הנחה: "+getActualBookPrice(book,role)}
                    </>:
                    <>
                        {"מחיר: "+getActualBookPrice(book,role)}
                    </>
                }
            </label>
        </div>
    )
}
export default Book