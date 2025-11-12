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
  CheckCircle,
  Clock,
  Menu,
} from 'lucide-react';
import Integracao from './Integracao';
import AIConfiguracao from './AIConfiguracao';
import Agenda from './Agenda';
import Insights from './Insights';
import Equipe from './Equipe';
import Cliente from './Cliente';
import MainContent from './MainContent';
import ModalPagamento from '../components/ModalPagamento';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // Simula pagamento pendente - mude para false para testar sem bloqueio
  const [paymentPending, setPaymentPending] = useState(true);
  const [paymentModalVisible, setPaymentModalVisible] = useState(true);

  const user = {
    nomeCompleto: 'João Silva Santos',
    email: 'joao@exemplo.com',
    plano: 'Pro',
    valorDevido: '299,00',
    dataVencimento: '05/11/2024',
    diasAtraso: 4,
  };

  const handleOpenAgenda = () => {
    setActiveMenu('appointments');
  };
  const handleOpenInsights = () => {
    setActiveMenu('insights');
  };

  const handleOpenClientes = () => {
    setActiveMenu('clients');
  };

  const handleOpenIA = () => {
    setActiveMenu('ai');
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
        return (
          <MainContent
            onNovoAgendamento={handleOpenAgenda}
            onInsights={handleOpenInsights}
            onClients={handleOpenClientes}
            onconfiguracaoIA={handleOpenIA}
          />
        );
    }
  };

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Início' },
    { id: 'clients', icon: Users, label: 'Clientes' },
    { id: 'appointments', icon: Calendar, label: 'Agendamentos' },
    { id: 'integrations', icon: Zap, label: 'Integrações' },
    { id: 'ai', icon: Brain, label: 'IA' },
    { id: 'insights', icon: TrendingUp, label: 'Insights' },
    { id: 'team', icon: UsersRound, label: 'Equipe' },
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
      unread: true,
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
      unread: true,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleLogout = () => {
    console.log('Saindo do sistema...');
    setLogoutModalOpen(false);
    alert('Redirecionando para login...');
  };

  const handlePayment = () => {
    setPaymentModalVisible(false);
    alert('Redirecionando para página de pagamento...');
  };

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    setSidebarOpen(false);
  };

  const nomeCurto = user.nomeCompleto.split(' ').slice(0, 2).join(' ');
  const iniciaisNome = user.nomeCompleto
    .split(' ')
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join('');

  return (
    <div className="dashboard-container">
      <style>{`
        * { box-sizing: border-box; }
        
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: #fafafa;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

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
          color: white;
          font-weight: 700;
          font-size: 1.25rem;
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
          padding: 0.75rem 1rem;
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

      `}</style>

      <div
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <img
              src={require('../assets/logo.png')}
              alt="logo-aimagendai"
              style={{ width: 40, height: 40 }}
            />
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
          <button
            onClick={() => navigate('/configuracao')}
            className="settings-btn"
          >
            <Settings size={20} />
            <span>Configurações</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
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
            <button className="icon-button">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>

            <div className="user-menu">
              <button
                className="user-button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="user-avatar">{iniciaisNome}</div>
                <div className="user-info">
                  <span className="user-name">{nomeCurto}</span>
                  <span className="user-role">Admin</span>
                </div>
                <ChevronDown size={16} />
              </button>

              {userMenuOpen && (
                <div className="user-dropdown">
                  <button
                    onClick={() => navigate('/configuracao')}
                    className="dropdown-item"
                  >
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

        {renderContent()}
      </main>

      {paymentPending && paymentModalVisible && (
        <ModalPagamento
          handlePagamento={handlePayment}
          handleLogout={handleLogout}
          user={user}
        />
      )}
    </div>
  );
}
