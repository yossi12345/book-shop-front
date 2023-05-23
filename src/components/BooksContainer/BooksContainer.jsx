import "./BooksContainer.scss"
import allGenres from "../../allGenres"
import NavSelect from "./NavSelect"
import { Role } from "../RoleContext1"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import Book from "../Book/Book"
function BooksContainer(){
    const [failFindBooksMessage,setFailFindBooksMessage]=useState("")
    const [booksToShow,setBooksToShow]=useState([])
    const [state,setState]=useState({
        genre:allGenres[0],
        sort:"שם הספר א-ת"
    })
    const role=useContext(Role)
    useEffect(()=>{
        handleShowBooks()
    },[])
    useEffect(()=>{
        console.log(":::",state)
    },[state])
    async function handleShowBooks(searchParams){
        let url="http://localhost:5000/search"
        let seperator="?"
        for (const param in searchParams){
            url+=seperator+param+"="+searchParams[param]
            seperator="&"
        }
        try{
            const {data:books}=await axios.get(url,{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            setBooksToShow(books)
        }catch(err){
            if (err.response?.status===500)
                setFailFindBooksMessage("אנחנו מצטערים אין לנו קשר עם השרת כרגע ולכן אין לנו ספרים להציע")
            console.log(err)
        }
    }
    return (
        <div className="nav-and-books-container">
            <div className="books-nav">
                <NavSelect title="ז'אנר" options={allGenres} 
                    setState={setState} state={state} fieldStateToChange="genre"
                />
                <NavSelect title="סדר לפי" setState={setState} fieldStateToChange="sort" state={state}
                    options={[
                        "שם הספר א-ת","שם הספר ת-א",
                        "סופר א-ת","סופר ת-א","ז'אנר א-ת","ז'אנר ת-א"
                    ]}
                />
            </div>
            <div className="books-container">
                {
                    booksToShow.map((book)=>(
                       <Book key={Math.random()} book={book}/>
                    ))
                }    
            </div>
        </div>
    )
}
export default BooksContainer