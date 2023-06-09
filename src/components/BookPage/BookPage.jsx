import {useEffect, useState} from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import Book from "../Book/Book"
import "./BookPage.scss"
import BookDetails from "./BookDetails"
import FirstChapterModal1 from "./FirstChapterModal1"
import LoadingPage from "../LoadingPage/LoadingPage"
import { useContext } from "react"
import { SetGenericModalParams } from "../modal-componenets/GeneiclModal/GenericModal"

function BookPage(){
    const {bookId}=useParams()
    const navigate=useNavigate()
    const [book,setBook]=useState({})
    const [isBookFound,setIsBookFound]=useState(false)
    const [shouldFirstChapterModalOpen,setShouldFirstChapterModalOpen]=useState(false)
    const setGenericModalParams=useContext(SetGenericModalParams)
    useEffect(()=>{
        handleSetBook()
        console.log("11")
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
                    <FirstChapterModal1 book={book} setShouldFirstChapterModalOpen={setShouldFirstChapterModalOpen}/>
                }
                <table className="book-page-container">
                    <tbody>
                        <tr>
                            <td className="book-container">
                                <Book book={book} 
                                    deleteBookRealTime={deleteBookRealTime}
                                    updateBookRealTime={updateBookRealTime}
                                />
                            </td>
                            <td></td>
                            <td className="book-details">
                                {!book.available&&<h1>הספר לא זמין למכירה כרגע</h1>}
                                <BookDetails book={book} 
                                    setShouldFirstChapterModalOpen={setShouldFirstChapterModalOpen}
                                    deleteBookRealTime={deleteBookRealTime}
                                    updateBookRealTime={updateBookRealTime}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }
}
export default BookPage