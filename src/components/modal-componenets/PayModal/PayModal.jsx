import { useRef,useState } from "react"
import CloseModalBtn from "../CloseModalBtn/CloseModalBtn"
import ModalContainer from "../ModalContainer/ModalContainer"
import "./PayModal.scss"
function PayModal(props){
    const inputsRefs=useRef([])
    const [failBuyingMessage,setBuyingMessage]=useState(null)
    async function handlePay(event){
        event.preventDefault()
        const inputs=[]
        inputsRefs.current.forEach((inputRef)=>{ 
            const input=inputRef.value.trim()
            if (!(/^[1-9]\d*$/.test(input))){
                const message=input===""?"*שדה חובה":"*יש להכניס מספרים בלבד"
               inputRef.value=""
               inputRef.setAttribute("placeholder",message)
            }
            else
                inputs.push(input) 
        })
        if (inputs.length!==4)
            return
        const buyingSucceed=await buyBooks()
        if (!buyingSucceed){
            setBuyingMessage("אנחנו מצטערים לא הצלחנו לבצע את הקנייה")
            return
        }
        //לרוקן את העגלה
        props.setShouldPayModalOpen(false)
        props.setShouldRunConfetti(true)
        setBuyingMessage("הקנייה הצליחה")
        setTimeout(()=>{
            setBuyingMessage(null)
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