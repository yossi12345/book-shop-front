import "./Header.scss"
import Logo from "../../images/logo.png"
import {AiOutlineSearch} from "react-icons/ai"
import {RxPerson} from "react-icons/rx"
import {GiEntryDoor} from "react-icons/gi"
import {FaArrowRight} from "react-icons/fa"
import { useState } from "react"
import BooksSearcher from "./BooksSearcher"
import jwtDecode from 'jwt-decode';
import CartButton from "./CartButton/CartButton"
function Header(props){
    // console.log(jwtDecode(
    //     localStorage.getItem("token")
    //     )
    // )
    const [shouldSearchHeaderOpen,setShouldSearchHeaderOpen]=useState(false)
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
                   <CartButton setShouldPayModalOpen={props.setShouldPayModalOpen}/>
                    <button onClick={()=>{
                         const shouldSearchHeaderOpenCopy=shouldSearchHeaderOpen
                         setShouldSearchHeaderOpen(!shouldSearchHeaderOpenCopy)
                    }}>
                        <AiOutlineSearch size="100%"/>
                    </button>
                    <button onClick={()=>{
                        props.setLoginModalShouldOpen(true)
                    }}>
                        <RxPerson size="100%"/>
                    </button>
                </div>
            </header>
        </>
    )
}
export default Header