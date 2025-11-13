import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

const CustomAlertLogin = ({ type = 'error', message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const alertStyles = {
    container: {
      position: 'fixed',
      top: '2rem',
      right: '2rem',
      zIndex: 9999,
      minWidth: '320px',
      maxWidth: '400px',
      animation: isVisible ? 'slideIn 0.3s ease-out' : 'slideOut 0.3s ease-out',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
    },
    alert: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      padding: '1rem 1.25rem',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
      border: '1px solid',
      background: type === 'error' ? '#fef2f2' : '#f0fdf4',
      borderColor: type === 'error' ? '#fecaca' : '#bbf7d0',
    },
    iconWrapper: {
      flexShrink: 0,
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: type === 'error' ? '#fee2e2' : '#dcfce7',
    },
    content: {
      flex: 1,
      paddingTop: '0.25rem',
    },
    title: {
      fontSize: '0.95rem',
      fontWeight: '700',
      color: type === 'error' ? '#991b1b' : '#166534',
      marginBottom: '0.25rem',
    },
    message: {
      fontSize: '0.875rem',
      color: type === 'error' ? '#7f1d1d' : '#14532d',
      lineHeight: '1.5',
    },
    closeButton: {
      flexShrink: 0,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.25rem',
      borderRadius: '0.375rem',
      color: type === 'error' ? '#991b1b' : '#166534',
      transition: 'background 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return (
    <div style={alertStyles.container}>
      <div style={alertStyles.alert}>
        <div style={alertStyles.iconWrapper}>
          {type === 'error' ? (
            <AlertCircle size={24} color="#dc2626" />
          ) : (
            <CheckCircle size={24} color="#16a34a" />
          )}
        </div>
        <div style={alertStyles.content}>
          <div style={alertStyles.title}>
            {type === 'error' ? 'Erro no Login' : 'Sucesso'}
          </div>
          <div style={alertStyles.message}>{message}</div>
        </div>
        <button
          style={alertStyles.closeButton}
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default CustomAlertLogin;
