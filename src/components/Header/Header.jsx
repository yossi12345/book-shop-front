import "./Header.scss"
import Logo from "../../images/logo.png"
import {RxPerson} from "react-icons/rx"
import {GiEntryDoor} from "react-icons/gi"
import CartButton from "./CartButton/CartButton"
import { useContext } from "react"
import { Role,SetRole } from "../RoleContext1"
import { GUEST_NAME, ROLE_TYPES } from "../../global-constants"
import { useNavigate,NavLink } from "react-router-dom"
function Header(props){
    const navigate=useNavigate()
    const setRole=useContext(SetRole)
    const role=useContext(Role)
    return ( 
        <header>
            <div className="logo">
                <img src={Logo} alt="books-tree"/>
                <div className="title">אולי ספרים לא יכולים לגדול על עצים אבל אתם כן</div>
            </div>
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
                {role===ROLE_TYPES.user&&
                    <button className="not-icon-btn" onClick={()=>{
                        props.setShouldDeleteUserModalOpen(true)
                    }}>
                        מחק משתמש
                    </button>
                }
                {role===ROLE_TYPES.guest?
                    <button onClick={()=>{
                        props.setLoginModalShouldOpen(true)
                    }}>
                        <RxPerson size="100%"/>
                    </button>:
                    <button onClick={()=>{
                        setRole(ROLE_TYPES.guest)
                        props.setUsername(GUEST_NAME)
                        sessionStorage.removeItem("token")
                    }}>
                        <GiEntryDoor size="100%"/>
                    </button>
                }
            </div>
        </header>
    )
}
export default Header