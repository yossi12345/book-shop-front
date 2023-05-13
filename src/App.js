//import { useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import BooksContainer from './components/BooksContainer/BooksContainer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { Link } from 'react-router-dom';
function App() {
  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<BooksContainer/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
