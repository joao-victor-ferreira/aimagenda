import React, { useState } from 'react';
import { 
  Settings,
  Sun,
  Moon,
  Bell,
  Globe,
  Lock,
  Mail,
  User,
  CreditCard,
  Shield,
  Volume2,
  Clock,
  Check,
  X,
  Save,
  Key,
  Smartphone,
  Laptop,
  LogOut,
  Trash2,
  AlertCircle,
  CheckCircle,
  Crown,
  Zap,
  TrendingUp,
  ArrowLeft,
  Home
} from 'lucide-react';

export default function Configuracao() {
  const [activeTab, setActiveTab] = useState('appearance');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDangerModal, setShowDangerModal] = useState(false);

  const [settings, setSettings] = useState({
    // Appearance
    theme: 'light',
    compactMode: false,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    notifyNewAppointment: true,
    notifyAIResponse: false,
    notifyCancellation: true,
    notifyReminder: true,
    
    // General
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    
    // Account
    name: 'João Silva',
    email: 'joao@empresa.com',
    phone: '+55 11 98765-4321',
    twoFactorEnabled: false
  });

  const tabs = [
    { id: 'appearance', label: 'Aparência', icon: Sun },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'general', label: 'Geral', icon: Globe },
    { id: 'account', label: 'Conta', icon: User },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'billing', label: 'Plano & Cobrança', icon: CreditCard }
  ];

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: ['1 usuário', '20 agendamentos/mês', 'Suporte básico'],
      current: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 95,
      features: ['5 usuários', 'Agendamentos ilimitados', 'IA avançada', 'Suporte prioritário'],
      current: true,
      badge: 'Plano Atual'
    },
    {
      id: 'business',
      name: 'Business',
      price: 245,
      features: ['Usuários ilimitados', 'API + Webhooks', 'Suporte 24/7', 'White label'],
      current: false,
      badge: 'Mais Popular'
    }
  ];

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    // Save logic
    setUnsavedChanges(false);
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <button style={styles.btnBack} onClick={() => window.history.back()}>
            <ArrowLeft size={20} />
            Voltar
          </button>
        </div>
        <div style={styles.headerContent}>
          <div>
            <div style={styles.headerBadge}>
              <Settings size={16} />
              <span>Configurações</span>
            </div>
            <h1 style={styles.title}>Configurações Gerais</h1>
            <p style={styles.subtitle}>
              Personalize sua experiência e gerencie suas preferências
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Tabs */}
        <div style={styles.sidebar}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...styles.tab,
                  ...(isActive ? styles.tabActive : {})
                }}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div style={styles.mainContent}>
          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <Sun size={24} color="#3b82f6" />
                <div>
                  <h2 style={styles.sectionTitle}>Aparência</h2>
                  <p style={styles.sectionDescription}>
                    Personalize o visual da interface
                  </p>
                </div>
              </div>

              <div style={styles.settingGroup}>
                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <h3 style={styles.settingTitle}>Tema</h3>
                    <p style={styles.settingDesc}>Escolha entre tema claro ou escuro</p>
                  </div>
                  <div style={styles.themeSelector}>
                    <button
                      style={{
                        ...styles.themeOption,
                        ...(settings.theme === 'light' ? styles.themeOptionActive : {})
                      }}
                      onClick={() => handleChange('theme', 'light')}
                    >
                      <Sun size={24} />
                      <span>Claro</span>
                    </button>
                    <button
                      style={{
                        ...styles.themeOption,
                        ...(settings.theme === 'dark' ? styles.themeOptionActive : {})
                      }}
                      onClick={() => handleChange('theme', 'dark')}
                    >
                      <Moon size={24} />
                      <span>Escuro</span>
                    </button>
                  </div>
                </div>

                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <h3 style={styles.settingTitle}>Modo Compacto</h3>
                    <p style={styles.settingDesc}>Reduz o espaçamento para mostrar mais conteúdo</p>
                  </div>
                  <label style={styles.switch}>
                    <input
                      type="checkbox"
                      checked={settings.compactMode}
                      onChange={(e) => handleChange('compactMode', e.target.checked)}
                    />
                    <span style={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <Bell size={24} color="#f59e0b" />
                <div>
                  <h2 style={styles.sectionTitle}>Notificações</h2>
                  <p style={styles.sectionDescription}>
                    Configure como e quando receber alertas
                  </p>
                </div>
              </div>

              <div style={styles.settingGroup}>
                <h3 style={styles.groupTitle}>Canais de Notificação</h3>
                
                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <div style={styles.settingTitleRow}>
                      <Mail size={18} color="#6b7280" />
                      <h3 style={styles.settingTitle}>Email</h3>
                    </div>
                    <p style={styles.settingDesc}>Receba notificações por email</p>
                  </div>
                  <label style={styles.switch}>
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                    />
                    <span style={styles.slider}></span>
                  </label>
                </div>

                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <div style={styles.settingTitleRow}>
                      <Smartphone size={18} color="#6b7280" />
                      <h3 style={styles.settingTitle}>Push</h3>
                    </div>
                    <p style={styles.settingDesc}>Notificações no navegador e mobile</p>
                  </div>
                  <label style={styles.switch}>
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => handleChange('pushNotifications', e.target.checked)}
                    />
                    <span style={styles.slider}></span>
                  </label>
                </div>

                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <div style={styles.settingTitleRow}>
                      <Volume2 size={18} color="#6b7280" />
                      <h3 style={styles.settingTitle}>Som</h3>
                    </div>
                    <p style={styles.settingDesc}>Tocar som ao receber notificações</p>
                  </div>
                  <label style={styles.switch}>
                    <input
                      type="checkbox"
                      checked={settings.soundEnabled}
                      onChange={(e) => handleChange('soundEnabled', e.target.checked)}
                    />
                    <span style={styles.slider}></span>
                  </label>
                </div>
              </div>

              <div style={styles.settingGroup}>
                <h3 style={styles.groupTitle}>Eventos</h3>
                
                {[
                  { key: 'notifyNewAppointment', label: 'Novos Agendamentos', desc: 'Quando um cliente agendar' },
                  { key: 'notifyAIResponse', label: 'Respostas da IA', desc: 'Cada vez que a IA responder' },
                  { key: 'notifyCancellation', label: 'Cancelamentos', desc: 'Quando um agendamento for cancelado' },
                  { key: 'notifyReminder', label: 'Lembretes', desc: 'Lembretes de agendamentos próximos' }
                ].map(item => (
                  <div key={item.key} style={styles.settingItem}>
                    <div style={styles.settingInfo}>
                      <h3 style={styles.settingTitle}>{item.label}</h3>
                      <p style={styles.settingDesc}>{item.desc}</p>
                    </div>
                    <label style={styles.switch}>
                      <input
                        type="checkbox"
                        checked={settings[item.key]}
                        onChange={(e) => handleChange(item.key, e.target.checked)}
                      />
                      <span style={styles.slider}></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* General Tab */}
          {activeTab === 'general' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <Globe size={24} color="#10b981" />
                <div>
                  <h2 style={styles.sectionTitle}>Configurações Gerais</h2>
                  <p style={styles.sectionDescription}>
                    Fuso horário, idioma e formatos
                  </p>
                </div>
              </div>

              <div style={styles.settingGroup}>
                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <div style={styles.settingTitleRow}>
                      <Clock size={18} color="#6b7280" />
                      <h3 style={styles.settingTitle}>Fuso Horário</h3>
                    </div>
                    <p style={styles.settingDesc}>Ajusta datas e horários</p>
                  </div>
                  <select
                    style={styles.select}
                    value={settings.timezone}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                  >
                    <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                    <option value="America/New_York">New York (GMT-5)</option>
                    <option value="Europe/London">London (GMT+0)</option>
                    <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                  </select>
                </div>

                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <div style={styles.settingTitleRow}>
                      <Globe size={18} color="#6b7280" />
                      <h3 style={styles.settingTitle}>Idioma</h3>
                    </div>
                    <p style={styles.settingDesc}>Idioma da interface</p>
                  </div>
                  <select
                    style={styles.select}
                    value={settings.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>

                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <h3 style={styles.settingTitle}>Formato de Data</h3>
                    <p style={styles.settingDesc}>Como as datas são exibidas</p>
                  </div>
                  <select
                    style={styles.select}
                    value={settings.dateFormat}
                    onChange={(e) => handleChange('dateFormat', e.target.value)}
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <h3 style={styles.settingTitle}>Formato de Hora</h3>
                    <p style={styles.settingDesc}>12h ou 24h</p>
                  </div>
                  <select
                    style={styles.select}
                    value={settings.timeFormat}
                    onChange={(e) => handleChange('timeFormat', e.target.value)}
                  >
                    <option value="24h">24 horas (14:00)</option>
                    <option value="12h">12 horas (2:00 PM)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <User size={24} color="#8b5cf6" />
                <div>
                  <h2 style={styles.sectionTitle}>Informações da Conta</h2>
                  <p style={styles.sectionDescription}>
                    Gerencie seus dados pessoais
                  </p>
                </div>
              </div>

              <div style={styles.settingGroup}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nome Completo</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={settings.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email</label>
                  <div style={styles.inputWithButton}>
                    <input
                      type="email"
                      style={styles.input}
                      value={settings.email}
                      disabled
                    />
                    <button style={styles.inputButton} onClick={() => setShowEmailModal(true)}>
                      Alterar
                    </button>
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Telefone</label>
                  <input
                    type="tel"
                    style={styles.input}
                    value={settings.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div style={styles.settingGroup}>
                <h3 style={styles.groupTitle}>Senha</h3>
                <div style={styles.passwordSection}>
                  <Lock size={48} color="#d1d5db" />
                  <div>
                    <h4 style={styles.passwordTitle}>Alterar Senha</h4>
                    <p style={styles.passwordDesc}>
                      Recomendamos alterar sua senha periodicamente para manter sua conta segura
                    </p>
                  </div>
                  <button style={styles.btnSecondary} onClick={() => setShowPasswordModal(true)}>
                    <Key size={18} />
                    Redefinir Senha
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <Shield size={24} color="#10b981" />
                <div>
                  <h2 style={styles.sectionTitle}>Segurança</h2>
                  <p style={styles.sectionDescription}>
                    Proteja sua conta com segurança adicional
                  </p>
                </div>
              </div>

              <div style={styles.settingGroup}>
                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <div style={styles.settingTitleRow}>
                      <Shield size={18} color="#6b7280" />
                      <h3 style={styles.settingTitle}>Autenticação de Dois Fatores (2FA)</h3>
                    </div>
                    <p style={styles.settingDesc}>
                      Adicione uma camada extra de segurança
                    </p>
                  </div>
                  <label style={styles.switch}>
                    <input
                      type="checkbox"
                      checked={settings.twoFactorEnabled}
                      onChange={(e) => handleChange('twoFactorEnabled', e.target.checked)}
                    />
                    <span style={styles.slider}></span>
                  </label>
                </div>
              </div>

              <div style={styles.settingGroup}>
                <h3 style={styles.groupTitle}>Dispositivos Conectados</h3>
                <div style={styles.devicesList}>
                  {[
                    { name: 'Chrome - Windows', icon: Laptop, location: 'São Paulo, Brasil', current: true },
                    { name: 'Safari - iPhone', icon: Smartphone, location: 'São Paulo, Brasil', current: false }
                  ].map((device, idx) => {
                    const Icon = device.icon;
                    return (
                      <div key={idx} style={styles.deviceItem}>
                        <div style={styles.deviceIcon}>
                          <Icon size={24} color="#6b7280" />
                        </div>
                        <div style={styles.deviceInfo}>
                          <div style={styles.deviceName}>
                            {device.name}
                            {device.current && <span style={styles.currentBadge}>Atual</span>}
                          </div>
                          <div style={styles.deviceLocation}>{device.location}</div>
                        </div>
                        {!device.current && (
                          <button style={styles.deviceLogout}>
                            <LogOut size={16} />
                            Desconectar
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={styles.dangerZone}>
                <h3 style={styles.dangerTitle}>
                  <AlertCircle size={20} />
                  Zona de Perigo
                </h3>
                <p style={styles.dangerText}>
                  Ações irreversíveis que afetam permanentemente sua conta
                </p>
                <button style={styles.btnDanger} onClick={() => setShowDangerModal(true)}>
                  <Trash2 size={18} />
                  Excluir Conta
                </button>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <CreditCard size={24} color="#8b5cf6" />
                <div>
                  <h2 style={styles.sectionTitle}>Plano & Cobrança</h2>
                  <p style={styles.sectionDescription}>
                    Gerencie sua assinatura e métodos de pagamento
                  </p>
                </div>
              </div>

              <div style={styles.currentPlan}>
                <div style={styles.planHeader}>
                  <Crown size={32} color="#8b5cf6" />
                  <div>
                    <h3 style={styles.planName}>Plano Pro</h3>
                    <p style={styles.planDesc}>R$ 95/mês • Renovação em 15/02/2025</p>
                  </div>
                </div>
                <div style={styles.planStats}>
                  <div style={styles.planStatItem}>
                    <Zap size={18} color="#3b82f6" />
                    <span>5 usuários</span>
                  </div>
                  <div style={styles.planStatItem}>
                    <CheckCircle size={18} color="#10b981" />
                    <span>Ilimitado</span>
                  </div>
                </div>
              </div>

              <div style={styles.plansGrid}>
                {plans.map(plan => (
                  <div
                    key={plan.id}
                    style={{
                      ...styles.planCard,
                      ...(plan.current ? styles.planCardCurrent : {})
                    }}
                  >
                    {plan.badge && (
                      <div style={styles.planBadge}>{plan.badge}</div>
                    )}
                    <h4 style={styles.planCardName}>{plan.name}</h4>
                    <div style={styles.planPrice}>
                      <span style={styles.planPriceCurrency}>R$</span>
                      <span style={styles.planPriceValue}>{plan.price}</span>
                      <span style={styles.planPricePeriod}>/mês</span>
                    </div>
                    <ul style={styles.planFeatures}>
                      {plan.features.map((feature, idx) => (
                        <li key={idx} style={styles.planFeature}>
                          <Check size={16} color="#10b981" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      style={plan.current ? styles.planBtnCurrent : styles.planBtnUpgrade}
                      disabled={plan.current}
                    >
                      {plan.current ? 'Plano Atual' : 
                       plan.id === 'free' ? 'Downgrade' : 'Fazer Upgrade'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Bar */}
      {unsavedChanges && (
        <div style={styles.saveBar}>
          <div style={styles.saveBarContent}>
            <AlertCircle size={20} />
            <span>Você tem alterações não salvas</span>
          </div>
          <div style={styles.saveBarActions}>
            <button style={styles.btnCancel} onClick={() => setUnsavedChanges(false)}>
              Descartar
            </button>
            <button style={styles.btnSave} onClick={handleSave}>
              <Save size={18} />
              Salvar Alterações
            </button>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div style={styles.modalOverlay} onClick={() => setShowPasswordModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Redefinir Senha</h3>
              <button style={styles.btnClose} onClick={() => setShowPasswordModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Senha Atual</label>
                <input type="password" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nova Senha</label>
                <input type="password" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Confirmar Nova Senha</label>
                <input type="password" style={styles.input} />
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.btnCancel} onClick={() => setShowPasswordModal(false)}>Cancelar</button>
              <button style={styles.btnSave}>Atualizar Senha</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    background: '#fafafa',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    paddingBottom: '100px'
  },
  header: {
    marginBottom: '2rem'
  },
  headerTop: {
    marginBottom: '1rem'
  },
  btnBack: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'white',
    color: '#374151',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  headerBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'linear-gradient(135deg, #eff6ff, #f3e8ff)',
    color: '#3b82f6',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '600',
    marginBottom: '1rem'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.5rem'
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#6b7280'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    gap: '2rem'
  },
  sidebar: {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    padding: '0.5rem',
    height: 'fit-content',
    position: 'sticky',
    top: '2rem'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
    color: '#6b7280',
    fontSize: '0.875rem',
    fontWeight: '500',
    textAlign: 'left'
  },
  tabActive: {
    background: 'linear-gradient(135deg, #eff6ff, #f3e8ff)',
    color: '#3b82f6',
    fontWeight: '600'
  },
  mainContent: {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    padding: '2rem'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid #e5e7eb'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 0.25rem 0'
  },
  sectionDescription: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0
  },
  settingGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  groupTitle: {
    fontSize: '0.875rem',
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginTop: '1rem'
  },
  settingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    background: '#f9fafb',
    borderRadius: '8px',
    gap: '1rem'
  },
  settingInfo: {
    flex: 1
  },
  settingTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.25rem'
  },
  settingTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  settingDesc: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0
  },
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: '48px',
    height: '24px',
    flexShrink: 0
  },
  slider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#e5e7eb',
    transition: '0.3s',
    borderRadius: '24px'
  },
  themeSelector: {
    display: 'flex',
    gap: '0.75rem'
  },
  themeOption: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    minWidth: '100px'
  },
  themeOptionActive: {
    borderColor: '#3b82f6',
    background: '#eff6ff'
  },
  select: {
    padding: '0.75rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    outline: 'none',
    cursor: 'pointer',
    background: 'white',
    minWidth: '200px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151'
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    outline: 'none',
    fontFamily: 'inherit'
  },
  inputWithButton: {
    display: 'flex',
    gap: '0.75rem'
  },
  inputButton: {
    padding: '0.75rem 1.5rem',
    background: 'white',
    color: '#3b82f6',
    border: '1px solid #3b82f6',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  passwordSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '1.5rem',
    background: '#f9fafb',
    borderRadius: '12px'
  },
  passwordTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.25rem'
  },
  passwordDesc: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0
  },
  btnSecondary: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'white',
    color: '#374151',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  devicesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  deviceItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: '#f9fafb',
    borderRadius: '8px'
  },
  deviceIcon: {
    width: '48px',
    height: '48px',
    background: 'white',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  deviceInfo: {
    flex: 1
  },
  deviceName: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  currentBadge: {
    padding: '0.125rem 0.5rem',
    background: '#d1fae5',
    color: '#10b981',
    fontSize: '0.75rem',
    fontWeight: '600',
    borderRadius: '9999px'
  },
  deviceLocation: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  deviceLogout: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'transparent',
    color: '#ef4444',
    border: '1px solid #ef4444',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  dangerZone: {
    padding: '1.5rem',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '12px',
    marginTop: '2rem'
  },
  dangerTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  dangerText: {
    fontSize: '0.875rem',
    color: '#991b1b',
    marginBottom: '1rem'
  },
  btnDanger: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  currentPlan: {
    padding: '2rem',
    background: 'linear-gradient(135deg, #f3e8ff, #eff6ff)',
    borderRadius: '12px',
    marginBottom: '2rem'
  },
  planHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem'
  },
  planName: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0
  },
  planDesc: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0
  },
  planStats: {
    display: 'flex',
    gap: '1.5rem'
  },
  planStatItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#374151'
  },
  plansGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem'
  },
  planCard: {
    padding: '1.5rem',
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    position: 'relative',
    transition: 'all 0.3s'
  },
  planCardCurrent: {
    borderColor: '#8b5cf6',
    background: '#faf5ff'
  },
  planBadge: {
    position: 'absolute',
    top: '-12px',
    right: '1rem',
    padding: '0.25rem 0.75rem',
    background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: '700',
    borderRadius: '9999px'
  },
  planCardName: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1rem'
  },
  planPrice: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.25rem',
    marginBottom: '1.5rem'
  },
  planPriceCurrency: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#6b7280'
  },
  planPriceValue: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1f2937'
  },
  planPricePeriod: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  planFeatures: {
    listStyle: 'none',
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  planFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#374151'
  },
  planBtnCurrent: {
    width: '100%',
    padding: '0.75rem',
    background: '#e5e7eb',
    color: '#6b7280',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'not-allowed'
  },
  planBtnUpgrade: {
    width: '100%',
    padding: '0.75rem',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  saveBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'white',
    borderTop: '1px solid #e5e7eb',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  saveBarContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#f59e0b',
    fontSize: '0.875rem',
    fontWeight: '600'
  },
  saveBarActions: {
    display: 'flex',
    gap: '0.75rem'
  },
  btnCancel: {
    padding: '0.75rem 1.5rem',
    background: 'transparent',
    color: '#6b7280',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  btnSave: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)'
  },
  modal: {
    background: 'white',
    borderRadius: '16px',
    maxWidth: '500px',
    width: '90%',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },
  modalHeader: {
    padding: '1.5rem 2rem',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0
  },
  btnClose: {
    width: '32px',
    height: '32px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: '#6b7280',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBody: {
    padding: '2rem'
  },
  modalFooter: {
    padding: '1rem 2rem',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem'
  }
};

// CSS for toggle switch
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  input[type="checkbox"] {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  input[type="checkbox"]:checked + span {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  }
  
  input[type="checkbox"]:checked + span:before {
    transform: translateX(24px);
  }
  
  input[type="checkbox"] + span:before {
    content: "";
    position: absolute;
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`;
document.head.appendChild(styleSheet);