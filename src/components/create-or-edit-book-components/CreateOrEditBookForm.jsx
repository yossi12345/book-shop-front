import { useContext, useMemo, useState } from "react"
import { GENRES} from "../../global-constants"
import "./CreateOrEditBookForm.scss"
import { useNavigate } from "react-router-dom"
import { Role, SetRole } from "../RoleContext1"
import { handleCreateOrEditBook } from "./CreateOrEditBook-functions"
import { SetGenericModalParams } from "../modal-componenets/GeneiclModal/GenericModal"
import FirstChapterModal from "../modal-componenets/FirstChapterModal/FirstChapterModal"
function CreateOrEditBookForm({book,isEdit}){
    const navigate=useNavigate()
    const setRole=useContext(SetRole)
    const role=useContext(Role)
    const setGenericModalParams=useContext(SetGenericModalParams)
    const [selectValue,setSelectValue]=useState(isEdit?book.genre:"רומן אירוטי")
    const [inputsParams,setInputsParams]=useState({
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
    const [descriptionParams,setDescriptionParams]=useState({
        value:isEdit?book.description:"",
        placeholder:"",
        isAllScreen:false
    })
    const [firstChapter,setFirstChapter]=useState(isEdit&&book?.firstChapter?book.firstChapter:"")
    const [bookCover,setBookCover]=useState(null)
    const [shouldFirstChapterModalOpen,setShouldFirstChapterModalOpen]=useState(false)
    const tempBookCoverSrc=useMemo(()=>{
        if (!bookCover&&isEdit)
            return book.bookCover
        if (bookCover)
            return URL.createObjectURL(bookCover)
        return ""
    },[bookCover])
    const descriptionInputClass=useMemo(()=>{
        const {value,isAllScreen}=descriptionParams
        return (/[א-ת]/.test(value)?"": "english ")+(isAllScreen?"all-screen":"")
    },[descriptionParams])
    function getExtnameFromFile(fileName){
        return fileName.slice(fileName.lastIndexOf(".")+1).toLowerCase()
    }
    return (
        <>
            {shouldFirstChapterModalOpen&&
                <FirstChapterModal firstChapter={firstChapter} closeModal={()=>{setShouldFirstChapterModalOpen(false)}}
            />}
            <div className="book-form-container">
                <form onSubmit={(event)=>{
                    console.log(":LK")
                    event.preventDefault()
                    handleCreateOrEditBook({  
                        navigate,
                        setInputsParams,
                        setBookCover,
                        inputsParams,
                        selectValue,
                        bookCover,
                        descriptionParams,
                        setDescriptionParams,
                        firstChapter,
                        setFirstChapter,
                        role,
                        isEdit,
                        setRole,
                        setGenericModalParams,
                        bookId:book?._id
                    })
                }}>
                    <div className="center">
                        <h4>{isEdit?"עדכון ספר":"יצירת ספר חדש"}</h4>
                    </div>
                    <table>
                        <tbody>
                            {Object.keys(inputsParams).map((field)=>(
                                <tr key={inputsParams[field].key}>
                                    <td>
                                        <label>
                                            {inputsParams[field].label}
                                        </label>
                                    </td>
                                    <td>
                                        <input value={inputsParams[field].value}
                                            placeholder={inputsParams[field].placeholder} 
                                            onChange={(event)=>{
                                                const newInputsObj={...inputsParams}
                                                newInputsObj[field].value=event.target.value
                                                setInputsParams(newInputsObj)
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
                                    <div className="file-input-container">
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
                                            const extname=getExtnameFromFile(file.name)
                                            const allowedExtnames=["jpeg","jpg","png"]
                                            if (!allowedExtnames.includes(extname))
                                                setGenericModalParams({content:"יש לבחור רק תמונות מסוג jpeg jpg png"})
                                            else if (file.size>1024*1024*100)
                                                setGenericModalParams({content:"התמונה שבחרת גדולה מדי"})
                                            else
                                                setBookCover(file)
                                        }}/>
                                    </div>
                                    {tempBookCoverSrc!==""&&
                                        <div className="book-cover-image-container">
                                            <img alt="book cover" src={tempBookCoverSrc} />
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
                            <tr>
                                <td>
                                    <label>
                                        תיאור:
                                    </label>
                                </td>
                                <td>
                                    <textarea value={descriptionParams.value}
                                        className={descriptionInputClass} 
                                        placeholder={descriptionParams.placeholder}
                                        onChange={(event)=>{
                                            const descriptionObjCopy={...descriptionParams}
                                            descriptionObjCopy.value=event.target.value
                                            setDescriptionParams(descriptionObjCopy)
                                        }}
                                        onDoubleClick={()=>{
                                            const descriptionObjCopy={...descriptionParams}
                                            descriptionObjCopy.isAllScreen=!descriptionParams.isAllScreen
                                            setDescriptionParams(descriptionObjCopy)
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr className="first-chapter-row">
                                <td className="first-chapter-buttons-container">
                                    {isEdit&&book?.firstChapter&&firstChapter!==book?.firstChapter&&
                                        <button onClick={()=>{
                                            setFirstChapter(book.firstChapter)
                                        }}>
                                            חזור לפרק המקורי
                                        </button>
                                    }
                                    {firstChapter!==""&&
                                        <button type="button" onClick={()=>{setShouldFirstChapterModalOpen(true)}}>
                                            צפה בפרק הראשון
                                        </button>
                                    }
                                </td>
                                <td>
                                    <div className="file-input-container">
                                        {firstChapter!==""?
                                            "נבחר פרק. לחץ כאן כדי להעלות אחר" 
                                            :
                                            "לחץ כאן כדי להעלות פרק ראשון" 
                                        }
                                        <input type="file" accept=".txt" value="" onChange={(event)=>{
                                            const file=event.target.files[0]
                                            const extname=getExtnameFromFile(file.name)
                                            const allowedExtnames=["txt"]
                                            if (!allowedExtnames.includes(extname)){
                                                setGenericModalParams({content:"יש לבחור רק קבצים מסוג txt"})
                                                return 
                                            }   
                                            const reader=new FileReader() 
                                            reader.onload = (readerEvent) => {
                                                setFirstChapter(readerEvent.target.result)
                                            }
                                            reader.readAsText(file)//the computer finish to load the file and then go to the onload event above
                                        }}/>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="submit-button-container">
                        <button type="submit" className="submit-button">
                            {isEdit?"עדכן ספר":"צור ספר"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default CreateOrEditBookForm
