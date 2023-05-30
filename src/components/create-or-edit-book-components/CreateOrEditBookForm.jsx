import { useContext, useState } from "react"
import { GENRES} from "../../global-constants"
import "./CreateOrEditBookForm.scss"
import { useNavigate } from "react-router-dom"
import { Role, SetRole } from "../RoleContext1"
import { handleCreateOrEditBook } from "./CreateOrEditBook-functions"
function CreateOrEditBookForm({book,isEdit}){
    const navigate=useNavigate()
    const setRole=useContext(SetRole)
    const role=useContext(Role)
    const [selectValue,setSelectValue]=useState("רומן אירוטי")
    const [inputsObj,setInputsObj]=useState({
        name:{
            label:"שם הספר:",
            value:isEdit?book.name:"",
            placeholder:"",
            key:Math.random()
        },
        author:{
            label:"שם הסופר:",
            value:isEdit?book.author:"",
            placeholder:"",
            key:Math.random()
        },
        bookCover:{
            label:"מקור לכריכה:",
            value:isEdit?book.bookCover:"",
            placeholder:"",
            key:Math.random()
        },
        price:{
            label:"מחיר:",
            value:isEdit?book.price:"",
            placeholder:"",
            key:Math.random()
        },
        discount:{
            label:
                <>
                    הנחה באחוזים<br/>
                    (אם יש)
                </>,
            value:(isEdit&&book.discount)?book.discount:"",
            placeholder:"",
            key:Math.random()
        }
    })
    const [textareasObj,setTextareasObj]=useState({
        description:{
            label:"תיאור:",
            value:isEdit?book.description:"",
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
            value:(isEdit&&book.firstChapter)?book.firstChapter:"",
            placeholder:"",
            key:Math.random(),
            isAllScreen:false
        }
    })
    return (
        <form className="create-book-form" onSubmit={(event)=>{
            event.preventDefault()
            handleCreateOrEditBook({
                navigate,
                setInputsObj,
                setTextareasObj,
                inputsObj,
                selectValue,
                textareasObj,
                role,
                isEdit,
                setRole,
                bookId:book?._id
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
//ספר שמדבר על אהבת הנעורים של זאב ביבי נתניהו ומירב מיכאלי. מירב מיכאלי קשורה במרתף כגימפ ושם מנצלים את שירותיה. זהו הסיפור האפל של רז וזאב ואני לא אחראי לשום דבר שנכתב בו 