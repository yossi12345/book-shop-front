import {AES,enc} from "crypto-js"
import axios from "axios"

const deletedBook={
    _id:"id1",
    name:"",
    author:"",
    description:"",
    available:false,
    price:0,
    discount:0,
    bookCover:"/book-images/not-exist-book.PNG",
    genre:"",
    deleted:true
}

export async function handleSetCartItemsFirstValue(setCartItems){
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
    for (let i=0;i<_idArrayOfCartItems.length;i++){
        const url=process.env.REACT_APP_BASIC_URL+"get?_id="+_idArrayOfCartItems[i]
        try{
            const {data:book}=await axios.get(url)
            newCartItems.push(book)
        }catch(err){
            console.log(err)
            if (!err.response){
                alert("יוסי תדליק ת'שרת תעשה טובה")
                return
            }  
            else if (err.response.status===500){
                return 
            }
            else if (err.response.status===404)
                newCartItems.push(deletedBook)    
        }
    }
    setCartItems(newCartItems)
}
export function setHashCartItems(cartItems){
    let newHashCartItems=""
    const secret=process.env.REACT_APP_CART_SECRET
    cartItems.forEach((book,i)=>{
        newHashCartItems+=book._id
        if (i+1!==cartItems.length)
            newHashCartItems+=";;"
    })
    newHashCartItems=AES.encrypt(newHashCartItems,secret).toString()
    localStorage.setItem("hashCartItems",newHashCartItems)
}
