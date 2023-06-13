import axios from "axios"
import {ROLE_TYPES} from "../../global-constants"
export async function handleAuth({setIsAuthSucceded,navigate,role,setRole,setGenericModalParams}){
    const token=sessionStorage.getItem("token")
    if (!token||role===ROLE_TYPES.user){
        navigate("/llllllllllll",{replace:true})
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
        navigate("/llllllllll",{replace:true})
    }
}
export async function handleCreateOrEditBook(params){
    if (!sessionStorage.getItem("token")||params.role!==ROLE_TYPES.admin){
        handleAuthFaild(params.navigate,params.setRole,params.setGenericModalParams)
        return
    }
    let isAllInputsValid=true
    const name=params.inputsParams.name.value.trim()
    const discount=params.inputsParams.discount.value.trim()===""?"":params.inputsParams.discount.value*1
    const author=params.inputsParams.author.value.trim()
    const price=params.inputsParams.price.value.trim()===""?"":params.inputsParams.price.value*1
    const description=params.descriptionParams.value.trim()
    const firstChapter=params.firstChapter.trim()
    const genre=params.selectValue
    const bookCover=params.bookCover
    const inputsParamsCopy={...params.inputsParams}
    const descriptionParamsCopy={...params.descriptionParams}
    if (discount!==""&&!(discount>=0&&discount<=100))
        handleInvalidInput(inputsParamsCopy.discount,"*הנחה חייבת להיות מספר בין 0 ל100")
    if (price===""||!(price>=0))
        handleInvalidInput(inputsParamsCopy.price,"*חובה להכניס מספרים גדולים מ-0")
    if (name==="")
        handleInvalidInput(inputsParamsCopy.name)
    if (author==="")
        handleInvalidInput(inputsParamsCopy.author)
    if (!params.isEdit&&!bookCover){
        isAllInputsValid=false
        params.setGenericModalParams({content:"יש לבחור כריכה לספר"})  
    }
    if (description==="")
        handleInvalidInput(descriptionParamsCopy)
    if (!isAllInputsValid){
        params.setInputsObj(inputsParamsCopy)
        params.setDescriptionParams(descriptionParamsCopy)
        return 
    }
    try{
        const newBook={name,author,price,description,genre}
        if (discount)
            newBook.discount=discount
        if (firstChapter)
            newBook.firstChapter=firstChapter
        const headers={
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+sessionStorage.getItem("token"),
        }
        const headerForImageUpload={
            'Content-Type': "multipart/form-data",
            'Authorization': "Bearer "+sessionStorage.getItem("token"),
        }
        if (params.isEdit){
            await axios.patch(process.env.REACT_APP_BASIC_URL+"update-book?_id="+params.bookId,newBook,{headers})
            if (bookCover)
                await axios.patch(process.env.REACT_APP_BASIC_URL+"replace-book-cover?_id="+params.bookId,{bookCover},{headers:headerForImageUpload})
            params.navigate(-1)
            params.setGenericModalParams({content:"הספר עודכן בהצלחה"})
        }
        else{
            const {data:savedBook}=await axios.post(process.env.REACT_APP_BASIC_URL+"new-book",newBook,{headers})
         
            await axios.patch(process.env.REACT_APP_BASIC_URL+"upload-book-cover?_id="+savedBook._id,{bookCover},{headers:headerForImageUpload})
            for (const key in params.inputsParams){
                inputsParamsCopy[key].value=""
                inputsParamsCopy[key].placeholder=""
            }
            params.setDescriptionParams({
                ...params.descriptionParams,
                value:"",
                placeholder:""
            })
            params.setinputsParams(inputsParamsCopy)
            params.setBookCover(null)
            params.setFirstChapter("")
            params.setGenericModalParams({content:"הספר נוצר בהצלחה"})   
        }      
    }catch(err){
        console.log(err)
        if (err.response.status===500)
            params.setGenericModalParams({content:"אנחנו מצטערים הייתה תקלה בקשר עם השרת נסה שוב"})
        else if (err.response.status===400)
             handleAuthFaild(params.navigate,params.setRole,params.setGenericModalParams)
    }
    function handleInvalidInput(inputState,message="*שדה חובה"){
        inputState.value=""
        inputState.placeholder=message
        isAllInputsValid=false
    }
}
function handleAuthFaild(navigate,setRole,setGenericModalParams){
    setRole(ROLE_TYPES.guest)
    sessionStorage.removeItem("token")
    navigate("/admin",{replace:true})
    setGenericModalParams({content:"אנחנו מצטערים הרשאת הכניסה שלך כמנהל לא עובדת יותר אתה מוזמן לנסות להתחבר שוב "})
}