import Registration from './pages/Registration';
import Login from './pages/Login';
import Main from './pages/Main';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface ProtectedRouteProps {
  element: JSX.Element;
  isAuthenticated: boolean;
}

function ProtectedRoute({ element, isAuthenticated }: ProtectedRouteProps) {
  return isAuthenticated === true ? element : <Navigate to="/login" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3001/api/checkToken', {
        headers: { Authorization: token },
      })
        .then((response) => {
          console.log('Response from server:', response);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error('Error while checking token:', error);
          setIsAuthenticated(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<ProtectedRoute element={<Main />} isAuthenticated={isAuthenticated} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
