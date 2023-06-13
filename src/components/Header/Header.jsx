import "./Header.scss"
import Logo from "../../images/logo.png"
import {RxPerson} from "react-icons/rx"
import {GiEntryDoor} from "react-icons/gi"
import CartButton from "./CartButton/CartButton"
import { useContext } from "react"
import { Role,SetRole } from "../RoleContext1"
import {  ROLE_TYPES } from "../../global-constants"
import {Link, NavLink, useLocation, useNavigate } from "react-router-dom"

function Header(props){
    const location=useLocation()
    const setRole=useContext(SetRole)
    const role=useContext(Role)
    const navigate=useNavigate()
    return ( 
        <header>
            <Link to="/">
                <div className="logo">
                    <img src={Logo} alt="books-tree"/>
                </div>
            </Link>
            <div className="hi-username">
                שלום
                <br/>
                {" "+props.username}<br/>
                {role===ROLE_TYPES.admin?" המנהל":""}
            </div>
            <div className="header-left-buttons-container">
                {role===ROLE_TYPES.admin?
                    <NavLink to="/create-book" className={({isActive})=>(isActive?"none":"")}>
                        <button className="not-icon-btn">
                            צור
                            ספר
                            חדש
                        </button>
                    </NavLink>:
                    <CartButton setShouldPayModalOpen={props.setShouldPayModalOpen}/>
                }
                {role===ROLE_TYPES.guest?
                    <button className="login-button" onClick={()=>{
                        props.openLoginModal(true)
                    }}>
                        <RxPerson size="100%"/>
                        <div className="login-select" onClick={event=>{event.stopPropagation()}}>
                            <div onClick={()=>{
                                props.openLoginModal(true)
                            }}>
                                התחברות
                            </div>
                            <div onClick={()=>{
                                props.openLoginModal(false)
                            }}>
                                הרשמה
                            </div>
                        </div>
                    </button>:
                    <button onClick={()=>{
                        if (role===ROLE_TYPES.admin)
                            navigate("/admin",{replace:true})
                        else if (location.pathname==="/edit-account")
                            navigate("/",{replace:true})
                        setRole(ROLE_TYPES.guest)
                        sessionStorage.removeItem("token")       
                    }}>
                        <GiEntryDoor size="100%"/>
                    </button>
                }
                {role!==ROLE_TYPES.guest&&
                    <NavLink to="/edit-account" className={({isActive})=>(isActive?"none":"")}>
                        <button className="not-icon-btn">
                            עדכון 
                            פרטי
                            חשבון
                        </button>
                    </NavLink>
                }
            </div>
        </header>
    )
}
export default Header