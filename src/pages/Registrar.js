import React, { useState } from 'react';
import { Calendar, Lock, User, Eye, EyeOff, Mail, Phone, Building, ArrowRight, ArrowLeft, Check, Zap, Crown, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



export default function Registrar() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState('');
  const [buttonHover, setButtonHover] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      navigate('/obrigado');
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Cadastro realizado com sucesso!\nPlano selecionado: ${selectedPlan}`);
    }, 1500);
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
      maxWidth: step === 1 ? '32rem' : '75rem'
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
      gap: '1rem'
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
      background: 'white'
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

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Logo e Título */}
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>
            <img src={require('../assets/logo.png')} style={{ width: '4.5rem', height: '4.5rem', color: 'white' }} />
          </div>
          <h1 style={styles.title}>AIM Agenda</h1>
          <p style={styles.subtitle}>Crie sua conta e comece a organizar seus compromissos</p>
        </div>

        {/* Card de Registro */}
        <div style={styles.card}>
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
                2
              </div>
              <span style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500',
                color: step >= 2 ? '#1f2937' : '#9ca3af'
              }}>Plano</span>
            </div>
          </div>

          {step === 1 ? (
            <>
              <h2 style={styles.cardTitle}>Criar conta</h2>
              <p style={styles.cardSubtitle}>Preencha seus dados para começar</p>
              
              <div style={styles.formGrid}>
                {/* Nome Completo */}
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

                {/* Email */}
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

                {/* Telefone */}
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

                {/* Empresa */}
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

                {/* Senha */}
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

                {/* Confirmar Senha */}
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
          ) : (
            <>
              <h2 style={styles.cardTitle}>Escolha seu plano</h2>
              <p style={styles.cardSubtitle}>Selecione o plano ideal para suas necessidades</p>
              
              <div style={styles.plansGrid}>
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  const isSelected = selectedPlan === plan.id;
                  const isHovered = hoveredPlan === plan.id;
                  
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      onMouseEnter={() => setHoveredPlan(plan.id)}
                      onMouseLeave={() => setHoveredPlan('')}
                      style={{
                        ...styles.planCard,
                        borderColor: isSelected ? plan.color : '#e5e7eb',
                        ...(isSelected ? styles.planCardSelected : {}),
                        ...(isHovered && !isSelected ? styles.planCardHover : {})
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
                  disabled={!selectedPlan || isLoading}
                  onMouseEnter={() => setButtonHover(true)}
                  onMouseLeave={() => setButtonHover(false)}
                  style={{
                    ...styles.button,
                    ...styles.buttonPrimary,
                    ...(buttonHover && selectedPlan && !isLoading ? styles.buttonPrimaryHover : {}),
                    ...(!selectedPlan || isLoading ? styles.buttonDisabled : {})
                  }}
                >
                  {isLoading ? 'Cadastrando...' : 'Concluir Cadastro'}
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