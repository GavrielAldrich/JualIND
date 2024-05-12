import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Test from "./components/Test";
import NoPage from "./components/NoPage";
import WrongPassword from './components/WrongPassword';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/wrongPassword' element={<WrongPassword />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/test' element={<Test />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>    
  );
}

export default App;
