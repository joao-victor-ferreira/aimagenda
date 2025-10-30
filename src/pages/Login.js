import React, { useState } from 'react';
import { Calendar, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
       const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    navigate('/dashboard');
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
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
      background: 'white'
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
    buttonHover: {
      background: 'linear-gradient(90deg, #1d4ed8, #7e22ce)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
      transform: 'translateY(-2px)'
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
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Logo e Título */}
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>
            <Calendar style={{ width: '2.5rem', height: '2.5rem', color: 'white' }} />
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
                  <User style={{ width: '1.25rem', height: '1.25rem' }} />
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
                  <Lock style={{ width: '1.25rem', height: '1.25rem' }} />
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
                  {showPassword ? (
                    <EyeOff style={{ width: '1.25rem', height: '1.25rem' }} />
                  ) : (
                    <Eye style={{ width: '1.25rem', height: '1.25rem' }} />
                  )}
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
                ...(buttonHover && !isLoading ? styles.buttonHover : {}),
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
              <button style={styles.signupLink}>
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

      {/* Animação do Spinner */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}