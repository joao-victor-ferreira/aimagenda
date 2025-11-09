import React, { useState, useEffect } from 'react';
import {  Lock, User, Eye, EyeOff, Mail, Phone, Building, 
  ArrowRight, ArrowLeft, Check, Zap, Crown, Sparkles, CreditCard, QrCode,
  Calendar, Shield, AlertCircle, X, CheckCircle
} from 'lucide-react';

// Custom Alert Component
const CustomAlert = ({ type = 'error', title, message, onClose }) => {
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
      background: type === 'error' ? '#fef2f2' : 
                  type === 'success' ? '#f0fdf4' :
                  type === 'warning' ? '#fefce8' : '#eff6ff',
      borderColor: type === 'error' ? '#fecaca' : 
                   type === 'success' ? '#bbf7d0' :
                   type === 'warning' ? '#fde68a' : '#bfdbfe'
    },
    iconWrapper: {
      flexShrink: 0,
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: type === 'error' ? '#fee2e2' : 
                  type === 'success' ? '#dcfce7' :
                  type === 'warning' ? '#fef3c7' : '#dbeafe'
    },
    content: {
      flex: 1,
      paddingTop: '0.25rem'
    },
    title: {
      fontSize: '0.95rem',
      fontWeight: '700',
      color: type === 'error' ? '#991b1b' : 
             type === 'success' ? '#166534' :
             type === 'warning' ? '#92400e' : '#1e40af',
      marginBottom: '0.25rem'
    },
    message: {
      fontSize: '0.875rem',
      color: type === 'error' ? '#7f1d1d' : 
             type === 'success' ? '#14532d' :
             type === 'warning' ? '#78350f' : '#1e3a8a',
      lineHeight: '1.5'
    },
    closeButton: {
      flexShrink: 0,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.25rem',
      borderRadius: '0.375rem',
      color: type === 'error' ? '#991b1b' : 
             type === 'success' ? '#166534' :
             type === 'warning' ? '#92400e' : '#1e40af',
      transition: 'background 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  return (
    <div style={alertStyles.container}>
      <style>{`
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
      <div style={alertStyles.alert} className="alert-container">
        <div style={alertStyles.iconWrapper}>
          {type === 'error' && <AlertCircle size={24} color="#dc2626" />}
          {type === 'success' && <CheckCircle size={24} color="#16a34a" />}
          {type === 'warning' && <AlertCircle size={24} color="#f59e0b" />}
          {type === 'info' && <AlertCircle size={24} color="#3b82f6" />}
        </div>
        <div style={alertStyles.content}>
          <div style={alertStyles.title}>{title}</div>
          <div style={alertStyles.message}>{message}</div>
        </div>
        <button
          style={alertStyles.closeButton}
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = type === 'error' ? '#fee2e2' : 
                                                type === 'success' ? '#dcfce7' :
                                                type === 'warning' ? '#fef3c7' : '#dbeafe';
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

export default function Registrar() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [hoveredPlan, setHoveredPlan] = useState('');
  const [buttonHover, setButtonHover] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [pixGenerated, setPixGenerated] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: 'error',
    title: '',
    message: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: ''
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: '',
    cpf: ''
  });

  const showCustomAlert = (type, title, message) => {
    setAlertConfig({ type, title, message });
    setShowAlert(true);
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSendVerificationCode = async () => {
    if (!formData.email) {
      showCustomAlert('error', 'Email Necessário', 'Informe seu email para receber o código.');
      return false;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/auth/enviar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setResendTimer(60);
        showCustomAlert('success', 'Código Enviado!', `Enviamos um código de 6 dígitos para ${formData.email}`);
        return true;
      } else {
        showCustomAlert('error', 'Erro ao Enviar', data.mensagem || 'Não foi possível enviar o código. Tente novamente.');
        return false;
      }
    } catch (err) {
      showCustomAlert('error', 'Erro de Conexão', 'Não foi possível conectar ao servidor.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    const code = verificationCode.join('');
    
    if (code.length !== 6) {
      showCustomAlert('error', 'Código Incompleto', 'Digite o código completo de 6 dígitos.');
      return false;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/auth/verificar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email,
          codigo: code 
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        showCustomAlert('success', 'Email Verificado!', 'Seu email foi confirmado com sucesso.');
        return true;
      } else {
        showCustomAlert('error', 'Código Inválido', data.mensagem || 'O código digitado está incorreto.');
        setVerificationCode(['', '', '', '', '', '']);
        return false;
      }
    } catch (err) {
      showCustomAlert('error', 'Erro de Conexão', 'Não foi possível verificar o código.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleCodePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData.split('').concat(['', '', '', '', '', '']).slice(0, 6);
    setVerificationCode(newCode);

    const lastFilledIndex = pastedData.length - 1;
    const nextInput = document.getElementById(`code-input-${Math.min(lastFilledIndex + 1, 5)}`);
    if (nextInput) nextInput.focus();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (value.length > 19) value = value.substr(0, 19);
    } else if (name === 'cardExpiry') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substr(0, 2) + '/' + value.substr(2, 2);
      }
      if (value.length > 5) value = value.substr(0, 5);
    } else if (name === 'cardCVV') {
      value = value.replace(/\D/g, '').substr(0, 4);
    } else if (name === 'cpf') {
      value = value.replace(/\D/g, '');
      if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      }
    }

    setPaymentData({
      ...paymentData,
      [name]: value
    });
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      showCustomAlert('error', 'Campos Obrigatórios', 'Preencha todos os campos obrigatórios.');
      return false;
    }
    if (formData.password.length < 6) {
      showCustomAlert('error', 'Senha Inválida', 'A senha deve ter pelo menos 6 caracteres.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      showCustomAlert('error', 'Senhas Diferentes', 'As senhas não coincidem.');
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    if (paymentMethod === 'credit_card') {
      if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.cardExpiry || !paymentData.cardCVV || !paymentData.cpf) {
        showCustomAlert('error', 'Dados Incompletos', 'Preencha todos os dados do cartão.');
        return false;
      }
      const cardNumberClean = paymentData.cardNumber.replace(/\s/g, '');
      if (cardNumberClean.length < 13) {
        showCustomAlert('error', 'Cartão Inválido', 'Número do cartão inválido.');
        return false;
      }
    } else if (paymentMethod === 'pix') {
      if (!paymentData.cpf) {
        showCustomAlert('error', 'CPF Necessário', 'Informe seu CPF para gerar o PIX.');
        return false;
      }
    }
    return true;
  };

  const handleNext = async () => {
    if (step === 1) {
      if (validateStep1()) {
       setStep(2)
      }
    } else if (step === 2) {
      const verified = await handleVerifyCode();
      if (verified) {
        setTimeout(() => setStep(3), 1000);
      }
    } else if (step === 3) {
      if (!selectedPlan) {
        showCustomAlert('warning', 'Selecione um Plano', 'Escolha um plano para continuar.');
        return;
      }
      setStep(4);
    }
  };

  const handleGeneratePix = () => {
    if (!paymentData.cpf) {
      showCustomAlert('error', 'CPF Necessário', 'Informe seu CPF para gerar o PIX.');
      return;
    }
    setPixGenerated(true);
    showCustomAlert('success', 'PIX Gerado!', 'QR Code gerado com sucesso.');
  };

  const handleSubmit = async () => {
    if (!validateStep4()) return;

    setIsLoading(true);

    try {
      const planoFormatado = selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1);

      const response = await fetch('http://localhost:5000/auth/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomeCompleto: formData.name,
          email: formData.email,
          telefone: formData.phone,
          empresa: formData.company || 'Sem Empresa',
          senha: formData.password,
          plano: planoFormatado,
          codigoVerificacao: verificationCode.join(''),
          metodoPagamento: paymentMethod,
          dadosPagamento: paymentMethod === 'credit_card' ? {
            numeroCartao: paymentData.cardNumber.replace(/\s/g, ''),
            nomeCartao: paymentData.cardName,
            validade: paymentData.cardExpiry,
            cvv: paymentData.cardCVV,
            cpf: paymentData.cpf.replace(/\D/g, '')
          } : {
            cpf: paymentData.cpf.replace(/\D/g, '')
          }
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        showCustomAlert('success', 'Cadastro Realizado!', 'Sua conta foi criada com sucesso!');
      } else {
        showCustomAlert('error', 'Erro no Cadastro', data.mensagem || 'Erro ao processar. Tente novamente.');
      }
    } catch (err) {
      showCustomAlert('error', 'Erro de Conexão', 'Não foi possível conectar ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 'R$ 149',
      period: '/mês',
      icon: Sparkles,
      color: '#6b7280',
      gradient: 'linear-gradient(135deg, #6b7280, #9ca3af)',
      features: [
        '200 mensagens IA/mês',
        '1 usuário',
        'Todas as integrações',
        'Relatórios avançados',
        'Suporte por e-mail'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 'R$ 299',
      period: '/mês',
      icon: Zap,
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      popular: true,
      features: [
        '500 mensagens IA/mês',
        '3 usuários',
        'Todas as integrações',
        'Relatórios avançados',
        'Suporte padrão'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'R$ 499',
      period: '/mês',
      icon: Crown,
      color: '#9333ea',
      gradient: 'linear-gradient(135deg, #9333ea, #ec4899)',
      features: [
        '1000 mensagens IA/mês',
        '10 usuários',
        'Todas as integrações',
        'Relatórios avançados',
        'Suporte prioritário'
      ]
    }
  ];

  const selectedPlanData = plans.find(p => p.name === selectedPlan);

  return (
    <div style={styles.container}>
      <style>{`
        @media (max-width: 768px) {
          .form-grid { grid-template-columns: 1fr !important; }
          .plans-grid { grid-template-columns: 1fr !important; }
          .payment-methods { flex-direction: column !important; }
        }
      `}</style>
      
      <div style={styles.wrapper}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>
            <Mail size={48} color="white" />
          </div>
          <h1 style={styles.title}>AIM Agenda</h1>
          <p style={styles.subtitle}>Crie sua conta e comece a organizar seus compromissos</p>
        </div>

        <div style={styles.card}>
          {/* Barra de Progresso */}
          <div style={styles.progressBar}>
            <div style={styles.progressStep}>
              <div style={{
                ...styles.progressCircle,
                background: step >= 1 ? 'linear-gradient(135deg, #2563eb, #9333ea)' : '#e5e7eb',
                color: step >= 1 ? 'white' : '#9ca3af'
              }}>
                {step > 1 ? <Check size={16} /> : '1'}
              </div>
              <span style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500',
                color: step >= 1 ? '#1f2937' : '#9ca3af'
              }}>Dados</span>
            </div>
            <div style={{
              ...styles.progressLine,
              background: step >= 2 ? 'linear-gradient(90deg, #2563eb, #9333ea)' : '#e5e7eb'
            }}></div>
            <div style={styles.progressStep}>
              <div style={{
                ...styles.progressCircle,
                background: step >= 2 ? 'linear-gradient(135deg, #2563eb, #9333ea)' : '#e5e7eb',
                color: step >= 2 ? 'white' : '#9ca3af'
              }}>
                {step > 2 ? <Check size={16} /> : '2'}
              </div>
              <span style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500',
                color: step >= 2 ? '#1f2937' : '#9ca3af'
              }}>Verificação</span>
            </div>
            <div style={{
              ...styles.progressLine,
              background: step >= 3 ? 'linear-gradient(90deg, #2563eb, #9333ea)' : '#e5e7eb'
            }}></div>
            <div style={styles.progressStep}>
              <div style={{
                ...styles.progressCircle,
                background: step >= 3 ? 'linear-gradient(135deg, #2563eb, #9333ea)' : '#e5e7eb',
                color: step >= 3 ? 'white' : '#9ca3af'
              }}>
                {step > 3 ? <Check size={16} /> : '3'}
              </div>
              <span style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500',
                color: step >= 3 ? '#1f2937' : '#9ca3af'
              }}>Plano</span>
            </div>
            <div style={{
              ...styles.progressLine,
              background: step >= 4 ? 'linear-gradient(90deg, #2563eb, #9333ea)' : '#e5e7eb'
            }}></div>
            <div style={styles.progressStep}>
              <div style={{
                ...styles.progressCircle,
                background: step >= 4 ? 'linear-gradient(135deg, #2563eb, #9333ea)' : '#e5e7eb',
                color: step >= 4 ? 'white' : '#9ca3af'
              }}>
                4
              </div>
              <span style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500',
                color: step >= 4 ? '#1f2937' : '#9ca3af'
              }}>Pagamento</span>
            </div>
          </div>

          {/* STEP 1: DADOS */}
          {step === 1 && (
            <>
              <h2 style={styles.cardTitle}>Criar conta</h2>
              <p style={styles.cardSubtitle}>Preencha seus dados para começar</p>
              
              <div style={styles.formGrid} className="form-grid">
                <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                  <label style={styles.label}>Nome Completo</label>
                  <div style={styles.inputWrapper}>
                    <div style={styles.inputIcon}>
                      <User size={20} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="João Silva"
                      style={styles.input}
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email</label>
                  <div style={styles.inputWrapper}>
                    <div style={styles.inputIcon}>
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      style={styles.input}
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Telefone</label>
                  <div style={styles.inputWrapper}>
                    <div style={styles.inputIcon}>
                      <Phone size={20} />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(11) 99999-9999"
                      style={styles.input}
                    />
                  </div>
                </div>

                <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                  <label style={styles.label}>Empresa (opcional)</label>
                  <div style={styles.inputWrapper}>
                    <div style={styles.inputIcon}>
                      <Building size={20} />
                    </div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Nome da sua empresa"
                      style={styles.input}
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
                      placeholder="••••••••"
                      style={{...styles.input, paddingRight: '3rem'}}
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

                <div style={styles.formGroup}>
                  <label style={styles.label}>Confirmar Senha</label>
                  <div style={styles.inputWrapper}>
                    <div style={styles.inputIcon}>
                      <Lock size={20} />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      style={{...styles.input, paddingRight: '3rem'}}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={styles.passwordToggle}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={isLoading}
                style={{
                  ...styles.button,
                  ...styles.buttonPrimary,
                  ...(isLoading ? styles.buttonDisabled : {})
                }}
              >
                {isLoading ? 'Enviando código...' : 'Próximo'}
                <ArrowRight size={20} />
              </button>
            </>
          )}

          {/* STEP 2: VERIFICAÇÃO */}
          {step === 2 && (
            <>
              <h2 style={styles.cardTitle}>Verificar Email</h2>
              <p style={styles.cardSubtitle}>
                Enviamos um código de 6 dígitos para {formData.email}
              </p>

              <div style={styles.verificationContainer}>
                <div style={styles.emailIcon}>
                  <Mail size={48} color="#3b82f6" />
                </div>

                <div style={styles.codeInputContainer}>
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-input-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(index, e)}
                      onPaste={handleCodePaste}
                      style={styles.codeInput}
                    />
                  ))}
                </div>

                <div style={styles.resendContainer}>
                  {resendTimer > 0 ? (
                    <p style={styles.resendTimer}>
                      Reenviar código em {resendTimer}s
                    </p>
                  ) : (
                    <button
                      onClick={handleSendVerificationCode}
                      disabled={isLoading}
                      style={styles.resendButton}
                    >
                      Não recebeu o código? <span style={styles.resendLink}>Reenviar</span>
                    </button>
                  )}
                </div>

                <div style={styles.verificationInfo}>
                  <AlertCircle size={18} color="#6b7280" />
                  <span>Verifique também sua caixa de spam</span>
                </div>
              </div>

              <div style={styles.buttonGroup}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    ...styles.button,
                    ...styles.buttonSecondary
                  }}
                >
                  <ArrowLeft size={20} />
                  Voltar
                </button>
                <button
                  onClick={handleNext}
                  disabled={isLoading || verificationCode.join('').length !== 6}
                  style={{
                    ...styles.button,
                    ...styles.buttonPrimary,
                    ...(isLoading || verificationCode.join('').length !== 6 ? styles.buttonDisabled : {})
                  }}
                >
                  {isLoading ? 'Verificando...' : 'Verificar Código'}
                  <Check size={20} />
                </button>
              </div>
            </>
          )}

          {/* STEP 3: PLANOS */}
          {step === 3 && (
            <>
              <h2 style={styles.cardTitle}>Escolha seu plano</h2>
              <p style={styles.cardSubtitle}>Selecione o plano ideal para suas necessidades</p>
              
              <div style={styles.plansGrid} className="plans-grid">
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  const isSelected = selectedPlan === plan.name;
                  const isHovered = hoveredPlan === plan.name;
                  
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.name)}
                      onMouseEnter={() => setHoveredPlan(plan.name)}
                      onMouseLeave={() => setHoveredPlan('')}
                      style={{
                        ...styles.planCard,
                        borderColor: isSelected ? plan.color : '#e5e7eb',
                        transform: isSelected ? 'translateY(-8px)' : isHovered ? 'translateY(-4px)' : 'none',
                        boxShadow: isSelected ? '0 20px 25px -5px rgba(0, 0, 0, 0.15)' : 
                                   isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
                      }}
                    >
                      {plan.popular && (
                        <div style={styles.popularBadge}>
                          Mais Popular
                        </div>
                      )}
                      
                      <div style={{
                        ...styles.planIcon,
                        background: plan.gradient
                      }}>
                        <Icon size={24} color="white" />
                      </div>
                      
                      <div style={styles.planName}>{plan.name}</div>
                      <div>
                        <span style={{
                          ...styles.planPrice,
                          background: plan.gradient,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}>
                          {plan.price}
                        </span>
                        <span style={styles.planPeriod}>{plan.period}</span>
                      </div>
                      
                      <ul style={styles.featureList}>
                        {plan.features.map((feature, index) => (
                          <li key={index} style={styles.featureItem}>
                            <Check style={{
                              ...styles.checkIcon,
                              color: plan.color
                            }} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              <div style={styles.buttonGroup}>
                <button
                  onClick={() => setStep(2)}
                  style={{
                    ...styles.button,
                    ...styles.buttonSecondary
                  }}
                >
                  <ArrowLeft size={20} />
                  Voltar
                </button>
                <button
                  onClick={handleNext}
                  disabled={!selectedPlan}
                  style={{
                    ...styles.button,
                    ...styles.buttonPrimary,
                    ...(!selectedPlan ? styles.buttonDisabled : {})
                  }}
                >
                  Próximo
                  <ArrowRight size={20} />
                </button>
              </div>
            </>
          )}

          {/* STEP 4: PAGAMENTO */}
          {step === 4 && (
            <>
              <h2 style={styles.cardTitle}>Pagamento</h2>
              <p style={styles.cardSubtitle}>Finalize sua assinatura do plano {selectedPlan}</p>

              {selectedPlanData && (
                <div style={styles.planSummary}>
                  <div style={styles.summaryHeader}>
                    <span style={styles.summaryTitle}>Resumo do Pedido</span>
                  </div>
                  <div style={styles.summaryContent}>
                    <div style={styles.summaryRow}>
                      <span>Plano {selectedPlanData.name}</span>
                      <span style={styles.summaryPrice}>{selectedPlanData.price}/mês</span>
                    </div>
                    <div style={styles.summaryDivider}></div>
                    <div style={{...styles.summaryRow, fontWeight: '700'}}>
                      <span>Total</span>
                      <span style={styles.summaryPrice}>{selectedPlanData.price}</span>
                    </div>
                  </div>
                </div>
              )}

              <div style={styles.paymentMethodsContainer}>
                <label style={styles.label}>Método de Pagamento</label>
                <div style={styles.paymentMethods} className="payment-methods">
                  <button
                    onClick={() => {
                      setPaymentMethod('credit_card');
                      setPixGenerated(false);
                    }}
                    style={{
                      ...styles.paymentMethodBtn,
                      ...(paymentMethod === 'credit_card' ? styles.paymentMethodActive : {})
                    }}
                  >
                    <CreditCard size={24} />
                    <span>Cartão de Crédito</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('pix')}
                    style={{
                      ...styles.paymentMethodBtn,
                      ...(paymentMethod === 'pix' ? styles.paymentMethodActive : {})
                    }}
                  >
                    <QrCode size={24} />
                    <span>PIX</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'credit_card' && (
                <div style={styles.formGrid} className="form-grid">
                  <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                    <label style={styles.label}>Número do Cartão</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <CreditCard size={20} />
                      </div>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="1234 5678 9012 3456"
                        style={styles.input}
                      />
                    </div>
                  </div>

                  <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                    <label style={styles.label}>Nome no Cartão</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <User size={20} />
                      </div>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentData.cardName}
                        onChange={handlePaymentChange}
                        placeholder="JOÃO SILVA"
                        style={{...styles.input, textTransform: 'uppercase'}}
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Validade</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <Calendar size={20} />
                      </div>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={paymentData.cardExpiry}
                        onChange={handlePaymentChange}
                        placeholder="MM/AA"
                        style={styles.input}
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>CVV</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <Shield size={20} />
                      </div>
                      <input
                        type="text"
                        name="cardCVV"
                        value={paymentData.cardCVV}
                        onChange={handlePaymentChange}
                        placeholder="123"
                        style={styles.input}
                      />
                    </div>
                  </div>

                  <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                    <label style={styles.label}>CPF do Titular</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <User size={20} />
                      </div>
                      <input
                        type="text"
                        name="cpf"
                        value={paymentData.cpf}
                        onChange={handlePaymentChange}
                        placeholder="000.000.000-00"
                        style={styles.input}
                      />
                    </div>
                  </div>

                  <div style={{...styles.securityBanner, gridColumn: '1 / -1'}}>
                    <Shield size={20} color="#10b981" />
                    <span>Seus dados estão protegidos com criptografia SSL</span>
                  </div>
                </div>
              )}

              {paymentMethod === 'pix' && (
                <>
                  <div style={styles.formGrid} className="form-grid">
                    <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                      <label style={styles.label}>CPF</label>
                      <div style={styles.inputWrapper}>
                        <div style={styles.inputIcon}>
                          <User size={20} />
                        </div>
                        <input
                          type="text"
                          name="cpf"
                          value={paymentData.cpf}
                          onChange={handlePaymentChange}
                          placeholder="000.000.000-00"
                          style={styles.input}
                        />
                      </div>
                    </div>
                  </div>

                  {!pixGenerated ? (
                    <button
                      onClick={handleGeneratePix}
                      style={{
                        ...styles.button,
                        ...styles.buttonPrimary,
                        marginTop: '1rem'
                      }}
                    >
                      <QrCode size={20} />
                      Gerar QR Code PIX
                    </button>
                  ) : (
                    <div style={styles.pixContainer}>
                      <div style={styles.pixQRCode}>
                        <QrCode size={120} color="#2563eb" />
                      </div>
                      <p style={styles.pixInstructions}>
                        Escaneie o QR Code acima com o app do seu banco ou copie o código PIX abaixo:
                      </p>
                      <div style={styles.pixCodeContainer}>
                        <code style={styles.pixCode}>
                          00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-42661417400052040000530398654041.005802BR5925AIM AGENDA LTDA6009SAO PAULO62070503***6304ABCD
                        </code>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-42661417400052040000530398654041.005802BR5925AIM AGENDA LTDA6009SAO PAULO62070503***6304ABCD');
                          showCustomAlert('success', 'Código Copiado!', 'O código PIX foi copiado.');
                        }}
                        style={{
                          ...styles.button,
                          ...styles.buttonSecondary,
                          marginTop: '1rem'
                        }}
                      >
                        Copiar Código PIX
                      </button>
                      <div style={styles.pixWarning}>
                        <AlertCircle size={18} color="#f59e0b" />
                        <span>Após o pagamento, sua conta será ativada em até 5 minutos.</span>
                      </div>
                    </div>
                  )}
                </>
              )}

              <div style={styles.buttonGroup}>
                <button
                  onClick={() => setStep(3)}
                  style={{
                    ...styles.button,
                    ...styles.buttonSecondary
                  }}
                >
                  <ArrowLeft size={20} />
                  Voltar
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || (paymentMethod === 'pix' && !pixGenerated)}
                  style={{
                    ...styles.button,
                    ...styles.buttonPrimary,
                    ...(isLoading || (paymentMethod === 'pix' && !pixGenerated) ? styles.buttonDisabled : {})
                  }}
                >
                  {isLoading ? 'Processando...' : 'Finalizar Pagamento'}
                  <Check size={20} />
                </button>
              </div>
            </>
          )}
        </div>

        <div style={styles.footer}>
          <p>© 2025 AIM Agenda. Todos os direitos reservados.</p>
        </div>
      </div>

      {showAlert && (
        <CustomAlert
          type={alertConfig.type}
          title={alertConfig.title}
          message={alertConfig.message}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #faf5ff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  wrapper: {
    width: '100%',
    maxWidth: '75rem'
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
    marginBottom: '0.5rem'
  },
  cardSubtitle: {
    color: '#6b7280',
    fontSize: '0.875rem',
    marginBottom: '1.5rem'
  },
  progressBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  progressStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  progressCircle: {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '0.875rem',
    transition: 'all 0.3s'
  },
  progressLine: {
    width: '3rem',
    height: '2px',
    transition: 'all 0.3s'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  formGroup: {
    marginBottom: '0'
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
  verificationContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem 1rem',
    gap: '2rem'
  },
  emailIcon: {
    width: '5rem',
    height: '5rem',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  codeInputContainer: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  codeInput: {
    width: '3.5rem',
    height: '3.5rem',
    fontSize: '1.5rem',
    fontWeight: '700',
    textAlign: 'center',
    border: '2px solid #d1d5db',
    borderRadius: '0.75rem',
    outline: 'none',
    transition: 'all 0.2s',
    background: 'white'
  },
  resendContainer: {
    textAlign: 'center'
  },
  resendTimer: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0
  },
  resendButton: {
    background: 'none',
    border: 'none',
    fontSize: '0.875rem',
    color: '#6b7280',
    cursor: 'pointer',
    padding: 0
  },
  resendLink: {
    color: '#2563eb',
    fontWeight: '600',
    textDecoration: 'underline'
  },
  verificationInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    background: '#f9fafb',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  plansGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
    marginBottom: '1.5rem'
  },
  planCard: {
    position: 'relative',
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '1rem',
    padding: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    flexDirection: 'column'
  },
  popularBadge: {
    position: 'absolute',
    top: '-12px',
    right: '20px',
    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    fontSize: '0.75rem',
    fontWeight: '600'
  },
  planIcon: {
    width: '3rem',
    height: '3rem',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem'
  },
  planName: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.5rem'
  },
  planPrice: {
    fontSize: '2rem',
    fontWeight: '700'
  },
  planPeriod: {
    fontSize: '1rem',
    color: '#6b7280',
    marginLeft: '0.25rem'
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: '1.5rem 0 0 0',
    flex: 1
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    marginBottom: '0.75rem',
    fontSize: '0.875rem',
    color: '#4b5563'
  },
  checkIcon: {
    minWidth: '1rem',
    minHeight: '1rem',
    marginTop: '0.125rem'
  },
  planSummary: {
    background: '#f9fafb',
    borderRadius: '1rem',
    overflow: 'hidden',
    marginBottom: '1.5rem',
    border: '1px solid #e5e7eb'
  },
  summaryHeader: {
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #e5e7eb',
    background: 'linear-gradient(135deg, #eff6ff, #f3e8ff)'
  },
  summaryTitle: {
    fontWeight: '700',
    fontSize: '1rem',
    color: '#1f2937'
  },
  summaryContent: {
    padding: '1.5rem'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
    fontSize: '0.95rem',
    color: '#4b5563'
  },
  summaryPrice: {
    fontWeight: '700',
    color: '#2563eb',
    fontSize: '1.125rem'
  },
  summaryDivider: {
    height: '1px',
    background: '#e5e7eb',
    margin: '1rem 0'
  },
  paymentMethodsContainer: {
    marginBottom: '1.5rem'
  },
  paymentMethods: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem'
  },
  paymentMethodBtn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    padding: '1.5rem 1rem',
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#4b5563'
  },
  paymentMethodActive: {
    borderColor: '#2563eb',
    background: '#eff6ff',
    color: '#2563eb'
  },
  securityBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem',
    background: '#dcfce7',
    border: '1px solid #86efac',
    borderRadius: '0.75rem',
    color: '#166534',
    fontSize: '0.875rem'
  },
  pixContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem 1rem',
    background: '#f9fafb',
    borderRadius: '1rem',
    marginTop: '1rem'
  },
  pixQRCode: {
    padding: '2rem',
    background: 'white',
    borderRadius: '1rem',
    border: '2px solid #e5e7eb',
    marginBottom: '1.5rem'
  },
  pixInstructions: {
    textAlign: 'center',
    color: '#4b5563',
    fontSize: '0.95rem',
    marginBottom: '1rem',
    maxWidth: '400px'
  },
  pixCodeContainer: {
    width: '100%',
    maxWidth: '500px',
    padding: '1rem',
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    marginBottom: '1rem'
  },
  pixCode: {
    display: 'block',
    wordBreak: 'break-all',
    fontSize: '0.75rem',
    color: '#374151',
    fontFamily: 'monospace'
  },
  pixWarning: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem',
    background: '#fef3c7',
    border: '1px solid #fcd34d',
    borderRadius: '0.75rem',
    color: '#92400e',
    fontSize: '0.875rem',
    marginTop: '1rem',
    textAlign: 'center'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem'
  },
  button: {
    flex: 1,
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  buttonPrimary: {
    background: 'linear-gradient(90deg, #2563eb, #9333ea)',
    color: 'white',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  buttonSecondary: {
    background: 'white',
    color: '#4b5563',
    border: '1px solid #d1d5db'
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  },
  footer: {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '0.875rem',
    color: '#6b7280'
  }
};