import { useContext } from "react"
import Cart from "../Cart"
import "./BuyBooks.scss"
import { CartItems } from "../CartItemsContext/CartItemsContext"
import Book from "../Book/Book"

function BuyBooks(props){
    const cartItems=useContext(CartItems)
    return (
        <div>
            <div onClick={()=>{
                props.setShouldPayModalOpen(true)
            }}>
                
                <Cart cartSize={350} containerClass="big-cart"/>
                
            </div>
            <div className="buy-books-books-container">
            {
                cartItems.map((book)=>(
                    <Book key={Math.random()} book={book}/>
                ))
            }
            </div>
        </div>
    )
}
export default BuyBooks