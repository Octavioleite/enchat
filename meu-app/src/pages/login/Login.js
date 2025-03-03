import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, preencha ambos os campos!');
    } else {
      setError('');
      try {
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('authToken', data.token);
          navigate('/home'); // Redireciona para a Home sem recarregar a página
        } else {
          setError(data.message || 'Erro ao autenticar usuário');
        }
      } catch (error) {
        setError('Erro de conexão com o servidor');
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <img 
          src={process.env.PUBLIC_URL + "/favicon.ico"} 
          alt="Logo" 
          className={styles.logo}
        />
        <h2>Enchat</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Digite seu email"
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Digite sua senha"
            />
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <button type="submit" className={styles.loginButton}>Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
