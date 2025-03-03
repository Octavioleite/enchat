import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import ProtectedRoute from './components/ProtectedRoute'; // Importação corrigida

function App() {
  const token = localStorage.getItem('authToken'); // Verificar se o token de autenticação está presente

  return (
    <Router>
      <Routes>
        {/* Se o usuário estiver logado, redireciona para /home */}
        <Route path="/" element={token ? <Navigate to="/home" /> : <Login />} />

        {/* Rota protegida */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );  
}

export default App;
