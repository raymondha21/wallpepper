import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom"
import AllRoutes from './routes/AllRoutes';
import LoadingSpinner from './common/LoadingSpinner';
import useLocalStorage from "./hooks/useLocalStorage";
import WallPepperApi from './api/WallPepperApi';
import { decodeToken } from 'react-jwt';
import Navbar from './Navbar/Navbar'
import UserContext from './auth/UserContext';

export const TOKEN_STORAGE_ID = "wallpepper-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = decodeToken(token);
            WallPepperApi.token = token;
            let currentUser = await WallPepperApi.getCurrentUser(username);
            setCurrentUser(currentUser);
          
          } catch (err) {
            console.error("App load UserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  /** Handles signup */
  async function signup(signupData) {
    try {
      let token = await WallPepperApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("signup failed", err);
      return { success: false, err };
    }
  }
  /** Handle login */
  async function login(loginData) {
    try {
      let token = await WallPepperApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("login failed", err);
      return { success: false, err };
    }
  }
  /** Handles Logout */
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };
  // Checks loading
  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Navbar logout={logout} />
          <AllRoutes login={login} signup={signup}/>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
