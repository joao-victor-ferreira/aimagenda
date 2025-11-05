import React, { useState, useEffect } from 'react';
import { Calendar, Lock, User, Eye, EyeOff, AlertCircle, X, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { config } from '../config/http.js';

// Componente de Alert Customizado
const CustomAlert = ({ type = 'error', message, onClose }) => {
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
      transform: isVisible ? 'translateX(0)' : 'translateX(100%)'
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
      borderColor: type === 'error' ? '#fecaca' : '#bbf7d0'
    },
    iconWrapper: {
      flexShrink: 0,
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: type === 'error' ? '#fee2e2' : '#dcfce7'
    },
    content: {
      flex: 1,
      paddingTop: '0.25rem'
    },
    title: {
      fontSize: '0.95rem',
      fontWeight: '700',
      color: type === 'error' ? '#991b1b' : '#166534',
      marginBottom: '0.25rem'
    },
    message: {
      fontSize: '0.875rem',
      color: type === 'error' ? '#7f1d1d' : '#14532d',
      lineHeight: '1.5'
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
      justifyContent: 'center'
    }
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
          onMouseEnter={(e) => {
            e.currentTarget.style.background = type === 'error' ? '#fee2e2' : '#dcfce7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'none';
          }}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

// Modal de Auto-Login
const AutoLoginModal = ({ onLogout }) => {
  const [logoutHover, setLogoutHover] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '1.5rem',
        padding: '2.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        textAlign: 'center',
        maxWidth: '420px',
        animation: 'scaleIn 0.3s ease-out'
      }}>
        <div style={{
          width: '5rem',
          height: '5rem',
          margin: '0 auto 1.5rem',
          background: 'linear-gradient(135deg, #2563eb, #9333ea)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <CheckCircle size={48} color="white" style={{
            animation: 'checkPulse 1s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '3px solid #2563eb',
            animation: 'pulse 1.5s ease-out infinite'
          }}></div>
        </div>
        
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '0.75rem'
        }}>
          Bem-vindo de volta!
        </h3>
        
        <p style={{
          color: '#6b7280',
          fontSize: '1rem',
          marginBottom: '1.5rem'
        }}>
          Você já está autenticado. Redirecionando para o dashboard...
        </p>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'inline-block',
            position: 'relative',
            width: '40px',
            height: '40px'
          }}>
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: '4px solid #e5e7eb',
              borderTop: '4px solid #2563eb',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }}></div>
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
              boxShadow: logoutHover ? '0 4px 12px rgba(220, 38, 38, 0.3)' : '0 2px 8px rgba(239, 68, 68, 0.2)',
              transform: logoutHover ? 'translateY(-1px)' : 'translateY(0)'
            }}
          >
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [autoLoginModal, setAutoLoginModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setFormData({
        ...formData,
        email: value.replace(/\s+/g, '_').toLowerCase()
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      showAlert('error', 'Por favor, preencha o email e a senha para continuar.');
      return;
    }

    if (!formData.email.includes('@')) {
      showAlert('error', 'Por favor, insira um endereço de email válido.');
      return;
    }

    if (formData.password.length < 6) {
      showAlert('error', 'A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(config.url.API_URL + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          senha: formData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));

        if (formData.remember) {
          localStorage.setItem('rememberEmail', formData.email);
        } else {
          localStorage.removeItem('rememberEmail');
        }

        showAlert('success', 'Login realizado com sucesso! Redirecionando...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        showAlert('error', data.erro || 'Email ou senha incorretos.');
      }
    } catch (err) {
      showAlert('error', 'Erro ao conectar ao servidor. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAutoLoginModal(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  }, [navigate]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #faf5ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    wrapper: {
      width: '100%',
      maxWidth: '28rem'
    },
    logoSection: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    logoIcon: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '5rem',
      height: '5rem',
      background: 'linear-gradient(135deg, #2563eb, #9333ea)',
      borderRadius: '1rem',
      marginBottom: '1rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: '700',
      background: 'linear-gradient(90deg, #2563eb, #9333ea)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#4b5563',
      fontSize: '1rem'
    },
    card: {
      background: 'white',
      borderRadius: '1.5rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      padding: '2rem',
      border: '1px solid #f3f4f6'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '1.5rem'
    },
    formGroup: {
      marginBottom: '1.25rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    inputWrapper: {
      position: 'relative'
    },
    inputIcon: {
      position: 'absolute',
      top: '50%',
      left: '1rem',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      color: '#9ca3af'
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 3rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.2s',
      background: 'white',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    },
    passwordInput: {
      paddingRight: '3rem'
    },
    passwordToggle: {
      position: 'absolute',
      right: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      color: '#9ca3af'
    },
    rememberForgot: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1.25rem'
    },
    rememberLabel: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer'
    },
    checkbox: {
      width: '1rem',
      height: '1rem',
      marginRight: '0.5rem',
      cursor: 'pointer',
      accentColor: '#2563eb'
    },
    rememberText: {
      fontSize: '0.875rem',
      color: '#4b5563'
    },
    forgotLink: {
      fontSize: '0.875rem',
      color: '#2563eb',
      background: 'none',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'color 0.2s'
    },
    button: {
      width: '100%',
      padding: '0.75rem 1rem',
      background: 'linear-gradient(90deg, #2563eb, #9333ea)',
      color: 'white',
      border: 'none',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s'
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed'
    },
    buttonLoading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    divider: {
      position: 'relative',
      margin: '1.5rem 0',
      textAlign: 'center'
    },
    dividerLine: {
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      borderTop: '1px solid #d1d5db'
    },
    dividerText: {
      position: 'relative',
      display: 'inline-block',
      padding: '0 1rem',
      background: 'white',
      color: '#6b7280',
      fontSize: '0.875rem'
    },
    signup: {
      textAlign: 'center'
    },
    signupText: {
      color: '#4b5563',
      fontSize: '0.875rem'
    },
    signupLink: {
      color: '#2563eb',
      background: 'none',
      border: 'none',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'color 0.2s'
    },
    footer: {
      textAlign: 'center',
      marginTop: '2rem',
      fontSize: '0.875rem',
      color: '#6b7280'
    }
  };

  const [buttonHover, setButtonHover] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  return (
    <>
      {autoLoginModal && <AutoLoginModal />}

      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={closeAlert}
        />
      )}

      <div style={styles.container}>
        <div style={styles.wrapper}>
          <div style={styles.logoSection}>
            <div style={styles.logoIcon}>
              <img src={require('../assets/logo.png')} alt="AIM Agenda Logo" style={{ width: '4.5rem', height: '4.5rem' }} />
            </div>
            <h1 style={styles.title}>AIM Agenda</h1>
            <p style={styles.subtitle}>Gerencie seus compromissos com inteligência</p>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Entrar na sua conta</h2>
            
            <div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <div style={styles.inputWrapper}>
                  <div style={styles.inputIcon}>
                    <User size={20} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    placeholder="seu@email.com"
                    style={{
                      ...styles.input,
                      ...(emailFocus ? styles.inputFocus : {})
                    }}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Senha</label>
                <div style={styles.inputWrapper}>
                  <div style={styles.inputIcon}>
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    placeholder="••••••••"
                    style={{
                      ...styles.input,
                      ...styles.passwordInput,
                      ...(passwordFocus ? styles.inputFocus : {})
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.passwordToggle}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div style={styles.rememberForgot}>
                <label style={styles.rememberLabel}>
                  <input
                    type="checkbox"
                    style={styles.checkbox}
                    checked={formData.remember}
                    onChange={(e) =>
                      setFormData({ ...formData, remember: e.target.checked })
                    }
                  />
                  <span style={styles.rememberText}>Lembrar-me</span>
                </label>

                <button onClick={() => navigate('/esqueceuasenha')} style={styles.forgotLink}>Esqueci a senha</button>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                onMouseEnter={() => setButtonHover(true)}
                onMouseLeave={() => setButtonHover(false)}
                style={{
                  ...styles.button,
                  ...(buttonHover && !isLoading ? {
                    background: 'linear-gradient(90deg, #1d4ed8, #7e22ce)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
                    transform: 'translateY(-2px)'
                  } : {}),
                  ...(isLoading ? styles.buttonDisabled : {})
                }}
              >
                {isLoading ? (
                  <span style={styles.buttonLoading}>
                    <svg 
                      style={{ 
                        width: '1.25rem', 
                        height: '1.25rem', 
                        marginRight: '0.75rem',
                        animation: 'spin 0.6s linear infinite'
                      }} 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        style={{ opacity: 0.25 }} 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        fill="none" 
                      />
                      <path 
                        style={{ opacity: 0.75 }} 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
                      />
                    </svg>
                    Entrando...
                  </span>
                ) : (
                  'Entrar'
                )}
              </button>
            </div>

            <div style={styles.divider}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>ou</span>
            </div>

            <div style={styles.signup}>
              <p style={styles.signupText}>
                Não tem uma conta?{' '}
                <button onClick={() => navigate('/registrar')} style={styles.signupLink}>
                  Cadastre-se gratuitamente
                </button>
              </p>
            </div>
          </div>

          <div style={styles.footer}>
            <p>© 2025 AIM Agenda. Todos os direitos reservados.</p>
          </div>
        </div>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideOut {
            from {
              opacity: 1;
              transform: translateX(0);
            }
            to {
              opacity: 0;
              transform: translateX(100%);
            }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.3);
              opacity: 0;
            }
            100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
          
          @keyframes checkPulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
        `}</style>
      </div>
    </>
  );
}