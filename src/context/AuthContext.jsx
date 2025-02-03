import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) setUser(jwtDecode(token));
  // }, []);

  const login = async (email, password) => {
    const res = await axios.post('https://nestadminbackend.onrender.com/api/auth/login', { email, password });
    console.log(res.data);
    console.log(res.data.token);
    localStorage.setItem('token', res.data.token);
    setUser(jwtDecode(res.data.token));
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
