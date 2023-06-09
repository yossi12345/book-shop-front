import { useContext,useMemo } from "react"
import Cart from "../Cart"
import "./BuyBooks.scss"
import { CartItems } from "../CartItemsContext/CartItemsContext"
import Book from "../Book/Book"
import { SetGenericModalParams } from "../modal-componenets/GeneiclModal/GenericModal"

function BuyBooks(props){
    const setGenericModalParams=useContext(SetGenericModalParams)
    const cartItems=useContext(CartItems)
    function cantUserBuyBook(book){
        return book.deleted||!book.available
    }
    const cartItemsWithoutDuplicates=useMemo(()=>{
        const booksIdSet=new Set()
        const result=[]
        cartItems.forEach((bookItem)=>{
            if (!booksIdSet.has(bookItem._id)){
                booksIdSet.add(bookItem._id)
                result.push(bookItem)
            }
        })
        return result
    },[cartItems])
    return (
        <div>
            <div className="big-cart-container" onClick={()=>{
                if (cartItems.length===0){
                    setGenericModalParams({content:"העגלה שלך ריקה"})
                    return
                }
                if (!cartItems.every(cantUserBuyBook)){
                    props.setShouldPayModalOpen(true)
                    return 
                }
                setGenericModalParams({content:"כל הספרים בעגלה שלך לא זמינים או שנמחקו לגמרי"})
                const mozart=new Audio("/mozart_34.m4a")
                mozart.play()
            }}>
                
                <Cart cartSize={100} containerClass="big-cart"/>
                <u>
                    לקניית הספרים לחץ כאן
                </u>
            </div>
            <div className="buy-books-books-container">
            {
                cartItemsWithoutDuplicates.map((book)=>(
                    <Book key={Math.random()} book={book}/>
                ))
            }
            </div>
        </div>
    )
}
export default BuyBooks