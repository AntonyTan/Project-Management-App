import React, {Fragment, useState, useEffect} from "react";

import "./App.css"

import Mainpage from "./Components/Mainpage";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (bool) => {
    setIsAuthenticated(bool);
  };

  const isAuth = async() => {
    try {
      if (localStorage.token === undefined){
        return;
      }
      const response = await fetch("/auth/is-verify", {
        method: "GET",
        headers: {token: localStorage.token}
      })
      const result = await response.json();

      setIsAuthenticated(result);
    } catch (error) {
        console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={ 
          isAuthenticated ? <Navigate to ='/dashboard'/> : <Navigate to='/login'/>} />
        <Route path="/login" element={
          isAuthenticated ? <Navigate to ='/dashboard'/> : <Login setAuth = {setAuth}/>} />
        <Route path="/register" element={ 
        isAuthenticated ? <Navigate to ='/dashboard'/> : <Register setAuth = {setAuth}/>} />
        <Route path="/dashboard" element={
          isAuthenticated ? <Mainpage setAuth = {setAuth}/> : <Navigate to='/login'/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;