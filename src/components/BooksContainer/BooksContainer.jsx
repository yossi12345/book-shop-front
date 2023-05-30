import "./BooksContainer.scss"
import NavSelect from "./NavSelect"
import { Role } from "../RoleContext1"
import { useContext, useEffect, useState } from "react"
import Book from "../Book/Book"
import {handleShowBooks,changeSortFieldsInState } from "./BooksContainer-functions"
import BooksSearcher from "./BookSearcher/BooksSearcher"
import { GENRES, ROLE_TYPES,SORT_OPTIONS } from "../../global-constants"
function BooksContainer(){
    const [genreSelectValue,setGenreSelectValue]=useState("כל הז'אנרים")
    const [sortSelectValue,setSortSelectValue]=useState("שם הספר א-ת")
    const role=useContext(Role)
    const [failFindBooksMessage,setFailFindBooksMessage]=useState("")
    const [isThereMoreBooks,setIsThereMoreBooks]=useState(true)
    const [booksToShow,setBooksToShow]=useState([])
    const [state,setState]=useState({
        genre:"כל הז'אנרים",
        sort:"name",
        asending:true,
        page:1,
        search:""
    })
    const [inputValue,setInputValue]=useState("")
    const [possibleBookNames,setPossibleBookNames]=useState([])
    function passPages(pagesAmountTopass){
        const stateCopy={...state}
        stateCopy.page=stateCopy.page+pagesAmountTopass
        setState(stateCopy)
    }
    useEffect(()=>{
        handleShowBooks({
            state:{
                ...state,
                search:inputValue

            },
            isAdmin:role===ROLE_TYPES.admin,
            setBooksToShow:setPossibleBookNames,
            isPossibleBooks:true,
            setFailFindBooksMessage,
            setIsThereMoreBooks
        })
    },[inputValue])
    useEffect(()=>{
        handleShowBooks({
            state,
            isAdmin:role===ROLE_TYPES.admin,
            setBooksToShow,
            setFailFindBooksMessage,
            setIsThereMoreBooks
        })
    },[state])
    return (
        <div className="nav-and-books-and-pages-container">
            <div className="books-nav">
                <BooksSearcher state={state} setState={setState} possibleBookNames={possibleBookNames} setInputValue={setInputValue}/>
                <div>
                    <NavSelect title="ז'אנר" options={["כל הז'אנרים"].concat(GENRES)} 
                        selectValue={genreSelectValue} setSelectValue={setGenreSelectValue}
                        changeState={(selectedValue)=>{
                            const newState={...state}
                            newState.genre=selectedValue
                            newState.page=1
                            setState(newState)
                        }}
                    />
                    <NavSelect title="סדר לפי" options={SORT_OPTIONS} 
                        selectValue={sortSelectValue} setSelectValue={setSortSelectValue}
                        changeState={(selectedValue)=>{
                            changeSortFieldsInState({state,setState,selectedValue})
                        }}
                    />
                </div>
            </div>
            <div className="books-container">
                {booksToShow.length>0?
                    booksToShow.map((book)=>(
                        <Book key={Math.random()} book={book}/>
                    )):
                    <div>
                        {failFindBooksMessage}
                    </div>
                }    
            </div>
            <div className="pages">
                {state.page>1&&
                   <a href="/" onClick={(event)=>{
                        event.preventDefault() 
                        passPages(-1)
                   }}>
                    {(state.page-1)+" "}
                   </a>
                }
                {(state.page>1||isThereMoreBooks)&&
                    <a>
                        {state.page+" "}
                    </a>
                }
                {isThereMoreBooks&&
                    <a href="/" onClick={(event)=>{
                       event.preventDefault() 
                       passPages(1)
                    }}>
                        {(state.page+1)+" "}
                    </a>
                }
            </div>
        </div>
    )
}
export default BooksContainer