import { useRef,useState } from "react"
import CloseModalBtn from "../CloseModalBtn/CloseModalBtn"
import ModalContainer from "../ModalContainer/ModalContainer"
import "./PayModal.scss"
import { useContext } from "react"
import { CartItems, SetCartItems } from "../../CartItemsContext/CartItemsContext"
function PayModal(props){
    const setCartItems=useContext(SetCartItems)
    const cartItems=useContext(CartItems)
    const inputsRefs=useRef([])
    const [failBuyingMessage,setFailBuyingMessage]=useState(null)
    async function handlePay(event){
        event.preventDefault()
        const inputs=[]
        inputsRefs.current.forEach((inputRef)=>{ 
            const input=inputRef.value.trim()
            if (/^[1-9]\d*$/.test(input)){
                inputs.push(input) 
                return
            }
            const message=input===""?"*שדה חובה":"*יש להכניס מספרים בלבד"
            inputRef.value=""
            inputRef.setAttribute("placeholder",message)
        })
        if (inputs.length!==4)
            return
        const buyingSucceed=await buyBooks()
        if (!buyingSucceed){
            setFailBuyingMessage("אנחנו מצטערים לא הצלחנו לבצע את הקנייה")
            return
        }
        const newCartItems=cartItems.filter(book=>(book.deleted||!book.available))
        setCartItems(newCartItems)
        props.setShouldPayModalOpen(false)
        props.setShouldRunConfetti(true)
        setTimeout(()=>{
            setFailBuyingMessage(null)
            props.setShouldRunConfetti(false)
        },7000)      
        async function buyBooks(){
            //somehow take money and give books and return true only if it succeeded
            return true;
        }
    }
    return (
        <ModalContainer>
            <div className="pay-modal">
                <h2>{failBuyingMessage}</h2>
                <CloseModalBtn closeModal={()=>{
                    props.setShouldPayModalOpen(false)
                }}/>
                <form>
                    <div>
                        <div>
                            מספר כרטיס:
                        </div>
                        <input ref={el=>inputsRefs.current[0]=el}/>
                    </div>
                    <div className="validity-input-container" key={Math.random()}>
                        <div>
                            תוקף:
                        </div>
                        <div>
                            <input ref={el=>inputsRefs.current[1]=el}/>
                            <span>/</span>
                            <input ref={el=>inputsRefs.current[2]=el}/>
                        </div>
                    </div>
                    <div>
                        <div>
                        3 ספרות בגב כרטיס :
                        </div>
                        <input ref={el=>inputsRefs.current[3]=el}/>
                    </div>
                    <button onClick={handlePay}>שלם עכשיו!</button>
                </form>
            </div>
        </ModalContainer>
    )
}
export default PayModal