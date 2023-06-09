import { handleUpdateBook } from "./handleUpdateBook"
export function createDiscount(discountInputRef,closeGenericModal,params){
    const discountString=discountInputRef.current.value.trim()
    if (discountString===""){
        discountInputRef.current.value=""
        discountInputRef.current.placeholder="*הכנס כאן את ההנחה"
        return
    }
    const discount=discountString*1
    if (!(discount<=100&&discount>=0)){
        discountInputRef.current.value=""
        discountInputRef.current.placeholder="*יש להכניס מספר בין 0 ל-100"
        return
    }
    closeGenericModal()
    handleUpdateBook({...params,update:{discount}})
}