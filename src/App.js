//import { useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import BooksContainer from './components/BooksContainer/BooksContainer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import LoginModal from './components/modal-componenets/LoginModal/LoginModal';
import PayModal from './components/modal-componenets/PayModal/PayModal';
import BuyBooks from './components/BuyBooks/BuyBooks';
import Confetti from "react-confetti"
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import AdminForm from './components/AdminForm/AdminForm';
import RoleContext1 from './components/RoleContext1';
import CreateBookModal from './components/modal-componenets/CreateBookModal/CreateBookModal';
import DeleteUserModal from './components/modal-componenets/DeleteUserModal/DeleteUserModal';
import CartItemsContext from './components/CartItemsContext/CartItemsContext';
function App() {
  const [loginModalShouldOpen,setLoginModalShouldOpen]=useState(false)
  const [shouldPayModalOpen,setShouldPayModalOpen]=useState(false)
  const [shouldRunConfetti,setShouldRunConfetti]=useState(false)
  const [shouldCreateBookModalOpen,setShouldCreateBookModalOpen]=useState(false)
  const [shouldDeleteUserModalOpen,setShouldDeleteUserModalOpen]=useState(false)
  console.log(sessionStorage.getItem("token"))
  return (
    <RoleContext1 setLoginModalShouldOpen={setLoginModalShouldOpen}>
      {loginModalShouldOpen&&<LoginModal 
        setLoginModalShouldOpen={setLoginModalShouldOpen}
      />}
      {shouldPayModalOpen&&<PayModal 
          setShouldPayModalOpen={setShouldPayModalOpen}
          setShouldRunConfetti={setShouldRunConfetti}
      />}
      {shouldDeleteUserModalOpen&&<DeleteUserModal
          setShouldDeleteUserModalOpen={setShouldDeleteUserModalOpen}
          />}
      {shouldRunConfetti&&
        <div className='confetti-container'>
          <Confetti style={{width:"100vw",height:"100vh"}}/>
          הקנייה הצליחה
        </div>
      }
      <BrowserRouter>
        {shouldCreateBookModalOpen&&<CreateBookModal
            setShouldCreateBookModalOpen={setShouldCreateBookModalOpen}
        />}
        <CartItemsContext>
          <Header 
            setLoginModalShouldOpen={setLoginModalShouldOpen} 
            setShouldPayModalOpen={setShouldPayModalOpen}
            setShouldCreateBookModalOpen={setShouldCreateBookModalOpen}
            setShouldDeleteUserModalOpen={setShouldDeleteUserModalOpen}
          />
          <Routes>
            <Route path='/' element={<BooksContainer/>}/>
            <Route path='/buy-books' element={<BuyBooks setShouldPayModalOpen={setShouldPayModalOpen}/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
            <Route path='/admin' element={<AdminForm/>}/>
          </Routes>
        </CartItemsContext>
      </BrowserRouter>
    </RoleContext1> 
  );
}

export default App;
