import "./Book.scss"
import {MdOutlineAddShoppingCart} from "react-icons/md"
import {BsCartDash} from "react-icons/bs"
import { useContext,useMemo } from "react"
import { Role, SetRole } from "../RoleContext1"
import getActualBookPrice from "../getActualBookPrice"
import { CartItems, SetCartItems } from "../CartItemsContext/CartItemsContext"
import {TbTrashOff} from "react-icons/tb"
import {BsFillTrash3Fill} from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { ROLE_TYPES } from "../../global-constants"
import { handleUpdateBook } from "../handleUpdateBook"
import unavailableSign from "../../images/unavailable-sign.jpg"
import { SetGenericModalParams } from "../modal-componenets/GeneiclModal/GenericModal"
import { useRef } from "react"
import { handleDeleteBook } from "../handleDeleteBook"
import { createDiscount } from "../createDiscount"
function Book({book,deleteBookRealTime,updateBookRealTime}){
    const setGenericModalParams=useContext(SetGenericModalParams)
    const cartItems=useContext(CartItems)
    const setCartItems=useContext(SetCartItems)
    const role=useContext(Role)
    const setRole=useContext(SetRole)
    const discountInputRef=useRef(null)
    const navigate=useNavigate()
    const params={
        setRole,
        navigate,
        book,
        updateBookRealTime,
        setGenericModalParams
    }
    const amountOfThisBookInCart=useMemo(()=>{
        if (role===ROLE_TYPES.admin||book.deleted)
            return 0
        const result=cartItems.reduce((accumulator,bookItem)=>(
            bookItem._id===book._id?(accumulator+1):accumulator
        ),0)
        return result
    },[cartItems])
    const actualBookPrice=useMemo(()=>{
        return getActualBookPrice(book,role).toLocaleString("en-US",{maximumFractionDigits:2})
    },[role])
    return (
        <div className="book" >
            <label className="label">
                {book.name}
            </label>
            <div className="book-buttons-container">
                {role!==ROLE_TYPES.admin&&
                    <>
                        {(!book.deleted&&cartItems.some(bookItem=>bookItem._id===book._id))&&
                            <button onClick={()=>{
                                const cartItemsCopy=[...cartItems]
                                const bookIndex=cartItems.findIndex((bookItem)=>(bookItem._id===book._id))
                                cartItemsCopy.splice(bookIndex,1)
                                setCartItems(cartItemsCopy)
                            }}>
                                <BsCartDash size={33} color="white"/>
                            </button>
                        }
                        <button onClick={()=>{
                            const cartItemsCopy=[...cartItems]
                            cartItemsCopy.push(book)
                            setCartItems(cartItemsCopy)
                        }}>
                            <MdOutlineAddShoppingCart color="white" size={33}/>
                        </button>
                    </>
                } 
                {role===ROLE_TYPES.admin&&
                    <>
                        {book.available?
                            <button className="not-icon-btn" onClick={()=>{
                                handleUpdateBook({...params,update:{available:false}})
                            }}>
                                הפוך
                                 ללא
                                זמין
                            </button>:
                            <button onClick={()=>{//הפוך לזמין
                                handleUpdateBook({...params,update:{available:true}})
                            }}>
                                <TbTrashOff color="white" size={25}/>
                            </button>
                        }
                        <button onClick={()=>{
                            setGenericModalParams({
                                content:"האם אתה באמת רוצה למחוק את הספר "+book.name+" מהמאגר? *זאת פעולה בלתי הפיכה",
                                confirmButtonContent:"מחק ספר",
                                cancelButtonNeeded:true,
                                confirmFunc:({closeGenericModal})=>{
                                    handleDeleteBook({...params,closeGenericModal,deleteBookRealTime})
                                }
                            })
                        }}>
                            <BsFillTrash3Fill color="white" size={25}/>
                        </button>
                        {book.discount>0?
                            <button className="not-icon-btn" onClick={()=>{
                                handleUpdateBook({...params,update:{discount:0}})
                            }}>
                                בטל
                                הנחה
                                קיימת
                            </button>:
                            <button className="not-icon-btn" onClick={()=>{
                                setGenericModalParams({
                                    content:
                                        <form className="create-discount-form">
                                            כתוב כאן את ההנחה שאתה רוצה באחוזים: 
                                            <input ref={discountInputRef}/>    
                                        </form>,
                                    confirmButtonContent:"צור הנחה",
                                    cancelButtonNeeded:true,
                                    confirmFunc:(closeGenericModal)=>{
                                        createDiscount(discountInputRef,closeGenericModal,params)
                                    }
                                })
                            }}>
                                צור
                                הנחה 
                            </button>
                        }
                        <button className="not-icon-btn" onClick={()=>{
                            navigate("/edit-book/"+book._id)
                        }}>
                            ערוך
                            ספר
                        </button>
                    </>
                }
            </div>
            <div  onClick={()=>{
                if (!book.deleted)
                    navigate("/book/"+book._id)
            }}>
                <img src={book.bookCover} alt="book cover"/>
                {!book.available&&<img src={unavailableSign} alt="unavailable" className="unavailable-img" />}
            </div>
            <label className="label">
                {role===ROLE_TYPES.admin?
                    <>
                        {"מחיר אמיתי: "+book.price}
                            <br/>
                        {"מחיר לאחר הנחה: "+actualBookPrice}
                    </>:
                    <>
                        {!book.deleted&&amountOfThisBookInCart>0&&
                            <>
                                {"כמות ספרים בעגלה: "+amountOfThisBookInCart}
                                <br/>
                                {"מחיר  כולל: "+amountOfThisBookInCart*actualBookPrice}
                                <br/>
                            </>
                        }
                        {"מחיר ליחידה: "+actualBookPrice}
                    </>
                }
            </label>
        </div>
    )
}
export default Book