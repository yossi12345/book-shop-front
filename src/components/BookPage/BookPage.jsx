import {useEffect, useState} from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import Book from "../Book/Book"
import "./BookPage.scss"
import BookDetails from "./BookDetails"
import FirstChapterModal1 from "./FirstChapterModal1"

function BookPage(){
    const {bookId}=useParams()
    const navigate=useNavigate()
   
    const [book,setBook]=useState({})
    const [shouldFirstChapterModalOpen,setShouldFirstChapterModalOpen]=useState(false)
    useEffect(()=>{
        handleSetBook()
        console.log("11")
    },[])
    async function handleSetBook(){
        try{
            const {data:result}=await axios.get(process.env.REACT_APP_BASIC_URL+"get?_id="+bookId,{
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setBook(result)
        }catch(err){
            console.log("fgf",err)
            navigate("/llllllllll",{replace:true})
            if (err.response.status===404)
                alert("אנחנו מצטערים אבל לא מצאנו את הספר שחיפשת")
            else
                alert("אין לנו חיבור עם השרת כרגע ולכן אנחנו לא יכולים להראות לך את הספר שאתה מחפש") 
        }
    }
    console.log("gdfgdfg",book)
    return (
        <>
            {shouldFirstChapterModalOpen&&
                <FirstChapterModal1 book={book} setShouldFirstChapterModalOpen={setShouldFirstChapterModalOpen}/>
            }
            <table className="book-page-container">
                <tbody>
                    <tr>
                        <td className="book-container">
                            <Book book={book}/>
                        </td>
                        <td></td>
                        <td className="book-details">
                            {!book.available&&<h1>הספר לא זמין למכירה כרגע</h1>}
                            <BookDetails book={book} setShouldModalOpen={setShouldFirstChapterModalOpen}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
export default BookPage