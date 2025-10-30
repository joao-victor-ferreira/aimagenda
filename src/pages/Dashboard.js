import React, { useState } from 'react';
import {
  Home,
  Users,
  Calendar,
  Zap,
  Brain,
  TrendingUp,
  UsersRound,
  Bell,
  Search,
  Settings,
  LogOut,
  ChevronDown,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  UserPlus
} from 'lucide-react';

import Integracao from './Integracao';
import AIConfiguracao from './AIConfiguracao';
import Agenda from './Agenda';
import Insights from './Insights';
import Equipe from './Equipe';
import Cliente from './Cliente';
import { useNavigate } from 'react-router-dom';
import MainContent from './MainContent';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Início' },
    { id: 'clients', icon: Users, label: 'Clientes' },
    { id: 'appointments', icon: Calendar, label: 'Agendamentos' },
    { id: 'integrations', icon: Zap, label: 'Integrações' },
    { id: 'ai', icon: Brain, label: 'IA' },
    { id: 'insights', icon: TrendingUp, label: 'Insights' },
    { id: 'team', icon: UsersRound, label: 'Equipe' }
  ];

  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: CheckCircle,
      color: '#10b981',
      bg: '#dcfce7',
      title: 'Agendamento confirmado',
      message: 'Maria Silva confirmou consulta para hoje às 14h',
      time: '5 min atrás',
      unread: true
    },
    {
      id: 2,
      type: 'warning',
      icon: Clock,
      color: '#f59e0b',
      bg: '#fef3c7',
      title: 'Lembrete de consulta',
      message: 'Próxima consulta em 30 minutos',
      time: '10 min atrás',
      unread: true
    },
    {
      id: 3,
      type: 'info',
      icon: UserPlus,
      color: '#3b82f6',
      bg: '#dbeafe',
      title: 'Novo cliente cadastrado',
      message: 'Pedro Santos acabou de se cadastrar',
      time: '1 hora atrás',
      unread: false
    },
    {
      id: 4,
      type: 'alert',
      icon: AlertCircle,
      color: '#ef4444',
      bg: '#fee2e2',
      title: 'Pagamento pendente',
      message: 'Fatura #1234 vence em 2 dias',
      time: '2 horas atrás',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    console.log('Saindo do sistema...');
    setLogoutModalOpen(false);
    // Aqui você colocaria a lógica de logout real
  };

 // 🔹 Conteúdo dinâmico de acordo com o menu selecionado
  const renderContent = () => {
    switch (activeMenu) {
      case 'clients':
        return (
        <Cliente />
        );

      case 'appointments':
        return (
          <Agenda />
        );

      case 'integrations':
        return (
          <Integracao />
        );

      case 'ai':
        return (
        <AIConfiguracao />
        );

      case 'insights':
        return (
          <Insights />  
        );

      case 'team':
        return (
          <Equipe />
        );

      default:
        // 🔹 Página inicial (Dashboard)
        return (
        <MainContent />
        );
    }
  };



  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>
            <Brain size={24} color="white" />
          </div>
          <span style={styles.logoText}>AIM Agenda</span>
        </div>

        <nav style={styles.menuList}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                style={{
                  ...styles.menuItem,
                  ...(isActive ? styles.menuItemActive : {})
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#f9fafb';
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.color = '#374151';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.color = '#6b7280';
                  }
                }}
              >
                <Icon size={20} />
                <span style={styles.menuLabel}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div style={styles.sidebarFooter}>
          <button 
            style={styles.settingsBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #eff6ff, #f3e8ff)';
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.color = '#3b82f6';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.color = '#6b7280';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Settings size={20} />
            <span>Configurações</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.headerTitle}>Painel</h1>
            <p style={styles.headerSubtitle}>Bem-vindo de volta, João Silva</p>
          </div>

          <div style={styles.headerRight}>
            <div style={styles.searchContainer}>
              <Search size={18} style={styles.searchIcon} />
              <input type="text" placeholder="Buscar..." style={styles.searchInput} />
            </div>

            {/* Botão de Notificações */}
            <div style={{position: 'relative'}}>
              <button 
                style={styles.iconButton}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span style={styles.notificationBadge}>{unreadCount}</span>
                )}
              </button>

              {/* Dropdown de Notificações */}
              {notificationsOpen && (
                <div style={styles.notificationsPanel}>
                  <div style={styles.notificationsPanelHeader}>
                    <h3 style={styles.notificationsPanelTitle}>Notificações</h3>
                    <button 
                      style={styles.closeNotificationsBtn}
                      onClick={() => setNotificationsOpen(false)}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div style={styles.notificationsList}>
                    {notifications.map((notification) => {
                      const NotifIcon = notification.icon;
                      return (
                        <div 
                          key={notification.id} 
                          style={{
                            ...styles.notificationItem,
                            ...(notification.unread ? styles.notificationItemUnread : {})
                          }}
                        >
                          <div style={{
                            ...styles.notificationIcon,
                            background: notification.bg
                          }}>
                            <NotifIcon size={18} color={notification.color} />
                          </div>
                          <div style={styles.notificationContent}>
                            <p style={styles.notificationTitle}>{notification.title}</p>
                            <p style={styles.notificationMessage}>{notification.message}</p>
                            <span style={styles.notificationTime}>{notification.time}</span>
                          </div>
                          {notification.unread && (
                            <div style={styles.unreadDot}></div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div style={styles.notificationsPanelFooter}>
                    <button style={styles.viewAllNotificationsBtn}>
                      Ver todas as notificações
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div style={styles.userMenu}>
              <button style={styles.userButton} onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <div style={styles.userAvatar}>JS</div>
                <div style={styles.userInfo}>
                  <span style={styles.userName}>João Silva</span>
                  <span style={styles.userRole}>Admin</span>
                </div>
                <ChevronDown size={16} />
              </button>

              {userMenuOpen && (
                <div style={styles.userDropdown}>
                  <button style={styles.dropdownItem}>
                    <Settings size={16} /> Configurações
                  </button>
                  <button 
                    style={{...styles.dropdownItem, color: '#ef4444'}}
                    onClick={() => {
                      setUserMenuOpen(false);
                      setLogoutModalOpen(true);
                    }}
                  >
                    <LogOut size={16} /> Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Conteúdo dinâmico */}
        {renderContent()}
      </main>

      {/* Modal de Logout */}
      {logoutModalOpen && (
        <>
          <div 
            style={styles.modalOverlay}
            onClick={() => setLogoutModalOpen(false)}
          />
          <div style={styles.logoutModal}>
            <div style={styles.logoutModalIcon}>
              <LogOut size={32} color="#ef4444" />
            </div>
            <h2 style={styles.logoutModalTitle}>Confirmar Saída</h2>
            <p style={styles.logoutModalMessage}>
              Tem certeza que deseja sair do sistema?
            </p>
            <div style={styles.logoutModalActions}>
              <button 
                style={styles.logoutCancelBtn}
                onClick={() => setLogoutModalOpen(false)}
              >
                Cancelar
              </button>
              <button 
                style={styles.logoutConfirmBtn}
                onClick={handleLogout}
              >
                Sim, Sair
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { display: 'flex', minHeight: '100vh', background: '#fafafa', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  contentWrapper: { padding: '2rem' },
  sidebar: { width: '260px', background: 'white', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', zIndex: 100 },
  sidebarHeader: { padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid #f3f4f6' },
  logo: { width: '40px', height: '40px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  menuList: { padding: '1rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  menuItem: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '0.75rem', 
    padding: '1rem 2rem', 
    background: 'transparent', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    color: '#6b7280', 
    fontSize: '0.875rem', 
    fontWeight: '500', 
    width: '100%',
    transition: 'all 0.3s ease',
    transform: 'translateX(0)'
  },
  menuItemActive: { background: 'linear-gradient(135deg, #eff6ff, #f3e8ff)', color: '#3b82f6', fontWeight: '600' },
  menuLabel: { flex: 1, textAlign: 'left' },
  sidebarFooter: { padding: '1rem', borderTop: '1px solid #f3f4f6' },
  settingsBtn: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '0.75rem', 
    padding: '0.75rem 1rem', 
    background: 'transparent', 
    border: '1px solid #e5e7eb', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    color: '#6b7280', 
    fontSize: '0.875rem', 
    fontWeight: '500',
    transition: 'all 0.3s ease',
    width: '100%'
  },
  mainContent: { flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' },
  header: { background: 'white', borderBottom: '1px solid #e5e7eb', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 },
  headerTitle: { fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: 0 },
  headerSubtitle: { fontSize: '0.875rem', color: '#6b7280', margin: 0 },
  headerRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
  searchContainer: { position: 'relative' },
  searchIcon: { position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' },
  searchInput: { padding: '0.5rem 0.75rem 0.5rem 2.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '0.875rem', width: '250px' },
  iconButton: { padding: '0.5rem', background: 'transparent', border: 'none', borderRadius: '8px', color: '#6b7280', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' },
  notificationBadge: { 
    position: 'absolute', 
    top: '0.25rem', 
    right: '0.25rem', 
    minWidth: '18px',
    height: '18px',
    background: '#ef4444', 
    borderRadius: '50%',
    color: 'white',
    fontSize: '0.65rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid white'
  },
  notificationsPanel: {
    position: 'absolute',
    right: 0,
    top: '120%',
    width: '380px',
    maxHeight: '500px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
    animation: 'slideDown 0.3s ease',
    zIndex: 1000
  },
  notificationsPanelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.25rem',
    borderBottom: '1px solid #f3f4f6'
  },
  notificationsPanelTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0
  },
  closeNotificationsBtn: {
    padding: '0.25rem',
    background: 'transparent',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all 0.2s'
  },
  notificationsList: {
    maxHeight: '360px',
    overflowY: 'auto'
  },
  notificationItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '1rem 1.25rem',
    borderBottom: '1px solid #f9fafb',
    cursor: 'pointer',
    transition: 'background 0.2s',
    position: 'relative'
  },
  notificationItemUnread: {
    background: '#f9fafb'
  },
  notificationIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  notificationContent: {
    flex: 1
  },
  notificationTitle: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 0.25rem 0'
  },
  notificationMessage: {
    fontSize: '0.8rem',
    color: '#6b7280',
    margin: '0 0 0.25rem 0',
    lineHeight: '1.4'
  },
  notificationTime: {
    fontSize: '0.75rem',
    color: '#9ca3af'
  },
  unreadDot: {
    width: '8px',
    height: '8px',
    background: '#3b82f6',
    borderRadius: '50%',
    flexShrink: 0,
    marginTop: '0.5rem'
  },
  notificationsPanelFooter: {
    padding: '0.75rem 1.25rem',
    borderTop: '1px solid #f3f4f6'
  },
  viewAllNotificationsBtn: {
    width: '100%',
    padding: '0.5rem',
    background: 'transparent',
    border: 'none',
    color: '#3b82f6',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'background 0.2s'
  },
  userMenu: { position: 'relative' },
  userButton: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer' },
  userAvatar: { width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600' },
  userInfo: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  userName: { fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' },
  userRole: { fontSize: '0.75rem', color: '#6b7280' },
  userDropdown: { position: 'absolute', right: 0, top: '110%', background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', width: '180px', zIndex: 10 },
  dropdownItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', border: 'none', background: 'transparent', cursor: 'pointer', color: '#374151', fontSize: '0.875rem', width: '100%', textAlign: 'left', transition: 'background 0.2s' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' },
  statCard: { background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  statHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  statIcon: { padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  statChange: { display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: '600' },
  statTitle: { color: '#6b7280', fontSize: '0.875rem', margin: 0 },
  statValue: { fontSize: '1.75rem', fontWeight: '700', marginTop: '0.25rem', color: '#111827' },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 9998,
    animation: 'fadeIn 0.3s ease'
  },
  logoutModal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    borderRadius: '16px',
    padding: '2rem',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    zIndex: 9999,
    animation: 'modalSlideUp 0.3s ease',
    textAlign: 'center'
  },
  logoutModalIcon: {
    width: '64px',
    height: '64px',
    margin: '0 auto 1rem',
    background: '#fee2e2',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoutModalTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 0.5rem 0'
  },
  logoutModalMessage: {
    fontSize: '0.95rem',
    color: '#6b7280',
    margin: '0 0 1.5rem 0',
    lineHeight: '1.5'
  },
  logoutModalActions: {
    display: 'flex',
    gap: '0.75rem'
  },
  logoutCancelBtn: {
    flex: 1,
    padding: '0.75rem',
    background: '#f3f4f6',
    border: 'none',
    borderRadius: '8px',
    color: '#374151',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  logoutConfirmBtn: {
    flex: 1,
    padding: '0.75rem',
    background: '#ef4444',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  }
};

// Adiciona as animações CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes modalSlideUp {
    from {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);