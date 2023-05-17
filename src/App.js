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
//import { Link } from 'react-router-dom';
function App() {
  const [loginModalShouldOpen,setLoginModalShouldOpen]=useState(false)
  const [shouldPayModalOpen,setShouldPayModalOpen]=useState(false)
  const [shouldRunConfetti,setShouldRunConfetti]=useState(false)
  return (
    <>
      {loginModalShouldOpen&&<LoginModal setLoginModalShouldOpen={setLoginModalShouldOpen}/>}
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
            setLoginModalShouldOpen={setLoginModalShouldOpen} 
            setShouldPayModalOpen={setShouldPayModalOpen}
          />
        <Routes>
          <Route path='/' element={<BooksContainer/>}/>
          <Route path='/buy-books' element={<BuyBooks setShouldPayModalOpen={setShouldPayModalOpen}/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
          <Route path='admin' element={<AdminForm/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
