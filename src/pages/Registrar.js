import React, { useState } from 'react';
import {  Lock, User, Eye, EyeOff, Mail, Phone, Building, 
  ArrowRight, ArrowLeft, Check, Zap, Crown, Sparkles, CreditCard, QrCode,
  Calendar, Shield, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Registrar() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [hoveredPlan, setHoveredPlan] = useState('');
  const [buttonHover, setButtonHover] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card'); // 'credit_card' ou 'pix'
  const [pixGenerated, setPixGenerated] = useState(false);

  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handlePaymentChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    // Formatação automática
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
    setError('');
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Preencha todos os campos obrigatórios.');
      return false;
    }
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (paymentMethod === 'credit_card') {
      if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.cardExpiry || !paymentData.cardCVV || !paymentData.cpf) {
        setError('Preencha todos os dados do cartão.');
        return false;
      }
      const cardNumberClean = paymentData.cardNumber.replace(/\s/g, '');
      if (cardNumberClean.length < 13) {
        setError('Número do cartão inválido.');
        return false;
      }
    } else if (paymentMethod === 'pix') {
      if (!paymentData.cpf) {
        setError('Informe seu CPF para gerar o PIX.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (!selectedPlan) {
        setError('Selecione um plano para continuar.');
        return;
      }
      setStep(3);
    } else {
      handleSubmit();
    }
  };

  const handleGeneratePix = () => {
    if (!paymentData.cpf) {
      setError('Informe seu CPF para gerar o PIX.');
      return;
    }
    setPixGenerated(true);
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setIsLoading(true);
    setError('');

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
        console.log("✅ Cadastro e pagamento realizados:", data);
        navigate('/obrigado');
      } else {
        console.error("❌ Erro no backend:", data);
        setError(data.mensagem || 'Erro ao processar pagamento.');
      }
    } catch (err) {
      console.error("🚫 Erro de rede:", err);
      setError('Erro de conexão com o servidor.');
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
      ],
      badge: 'Mais Popular'
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
          .wrapper { max-width: 100% !important; padding: 0 1rem; }
          .card { padding: 1.5rem !important; }
          .card-title { font-size: 1.25rem !important; }
          .plan-card { padding: 1.25rem !important; }
        }
      `}</style>
      
      <div style={styles.wrapper} className="wrapper">
        {/* Logo e Título */}
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>
            <img alt='logoempresa' src={require('../assets/logo.png')} style={{ width: '4.5rem', height: '4.5rem', color: 'white' }} />
          </div>
          <h1 style={styles.title}>AIM Agenda</h1>
          <p style={styles.subtitle}>Crie sua conta e comece a organizar seus compromissos</p>
        </div>

        {/* Card de Registro */}
        <div style={styles.card} className="card">
          {/* Barra de Progresso */}
          <div style={styles.progressBar}>
            <div style={styles.progressStep}>
              <div style={{
                ...styles.progressCircle,
                background: step >= 1 ? 'linear-gradient(135deg, #2563eb, #9333ea)' : '#e5e7eb',
                color: step >= 1 ? 'white' : '#9ca3af'
              }}>
                {step > 1 ? <Check style={{ width: '1rem', height: '1rem' }} /> : '1'}
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
                {step > 2 ? <Check style={{ width: '1rem', height: '1rem' }} /> : '2'}
              </div>
              <span style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500',
                color: step >= 2 ? '#1f2937' : '#9ca3af'
              }}>Plano</span>
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
                3
              </div>
              <span style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500',
                color: step >= 3 ? '#1f2937' : '#9ca3af'
              }}>Pagamento</span>
            </div>
          </div>

          {error && (
            <div style={styles.errorBanner}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: DADOS */}
          {step === 1 && (
            <>
              <h2 style={styles.cardTitle} className="card-title">Criar conta</h2>
              <p style={styles.cardSubtitle}>Preencha seus dados para começar</p>
              
              <div style={styles.formGrid} className="form-grid">
                <div style={{...styles.formGroup, ...styles.formGroupFull}}>
                  <label style={styles.label}>Nome Completo</label>
                  <div style={styles.inputWrapper}>
                    <div style={styles.inputIcon}>
                      <User style={{ width: '1.25rem', height: '1.25rem' }} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                      placeholder="João Silva"
                      style={{
                        ...styles.input,
                        ...(focusedField === 'name' ? styles.inputFocus : {})
                      }}
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email</label>
                  <div style={styles.inputWrapper}>
                    <div style={styles.inputIcon}>
                      <Mail style={{ width: '1.25rem', height: '1.25rem' }} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      placeholder="seu@email.com"
                      style={{
                        ...styles.input,
                        ...(focusedField === 'email' ? styles.inputFocus : {})
                      }}
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Telefone</label>
                  <div style={styles.inputWrapper}>
                    <div style={styles.inputIcon}>
                      <Phone style={{ width: '1.25rem', height: '1.25rem' }} />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField('')}
                      placeholder="(11) 99999-9999"
                      style={{
                        ...styles.input,
                        ...(focusedField === 'phone' ? styles.inputFocus : {})
                      }}
                    />
                  </div>
                </div>

                <div style={{...styles.formGroup, ...styles.formGroupFull}}>
                  <label style={styles.label}>Empresa (opcional)</label>
                  <div style={styles.inputWrapper}>
                    <div style={styles.inputIcon}>
                      <Building style={{ width: '1.25rem', height: '1.25rem' }} />
                    </div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField('')}
                      placeholder="Nome da sua empresa"
                      style={{
                        ...styles.input,
                        ...(focusedField === 'company' ? styles.inputFocus : {})
                      }}
                    />
                  </div>
                </div>

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
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField('')}
                      placeholder="••••••••"
                      style={{
                        ...styles.input,
                        paddingRight: '3rem',
                        ...(focusedField === 'password' ? styles.inputFocus : {})
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

                <div style={styles.formGroup}>
                  <label style={styles.label}>Confirmar Senha</label>
                  <div style={styles.inputWrapper}>
                    <div style={styles.inputIcon}>
                      <Lock style={{ width: '1.25rem', height: '1.25rem' }} />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('confirmPassword')}
                      onBlur={() => setFocusedField('')}
                      placeholder="••••••••"
                      style={{
                        ...styles.input,
                        paddingRight: '3rem',
                        ...(focusedField === 'confirmPassword' ? styles.inputFocus : {})
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={styles.passwordToggle}
                    >
                      {showConfirmPassword ? (
                        <EyeOff style={{ width: '1.25rem', height: '1.25rem' }} />
                      ) : (
                        <Eye style={{ width: '1.25rem', height: '1.25rem' }} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                onMouseEnter={() => setButtonHover(true)}
                onMouseLeave={() => setButtonHover(false)}
                style={{
                  ...styles.button,
                  ...styles.buttonPrimary,
                  ...(buttonHover ? styles.buttonPrimaryHover : {})
                }}
              >
                Próximo
                <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </>
          )}

          {/* STEP 2: PLANOS */}
          {step === 2 && (
            <>
              <h2 style={styles.cardTitle} className="card-title">Escolha seu plano</h2>
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
                        ...(isSelected ? styles.planCardSelected : {}),
                        ...(isHovered && !isSelected ? styles.planCardHover : {})
                      }}
                      className="plan-card"
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
                        <Icon style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
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
                  onClick={() => setStep(1)}
                  style={{
                    ...styles.button,
                    ...styles.buttonSecondary
                  }}
                >
                  <ArrowLeft style={{ width: '1.25rem', height: '1.25rem' }} />
                  Voltar
                </button>
                <button
                  onClick={handleNext}
                  disabled={!selectedPlan}
                  onMouseEnter={() => setButtonHover(true)}
                  onMouseLeave={() => setButtonHover(false)}
                  style={{
                    ...styles.button,
                    ...styles.buttonPrimary,
                    ...(buttonHover && selectedPlan ? styles.buttonPrimaryHover : {}),
                    ...(!selectedPlan ? styles.buttonDisabled : {})
                  }}
                >
                  Próximo
                  <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
                </button>
              </div>
            </>
          )}

          {/* STEP 3: PAGAMENTO */}
          {step === 3 && (
            <>
              <h2 style={styles.cardTitle} className="card-title">Pagamento</h2>
              <p style={styles.cardSubtitle}>Finalize sua assinatura do plano {selectedPlan}</p>

              {/* Resumo do Plano */}
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

              {/* Métodos de Pagamento */}
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

              {/* Formulário de Cartão */}
              {paymentMethod === 'credit_card' && (
                <div style={styles.formGrid} className="form-grid">
                  <div style={{...styles.formGroup, ...styles.formGroupFull}}>
                    <label style={styles.label}>Número do Cartão</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <CreditCard style={{ width: '1.25rem', height: '1.25rem' }} />
                      </div>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentChange}
                        onFocus={() => setFocusedField('cardNumber')}
                        onBlur={() => setFocusedField('')}
                        placeholder="1234 5678 9012 3456"
                        style={{
                          ...styles.input,
                          ...(focusedField === 'cardNumber' ? styles.inputFocus : {})
                        }}
                      />
                    </div>
                  </div>

                  <div style={{...styles.formGroup, ...styles.formGroupFull}}>
                    <label style={styles.label}>Nome no Cartão</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <User style={{ width: '1.25rem', height: '1.25rem' }} />
                      </div>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentData.cardName}
                        onChange={handlePaymentChange}
                        onFocus={() => setFocusedField('cardName')}
                        onBlur={() => setFocusedField('')}
                        placeholder="JOÃO SILVA"
                        style={{
                          ...styles.input,
                          ...(focusedField === 'cardName' ? styles.inputFocus : {}),
                          textTransform: 'uppercase'
                        }}
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Validade</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <Calendar style={{ width: '1.25rem', height: '1.25rem' }} />
                      </div>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={paymentData.cardExpiry}
                        onChange={handlePaymentChange}
                        onFocus={() => setFocusedField('cardExpiry')}
                        onBlur={() => setFocusedField('')}
                        placeholder="MM/AA"
                        style={{
                          ...styles.input,
                          ...(focusedField === 'cardExpiry' ? styles.inputFocus : {})
                        }}
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>CVV</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <Shield style={{ width: '1.25rem', height: '1.25rem' }} />
                      </div>
                      <input
                        type="text"
                        name="cardCVV"
                        value={paymentData.cardCVV}
                        onChange={handlePaymentChange}
                        onFocus={() => setFocusedField('cardCVV')}
                        onBlur={() => setFocusedField('')}
                        placeholder="123"
                        style={{
                          ...styles.input,
                          ...(focusedField === 'cardCVV' ? styles.inputFocus : {})
                        }}
                      />
                    </div>
                  </div>

                  <div style={{...styles.formGroup, ...styles.formGroupFull}}>
                    <label style={styles.label}>CPF do Titular</label>
                    <div style={styles.inputWrapper}>
                      <div style={styles.inputIcon}>
                        <User style={{ width: '1.25rem', height: '1.25rem' }} />
                      </div>
                      <input
                        type="text"
                        name="cpf"
                        value={paymentData.cpf}
                        onChange={handlePaymentChange}
                        onFocus={() => setFocusedField('cpf')}
                        onBlur={() => setFocusedField('')}
                        placeholder="000.000.000-00"
                        style={{
                          ...styles.input,
                          ...(focusedField === 'cpf' ? styles.inputFocus : {})
                        }}
                      />
                    </div>
                  </div>

                  <div style={styles.securityBanner}>
                    <Shield size={20} color="#10b981" />
                    <span>Seus dados estão protegidos com criptografia SSL</span>
                  </div>
                </div>
              )}

              {/* Pagamento PIX */}
              {paymentMethod === 'pix' && (
                <>
                  <div style={styles.formGrid} className="form-grid">
                    <div style={{...styles.formGroup, ...styles.formGroupFull}}>
                      <label style={styles.label}>CPF</label>
                      <div style={styles.inputWrapper}>
                        <div style={styles.inputIcon}>
                          <User style={{ width: '1.25rem', height: '1.25rem' }} />
                        </div>
                        <input
                          type="text"
                          name="cpf"
                          value={paymentData.cpf}
                          onChange={handlePaymentChange}
                          onFocus={() => setFocusedField('cpf')}
                          onBlur={() => setFocusedField('')}
                          placeholder="000.000.000-00"
                          style={{
                            ...styles.input,
                            ...(focusedField === 'cpf' ? styles.inputFocus : {})
                          }}
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
                          alert('Código PIX copiado!');
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
                        <span>Após o pagamento, sua conta será ativada automaticamente em até 5 minutos.</span>
                      </div>
                    </div>
                  )}
                </>
              )}

              <div style={styles.buttonGroup}>
                <button
                  onClick={() => setStep(2)}
                  style={{
                    ...styles.button,
                    ...styles.buttonSecondary
                  }}
                >
                  <ArrowLeft style={{ width: '1.25rem', height: '1.25rem' }} />
                  Voltar
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || (paymentMethod === 'pix' && !pixGenerated)}
                  onMouseEnter={() => setButtonHover(true)}
                  onMouseLeave={() => setButtonHover(false)}
                  style={{
                    ...styles.button,
                    ...styles.buttonPrimary,
                    ...(buttonHover && !isLoading ? styles.buttonPrimaryHover : {}),
                    ...(isLoading || (paymentMethod === 'pix' && !pixGenerated) ? styles.buttonDisabled : {})
                  }}
                >
                  {isLoading ? 'Processando...' : paymentMethod === 'pix' ? 'Confirmar Pagamento PIX' : 'Finalizar Pagamento'}
                  {!isLoading && <Check style={{ width: '1.25rem', height: '1.25rem' }} />}
                </button>
              </div>
            </>
          )}

          {/* Link de Login */}
          <div style={styles.loginLink}>
            <p style={styles.loginText}>
              Já tem uma conta?{' '}
              <button onClick={() => navigate('/login')} style={styles.link}>
                Fazer login
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p>© 2025 AIM Agenda. Todos os direitos reservados.</p>
        </div>
      </div>
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
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  wrapper: {
    width: '100%',
    maxWidth: '75rem',
    transition: 'all 0.3s'
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
    background: '#e5e7eb',
    transition: 'all 0.3s'
  },
  errorBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '0.75rem',
    color: '#991b1b',
    fontSize: '0.875rem',
    marginBottom: '1.5rem'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  formGroup: {
    marginBottom: '1.25rem'
  },
  formGroupFull: {
    gridColumn: '1 / -1'
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
  planCardSelected: {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)'
  },
  planCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
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
    fontWeight: '700',
    marginBottom: '0.25rem'
  },
  planPeriod: {
    fontSize: '1rem',
    color: '#6b7280',
    marginBottom: '1.5rem'
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    flex: 1
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    marginBottom: '0.75rem',
    fontSize: '0.875rem',
    color: '#4b5563',
    marginTop: '20px'
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
    fontSize: '0.875rem',
    gridColumn: '1 / -1'
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
  buttonPrimaryHover: {
    background: 'linear-gradient(90deg, #1d4ed8, #7e22ce)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-2px)'
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
  loginLink: {
    textAlign: 'center',
    marginTop: '1.5rem'
  },
  loginText: {
    color: '#4b5563',
    fontSize: '0.875rem'
  },
  link: {
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