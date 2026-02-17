import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';



function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };


  return (
  <Router>
    <Routes>

      <Route path="/register" element={!token ? <Register /> : <Navigate to="/dashboard" />} />
    </Routes>


  </Router>
  )
}

export default App
