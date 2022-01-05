/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import Homepage from '../components/Homepage';

function App() {

  const [isloggedIn,setIsloggedIn] = useState(false);
  

  const logout = ()=>{
    isloggedIn ? setIsloggedIn(false) : setIsloggedIn(true)
  }
  return (
    <div className="App">
      <Header isloggedIn = {isloggedIn} logout = {logout}/> 
      <Login />
      
    </div>
  );
}

export default App;
