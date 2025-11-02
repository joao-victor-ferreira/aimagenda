import React, { useState, useEffect } from 'react';
import { Calendar, Lock, User, Eye, EyeOff, AlertCircle, X, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

export default function Login() {
   const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const handleSubmit = async () => {
    // Validação simples
    if (!formData.email || !formData.password) {
      showAlert('error', 'Por favor, preencha o email e a senha para continuar.');
      return;
    }

    if (!formData.email.includes('@')) {
      showAlert('error', 'Por favor, insira um endereço de email válido.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          senha: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        showAlert('success', 'Login realizado com sucesso! Redirecionando...');
        setTimeout(() => {
          navigate('/dashboard');
          console.log('Navegando para dashboard...');
        }, 1500);
      } else {
        showAlert('error', data.mensagem || 'Email ou senha incorretos. Verifique suas credenciais e tente novamente.');
      }
    } catch (err) {
      showAlert('error', 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

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
      {/* Alert Customizado */}
      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={closeAlert}
        />
      )}

      <div style={styles.container}>
        <div style={styles.wrapper}>
          {/* Logo e Título */}
          <div style={styles.logoSection}>
            <div style={styles.logoIcon}>
              <Calendar size={64} color="white" />
            </div>
            <h1 style={styles.title}>AIM Agenda</h1>
            <p style={styles.subtitle}>Gerencie seus compromissos com inteligência</p>
          </div>

          {/* Card de Login */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Entrar na sua conta</h2>
            
            <div>
              {/* Campo Email */}
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

              {/* Campo Senha */}
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

              {/* Lembrar-me e Esqueci senha */}
              <div style={styles.rememberForgot}>
                <label style={styles.rememberLabel}>
                  <input type="checkbox" style={styles.checkbox} />
                  <span style={styles.rememberText}>Lembrar-me</span>
                </label>
                <button style={styles.forgotLink}>Esqueci a senha</button>
              </div>

              {/* Botão de Login */}
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

            {/* Divider */}
            <div style={styles.divider}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>ou</span>
            </div>

            {/* Cadastro */}
            <div style={styles.signup}>
              <p style={styles.signupText}>
                Não tem uma conta?{' '}
                <button onClick={() => navigate('/registrar')} style={styles.signupLink}>
                  Cadastre-se gratuitamente
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <p>© 2025 AIM Agenda. Todos os direitos reservados.</p>
          </div>
        </div>

        {/* Animações */}
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
        `}</style>
      </div>
    </>
  );
}