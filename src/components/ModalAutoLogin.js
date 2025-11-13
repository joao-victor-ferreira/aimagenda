import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const ModalAutoLogin = ({ onLogout }) => {
  const [logoutHover, setLogoutHover] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        animation: 'fadeIn 0.3s ease-out',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '1.5rem',
          padding: '2.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          textAlign: 'center',
          maxWidth: '420px',
          animation: 'scaleIn 0.3s ease-out',
        }}
      >
        <div
          style={{
            width: '5rem',
            height: '5rem',
            margin: '0 auto 1.5rem',
            background: 'linear-gradient(135deg, #2563eb, #9333ea)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <CheckCircle
            size={48}
            color="white"
            style={{ animation: 'checkPulse 1s ease-in-out infinite' }}
          />
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '3px solid #2563eb',
              animation: 'pulse 1.5s ease-out infinite',
            }}
          ></div>
        </div>

        <h3
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '0.75rem',
          }}
        >
          Bem-vindo de volta!
        </h3>

        <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '1.5rem' }}>
          Você já está autenticado. Redirecionando para o dashboard...
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div
            style={{
              display: 'inline-block',
              position: 'relative',
              width: '40px',
              height: '40px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                border: '4px solid #e5e7eb',
                borderTop: '4px solid #2563eb',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            ></div>
          </div>

          <button
            onClick={onLogout}
            onMouseEnter={() => setLogoutHover(true)}
            onMouseLeave={() => setLogoutHover(false)}
            style={{
              marginTop: '0.5rem',
              padding: '0.625rem 1.5rem',
              background: logoutHover ? '#dc2626' : '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAutoLogin;
