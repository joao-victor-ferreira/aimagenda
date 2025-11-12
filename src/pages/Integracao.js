import React, { useState, useEffect } from 'react';
import {
  Zap,
  Calendar,
  Mail,
  MessageSquare,
  Instagram,
  CheckCircle,
  XCircle,
  Settings,
  ExternalLink,
  Clock,
  TrendingUp,
  Shield,
  Sparkles,
  Info,
  ChevronRight,
  Link as LinkIcon,
} from 'lucide-react';

export default function Integracao() {
  const [isMobile, setIsMobile] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      name: 'Google Calendar',
      icon: Calendar,
      description:
        'Sincronize seus agendamentos automaticamente com o Google Calendar',
      category: 'Calendário',
      status: 'connected',
      color: '#4285f4',
      bgColor: '#e8f0fe',
      features: [
        'Sincronização bidirecional',
        'Eventos em tempo real',
        'Múltiplas agendas',
      ],
      lastSync: '2 min atrás',
      eventsToday: 12,
    },
    {
      id: 2,
      name: 'WhatsApp Business',
      icon: MessageSquare,
      description:
        'Responda clientes e confirme agendamentos via WhatsApp automaticamente',
      category: 'Mensageria',
      status: 'connected',
      color: '#25d366',
      bgColor: '#d4f4dd',
      features: ['Respostas automáticas', 'Confirmações', 'Lembretes'],
      lastSync: '5 min atrás',
      messagesProcessed: 156,
    },
    {
      id: 3,
      name: 'Gmail',
      icon: Mail,
      description:
        'Envie confirmações e lembretes por email de forma automatizada',
      category: 'Email',
      status: 'disconnected',
      color: '#ea4335',
      bgColor: '#fce8e6',
      features: [
        'Templates personalizados',
        'Tracking de abertura',
        'Agendamento',
      ],
      lastSync: null,
      emailsSent: 0,
    },
    {
      id: 4,
      name: 'Instagram',
      icon: Instagram,
      description: 'Receba mensagens do Instagram e converta em agendamentos',
      category: 'Redes Sociais',
      status: 'pending',
      color: '#e4405f',
      bgColor: '#fce8ec',
      features: ['DMs automáticas', 'Stories integration', 'Quick replies'],
      lastSync: null,
      interactions: 0,
    },
    {
      id: 5,
      name: 'Slack',
      icon: MessageSquare,
      description: 'Notificações e alertas da equipe em tempo real no Slack',
      category: 'Comunicação',
      status: 'disconnected',
      color: '#4a154b',
      bgColor: '#f4ecf7',
      features: ['Notificações em tempo real', 'Comandos slash', 'Webhooks'],
      lastSync: null,
      notifications: 0,
    },
    {
      id: 6,
      name: 'Zoom',
      icon: LinkIcon,
      description:
        'Crie automaticamente links de reuniões Zoom para seus agendamentos',
      category: 'Videoconferência',
      status: 'disconnected',
      color: '#2d8cff',
      bgColor: '#e3f2fd',
      features: ['Links automáticos', 'Gravações', 'Integração com calendário'],
      lastSync: null,
      meetingsCreated: 0,
    },
  ]);

  const stats = [
    { label: 'Ativas', value: '2', icon: CheckCircle, color: '#10b981' },
    { label: 'Eventos', value: '1.2k', icon: TrendingUp, color: '#3b82f6' },
    { label: 'Automações', value: '8', icon: Zap, color: '#f59e0b' },
    { label: 'Sucesso', value: '98%', icon: Shield, color: '#8b5cf6' },
  ];

  const handleToggleConnection = (integration) => {
    if (integration.status === 'connected') {
      setIntegrations(
        integrations.map((int) =>
          int.id === integration.id
            ? { ...int, status: 'disconnected', lastSync: null }
            : int,
        ),
      );
    } else {
      setSelectedIntegration(integration);
      setShowConfigModal(true);
    }
  };

  const handleConnect = () => {
    if (selectedIntegration) {
      setIntegrations(
        integrations.map((int) =>
          int.id === selectedIntegration.id
            ? { ...int, status: 'connected', lastSync: 'Agora' }
            : int,
        ),
      );
      setShowConfigModal(false);
      setSelectedIntegration(null);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      connected: {
        icon: CheckCircle,
        text: 'Conectado',
        color: '#10b981',
        bg: '#d1fae5',
      },
      pending: {
        icon: Clock,
        text: 'Pendente',
        color: '#f59e0b',
        bg: '#fef3c7',
      },
      disconnected: {
        icon: XCircle,
        text: 'Desconectado',
        color: '#ef4444',
        bg: '#fee2e2',
      },
    };
    return configs[status] || configs.disconnected;
  };

  return (
    <div style={styles.container}>
      <style>{mediaQueries}</style>

      <div style={styles.header}>
        <div style={{ width: '100%' }}>
          <div style={styles.headerBadge}>
            <Zap size={16} />
            <span>Integrações</span>
          </div>
          <h1 style={styles.title}>Integrações</h1>
          <p style={styles.subtitle}>Conecte suas ferramentas favoritas</p>
        </div>
      </div>

      <div style={styles.statsGrid} className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} style={styles.statCard}>
              <div
                style={{
                  ...styles.statIcon,
                  background: `${stat.color}15`,
                  color: stat.color,
                }}
              >
                <Icon size={isMobile ? 20 : 24} />
              </div>
              <div>
                <p style={styles.statLabel}>{stat.label}</p>
                <p style={styles.statValue}>{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={styles.infoBanner} className="info-banner">
        <div style={styles.infoBannerIcon}>
          <Sparkles size={isMobile ? 20 : 24} />
        </div>
        <div style={styles.infoBannerContent}>
          <h3 style={styles.infoBannerTitle}>Maximize sua produtividade</h3>
          <p style={styles.infoBannerText}>
            Conecte suas ferramentas e deixe a IA trabalhar por você
          </p>
        </div>
      </div>

      <div style={styles.integrationsGrid} className="integrations-grid">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          const statusConfig = getStatusConfig(integration.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div key={integration.id} style={styles.integrationCard}>
              <div style={styles.cardHeader}>
                <div
                  style={{
                    ...styles.integrationIcon,
                    background: integration.bgColor,
                    color: integration.color,
                  }}
                >
                  <Icon size={isMobile ? 28 : 32} />
                </div>
                <div
                  style={{
                    ...styles.statusBadge,
                    background: statusConfig.bg,
                    color: statusConfig.color,
                  }}
                >
                  <StatusIcon size={14} />
                  <span>{statusConfig.text}</span>
                </div>
              </div>

              <div style={styles.cardBody}>
                <div style={styles.categoryBadge}>{integration.category}</div>
                <h3 style={styles.integrationName}>{integration.name}</h3>
                <p style={styles.integrationDescription}>
                  {integration.description}
                </p>

                <div style={styles.featuresList}>
                  {integration.features.map((feature, idx) => (
                    <div key={idx} style={styles.featureItem}>
                      <CheckCircle size={14} color="#10b981" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {integration.status === 'connected' && (
                  <div style={styles.integrationStats}>
                    <div style={styles.integrationStatItem}>
                      <Clock size={14} color="#6b7280" />
                      <span>Última sync: {integration.lastSync}</span>
                    </div>
                    {integration.eventsToday && (
                      <div style={styles.integrationStatItem}>
                        <TrendingUp size={14} color="#10b981" />
                        <span>{integration.eventsToday} eventos hoje</span>
                      </div>
                    )}
                    {integration.messagesProcessed && (
                      <div style={styles.integrationStatItem}>
                        <MessageSquare size={14} color="#10b981" />
                        <span>{integration.messagesProcessed} mensagens</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div style={styles.cardFooter}>
                {integration.status === 'connected' ? (
                  <>
                    <button
                      style={styles.btnSettings}
                      onClick={() => {
                        setSelectedIntegration(integration);
                        setShowConfigModal(true);
                      }}
                    >
                      <Settings size={16} />
                      {!isMobile && 'Configurar'}
                    </button>
                    <button
                      style={styles.btnDisconnect}
                      onClick={() => handleToggleConnection(integration)}
                    >
                      <XCircle size={16} />
                      {!isMobile && 'Desconectar'}
                    </button>
                  </>
                ) : (
                  <button
                    style={styles.btnConnect}
                    onClick={() => handleToggleConnection(integration)}
                  >
                    <Zap size={16} />
                    Conectar
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={styles.helpSection}>
        <div style={styles.helpCard}>
          <Info size={24} color="#3b82f6" />
          <div style={{ flex: 1 }}>
            <h3 style={styles.helpTitle}>Precisa de ajuda?</h3>
            <p style={styles.helpText}>Confira nossa documentação completa</p>
            <button style={styles.helpButton}>
              Ver Documentação
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>

      {showConfigModal && selectedIntegration && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowConfigModal(false)}
        >
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitleContainer}>
                {React.createElement(selectedIntegration.icon, {
                  size: isMobile ? 24 : 32,
                  color: selectedIntegration.color,
                })}
                <div>
                  <h2 style={styles.modalTitle}>{selectedIntegration.name}</h2>
                  <p style={styles.modalSubtitle}>Configuração de integração</p>
                </div>
              </div>
              <button
                style={styles.btnClose}
                onClick={() => setShowConfigModal(false)}
              >
                ×
              </button>
            </div>

            <div style={styles.modalBody}>
              {selectedIntegration.status === 'connected' ? (
                <>
                  <div style={styles.modalSection}>
                    <h3 style={styles.sectionTitle}>Status da Conexão</h3>
                    <div style={styles.connectionStatus}>
                      <CheckCircle size={20} color="#10b981" />
                      <div>
                        <p style={styles.connectionStatusText}>
                          Conectado com sucesso
                        </p>
                        <p style={styles.connectionStatusTime}>
                          Última sincronização: {selectedIntegration.lastSync}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={styles.modalSection}>
                    <h3 style={styles.sectionTitle}>Configurações</h3>
                    <div style={styles.settingItem}>
                      <label style={styles.settingLabel}>
                        <input
                          type="checkbox"
                          defaultChecked
                          style={styles.checkbox}
                        />
                        Sincronização automática
                      </label>
                    </div>
                    <div style={styles.settingItem}>
                      <label style={styles.settingLabel}>
                        <input
                          type="checkbox"
                          defaultChecked
                          style={styles.checkbox}
                        />
                        Notificações em tempo real
                      </label>
                    </div>
                    <div style={styles.settingItem}>
                      <label style={styles.settingLabel}>
                        <input type="checkbox" style={styles.checkbox} />
                        Sincronizar eventos passados
                      </label>
                    </div>
                  </div>

                  <div style={styles.modalSection}>
                    <h3 style={styles.sectionTitle}>Ações</h3>
                    <button style={styles.actionButton}>
                      <TrendingUp size={16} />
                      Forçar sincronização agora
                    </button>
                    <button
                      style={{ ...styles.actionButton, marginTop: '0.5rem' }}
                    >
                      <Settings size={16} />
                      Configurações avançadas
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div style={styles.modalSection}>
                    <h3 style={styles.sectionTitle}>Sobre esta integração</h3>
                    <p style={styles.modalText}>
                      {selectedIntegration.description}
                    </p>
                  </div>

                  <div style={styles.modalSection}>
                    <h3 style={styles.sectionTitle}>Recursos incluídos</h3>
                    <div style={styles.featuresList}>
                      {selectedIntegration.features.map((feature, idx) => (
                        <div key={idx} style={styles.featureItem}>
                          <CheckCircle size={16} color="#10b981" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={styles.modalSection}>
                    <h3 style={styles.sectionTitle}>Permissões necessárias</h3>
                    <div style={styles.permissionsList}>
                      <div style={styles.permissionItem}>
                        <Shield size={16} color="#3b82f6" />
                        <span>Leitura e escrita de eventos</span>
                      </div>
                      <div style={styles.permissionItem}>
                        <Shield size={16} color="#3b82f6" />
                        <span>Acesso a informações básicas</span>
                      </div>
                      <div style={styles.permissionItem}>
                        <Shield size={16} color="#3b82f6" />
                        <span>Notificações em tempo real</span>
                      </div>
                    </div>
                  </div>

                  <div style={styles.securityNote}>
                    <Shield size={18} color="#10b981" />
                    <p>Todas as conexões são criptografadas e seguras</p>
                  </div>
                </>
              )}
            </div>

            <div style={styles.modalFooter}>
              <button
                style={styles.btnCancel}
                onClick={() => setShowConfigModal(false)}
              >
                Cancelar
              </button>
              {selectedIntegration.status === 'connected' ? (
                <button style={styles.btnSave}>Salvar</button>
              ) : (
                <button style={styles.btnPrimary} onClick={handleConnect}>
                  <Zap size={18} />
                  Conectar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mediaQueries = `
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 1rem !important;
    }
    
    .info-banner {
      flex-direction: column !important;
      text-align: center !important;
      gap: 1rem !important;
    }
    
    .integrations-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

const styles = {
  container: {
    padding: '1rem',
    background: '#fafafa',
    minHeight: '100vh',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    marginBottom: '1.5rem',
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
    marginBottom: '0.75rem',
  },
  title: {
    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
    color: '#6b7280',
    lineHeight: '1.6',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: 'white',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid #f3f4f6',
  },
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  statLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
    margin: '0 0 0.25rem 0',
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
  },
  infoBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    padding: '1.5rem',
    borderRadius: '12px',
    marginBottom: '1.5rem',
    color: 'white',
  },
  infoBannerIcon: {
    width: '48px',
    height: '48px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  infoBannerContent: {
    flex: 1,
  },
  infoBannerTitle: {
    fontSize: 'clamp(1rem, 4vw, 1.5rem)',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
  },
  infoBannerText: {
    fontSize: 'clamp(0.875rem, 3vw, 1rem)',
    opacity: 0.95,
    margin: 0,
    lineHeight: '1.6',
  },
  integrationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  integrationCard: {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #f3f4f6',
    overflow: 'hidden',
    transition: 'all 0.3s',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    padding: '1.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '1px solid #f3f4f6',
  },
  integrationIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.375rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  cardBody: {
    padding: '1.25rem',
    flex: 1,
  },
  categoryBadge: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    background: '#f3f4f6',
    color: '#6b7280',
    fontSize: '0.75rem',
    fontWeight: '600',
    borderRadius: '9999px',
    marginBottom: '0.75rem',
  },
  integrationName: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 0.5rem 0',
  },
  integrationDescription: {
    fontSize: '0.875rem',
    color: '#6b7280',
    lineHeight: '1.6',
    margin: '0 0 1rem 0',
  },
  featuresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#374151',
  },
  integrationStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '1rem',
    background: '#f9fafb',
    borderRadius: '8px',
    marginTop: '1rem',
  },
  integrationStatItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  cardFooter: {
    padding: '1rem 1.25rem',
    borderTop: '1px solid #f3f4f6',
    display: 'flex',
    gap: '0.5rem',
  },
  btnConnect: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    flex: 1,
    padding: '0.75rem',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  btnSettings: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    flex: 1,
    padding: '0.75rem',
    background: 'transparent',
    color: '#6b7280',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  btnDisconnect: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    background: '#fee2e2',
    color: '#ef4444',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  helpSection: {
    marginTop: '2rem',
  },
  helpCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #f3f4f6',
    flexWrap: 'wrap',
  },
  helpTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 0.5rem 0',
  },
  helpText: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: '0 0 0.75rem 0',
    lineHeight: '1.6',
  },
  helpButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'transparent',
    color: '#3b82f6',
    border: '1px solid #3b82f6',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
    padding: '1rem',
  },
  modal: {
    background: 'white',
    borderRadius: '16px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  modalHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #f3f4f6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  modalTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  modalTitle: {
    fontSize: 'clamp(1.125rem, 4vw, 1.5rem)',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 0.25rem 0',
  },
  modalSubtitle: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0,
  },
  btnClose: {
    width: '32px',
    height: '32px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.5rem',
    color: '#6b7280',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    flexShrink: 0,
  },
  modalBody: {
    padding: '1.5rem',
    overflowY: 'auto',
    flex: 1,
  },
  modalSection: {
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  modalText: {
    fontSize: '0.875rem',
    color: '#6b7280',
    lineHeight: '1.6',
    margin: 0,
  },
  connectionStatus: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '1rem',
    background: '#d1fae5',
    borderRadius: '8px',
  },
  connectionStatusText: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#10b981',
    margin: '0 0 0.25rem 0',
  },
  connectionStatusTime: {
    fontSize: '0.75rem',
    color: '#059669',
    margin: 0,
  },
  settingItem: {
    padding: '0.75rem 0',
    borderBottom: '1px solid #f3f4f6',
  },
  settingLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '0.875rem',
    color: '#374151',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '0.75rem',
    background: '#f9fafb',
    color: '#374151',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  permissionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  permissionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem',
    background: '#f9fafb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    color: '#374151',
  },
  securityNote: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    padding: '1rem',
    background: '#d1fae5',
    borderRadius: '8px',
    marginTop: '1.5rem',
    fontSize: '0.875rem',
    color: '#059669',
  },
  modalFooter: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid #f3f4f6',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  btnCancel: {
    padding: '0.75rem 1.5rem',
    background: 'transparent',
    color: '#6b7280',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  btnSave: {
    padding: '0.75rem 1.5rem',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  btnPrimary: {
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
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};
