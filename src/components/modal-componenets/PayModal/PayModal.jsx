import { useRef,useState } from "react"
import CloseModalBtn from "../CloseModalBtn/CloseModalBtn"
import ModalContainer from "../ModalContainer/ModalContainer"
import "./PayModal.scss"
import { useContext } from "react"
import { CartItems, SetCartItems } from "../../CartItemsContext/CartItemsContext"
function PayModal(props){
    const setCartItems=useContext(SetCartItems)
    const cartItems=useContext(CartItems)
    const [inputs,setInputs]=useState({
        creditNumber:{
            value:"",
            placeholder:""
        },
        expiredMonth:{
            value:"",
            placeholder:""
        },
        expiredYear:{
            value:"",
            placeholder:""
        },
        numbersInBack:{
            value:"",
            placeholder:""
        }
    })
    const [inValidExpiredMessage,setInValidExpiredMessage]=useState("")
    const [failBuyingMessage,setFailBuyingMessage]=useState(null)
    function handleInputChange(inputField,userInput){
        if (userInput!==""&&!(/^(0|[1-9]\d*)$/.test(userInput)))
            return 
        const inputsCopy={...inputs}
        inputsCopy[inputField].value=userInput
        setInputs(inputsCopy)
        
    }
    async function handlePay(event){
        event.preventDefault()
        const creditDetails={}
        let isValidDetails=true
        const inputCopy={...inputs}
        const creditNumberRegex=/^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
        if (!creditNumberRegex.test(inputs.creditNumber.value)){
            inputCopy.creditNumber.placeholder="יש להכניס מספר כרטיס תקין"
            inputCopy.creditNumber.value=""
            isValidDetails=false
        }
        else
            creditDetails.creditNumber=inputs.creditNumber.value
        const today=new Date()
        const currentYear=today.getFullYear()
        const currentMonth=today.getMonth()
        const expiredMonthInput=inputs.expiredMonth.value*1
        const expiredYearInput=inputs.expiredYear.value*1
        if (expiredMonthInput>12||expiredMonthInput<1||
            expiredYearInput<currentYear||
            (expiredYearInput===currentYear&&expiredMonthInput<=currentMonth)
        ){
            setInValidExpiredMessage("*יש להכניס תוקף תקין")
            inputCopy.expiredMonth.value=""
            inputCopy.expiredYear.value=""
            isValidDetails=false
        }
        else{
            creditDetails.expiredMonth=expiredMonthInput
            creditDetails.expiredYear=expiredYearInput
        }
        if (inputs.numbersInBack.value.length!==3){
            inputCopy.numbersInBack.value=""
            inputCopy.numbersInBack.placeholder="יש להכניס 3 ספרות תקינות"
            isValidDetails=false
        }
        else
            creditDetails.numbersInBack=inputs.numbersInBack.value
        if (!isValidDetails){
            setInputs(inputCopy)
            return 
        }
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
                <form onSubmit={handlePay}>
                    <div>
                        <div>
                            מספר כרטיס:
                        </div>
                        <input value={inputs.creditNumber.value} 
                            placeholder={inputs.creditNumber.placeholder}
                            onChange={(event)=>{
                                handleInputChange("creditNumber",event.target.value)
                            }}
                        />
                    </div>
                    <div className="validity-input-container">
                        <div>
                            תוקף:
                        </div>
                        <div>
                            <input value={inputs.expiredYear.value} 
                                placeholder={inputs.expiredYear.placeholder}
                                onChange={(event)=>{
                                    handleInputChange("expiredYear",event.target.value)
                            }}/>
                            <span>/</span>
                            <input value={inputs.expiredMonth.value} 
                                placeholder={inputs.expiredMonth.placeholder}
                                onChange={(event)=>{
                                    handleInputChange("expiredMonth",event.target.value)
                            }}/>
                        </div>
                        <div className="fail-message">
                            {inValidExpiredMessage}
                        </div>
                    </div>
                    <div>
                        <div>
                        3 ספרות בגב כרטיס :
                        </div>
                        <input value={inputs.numbersInBack.value} 
                            placeholder={inputs.numbersInBack.placeholder}
                            onChange={(event)=>{
                                handleInputChange("numbersInBack",event.target.value)
                        }}/>
                    </div>
                    <button type="submit">שלם עכשיו!</button>
                </form>
            </div>
        </ModalContainer>
    )
}
export default PayModal