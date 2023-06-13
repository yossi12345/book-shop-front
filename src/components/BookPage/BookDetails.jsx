import getActualBookPrice from "../getActualBookPrice"
import {MdOutlineAddShoppingCart} from "react-icons/md"
import {ImEye} from "react-icons/im"
import { ROLE_TYPES } from "../../global-constants"
import { Role, SetRole } from "../RoleContext1"
import { useContext ,useRef} from "react"
import {BsCartDash} from "react-icons/bs"
import { CartItems, SetCartItems } from "../CartItemsContext/CartItemsContext"
import { useNavigate } from "react-router-dom"
import { handleUpdateBook } from "../handleUpdateBook"
import { SetGenericModalParams } from "../modal-componenets/GeneiclModal/GenericModal"
import { handleDeleteBook } from "../handleDeleteBook"
import { createDiscount } from "../createDiscount"
function BookDetails({book,setShouldFirstChapterModalOpen,deleteBookRealTime,updateBookRealTime}) {
    const cartItems=useContext(CartItems)
    const setCartItems=useContext(SetCartItems)
    const role=useContext(Role)
    const setRole=useContext(SetRole)
    const setGenericModalParams=useContext(SetGenericModalParams)
    const discountInputRef=useRef(null)
    const navigate=useNavigate()
    const params={
        setRole,
        navigate,
        book,
        updateBookRealTime,
        setGenericModalParams
    }
    return (
        <>
            <div>
                <u>
                    שם הספר:
                </u>
                {" "+book.name}
            </div>
            <div>
                <u>
                    מאת:
                </u>
                {" "+book.author}
            </div>
            <div>
                <u>
                    ז'אנר:
                </u>
                {" " +book.genre}
            </div>
            {!book.discount>0&&
                <div>
                    מחיר:{" " +book.price.toLocaleString("en-US",{maximumFractionDigits:2})}
                </div>
            }
            {book.discount>0&&
                <div className="discount-message">
                    {role!== ROLE_TYPES.user?
                        (
                            "*על ספר זה יש הנחה של  " +
                             book.discount + 
                             "% למשתמשים רשומים"
                        ):
                        (
                            "*אתה משתמש רשום ולכן הספר הזה עולה לך " +
                            getActualBookPrice(book, role).toLocaleString("en-US",{maximumFractionDigits:2}) +
                            " שקלים במקום " +
                            book.price.toLocaleString("en-US",{maximumFractionDigits:2})
                        )
                    }
                </div>
            }
            {book.firstChapter&&
                <div>
                    <button onClick={()=>{
                        setShouldFirstChapterModalOpen(true)
                    }}>
                        <ImEye />
                        לחץ כאן לצפייה בפרק הראשון
                    </button>
                </div>
            }
            {role!==ROLE_TYPES.admin&&
                <>
                    {cartItems.some(bookItem=>bookItem._id===book._id)&&
                        <button onClick={()=>{
                            const cartItemsCopy=[...cartItems]
                            const bookIndex=cartItems.findIndex(bookItem=>bookItem._id===book._id)
                            cartItemsCopy.splice(bookIndex,1)
                            setCartItems(cartItemsCopy)
                        }}>
                            <BsCartDash/>
                            הוצא מהעגלה
                        </button>
                    }
                    <button onClick={()=>{
                        const cartItemsCopy=[...cartItems]
                        cartItemsCopy.push(book)
                        setCartItems(cartItemsCopy)
                    }}>
                        <MdOutlineAddShoppingCart/>
                        הוסף לעגלה
                    </button>
                </>
            }
            {role===ROLE_TYPES.admin&&
                <>
                   {book.discount>0?
                        <button onClick={()=>{
                            handleUpdateBook({...params,update:{discount:0}})
                        }}>
                            בטל הנחה קיימת
                        </button>:
                         <button onClick={()=>{
                            setGenericModalParams({
                                content:
                                    <form className="create-discount-form">
                                        כתוב כאן את ההנחה שאתה רוצה באחוזים: 
                                        <input ref={discountInputRef}/>    
                                    </form>,
                                confirmButtonContent:"צור הנחה",
                                cancelButtonNeeded:true,
                                confirmFunc:({closeGenericModal})=>{
                                    createDiscount({params,discountInputRef,closeGenericModal})
                                }
                            })
                        }}>
                            צור הנחה
                        </button>
                    }
                    <button onClick={()=>{
                        navigate("/edit-book/"+book._id)
                    }}>
                        ערוך ספר
                    </button>
                    {book.available?
                        <button onClick={()=>{
                            handleUpdateBook({...params,update:{available:false}})
                        }}>
                            הפוך ללא זמין
                        </button>:
                        <button onClick={()=>{
                            handleUpdateBook({...params,update:{available:true}})
                        }}>
                            הפוך לזמין
                        </button>
                    }
                    <button onClick={()=>{
                           setGenericModalParams({
                            content:"האם אתה באמת רוצה למחוק את הספר "+book.name+"מהמאגר? *זאת פעולה בלתי הפיכה",
                            confirmButtonContent:"מחק ספר",
                            cancelButtonNeeded:true,
                            confirmFunc:({closeGenericModal})=>{
                                handleDeleteBook({...params,closeGenericModal,deleteBookRealTime})
                            }
                        })
                    }}>
                        מחק ספר
                    </button>
                </>
            }
            <div>
                <p>
                    <u>
                        תיאור:
                    </u>
                </p>
                <div className={
                    (/[א-ת]/.test(book.description))?"":"english"
                }>
                    {book.description}
                </div>
            </div>
        </>
    )
}
export default BookDetails