import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
function BookPage(){
    const {bookId}=useParams()
    const navigate=useNavigate()
    const [bookObj,setBookObj]=useState(async()=>{
        try{
            const {data:book}=await axios.post("http://localhost:5000/get?_id="+bookId,{},{
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            return book
        }catch(err){
            
            navigate("/",{replace:true})
            if (err.response.status===404)
                alert("אנחנו מצטערים אבל הספר שחיפשת לא  מצאנו את הספר שחיפשת")
            else
                alert("אין לנו חיבור עם השרת כרגע ולכן אנחנו לא יכולים להראות לך את הספר שאתה מחפש")
            
        }
    })
    return (
        <div></div>
    )
}
export default BookPage