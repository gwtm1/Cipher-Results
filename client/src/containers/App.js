/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import Homepage from '../components/Homepage';
import Signup from '../components/Signup';
import Results from '../components/ViewResults';
import Upload from '../components/UploadResults';
import Emailverify from '../components/Emailverify'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';




function App() {
  
  const [isloggedIn, setIsloggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [jwtToken,setJwtToken] = useState('')
  
  const loginStatus = (state)=>{
    // console.log(state);
    setIsloggedIn(state);
    // console.log(isloggedIn);
    setUserId('');
  }
  const collectUserDetails = (id)=>{
    setUserId(id);
  }
  const createToken = (token) =>{
    setJwtToken(token)
  }
  
  const Routing = () => {
  
    return (
      <Routes>
        <Route exact path='/' element={<Homepage />}/> 
        <Route exact path='/signup' element={<Signup createToken={createToken} userId= {userId} collectUserDetails={collectUserDetails} loginStatus={loginStatus}/>} />
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/viewresults' element={<Results />}/>
        <Route exact path='/uploadresults' element={<Upload />}/>
        <Route exact path='/emailVerify' element={<Emailverify/>}/>
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
