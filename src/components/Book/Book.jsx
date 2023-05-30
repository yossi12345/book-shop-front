import "./Book.scss"
import {MdOutlineAddShoppingCart} from "react-icons/md"
import {BsCartDash} from "react-icons/bs"
import { useContext } from "react"
import { Role, SetRole } from "../RoleContext1"
import getActualBookPrice from "../getActualBookPrice"
import { CartItems, SetCartItems } from "../CartItemsContext/CartItemsContext"
import {TbTrashOff} from "react-icons/tb"
import {BsFillTrash3Fill} from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { ROLE_TYPES } from "../../global-constants"
import axios from "axios"
import { handleUpdateBook } from "../handleUpdateBook"
import unavailableSign from "../../images/unavailable-sign.jpg"
function Book({book}){
    const cartItems=useContext(CartItems)
    const setCartItems=useContext(SetCartItems)
    const role=useContext(Role)
    const setRole=useContext(SetRole)
    const navigate=useNavigate()
   
    return (
        <div className="book" >
            <label className="label">
                {book.name}
            </label>
            <div className="book-buttons-container">
                {role!==ROLE_TYPES.admin&&
                    <>
                        {(cartItems.some(bookItem=>bookItem._id===book._id)&&!book.deleted)&&
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
                                handleUpdateBook({
                                    update:{available:false},
                                    setRole,
                                    navigate,
                                    book
                                })
                            }}>
                                הפוך<br/>
                                 ללא<br/>
                                זמין
                            </button>:
                            <button className="not-icon-btn" onClick={()=>{//הפוך לזמין
                                handleUpdateBook({
                                    update:{available:true},
                                    setRole,
                                    navigate,
                                    book  
                                })
                            }}>
                                <TbTrashOff color="white" size={33}/>
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
                                else {
                                    navigate("/admin",{replace:true})
                                    alert("התנתקת לנו אתה מוזמן להתחבר שוב")
                                    setRole(ROLE_TYPES.guest)
                                }
                            }
                        }}>
                            <BsFillTrash3Fill color="white" size={26}/>
                        </button>
                        {book.discount>0?
                            <button className="not-icon-btn" onClick={()=>{
                                handleUpdateBook({
                                    update:{discount:0},
                                    setRole,
                                    navigate,
                                    book
                                })
                            }}>
                                בטל
                                הנחה
                                קיימת
                            </button>:
                            <button className="not-icon-btn" onClick={()=>{
                               const discountString=prompt("כתוב כאן את ההנחה שאתה רוצה באחוזים")
                               const discount=discountString*1
                                if (discount!==""&&discount>=0&&discount<=100){
                                    handleUpdateBook({
                                        update:{discount},
                                        setRole,
                                        navigate,
                                        book
                                    })
                                }
                            }}>
                                צור
                                הנחה 
                            </button>
                        }
                        <button className="not-icon-btn" onClick={()=>{
                            navigate("/edit-book/"+book._id)
                        }}>
                            ערוך<br/>
                            ספר
                        </button>
                    </>
                }
            </div>
            <div  onDoubleClick={()=>{
                    if (!book.deleted)
                       navigate("/book/"+book._id)
                    console.log("HGHGGH")
                }}>
                <img src={book.bookCover} alt="book cover"/>
                {!book.available&&<img src={unavailableSign} alt="unavailable" className="unavailable-img" />}
            </div>
            <label className="label">
                {role===ROLE_TYPES.admin?
                    <>
                        {"מחיר אמיתי: "+book.price}
                            <br/>
                        {"מחיר לאחר הנחה: "+getActualBookPrice(book,role)}
                    </>:
                    <>
                        {"מחיר: "+getActualBookPrice(book,role)}
                    </>
                }
            </label>
        </div>
    )
}
export default Book