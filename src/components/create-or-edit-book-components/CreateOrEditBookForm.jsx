import { useContext, useState } from "react"
import { GENRES} from "../../global-constants"
import "./CreateOrEditBookForm.scss"
import { useNavigate } from "react-router-dom"
import { Role, SetRole } from "../RoleContext1"
import { handleCreateOrEditBook } from "./CreateOrEditBook-functions"
import { SetGenericModalParams } from "../modal-componenets/GeneiclModal/GenericModal"
function CreateOrEditBookForm({book,isEdit}){
    const navigate=useNavigate()
    const setRole=useContext(SetRole)
    const role=useContext(Role)
    const setGenericModalParams=useContext(SetGenericModalParams)
    const [selectValue,setSelectValue]=useState(isEdit?book.genre:"רומן אירוטי")
    const [inputsObj,setInputsObj]=useState({
        name:{
            label:"שם הספר:",
            value:isEdit?book.name+"":"",
            placeholder:"",
            key:Math.random()
        },
        author:{
            label:"שם הסופר:",
            value:isEdit?book.author+"":"",
            placeholder:"",
            key:Math.random()
        },
        price:{
            label:"מחיר:",
            value:isEdit?book.price+"":"",
            placeholder:"",
            key:Math.random()
        },
        discount:{
            label:
                <>
                    הנחה באחוזים<br/>
                    (אם יש)
                </>,
            value:(isEdit&&book.discount)?book.discount+"":"",
            placeholder:"",
            key:Math.random()
        }
    })
    const [textareasObj,setTextareasObj]=useState({
        description:{
            label:"תיאור:",
            value:isEdit?book.description+"":"",
            placeholder:"",
            key:Math.random(),
            isAllScreen:false
        },
        firstChapter:{
            label:
                <>
                    פרק ראשון<br/>
                    (אם יש)
                </>,
            value:(isEdit&&book.firstChapter)?book.firstChapter+"":"",
            placeholder:"",
            key:Math.random(),
            isAllScreen:false
        }
    })
    const [bookCover,setBookCover]=useState(null)
    return (
        <form className="create-book-form" onSubmit={(event)=>{
            event.preventDefault()
            handleCreateOrEditBook({
                navigate,
                setInputsObj,
                setTextareasObj,
                setBookCover,
                inputsObj,
                selectValue,
                textareasObj,
                bookCover,
                role,
                isEdit,
                setRole,
                setGenericModalParams,
                bookId:book?._id,
            })
        }}>
            <table>
                <tbody>
                    {Object.keys(inputsObj).map((field)=>(
                        <tr key={inputsObj[field].key}>
                            <td>
                                <label>
                                    {inputsObj[field].label}
                                </label>
                            </td>
                            <td>
                                <input value={inputsObj[field].value}
                                    placeholder={inputsObj[field].placeholder} 
                                    onChange={(event)=>{
                                        const newInputsObj={...inputsObj}
                                        newInputsObj[field].value=event.target.value
                                        setInputsObj(newInputsObj)
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                    <tr className="book-cover-row">
                        <td>
                            {isEdit&&bookCover&&
                                <button onClick={()=>{
                                    setBookCover(null)
                                }}>
                                    חזור לכריכה המקורית
                                </button>
                            }
                        </td>
                        <td>
                            <div className="input-container">
                                {bookCover&&
                                    <>{
                                        "נבחר: "+
                                        (bookCover.name.length<20?
                                            bookCover.name:
                                            (bookCover.name.slice(0,18)+"...")
                                        )
                                    }</>
                                }
                                {!bookCover&&isEdit&&
                                    <div>
                                        לבחירת כריכת ספר <b>חדשה</b> לחץ כאן
                                    </div>
                                }
                                {!bookCover&&!isEdit&&
                                    <>
                                        לבחירת כריכת ספר לחץ כאן
                                    </>
                                }

                                <input type="file" accept=".jpeg,.jpg,.png" value="" onChange={(event)=>{
                                    const file=event.target.files[0]
                                    const extname=file.name.slice(file.name.lastIndexOf(".")).toLowerCase()
                                    console.log("JH",file)
                                    if (extname!==".jpeg"&&extname!==".jpg"&&extname!==".png")
                                        setGenericModalParams({content:"יש לבחור רק תמונות מסוג jpeg jpg png"})
                                    else if (file.size>1024*1024*100)
                                        setGenericModalParams({content:"התמונה שבחרת גדולה מדי"})
                                    else
                                        setBookCover(file)
                                    
                                }}/>
                            </div>
                            {bookCover&&
                                <div className="book-cover-image-container">
                                    <img alt="book cover" src={URL.createObjectURL(bookCover)} />
                                </div>
                            }
                            {!bookCover&&isEdit&&
                                <div className="book-cover-image-container">
                                    <img alt="book cover" src={book?.bookCover}/>
                                </div>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>
                                ז'אנר
                            </label>
                        </td>
                        <td>
                            <select value={selectValue} onChange={event=>setSelectValue(event.target.value)}>
                                {GENRES.map((genre)=>(
                                    <option key={Math.random()}>{genre}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    {Object.keys(textareasObj).map((field)=>(
                        <tr key={textareasObj[field].key}>
                            <td>
                                <label>
                                    {textareasObj[field].label}
                                </label>
                            </td>
                            <td>
                                <textarea value={textareasObj[field].value}
                                    className={textareasObj[field].isAllScreen?"all-screen":""} 
                                    placeholder={textareasObj[field].placeholder}
                                    onChange={(event)=>{
                                        const newTextareasObj={...textareasObj}
                                        newTextareasObj[field].value=event.target.value
                                        setTextareasObj(newTextareasObj)
                                    }}
                                    onDoubleClick={()=>{
                                        const newTextareasObj={...textareasObj}
                                        newTextareasObj[field].isAllScreen=!textareasObj[field].isAllScreen
                                        setTextareasObj(newTextareasObj)
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="submit-button-container">
                <button type="submit" className="submit-button">
                    {isEdit?"עדכן ספר":"צור ספר"}
                </button>
            </div>
        </form>
    )
}
export default CreateOrEditBookForm
