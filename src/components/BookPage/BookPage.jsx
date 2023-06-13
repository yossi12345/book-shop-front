import {useEffect, useState} from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import Book from "../Book/Book"
import "./BookPage.scss"
import BookDetails from "./BookDetails"
import LoadingPage from "../LoadingPage/LoadingPage"
import { useContext } from "react"
import { SetGenericModalParams } from "../modal-componenets/GeneiclModal/GenericModal"
import FirstChapterModal from "../modal-componenets/FirstChapterModal/FirstChapterModal"
function BookPage(){
    const {bookId}=useParams()
    const navigate=useNavigate()
    const [book,setBook]=useState({})
    const [isBookFound,setIsBookFound]=useState(false)
    const [shouldFirstChapterModalOpen,setShouldFirstChapterModalOpen]=useState(false)
    const setGenericModalParams=useContext(SetGenericModalParams)
    useEffect(()=>{
        handleSetBook()
    },[])
    function deleteBookRealTime(){
        navigate(-1,{replace:true})
        setGenericModalParams({content:"הספר נמחק בהצלחה"})
    }
    function updateBookRealTime(updatesObj){
        const updatedBook={...book}
        for (const updateKey in updatesObj){
            updatedBook[updateKey]=updatesObj[updateKey]
        }
        setBook(updatedBook)
    }
    async function handleSetBook(){
        try{
            const {data:result}=await axios.get(process.env.REACT_APP_BASIC_URL+"get?_id="+bookId,{
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setBook(result)
            setIsBookFound(true)
        }catch(err){
            console.log("fgf",err)
            navigate("/llllllllll",{replace:true})
            if (err.response.status===404)
                setGenericModalParams({content:"אנחנו מצטערים אבל לא מצאנו את הספר שחיפשת"})
            else
                setGenericModalParams({content:"אין לנו חיבור עם השרת כרגע ולכן אנחנו לא יכולים להראות לך את הספר שאתה מחפש"}) 
        }
    }
    if (!isBookFound){
        return (
            <LoadingPage/>
        )
    }
    else{
        return (
            <>
                {shouldFirstChapterModalOpen&&
                    <FirstChapterModal firstChapter={book.firstChapter} closeModal={()=>{setShouldFirstChapterModalOpen(false)}}/>
                }
                <div className="book-page-container">    
                    <div >
                        <Book book={book} 
                            deleteBookRealTime={deleteBookRealTime}
                            updateBookRealTime={updateBookRealTime}
                        />
                    </div>
                    <div className="book-details">
                        {!book.available&&<h1>הספר לא זמין למכירה כרגע</h1>}
                        <BookDetails book={book} 
                            setShouldFirstChapterModalOpen={setShouldFirstChapterModalOpen}
                            deleteBookRealTime={deleteBookRealTime}
                            updateBookRealTime={updateBookRealTime}
                        />
                    </div> 
                </div>
            </>
        )
    }
}
export default BookPage