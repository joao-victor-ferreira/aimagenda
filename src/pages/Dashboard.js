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
  UserPlus,
  Menu
} from 'lucide-react';

import Integracao from './Integracao';
import AIConfiguracao from './AIConfiguracao';
import Agenda from './Agenda';
import Insights from './Insights';
import Equipe from './Equipe';
import Cliente from './Cliente';
import MainContent from './MainContent';
import { useNavigate, Navigate } from 'react-router-dom';
import useAuth from '../config/useAuth';

export default function Dashboard() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { user, loading } = useAuth();


  console.log('Usuário autenticado:', user);


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
  
  // 🔹 Remove o token e dados do usuário
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  // 🔹 Fecha o modal
  setLogoutModalOpen(false);

  // 🔹 Redireciona para a tela de login
  navigate('/login');
};


  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    setSidebarOpen(false); // Fecha sidebar no mobile após clicar
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'clients':
        return <Cliente />;
      case 'appointments':
        return <Agenda />;
      case 'integrations':
        return <Integracao />;
      case 'ai':
        return <AIConfiguracao />;
      case 'insights':
        return <Insights />;
      case 'team':
        return <Equipe />;
      default:
        return <MainContent />;
    }
  };

  // Extrai apenas os dois primeiros nomes
const nomeCurto = user?.nomeCompleto
  ? user.nomeCompleto.split(" ").slice(0, 2).join(" ")
  : "";

  const iniciaisNome = user?.nomeCompleto
  ? user.nomeCompleto
      .split(" ")
      .slice(0, 2)
      .map((parte) => parte[0].toUpperCase())
      .join("")
  : "";

  return (
    <div className="dashboard-container">
      <style>{`
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: #fafafa;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        /* Overlay para mobile */
        .sidebar-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
        }

        .sidebar-overlay.active {
          display: block;
        }

        /* Sidebar */
        .sidebar {
          width: 260px;
          background: white;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          z-index: 999;
          transition: transform 0.3s ease;
        }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar.open {
            transform: translateX(0);
          }
        }

        .sidebar-header {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid #f3f4f6;
        }

        .logo {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .menu-list {
          padding: 1rem;
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          color: #6b7280;
          font-size: 0.875rem;
          font-weight: 500;
          width: 100%;
          transition: all 0.3s ease;
          text-align: left;
        }

        .menu-item:hover {
          background: #f9fafb;
          transform: translateX(4px);
          color: #374151;
        }

        .menu-item.active {
          background: linear-gradient(135deg, #eff6ff, #f3e8ff);
          color: #3b82f6;
          font-weight: 600;
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid #f3f4f6;
        }

        .settings-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: transparent;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          color: #6b7280;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s ease;
          width: 100%;
        }

        .settings-btn:hover {
          background: linear-gradient(135deg, #eff6ff, #f3e8ff);
          border-color: #3b82f6;
          color: #3b82f6;
          transform: scale(1.02);
        }

        /* Main Content */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 0;
        }

        @media (min-width: 769px) {
          .main-content {
            margin-left: 260px;
          }
        }

        /* Header */
        .header {
          background: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 50;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .header {
            padding: 1.5rem 2rem;
          }
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          min-width: 0;
        }

        .menu-toggle {
          padding: 0.5rem;
          background: transparent;
          border: none;
          color: #6b7280;
          cursor: pointer;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 769px) {
          .menu-toggle {
            display: none;
          }
        }

        .header-info {
          flex: 1;
          min-width: 0;
        }

        .header-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        @media (min-width: 768px) {
          .header-title {
            font-size: 1.5rem;
          }
        }

        .header-subtitle {
          font-size: 0.8rem;
          color: #6b7280;
          margin: 0;
          display: none;
        }

        @media (min-width: 768px) {
          .header-subtitle {
            display: block;
            font-size: 0.875rem;
          }
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        @media (min-width: 768px) {
          .header-right {
            gap: 1rem;
          }
        }

        .search-container {
          position: relative;
          display: none;
        }

        @media (min-width: 768px) {
          .search-container {
            display: block;
          }
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .search-input {
          padding: 0.5rem 0.75rem 0.5rem 2.5rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          fontSize: 0.875rem;
          width: 250px;
        }

        .icon-button {
          padding: 0.5rem;
          background: transparent;
          border: none;
          border-radius: 8px;
          color: #6b7280;
          position: relative;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-button:hover {
          background: #f3f4f6;
        }

        .notification-badge {
          position: absolute;
          top: 0.25rem;
          right: 0.25rem;
          min-width: 18px;
          height: 18px;
          background: #ef4444;
          border-radius: 50%;
          color: white;
          font-size: 0.65rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
        }

        /* Notifications Panel */
        .notifications-panel {
          position: absolute;
          right: 0;
          top: 120%;
          width: 90vw;
          max-width: 380px;
          max-height: 500px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          border: 1px solid #e5e7eb;
          animation: slideDown 0.3s ease;
          z-index: 1000;
        }

        .notifications-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #f3f4f6;
        }

        .notifications-panel-title {
          font-size: 1rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .close-notifications-btn {
          padding: 0.25rem;
          background: transparent;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .notifications-list {
          max-height: 360px;
          overflow-y: auto;
        }

        .notification-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #f9fafb;
          cursor: pointer;
          transition: background 0.2s;
          position: relative;
        }

        .notification-item:hover {
          background: #f9fafb;
        }

        .notification-item.unread {
          background: #f9fafb;
        }

        .notification-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notification-content {
          flex: 1;
        }

        .notification-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 0.25rem 0;
        }

        .notification-message {
          font-size: 0.8rem;
          color: #6b7280;
          margin: 0 0 0.25rem 0;
          line-height: 1.4;
        }

        .notification-time {
          font-size: 0.75rem;
          color: #9ca3af;
        }

        .unread-dot {
          width: 8px;
          height: 8px;
          background: #3b82f6;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 0.5rem;
        }

        .notifications-panel-footer {
          padding: 0.75rem 1.25rem;
          border-top: 1px solid #f3f4f6;
        }

        .view-all-notifications-btn {
          width: 100%;
          padding: 0.5rem;
          background: transparent;
          border: none;
          color: #3b82f6;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          transition: background 0.2s;
        }

        .view-all-notifications-btn:hover {
          background: #f3f4f6;
        }

        /* User Menu */
        .user-menu {
          position: relative;
        }

        .user-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        @media (min-width: 768px) {
          .user-button {
            gap: 0.75rem;
          }
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .user-info {
          display: none;
          flex-direction: column;
          align-items: flex-start;
        }

        @media (min-width: 768px) {
          .user-info {
            display: flex;
          }
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1f2937;
        }

        .user-role {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .user-dropdown {
          position: absolute;
          right: 0;
          top: 110%;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          width: 180px;
          z-index: 10;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: none;
          background: transparent;
          cursor: pointer;
          color: #374151;
          font-size: 0.875rem;
          width: 100%;
          text-align: left;
          transition: background 0.2s;
        }

        .dropdown-item:hover {
          background: #f9fafb;
        }

        .dropdown-item.logout {
          color: #ef4444;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 9998;
          animation: fadeIn 0.3s ease;
        }

        .logout-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 16px;
          padding: 2rem;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          z-index: 9999;
          animation: modalSlideUp 0.3s ease;
          text-align: center;
        }

        .logout-modal-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1rem;
          background: #fee2e2;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logout-modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 0.5rem 0;
        }

        .logout-modal-message {
          font-size: 0.95rem;
          color: #6b7280;
          margin: 0 0 1.5rem 0;
          line-height: 1.5;
        }

        .logout-modal-actions {
          display: flex;
          gap: 0.75rem;
        }

        .logout-cancel-btn {
          flex: 1;
          padding: 0.75rem;
          background: #f3f4f6;
          border: none;
          border-radius: 8px;
          color: #374151;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .logout-cancel-btn:hover {
          background: #e5e7eb;
        }

        .logout-confirm-btn {
          flex: 1;
          padding: 0.75rem;
          background: #ef4444;
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .logout-confirm-btn:hover {
          background: #dc2626;
        }

        /* Animations */
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
      `}</style>

      {/* Overlay */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <img src={require('../assets/logo.png')} alt="AIM Agenda" style={{width: '40px', height: '40px', borderRadius: 10}} />
          </div>
          <span className="logo-text">AIM Agenda</span>
        </div>

        <nav className="menu-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`menu-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button onClick={() => navigate('/configuracao')} className="settings-btn">
            <Settings size={20} />
            <span>Configurações</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <button 
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>

            <div className="header-info">
              <h1 className="header-title">Painel</h1>
              <p className="header-subtitle">Bem-vindo de volta, {nomeCurto}</p>
            </div>
          </div>

          <div className="header-right">
            <div className="search-container">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Buscar..." className="search-input" />
            </div>

            {/* Notificações */}
            <div style={{position: 'relative'}}>
              <button 
                className="icon-button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </button>

              {notificationsOpen && (
                <div className="notifications-panel">
                  <div className="notifications-panel-header">
                    <h3 className="notifications-panel-title">Notificações</h3>
                    <button 
                      className="close-notifications-btn"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="notifications-list">
                    {notifications.map((notification) => {
                      const NotifIcon = notification.icon;
                      return (
                        <div 
                          key={notification.id} 
                          className={`notification-item ${notification.unread ? 'unread' : ''}`}
                        >
                          <div 
                            className="notification-icon"
                            style={{background: notification.bg}}
                          >
                            <NotifIcon size={18} color={notification.color} />
                          </div>
                          <div className="notification-content">
                            <p className="notification-title">{notification.title}</p>
                            <p className="notification-message">{notification.message}</p>
                            <span className="notification-time">{notification.time}</span>
                          </div>
                          {notification.unread && (
                            <div className="unread-dot"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="notifications-panel-footer">
                    <button className="view-all-notifications-btn">
                      Ver todas as notificações
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="user-menu">
              <button className="user-button" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <div className="user-avatar">{iniciaisNome}</div>
                <div className="user-info">
                  <span className="user-name">{nomeCurto}</span>
                  <span className="user-role">Admin</span>
                </div>
                <ChevronDown size={16} />
              </button>

              {userMenuOpen && (
                <div className="user-dropdown">
                  <button className="dropdown-item">
                    <Settings size={16} /> Configurações
                  </button>
                  <button 
                    className="dropdown-item logout"
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
            className="modal-overlay"
            onClick={() => setLogoutModalOpen(false)}
          />
          <div className="logout-modal">
            <div className="logout-modal-icon">
              <LogOut size={32} color="#ef4444" />
            </div>
            <h2 className="logout-modal-title">Confirmar Saída</h2>
            <p className="logout-modal-message">
              Tem certeza que deseja sair do sistema?
            </p>
            <div className="logout-modal-actions">
              <button 
                className="logout-cancel-btn"
                onClick={() => setLogoutModalOpen(false)}
              >
                Cancelar
              </button>
              <button 
                className="logout-confirm-btn"
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