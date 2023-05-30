import {AiOutlineSearch} from "react-icons/ai"
import "./BookSearcher.scss"
import { useRef } from "react"
import { useState } from "react"
function BooksSearcher(props){
    const inputRef=useRef(null)
    const [shouldPossibleBookNamesOpen,setShouldPossibleBookNamesOpen]=useState(false)
    return (
        <form className="search-books-container">
            <input type="search" ref={inputRef} 
                onBlur={()=>{
                    setShouldPossibleBookNamesOpen(false)
                }}
                onFocus={(event)=>{
                    setShouldPossibleBookNamesOpen(true)
                    props.setInputValue(event.target.value)

                }}
                onChange={(event)=>{
                    props.setInputValue(event.target.value)
                    console.log("lkkl")
                }}
            />
            {shouldPossibleBookNamesOpen&&props.possibleBookNames.length>0&&
                <div className="possible-book-names-container">
                    {props.possibleBookNames.map((name)=>(
                        <div key={Math.random()} onMouseDown={()=>{
                            console.log("JHJH")
                            const newState={...props.state}
                            newState.search=name
                            inputRef.current.value=name
                            newState.page=1
                            props.setState(newState) 
                        }}>{name}</div>
                    ))}
            </div>}
            <button type="submit" onClick={(event)=>{
                event.preventDefault()
                const newState={...props.state}
                newState.search=inputRef.current.value
                newState.page=1
                props.setState(newState)
            }}>
                <AiOutlineSearch size={40} color="#000060"/>
            </button>
        </form>
    )
}
export default BooksSearcher