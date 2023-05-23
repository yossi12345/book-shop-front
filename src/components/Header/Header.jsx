import "./Header.scss"
import Logo from "../../images/logo.png"
import {AiOutlineSearch} from "react-icons/ai"
import {RxPerson} from "react-icons/rx"
import {GiEntryDoor} from "react-icons/gi"
import {FaArrowRight} from "react-icons/fa"
import { useState } from "react"
import BooksSearcher from "./BooksSearcher"
import CartButton from "./CartButton/CartButton"
import { useContext } from "react"
import { Role } from "../RoleContext1"
function Header(props){
    const role=useContext(Role)
    const [shouldSearchHeaderOpen,setShouldSearchHeaderOpen]=useState(false)
    console.log(role)
    return (
        <> 
            <header className={"search-header"+(shouldSearchHeaderOpen?" height168":"")}>
                <button onClick={()=>{
                    const shouldSearchHeaderOpenCopy=shouldSearchHeaderOpen
                    setShouldSearchHeaderOpen(!shouldSearchHeaderOpenCopy)
                }}>
                    <FaArrowRight size={35} color="white"/>
                </button>
                <BooksSearcher/>
            </header>
            
            <header>
                <div className="logo">
                    <img src={Logo} alt="books-tree"/>
                    <div className="title">אולי ספרים לא יכולים לגדול על עצים אבל אתם כן</div>
                </div>
                <BooksSearcher/>
                <div className="header-left-buttons-container">
                {role==="admin"?
                    <button className="not-icon-btn create-book-btn" onClick={()=>{
                        props.setShouldCreateBookModalOpen(true)
                    }}>
                        צור ספר חדש
                    </button>:

                   <CartButton setShouldPayModalOpen={props.setShouldPayModalOpen}/>
                }
                {role==="admin"&&
                    <button className="not-icon-btn" onClick={()=>{
                        props.setShouldDeleteUserModalOpen(true)
                    }}>
                        מחק משתמש
                    </button>
                }
                    <button className="left-search-books-btn" onClick={()=>{
                         const shouldSearchHeaderOpenCopy=shouldSearchHeaderOpen
                         setShouldSearchHeaderOpen(!shouldSearchHeaderOpenCopy)
                    }}>
                        <AiOutlineSearch size="100%"/>
                    </button>
                    {role==="guest"?
                        <button onClick={()=>{
                            props.setLoginModalShouldOpen(true)
                        }}>
                            <RxPerson size="100%"/>
                        </button>:
                        <button>
                            <GiEntryDoor size="100%"/>
                        </button>
                    }
                </div>
            </header>
        </>
    )
}
export default Header