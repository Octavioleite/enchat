import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificando se os campos estão preenchidos
    if (!username || !password) {
      setError('Por favor, preencha ambos os campos!');
    } else {
      setError('');
      // Aqui você pode fazer a lógica de autenticação, por exemplo, chamando uma API.
      alert(`Bem-vindo, ${username}!`);
    }
  };

  const handlePriceConsultation = () => {
    alert('Consultando preços...');
    // Aqui você pode adicionar a lógica de consulta de preços ou redirecionar para outra página.
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-container">
            <label htmlFor="username">Nome de Usuário</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu nome de usuário"
            />
          </div>

          <div className="input-container">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>

          <div className="price-link-container">
            <a href="#" onClick={handlePriceConsultation} className="price-link">
              Consultar preços
            </a>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
