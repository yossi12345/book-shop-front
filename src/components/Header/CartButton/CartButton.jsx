import "./CartButton.scss"
import {NavLink} from "react-router-dom"
import {TbPigMoney} from "react-icons/tb"
import Cart from "../../Cart"
import { useContext } from "react"
import { CartItems } from "../../CartItemsContext/CartItemsContext"
import { SetGenericModalParams } from "../../modal-componenets/GeneiclModal/GenericModal"
import {IoTriangleSharp} from "react-icons/io5"
function CartButton(props){
    const setGenericModalParams=useContext(SetGenericModalParams)
    const cartItems=useContext(CartItems)
    function cantUserBuyBook(book){
        return book.deleted||!book.available
    }
    return (
        <NavLink to="/buy-books" className={({isActive})=>(isActive?"active-cart-btn":"cart-btn")}>
            <span onClick={()=>{
                if (!cartItems.some(cantUserBuyBook))
                    return
                const mozart=new Audio("/mozart_34.m4a")
                mozart.play()   
            }}>
                <Cart cartSize={50}/>
            </span>
            <button onClick={()=>{
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
                <TbPigMoney size="100%"/>
                <div className="buy-books-label">
                    <div>
                        <IoTriangleSharp size={15} color="wheat"/>
                    </div>
                    <div>
                        קנה ספרים
                    </div>
                </div>
            </button>
        </NavLink>
    )
}
export default CartButton