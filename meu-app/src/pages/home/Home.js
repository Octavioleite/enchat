import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css'; // Importando o módulo de CSS

function Home() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [qrCode, setQrCode] = useState(null);
  const [status, setStatus] = useState('');
  const [isWhatsAppConnected, setIsWhatsAppConnected] = useState(false);
  const [showQRCodeContainer, setShowQRCodeContainer] = useState(false); // Para controlar a exibição do QR Code
  const [intervalId, setIntervalId] = useState(null); // Para armazenar o ID do intervalo

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/'); // Redireciona se não houver token
    }

    // Função para fazer a requisição GET e decodificar a mensagem Base64
    const fetchQRCode = async () => {
      const url = 'https://edvedder.encha.shop/instance/connect/test';

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Custom-Method': 'GET',
            'apikey': 'f17b91c99c9d9357b68dcd6408ca1325'
          }
        });

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const jsonData = await response.json();

        if (jsonData.hasOwnProperty('base64')) {
          const base64Data = jsonData.base64.replace(/^data:image\/png;base64,/, "");
          setQrCode(`data:image/png;base64,${base64Data}`);
          setStatus("");
        } else {
          setStatus('WhatsApp Conectado com sucesso!');
          setIsWhatsAppConnected(true); // Marca que o WhatsApp já foi conectado
        }
      } catch (error) {
        setStatus("Erro ao buscar o QR Code.");
        console.error('Erro ao buscar os dados:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQRCode(); // Chama a função para buscar o QR Code

    // Função para verificar periodicamente se o WhatsApp foi conectado
    const interval = setInterval(() => {
      fetchQRCode(); // Verifica novamente o QR Code a cada 5 segundos
    }, 1000); // Intervalo de 5 segundos

    setIntervalId(interval); // Armazena o ID do intervalo para limpar mais tarde

    return () => {
      clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
    if (intervalId) {
      clearInterval(intervalId); // Limpa o intervalo ao sair
    }
  };

  const handleConnectWhatsApp = () => {
    setShowQRCodeContainer(true); // Mostra o container flutuante do QR Code
  };

  const handleCloseQRCodeContainer = () => {
    setShowQRCodeContainer(false); // Fecha o container flutuante
  };

  return (
    <div className={styles.homeContainer}>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Sair
      </button>
      
      {/* Exibe o botão apenas se o WhatsApp não estiver conectado */}
      {!isWhatsAppConnected && (
        <button onClick={handleConnectWhatsApp} className={styles.connectButton}>
          Conectar WhatsApp
        </button>
      )}

      <h1 className={styles.titleH1}>Bem-vindo à página inicial!</h1>
      <p className={styles.welcomeMessage}>Você fez login com sucesso.</p>

      {loading && <p>{status}</p>} {/* Exibe o status de carregamento */}
      {isWhatsAppConnected && <p className={styles.connectionStatus}>WhatsApp Conectado com sucesso!</p>} {/* Exibe mensagem de sucesso se já conectado */}
      
      {/* Container flutuante para o QR Code */}
      {showQRCodeContainer && !isWhatsAppConnected && (
        <div className={styles.qrCodeContainer}>
          <button className={styles.closeButton} onClick={handleCloseQRCodeContainer}>Fechar</button>
          <img src={qrCode} alt="QR Code" id="qrcode" />
          <p>Escaneie o QR Code para conectar ao WhatsApp.</p>
        </div>
      )}

      {/* Exibe o QR Code ou a mensagem de status */}
      {!showQRCodeContainer && !loading && !isWhatsAppConnected && <p>{status}</p>}
    </div>
  );
}

export default Home;
