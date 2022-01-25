/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import Homepage from '../components/Homepage';
import Signup from '../components/Signup';
import Results from '../components/ViewResults';
import Upload from '../components/UploadResults';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  
  const [isloggedIn, setIsloggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  // const [jwtToken,setJwtToken] = useState('')
  
  const loginStatus = (state)=>{
    setIsloggedIn(state);
    setUserId('');
  }
  const collectUserDetails = (id)=>{
    setUserId(id);
  }
  // const saveJWTToken = (token) =>{
  //   setJwtToken(token)
  // }
  
  const Routing = () => {
  
    return (
      <Routes>
        <Route exact path='/' element={<Homepage />}/> 
        
        <Route exact path='/signup' element={<Signup userId= {userId} collectUserDetails={collectUserDetails} loginStatus={loginStatus}/>} />
        <Route exact path='/login' element={<Login collectUserDetails={collectUserDetails} loginStatus={loginStatus}/>}/>
        <Route exact path='/viewresults' element={<Results userId= {userId}/>}/>
        <Route exact path='/uploadresults' element={<Upload />}/>
      </Routes>
    )
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header isloggedIn={isloggedIn} logout={loginStatus} /> 
        <Routing loggingIn={collectUserDetails} isloggedIn={isloggedIn} userId={userId} />
      </BrowserRouter>
    </div>
  );
}

export default App;
