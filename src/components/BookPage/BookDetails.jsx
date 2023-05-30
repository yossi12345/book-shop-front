import getActualBookPrice from "../getActualBookPrice"
import {MdOutlineAddShoppingCart} from "react-icons/md"
import {ImEye} from "react-icons/im"
import { ROLE_TYPES } from "../../global-constants"
import { Role, SetRole } from "../RoleContext1"
import { useContext } from "react"
import {BsCartDash} from "react-icons/bs"
import { CartItems, SetCartItems } from "../CartItemsContext/CartItemsContext"
import { useNavigate } from "react-router-dom"
import { handleUpdateBook } from "../handleUpdateBook"
import axios from "axios"
function BookDetails({book,setShouldFirstChapterModalOpen}) {
    const cartItems=useContext(CartItems)
    const setCartItems=useContext(SetCartItems)
    const role=useContext(Role)
    const setRole=useContext(SetRole)
    const navigate=useNavigate()
    return (
        <>
            <div>
                שם הספר:{" "+book.name}
            </div>
            <div>
                מאת:{" "+book.author}
            </div>
            <div>
                ז'אנר:{" " +book.genre}
            </div>
            {!book.discount>0&&
                <div>
                    מחיר:{" " +book.price}
                </div>
            }
            {book.discount>0&&
                <div className="discount-message">
                    {role !== ROLE_TYPES.guest ?
                        (
                            "*על ספר זה יש הנחה של  " +
                             book.discount + 
                             "% למשתמשים רשומים"
                        ):
                        (
                            "*אתה משתמש רשום ולכן הספר הזה עולה לך " +
                            getActualBookPrice(book, role) +
                            " שקלים במקום " +
                            book.price
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
                            const discountString=prompt("כתוב כאן את ההנחה שאתה רוצה באחוזים")
                            if (!discountString)
                                return
                            const discount=discountString*1
                            if (discount>=0&&discount<=100){
                                handleUpdateBook({
                                    update:{discount},
                                    setRole,
                                    navigate,
                                    book
                                })
                            }
                            
                        }}>
                            צור הנחה
                        </button>:
                        <button onClick={()=>{
                            handleUpdateBook({
                                update:{discount:0},
                                setRole,
                                navigate,
                                book
                            })
                        }}>
                            בטל הנחה קיימת
                        </button>
                    }
                    <button onClick={()=>{
                        navigate("/edit-book/"+book._id)
                    }}>
                        ערוך ספר
                    </button>
                    {book.available?
                        <button onClick={()=>{
                            handleUpdateBook({
                                update:{available:false},
                                setRole,
                                navigate,
                                book
                            })
                        }}>
                            הפוך ללא זמין
                        </button>:
                        <button onClick={()=>{
                            handleUpdateBook({
                                update:{available:true},
                                setRole,
                                navigate,
                                book
                            })
                        }}>
                            הפוך לזמין
                        </button>
                    }
                    <button onClick={async()=>{
                         const isAdminConfirm=window.confirm("האם אתה באמת רוצה למחוק את הספר "+book.name+"מהמאגר? *זאת פעולה בלתי הפיכה")
                         if (!isAdminConfirm)
                             return 
                         const token=sessionStorage.getItem("token")
                         try{
                             if (!token)
                                 throw new Error()
                             const {data:deletedBook}=await axios.delete(process.env.REACT_APP_BASIC_URL+"delete-book?_id="+book._id,{
                                 headers:{
                                     'Content-Type': 'application/json',
                                     "Authorization":"Bearer "+token
                                 }
                             })
                             console.log(deletedBook)
                             navigate("/")
                         }catch(err){
                             console.log(err)
                             if (err?.response?.status===500)
                                 alert("מצטערים לא הצלחנו להתקשר עם השרת ולכן הספר לא נמחק")
                             else if (err?.response?.status===400){
                                 navigate("/admin",{replace:true})
                                 alert("התנתקת לנו אתה מוזמן להתחבר שוב")
                                 setRole(ROLE_TYPES.guest)
                             }
                         }
                    }}>
                        מחק ספר
                    </button>
                </>
            }
            <div>
                <p>
                    תיאור:
                </p>
                <div className={
                    (/[א-ת]/.test(book.description)) ? "" : "english"
                }>
                    {book.description}
                </div>
            </div>
        </>
    )
}
export default BookDetails