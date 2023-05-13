import "./Header.scss"
import Logo from "../../images/logo.png"
import shekelSign from "../../images/shekel-sign.png"
import booksPile from "../../images/books-pile.png"
import {AiOutlineSearch} from "react-icons/ai"
import {RxPerson} from "react-icons/rx"
import {GiEntryDoor,GiShoppingCart} from "react-icons/gi"
import {FaArrowRight} from "react-icons/fa"
import { useState } from "react"

function Header(){
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
                <form className="search-books-container">
                    <input/>
                    <button type="submit">
                        <AiOutlineSearch size={40} color="#000060"/>
                    </button>
                </form>
            </header>
            
            <header>
                <div className="logo">
                    <img src={Logo} alt="books-tree"/>
                    <div className="title">אולי ספרים לא יכולים לגדול על עצים אבל אתם כן</div>
                </div>
                <form className="search-books-container">
                    <input type="search"/>
                    <button type="submit">
                        <AiOutlineSearch size={40} color="#000060"/>
                    </button>
                </form>
                <div className="header-left-buttons-container">
                    <button className="header-shop-cart">
                        <GiShoppingCart size={30}/>
                        <div>
                            <img src={booksPile} alt="books amount"/>
                            00
                        </div>
                        <div>
                            <img src={shekelSign} alt="total price"/>
                            000
                        </div>
                    </button>
                    <button onClick={()=>{
                         const shouldSearchHeaderOpenCopy=shouldSearchHeaderOpen
                         setShouldSearchHeaderOpen(!shouldSearchHeaderOpenCopy)
                    }}>
                        <AiOutlineSearch size="100%"/>

                    </button>
                    <button>
                        <RxPerson size="100%"/>
                    </button>
                </div>
            </header>
        </>
    )
}
export default Header