/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import Homepage from '../components/Homepage';
import Signup from '../components/Signup';
import Results from '../components/ViewResults';
import VerifyOTP from '../components/VerfiyOTP';
import Upload from '../components/UploadResults';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


function App() {
  
  const [isloggedIn, setIsloggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  // const [jwtToken,setJwtToken] = useState('')
  
  const loginStatus = (state)=>{
    setIsloggedIn(state);
    if(state) setUserId('');
  }
  const collectUserDetails = (id)=>{
    setUserId(id);
  }
  const configToast = ()=>{
    toast.configure({
      pauseOnHover: true,
      draggable: true,
      autoClose: 3000,
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }
  // const saveJWTToken = (token) =>{
  //   setJwtToken(token)
  // }
  
  const Routing = () => {
  
    return (
      <Routes>
        <Route exact path='/' element={<Homepage />}/> 
        
        <Route exact path='/signup' element={<Signup configToast={configToast}  collectUserDetails={collectUserDetails}/>} />
        <Route exact path='/login' element={<Login configToast={configToast} collectUserDetails={collectUserDetails} loginStatus={loginStatus}/>}/>
        <Route exact path='/viewresults' element={<Results configToast={configToast} userId= {userId}/>}/>
        <Route exact path='/uploadresults' element={<Upload configToast={configToast}/>}/>
        <Route exact path='/signup/verifyotp' element={<VerifyOTP configToast={configToast} userId= {userId} />} />
        
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
