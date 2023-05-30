import axios from "axios"
import {ROLE_TYPES} from "../../global-constants"
export async function handleAuth({setIsAuthSucceded,navigate,role,setUsername,setRole}){
    const token=sessionStorage.getItem("token")
    if (!token||role===ROLE_TYPES.user){
        navigate("/llllllllllll",{replace:true})
        return
    }
    else if (role!==ROLE_TYPES.admin){
        setIsAuthSucceded(false)
        return 
    }
    try{
        const {data}=await axios.get(process.env.REACT_APP_BASIC_URL+"admin-verify-token",{
            headers: {
                "Authorization":"Bearer "+token,
                'Content-Type': 'application/json'
            }}
        )
        if (!data.isValidToken)
            throw new Error()
        setIsAuthSucceded(true)
    }catch(err){
        console.log(err)
        sessionStorage.removeItem("token")
        alert("התנקת לנו אתה מוזמן להתחבר שוב")
        navigate("/admin",{replace:true})
        //setUsername(GUEST_NAME)
        setRole(ROLE_TYPES.guest)
    }
}
export async function handleCreateOrEditBook(params){
    if (!sessionStorage.getItem("token")||params.role!==ROLE_TYPES.admin){
        handleAuthFaild(params.navigate,params.setRole)
        return
    }
    let isAllInputsValid=true
    const name=params.inputsObj.name.value.trim()
    const discount=params.inputsObj.discount.value===""?"":params.inputsObj.discount.value*1
    const author=params.inputsObj.author.value.trim()
    const bookCover=params.inputsObj.bookCover.value.trim()
    const price=params.inputsObj.price.value===""?"":params.inputsObj.price.value*1
    const description=params.textareasObj.description.value.trim()
    const firstChapter=params.textareasObj.firstChapter.value.trim()
    const genre=params.selectValue
    const inputsObjCopy={...params.inputsObj}
    const textareasObjCopy={...params.textareasObj}
    if (discount!==""&&!(discount>=0&&discount<=100))
        handleInvalidInput(inputsObjCopy.discount,"*הנחה חייבת להיות מספר בין 0 ל100")
    if (price===""||!(price>=0))
        handleInvalidInput(inputsObjCopy.price,"*חובה להכניס מספרים גדולים מ-0")
    if (name==="")
        handleInvalidInput(inputsObjCopy.name)
    if (author==="")
        handleInvalidInput(inputsObjCopy.author)
    if (bookCover==="")
        handleInvalidInput(inputsObjCopy.bookCover)
    if (description==="")
        handleInvalidInput(textareasObjCopy.description)
    if (!isAllInputsValid){
        params.setInputsObj(inputsObjCopy)
        params.setTextareasObj(textareasObjCopy)
        return 
    }
    try{
        const newBook={name,author,price,bookCover,description,genre}
        if (discount)
            newBook.discount=discount
        if (firstChapter)
            newBook.firstChapter=firstChapter
        const headers={
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+sessionStorage.getItem("token"),
        }
        console.log(newBook)
        if (params.isEdit){
            await axios.patch(process.env.REACT_APP_BASIC_URL+"update-book?_id="+params.bookId,newBook,{headers})
            params.navigate("/")
            alert("הספר עודכן בהצלחה")
        }
        else{
            await axios.post(process.env.REACT_APP_BASIC_URL+"new-book",newBook,{headers})
            for (const key in params.inputsObj)
                inputsObjCopy[key].value=""
            for (const key in params.textareasObj)
                textareasObjCopy[key].value=""
            params.setInputsObj(inputsObjCopy)
            params.setTextareasObj(textareasObjCopy)
            alert("הספר נוצר בהצלחה")   
        }      
    }catch(err){
        console.log(err)
        if (err.response.status===500)
            alert("אנחנו מצטערים הייתה תקלה בקשר עם השרת נסה שוב")
        else if (err.response.status===400)
             handleAuthFaild(params.navigate,params.setRole)
    }
    function handleInvalidInput(inputState,message="*שדה חובה"){
        inputState.value=""
        inputState.placeholder=message
        isAllInputsValid=false
    }
}
function handleAuthFaild(navigate,setRole){
    setRole(ROLE_TYPES.guest)
    sessionStorage.removeItem("token")
    navigate("/admin",{replace:true})
    alert("אנחנו מצטערים הרשאת הכניסה שלך כמנהל לא עובדת יותר אתה מוזמן לנסות להתחבר שוב ")
}