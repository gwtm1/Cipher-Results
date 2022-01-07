/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import Homepage from '../components/Homepage';
import Signup from '../components/Signup';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'


const Routing = () => {

  return (
    <Routes>
      <Route exact path='/' element={<Homepage />}/> 
      <Route exact path='/signup' element={<Signup />}/>
      <Route exact path='/login' element={<Login />}/>
    </Routes>
  )
}


function App() {

  const [isloggedIn,setIsloggedIn] = useState(true);
  

  const logout = (state)=>{
    console.log(state);
    setIsloggedIn(state);
    console.log(isloggedIn);
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Header isloggedIn={isloggedIn} logout={logout} /> 
        <Routing/>
      </BrowserRouter>
    </div>
  );
}

export default App;