import {AES,enc} from "crypto-js"
import axios from "axios"
async function handleSetCartItemsFirstValue(setCartItems){
    const secret=process.env.REACT_APP_CART_SECRET
    const hashCartItems=localStorage.getItem("hashCartItems")
    const newCartItems=[]
    if (!hashCartItems){
        console.log("new user")
        setCartItems(newCartItems)
        return
    }
    const cartItemsString=AES.decrypt(hashCartItems,secret).toString(enc.Utf8)
    if (cartItemsString===""){
        setCartItems(newCartItems)
        return
    }
    const _idArrayOfCartItems=cartItemsString.split(";;")
    let isAtLeastOneBookUnavailable=false
    let isAtLeastOneBookDeletedCompletely=false
    for (let i=0;i<_idArrayOfCartItems.length;i++){
        try{
            const {data:book}=await axios.get("http://localhost:5000/get?_id="+_idArrayOfCartItems[i])
            if (book.available)
                newCartItems.push(book)
        }catch(err){
            if (!err.response){
                alert("יוסי תדליק ת'שרת תעשה טובה")
                console.log(err)
                return
            }  
            else if (err.response.status===500){
                alert("סטטוס 500 לא רוצה לשאול את דימיטרי מה לעשות")
                console.log(err)
                return 
            }
            else if (err.response.status===404){
                if (err.response.data.book.available===false)
                    isAtLeastOneBookUnavailable=true
                else
                    isAtLeastOneBookDeletedCompletely=true
            }
            console.log(err)
        }
    }
    setCartItems(newCartItems)
    if (isAtLeastOneBookDeletedCompletely){
        alert("אנחנו מצטערים אבל חלק מספרים ששמת בעגלה לא נמצאים אצלנו עוד")
    }
    if (isAtLeastOneBookUnavailable)
        alert("אנחנו מצטערים אבל חלק מהספרים ששמת בעגלה לא זמינים למכירה כרגע")
}
export default handleSetCartItemsFirstValue