import Cart from "../Cart"
import "./BuyBooks.scss"

function BuyBooks(props){
    return (
        <div>
            <div onClick={()=>{
                props.setShouldPayModalOpen(true)
            }}>
                
                <Cart cartSize={350} containerClass="big-cart"/>
                
            </div>
        </div>
    )
}
export default BuyBooks