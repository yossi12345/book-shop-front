import "./CartButton.scss"
import {NavLink} from "react-router-dom"
import {TbPigMoney} from "react-icons/tb"
import Cart from "../../Cart"
function CartButton(props){
    return (
        <NavLink to="/buy-books" className={({isActive})=>(isActive?"active-cart-btn":"cart-btn")}>
            <Cart cartSize={30}/>
            <button onClick={()=>{
                props.setShouldPayModalOpen(true)
            }}>
                <TbPigMoney size={60}/>
            </button>
        </NavLink>
    )
}
export default CartButton