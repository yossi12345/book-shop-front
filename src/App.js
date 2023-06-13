import './App.scss';
import Header from './components/Header/Header';
import BooksContainer from './components/BooksContainer/BooksContainer';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState } from 'react';
import LoginModal from './components/modal-componenets/LoginModal/LoginModal';
import PayModal from './components/modal-componenets/PayModal/PayModal';
import BuyBooks from './components/BuyBooks/BuyBooks';
import Confetti from "react-confetti"
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import AdminForm from './components/AdminForm/AdminForm';
import RoleContext1 from './components/RoleContext1';
import CartItemsContext from './components/CartItemsContext/CartItemsContext';
import { GUEST_NAME } from './global-constants';
import BookPage from './components/BookPage/BookPage';
import CreateBook from './components/create-or-edit-book-components/CreateBook';
import EditBook from './components/create-or-edit-book-components/EditBook';
import UpdateUser from './components/UpdateUser/UpdateUser';
import GenericModal from './components/modal-componenets/GeneiclModal/GenericModal';
import {HiHome} from "react-icons/hi"
function App() {
  const [loginModalParams,setLoginModalParams]=useState({
    shouldOpen:false,
    isSignIn:true
  })
  function openLoginModal(isSignIn){
    setLoginModalParams({
      shouldOpen:true,
      isSignIn
    })
  }
  const [shouldPayModalOpen,setShouldPayModalOpen]=useState(false)
  const [shouldRunConfetti,setShouldRunConfetti]=useState(false)
  const [username,setUsername]=useState(GUEST_NAME)
  return (
    <GenericModal>
      <RoleContext1 openLoginModal={openLoginModal} setUsername={setUsername}>
        <CartItemsContext>
          {loginModalParams.shouldOpen&&<LoginModal
            setUsername={setUsername} 
            setLoginModalParams={setLoginModalParams}
            loginModalParams={loginModalParams}
          />}
          {shouldPayModalOpen&&<PayModal 
              setShouldPayModalOpen={setShouldPayModalOpen}
              setShouldRunConfetti={setShouldRunConfetti}
          />}
          {shouldRunConfetti&&
            <div className='confetti-container'>
              <Confetti style={{width:"100vw",height:"100vh"}}/>
              הקנייה הצליחה
            </div>
          }
          <BrowserRouter>
              <Header 
                openLoginModal={openLoginModal} 
                setShouldPayModalOpen={setShouldPayModalOpen}
                username={username}
                setUsername={setUsername}
              />
              <Routes>
                <Route path='/' element={<BooksContainer/>}/>
                <Route path='/buy-books' element={<BuyBooks setShouldPayModalOpen={setShouldPayModalOpen}/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
                <Route path='/admin' element={<AdminForm setUsername={setUsername}/>}/>
                <Route path='/book/:bookId' element={<BookPage/>}/>
                <Route path="/create-book" element={<CreateBook setUsername={setUsername}/>}/>
                <Route path="/edit-book/:bookId" element={<EditBook setUsername={setUsername}/>}/>
                <Route path='/edit-account' element={<UpdateUser 
                              openLoginModal={openLoginModal} 
                              setUsername={setUsername}/>}
                />
              </Routes>
              <div className='center'>
                <NavLink to="/" className={({isActive})=>isActive?"none":""}>
                  <HiHome size={30}/>                
                </NavLink>
              </div>
          </BrowserRouter>
        </CartItemsContext>
      </RoleContext1> 
    </GenericModal>
  );
}

export default App;
