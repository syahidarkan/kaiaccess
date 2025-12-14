import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeStorage } from './utils/storage';
import LoadingScreen from './components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';

// Initialize localStorage on app start
initializeStorage();

function RootApp() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem('kai_loading_seen');
    if (hasSeenLoading) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('kai_loading_seen', 'true');
    setIsLoading(false);
  };

  return (
    <React.StrictMode>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onLoadingComplete={handleLoadingComplete} />
        ) : (
          <App key="app" />
        )}
      </AnimatePresence>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<RootApp />);
