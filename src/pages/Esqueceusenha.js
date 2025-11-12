import React, { useState } from 'react';
import {
  Mail,
  Lock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  X,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Componente de Alert Customizado
const CustomAlert = ({ type = 'error', message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  React.useEffect(() => {
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
            {type === 'error' ? 'Erro' : 'Sucesso'}
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

export default function Esqueceusenha() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1); // 1 = Email, 2 = Nova Senha
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmFocus, setConfirmFocus] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const handleEmailSubmit = async () => {
    if (!email) {
      showAlert('error', 'Por favor, insira seu endereço de email.');
      return;
    }

    if (!email.includes('@')) {
      showAlert('error', 'Por favor, insira um endereço de email válido.');
      return;
    }

    setIsLoading(true);

    // Simular requisição
    setTimeout(() => {
      setIsLoading(false);
      showAlert(
        'success',
        'Código de verificação enviado! Agora defina sua nova senha.',
      );
      setStage(2);
    }, 1500);
  };

  const handlePasswordSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      showAlert('error', 'Por favor, preencha a senha e a confirmação.');
      return;
    }

    if (newPassword.length < 6) {
      showAlert('error', 'A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert(
        'error',
        'As senhas não coincidem. Verifique e tente novamente.',
      );
      return;
    }

    setIsLoading(true);

    // Simular requisição
    setTimeout(() => {
      setIsLoading(false);
      showAlert(
        'success',
        'Senha alterada com sucesso! Você já pode fazer login.',
      );
      setTimeout(() => {
        // navigate('/login');
        console.log('Navegando para login...');
      }, 2000);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (stage === 1) {
        handleEmailSubmit();
      } else {
        handlePasswordSubmit();
      }
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background:
        'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #faf5ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    wrapper: {
      width: '100%',
      maxWidth: '28rem',
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: 'white',
      color: '#374151',
      border: '1px solid #e5e7eb',
      borderRadius: '0.75rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginBottom: '1.5rem',
      transition: 'all 0.2s',
    },
    logoSection: {
      textAlign: 'center',
      marginBottom: '2rem',
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
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '0.5rem',
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '0.95rem',
      lineHeight: '1.6',
    },
    card: {
      background: 'white',
      borderRadius: '1.5rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      padding: '2rem',
      border: '1px solid #f3f4f6',
    },
    stageIndicator: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.75rem',
      marginBottom: '2rem',
    },
    stageDot: {
      width: '2.5rem',
      height: '0.375rem',
      borderRadius: '9999px',
      transition: 'all 0.3s',
    },
    stageDotActive: {
      background: 'linear-gradient(90deg, #2563eb, #9333ea)',
    },
    stageDotInactive: {
      background: '#e5e7eb',
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '0.5rem',
      textAlign: 'center',
    },
    cardDescription: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '2rem',
      textAlign: 'center',
      lineHeight: '1.6',
    },
    formGroup: {
      marginBottom: '1.25rem',
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem',
    },
    inputWrapper: {
      position: 'relative',
    },
    inputIcon: {
      position: 'absolute',
      top: '50%',
      left: '1rem',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      color: '#9ca3af',
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
      boxSizing: 'border-box',
    },
    inputFocus: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
    passwordInput: {
      paddingRight: '3rem',
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
      color: '#9ca3af',
    },
    passwordStrength: {
      fontSize: '0.75rem',
      color: '#6b7280',
      marginTop: '0.5rem',
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
      transition: 'all 0.3s',
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    buttonLoading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    divider: {
      position: 'relative',
      margin: '1.5rem 0',
      textAlign: 'center',
    },
    dividerLine: {
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      borderTop: '1px solid #d1d5db',
    },
    dividerText: {
      position: 'relative',
      display: 'inline-block',
      padding: '0 1rem',
      background: 'white',
      color: '#6b7280',
      fontSize: '0.875rem',
    },
    backToLogin: {
      textAlign: 'center',
    },
    backToLoginText: {
      color: '#4b5563',
      fontSize: '0.875rem',
    },
    backToLoginLink: {
      color: '#2563eb',
      background: 'none',
      border: 'none',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'color 0.2s',
    },
  };

  return (
    <>
      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={closeAlert}
        />
      )}

      <div style={styles.container}>
        <div style={styles.wrapper}>
          <button
            style={styles.backButton}
            onClick={() => {
              if (stage === 2) {
                setStage(1);
              } else {
                navigate('/login');
              }
            }}
          >
            <ArrowLeft size={18} />
            Voltar
          </button>

          <div style={styles.logoSection}>
            <div style={styles.logoIcon}>
              <Lock size={48} color="white" />
            </div>
            <h1 style={styles.title}>
              {stage === 1 ? 'Esqueceu a Senha?' : 'Nova Senha'}
            </h1>
            <p style={styles.subtitle}>
              {stage === 1
                ? 'Não se preocupe! Digite seu email e enviaremos instruções para redefinir sua senha.'
                : 'Agora defina uma nova senha segura para sua conta.'}
            </p>
          </div>

          <div style={styles.card}>
            {/* Stage Indicator */}
            <div style={styles.stageIndicator}>
              <div
                style={{
                  ...styles.stageDot,
                  ...(stage === 1
                    ? styles.stageDotActive
                    : styles.stageDotInactive),
                }}
              ></div>
              <div
                style={{
                  ...styles.stageDot,
                  ...(stage === 2
                    ? styles.stageDotActive
                    : styles.stageDotInactive),
                }}
              ></div>
            </div>

            {stage === 1 ? (
              // STAGE 1: Email
              <>
                <h2 style={styles.cardTitle}>Recuperar Conta</h2>
                <p style={styles.cardDescription}>
                  Informe o email cadastrado em sua conta
                </p>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email</label>
                  <div style={styles.inputWrapper}>
                    <div style={styles.inputIcon}>
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      placeholder="seu@email.com"
                      style={{
                        ...styles.input,
                        ...(emailFocus ? styles.inputFocus : {}),
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleEmailSubmit}
                  disabled={isLoading}
                  onMouseEnter={() => setButtonHover(true)}
                  onMouseLeave={() => setButtonHover(false)}
                  style={{
                    ...styles.button,
                    ...(buttonHover && !isLoading
                      ? {
                          background:
                            'linear-gradient(90deg, #1d4ed8, #7e22ce)',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
                          transform: 'translateY(-2px)',
                        }
                      : {}),
                    ...(isLoading ? styles.buttonDisabled : {}),
                  }}
                >
                  {isLoading ? (
                    <span style={styles.buttonLoading}>
                      <svg
                        style={{
                          width: '1.25rem',
                          height: '1.25rem',
                          marginRight: '0.75rem',
                          animation: 'spin 0.6s linear infinite',
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
                      Enviando...
                    </span>
                  ) : (
                    'Enviar Código'
                  )}
                </button>
              </>
            ) : (
              // STAGE 2: Nova Senha
              <>
                <h2 style={styles.cardTitle}>Definir Nova Senha</h2>
                <p style={styles.cardDescription}>
                  Crie uma senha forte com no mínimo 6 caracteres
                </p>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Nova Senha</label>
                  <div style={styles.inputWrapper}>
                    <div style={styles.inputIcon}>
                      <Lock size={20} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      onFocus={() => setPasswordFocus(true)}
                      onBlur={() => setPasswordFocus(false)}
                      placeholder="••••••••"
                      style={{
                        ...styles.input,
                        ...styles.passwordInput,
                        ...(passwordFocus ? styles.inputFocus : {}),
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
                  {newPassword && (
                    <div style={styles.passwordStrength}>
                      {newPassword.length < 6
                        ? '❌ Senha muito curta (mínimo 6 caracteres)'
                        : '✅ Senha válida'}
                    </div>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Confirmar Nova Senha</label>
                  <div style={styles.inputWrapper}>
                    <div style={styles.inputIcon}>
                      <Lock size={20} />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      onFocus={() => setConfirmFocus(true)}
                      onBlur={() => setConfirmFocus(false)}
                      placeholder="••••••••"
                      style={{
                        ...styles.input,
                        ...styles.passwordInput,
                        ...(confirmFocus ? styles.inputFocus : {}),
                      }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={styles.passwordToggle}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {confirmPassword && (
                    <div style={styles.passwordStrength}>
                      {newPassword === confirmPassword
                        ? '✅ As senhas coincidem'
                        : '❌ As senhas não coincidem'}
                    </div>
                  )}
                </div>

                <button
                  onClick={handlePasswordSubmit}
                  disabled={isLoading}
                  onMouseEnter={() => setButtonHover(true)}
                  onMouseLeave={() => setButtonHover(false)}
                  style={{
                    ...styles.button,
                    ...(buttonHover && !isLoading
                      ? {
                          background:
                            'linear-gradient(90deg, #1d4ed8, #7e22ce)',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
                          transform: 'translateY(-2px)',
                        }
                      : {}),
                    ...(isLoading ? styles.buttonDisabled : {}),
                  }}
                >
                  {isLoading ? (
                    <span style={styles.buttonLoading}>
                      <svg
                        style={{
                          width: '1.25rem',
                          height: '1.25rem',
                          marginRight: '0.75rem',
                          animation: 'spin 0.6s linear infinite',
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
                      Redefinindo...
                    </span>
                  ) : (
                    'Redefinir Senha'
                  )}
                </button>
              </>
            )}

            <div style={styles.divider}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>ou</span>
            </div>

            <div style={styles.backToLogin}>
              <p style={styles.backToLoginText}>
                Lembrou sua senha?{' '}
                <button
                  style={styles.backToLoginLink}
                  onClick={() => {
                    navigate('/login');
                    console.log('Voltar para login');
                  }}
                >
                  Fazer login
                </button>
              </p>
            </div>
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
        `}</style>
      </div>
    </>
  );
}
