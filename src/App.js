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
import { GUEST_NAME } from './global-constants';
import BookPage from './components/BookPage/BookPage';
import CreateBook from './components/create-or-edit-book-components/CreateBook';
import EditBook from './components/create-or-edit-book-components/EditBook';
import UpdateUser from './components/UpdateUser/UpdateUser';
function App() {// יש בעיה בחלק של הראוטים הנפרדים לאדמין שאורח שיש לו טוקן יכול לרשום את הראוט בשורת כתובת וזה יישאר "לטעון" לעד 
  const [loginModalShouldOpen,setLoginModalShouldOpen]=useState(false)
  const [shouldPayModalOpen,setShouldPayModalOpen]=useState(false)
  const [shouldRunConfetti,setShouldRunConfetti]=useState(false)
  const [shouldCreateBookModalOpen,setShouldCreateBookModalOpen]=useState(false)
  const [shouldDeleteUserModalOpen,setShouldDeleteUserModalOpen]=useState(false)
  const [username,setUsername]=useState(GUEST_NAME)
  return (
    <RoleContext1 setLoginModalShouldOpen={setLoginModalShouldOpen} setUsername={setUsername}>
      <CartItemsContext>
        {loginModalShouldOpen&&<LoginModal
          setUsername={setUsername} 
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
            <Header 
              setLoginModalShouldOpen={setLoginModalShouldOpen} 
              setShouldPayModalOpen={setShouldPayModalOpen}
              setShouldCreateBookModalOpen={setShouldCreateBookModalOpen}
              setShouldDeleteUserModalOpen={setShouldDeleteUserModalOpen}
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
              <Route path='/update-user/password' element={<UpdateUser fieldToChange="password"/>}/>
              <Route path='/update-user/username' element={<UpdateUser fieldToChange="username"/>}/>
              <Route path='/update-user/email' element={<UpdateUser fieldToChange="email"/>}/>
            </Routes>
        </BrowserRouter>
      </CartItemsContext>
    </RoleContext1> 
  );
}

export default App;
