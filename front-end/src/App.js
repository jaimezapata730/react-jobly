import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from './navigation/NavBar'
import MyRoutes from './navigation/MyRoutes'
import JoblyApi from "./api/api";
import AuthContext from "./auth/UserContext";
import {jwtDecode} from 'jwt-decode';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(()=>{
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? JSON.parse(storedToken) : null;
  });

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [token, currentUser]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (JoblyApi.token && typeof token === 'string') {
          const decodedToken = jwtDecode(JoblyApi.token);
          const username = decodedToken.username;
  
          const currentUser = await JoblyApi.getUser(username);
  
          setCurrentUser(currentUser);
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
  
    fetchCurrentUser();
  }, [token, setCurrentUser]);
  

  const signup = async (userData) => {
    try {
      let newToken = await JoblyApi.register(userData);
      setToken(newToken);
      localStorage.setItem('token', newToken.token);
    } catch(e) {
      console.error('Signup failed', e);
    }
  };

  const update = async (username, data) => {
    try {
      await JoblyApi.update(username, data);
    } catch(e) {
      console.error('Profile update failed', e);
    }
  };

  const login = async (username, password) => {
    try {
      const userToken = await JoblyApi.authenticate(username, password);
      
      setToken({ token: userToken.token });
      localStorage.setItem('token', userToken.token);

      const decodedToken = jwtDecode(userToken.token);
      const loggedInUser = await JoblyApi.getUser(decodedToken.username);
      setCurrentUser(loggedInUser);
    } catch (e) {
      console.error('Login failed', e);
    }
  }


  const logout = ()=> {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('token')
  }

  return (
    <div className="App">
      <BrowserRouter>
      <AuthContext.Provider
      value={{currentUser, setCurrentUser}}>
      <NavBar 
      logout={logout}
      />
      <MyRoutes  
      login={login} 
      signup={signup} 
      update={update}
      />
      </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
