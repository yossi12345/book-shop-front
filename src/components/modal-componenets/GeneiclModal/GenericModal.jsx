import { createContext, useState } from "react"
import "./GenericModal.scss"
import ModalContainer from "../../modal-componenets/ModalContainer/ModalContainer"
import CloseModalBtn from "../CloseModalBtn/CloseModalBtn"

export const SetGenericModalParams=createContext()

function GenericModal({children}){
    const [shouldOpen,setShouldOpen]=useState(false)
    const [genericModalParams,setGenericModalParams]=useState({})
    function closeGenericModal(){
        setShouldOpen(false)
    }
    function setParams({confirmFunc=closeGenericModal,cancelButtonContent="ביטול",confirmButtonContent="אישור",cancelButtonNeeded=false,content}){
        setShouldOpen(true)
        setGenericModalParams({
            confirmFunc,
            content,
            cancelButtonContent,
            confirmButtonContent,
            cancelButtonNeeded,
        })
    }
    return (
        <SetGenericModalParams.Provider value={setParams}>
            {shouldOpen&&
                <ModalContainer>
                    <div className="generic-modal">
                        <CloseModalBtn closeModal={closeGenericModal}/>
                        <div>
                            {genericModalParams.content}
                        </div>
                        <div>
                            {genericModalParams.cancelButtonNeeded&&
                                <button onClick={closeGenericModal}>
                                    {genericModalParams.cancelButtonContent}
                                </button>
                            }
                            <button onClick={()=>{
                                genericModalParams.confirmFunc({setGenericModalParams,closeGenericModal})
                            }}>
                                {genericModalParams.confirmButtonContent}
                            </button>
                        </div>
                    </div>
                </ModalContainer>
            }
            {children}
        </SetGenericModalParams.Provider>
    )
}
export default GenericModal