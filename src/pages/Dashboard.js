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
  Menu,
  CreditCard,
  AlertTriangle,
  DollarSign,
  Crown
} from 'lucide-react';
import Integracao from './Integracao';
import AIConfiguracao from './AIConfiguracao';
import Agenda from './Agenda';
import Insights from './Insights';
import Equipe from './Equipe';
import Cliente from './Cliente';
import MainContent from './MainContent';


export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  
  // Simula pagamento pendente - mude para false para testar sem bloqueio
  const [paymentPending, setPaymentPending] = useState(true);
  const [paymentModalVisible, setPaymentModalVisible] = useState(true);


    const handleOpenAgenda = () => {
  setActiveMenu('appointments');
};
  const handleOpenInsights = () => {
  setActiveMenu('insights');
};


  const handleOpenClientes = () => {
  setActiveMenu('clients');
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
        return <MainContent onNovoAgendamento={handleOpenAgenda} onInsights={handleOpenInsights} onClients={handleOpenClientes} />;
    }
  };


  const user = {
    nomeCompleto: "João Silva Santos",
    email: "joao@exemplo.com",
    plano: "Pro",
    valorDevido: "299,00",
    dataVencimento: "05/11/2024",
    diasAtraso: 4
  };

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
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    console.log('Saindo do sistema...');
    setLogoutModalOpen(false);
    alert('Redirecionando para login...');
  };

  const handlePayment = () => {
    setPaymentModalVisible(false)
    alert('Redirecionando para página de pagamento...');
  };

  const handleMenuClick = (menuId) => {
    if (paymentPending) {
      setPaymentModalVisible(true);
      return;
    }
    setActiveMenu(menuId);
    setSidebarOpen(false);
  };

  const nomeCurto = user.nomeCompleto.split(" ").slice(0, 2).join(" ");
  const iniciaisNome = user.nomeCompleto
    .split(" ")
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join("");

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

        .payment-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: 10000;
          animation: fadeIn 0.3s ease;
          backdrop-filter: blur(4px);
        }

        .payment-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 16px;
          padding: 0;
          width: 95%;
          max-width: 500px;
          max-height: 95vh;
          overflow-y: auto;
          box-shadow: 0 25px 80px rgba(0,0,0,0.4);
          z-index: 10001;
          animation: modalSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @media (min-width: 640px) {
          .payment-modal {
            width: 90%;
            max-height: 90vh;
            border-radius: 20px;
          }
        }

        .payment-modal-header {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          padding: 1.5rem 1rem;
          text-align: center;
          position: relative;
        }

        @media (min-width: 640px) {
          .payment-modal-header {
            padding: 2rem 1.5rem;
          }
        }

        .payment-modal-icon-wrapper {
          width: 60px;
          height: 60px;
          margin: 0 auto 0.75rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s infinite;
        }

        @media (min-width: 640px) {
          .payment-modal-icon-wrapper {
            width: 80px;
            height: 80px;
            margin: 0 auto 1rem;
          }
        }

        .payment-modal-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: white;
          margin: 0 0 0.5rem 0;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        @media (min-width: 640px) {
          .payment-modal-title {
            font-size: 1.75rem;
          }
        }

        .payment-modal-subtitle {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.95);
          margin: 0;
        }

        @media (min-width: 640px) {
          .payment-modal-subtitle {
            font-size: 0.95rem;
          }
        }

        .payment-modal-body {
          padding: 1.25rem;
        }

        @media (min-width: 640px) {
          .payment-modal-body {
            padding: 2rem;
          }
        }

        .payment-alert {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          background: #fef2f2;
          border-left: 4px solid #ef4444;
          border-radius: 8px;
          margin-bottom: 1.25rem;
        }

        @media (min-width: 640px) {
          .payment-alert {
            gap: 1rem;
            padding: 1rem 1.25rem;
            margin-bottom: 1.5rem;
          }
        }

        .payment-alert-icon {
          color: #ef4444;
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .payment-alert-content {
          flex: 1;
        }

        .payment-alert-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: #991b1b;
          margin: 0 0 0.25rem 0;
        }

        @media (min-width: 640px) {
          .payment-alert-title {
            font-size: 0.95rem;
          }
        }

        .payment-alert-message {
          font-size: 0.8rem;
          color: #7f1d1d;
          margin: 0;
          line-height: 1.5;
        }

        @media (min-width: 640px) {
          .payment-alert-message {
            font-size: 0.875rem;
          }
        }

        .payment-info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        @media (min-width: 480px) {
          .payment-info-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }

        @media (min-width: 640px) {
          .payment-info-grid {
            margin-bottom: 1.5rem;
          }
        }

        .payment-info-card {
          background: #f9fafb;
          padding: 0.875rem 1rem;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }

        @media (min-width: 640px) {
          .payment-info-card {
            padding: 1rem 1.25rem;
          }
        }

        .payment-info-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 0.5rem 0;
        }

        .payment-info-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        @media (min-width: 640px) {
          .payment-info-value {
            font-size: 1.25rem;
          }
        }

        .payment-info-value.danger {
          color: #ef4444;
        }

        .payment-info-value.warning {
          color: #f59e0b;
        }

        .payment-features {
          background: #fffbeb;
          border: 1px solid #fcd34d;
          border-radius: 12px;
          padding: 0.875rem 1rem;
          margin-bottom: 1.25rem;
        }

        @media (min-width: 640px) {
          .payment-features {
            padding: 1rem 1.25rem;
            margin-bottom: 1.5rem;
          }
        }

        .payment-features-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: #92400e;
          margin: 0 0 0.75rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .payment-features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .payment-features-item {
          font-size: 0.8rem;
          color: #78350f;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        @media (min-width: 640px) {
          .payment-features-item {
            font-size: 0.875rem;
          }
        }

        .payment-features-item::before {
          content: "•";
          color: #f59e0b;
          font-weight: 700;
          font-size: 1.25rem;
        }

        .payment-modal-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .payment-btn {
          padding: 0.875rem 1rem;
          border: none;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        @media (min-width: 640px) {
          .payment-btn {
            padding: 1rem;
            font-size: 1rem;
          }
        }

        .payment-btn-primary {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .payment-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
        }

        .payment-btn-secondary {
          background: transparent;
          color: #6b7280;
          border: 2px solid #e5e7eb;
        }

        .payment-btn-secondary:hover {
          background: #f9fafb;
          border-color: #d1d5db;
        }

        .payment-help-text {
          text-align: center;
          font-size: 0.8rem;
          color: #9ca3af;
          margin-top: 1rem;
        }

        .payment-help-link {
          color: #3b82f6;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
        }

        .payment-help-link:hover {
          text-decoration: underline;
        }

        .content-wrapper {
          padding: 1rem;
          transition: filter 0.3s ease;
        }

        @media (min-width: 768px) {
          .content-wrapper {
            padding: 2rem;
          }
        }

        .content-wrapper.blurred {
          filter: blur(8px);
          pointer-events: none;
          user-select: none;
        }

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

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
      `}</style>

      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <img src={require("../assets/logo.png")} style={{width: 40, height: 40}} />
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
          <button className="settings-btn">
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
            <div className="search-container">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Buscar..." className="search-input" />
            </div>

            <button className="icon-button">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>

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

      {paymentPending && paymentModalVisible && (
        <>
          <div className="payment-modal-overlay" />
          <div className="payment-modal">
            <div className="payment-modal-header">
              <div className="payment-modal-icon-wrapper">
                <AlertTriangle size={40} color="white" strokeWidth={2.5} />
              </div>
              <h2 className="payment-modal-title">Pagamento Pendente</h2>
              <p className="payment-modal-subtitle">
                Seu acesso foi temporariamente bloqueado
              </p>
            </div>

            <div className="payment-modal-body">
              <div className="payment-alert">
                <AlertCircle size={20} className="payment-alert-icon" />
                <div className="payment-alert-content">
                  <h4 className="payment-alert-title">Atenção Necessária</h4>
                  <p className="payment-alert-message">
                    Identificamos uma pendência no pagamento da sua assinatura. 
                    Para continuar utilizando todos os recursos, regularize sua situação.
                  </p>
                </div>
              </div>

              <div className="payment-info-grid">
                <div className="payment-info-card">
                  <p className="payment-info-label">Plano Atual</p>
                  <p className="payment-info-value">
                    <Crown size={20} color="#3b82f6" />
                    {user.plano}
                  </p>
                </div>

                <div className="payment-info-card">
                  <p className="payment-info-label">Valor Devido</p>
                  <p className="payment-info-value danger">
                    <DollarSign size={20} />
                    R$ {user.valorDevido}
                  </p>
                </div>

                <div className="payment-info-card">
                  <p className="payment-info-label">Vencimento</p>
                  <p className="payment-info-value warning">
                    <Clock size={20} />
                    {user.dataVencimento}
                  </p>
                </div>

                <div className="payment-info-card">
                  <p className="payment-info-label">Dias em Atraso</p>
                  <p className="payment-info-value danger">
                    <AlertTriangle size={20} />
                    {user.diasAtraso} dias
                  </p>
                </div>
              </div>

              <div className="payment-features">
                <h4 className="payment-features-title">
                  <AlertCircle size={16} />
                  Recursos Bloqueados
                </h4>
                <ul className="payment-features-list">
                  <li className="payment-features-item">Acesso ao dashboard completo</li>
                  <li className="payment-features-item">Gerenciamento de clientes</li>
                  <li className="payment-features-item">Criação de agendamentos</li>
                  <li className="payment-features-item">Integrações e automações</li>
                  <li className="payment-features-item">Relatórios e insights</li>
                  <li className="payment-features-item">Suporte técnico prioritário</li>
                </ul>
              </div>

              <div className="payment-modal-actions">
                <button 
                  className="payment-btn payment-btn-primary"
                  onClick={handlePayment}
                >
                  <CreditCard size={20} />
                  Regularizar Pagamento
                </button>
                
                <button 
                  className="payment-btn payment-btn-secondary"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                  Sair da Conta
                </button>
              </div>

              <p className="payment-help-text">
                Precisa de ajuda? <a href="#" className="payment-help-link">Fale com o suporte</a>
              </p>
            </div>
          </div>
        </>
      )}

      {logoutModalOpen && (
        <>
          <div 
            className="payment-modal-overlay"
            onClick={() => setLogoutModalOpen(false)}
          />
          <div className="payment-modal" style={{maxWidth: '400px'}}>
            <div className="payment-modal-header" style={{background: 'linear-gradient(135deg, #6b7280, #4b5563)', padding: '2rem'}}>
              <div className="payment-modal-icon-wrapper" style={{width: '64px', height: '64px'}}>
                <LogOut size={32} color="white" />
              </div>
              <h2 className="payment-modal-title" style={{fontSize: '1.5rem'}}>Confirmar Saída</h2>
              <p className="payment-modal-subtitle">
                Tem certeza que deseja sair?
              </p>
            </div>

            <div className="payment-modal-body">
              <p style={{
                textAlign: 'center',
                color: '#6b7280',
                fontSize: '0.95rem',
                marginBottom: '1.5rem'
              }}>
                Você será desconectado e precisará fazer login novamente para acessar sua conta.
              </p>

              <div className="payment-modal-actions">
                <button 
                  className="payment-btn payment-btn-primary"
                  onClick={handleLogout}
                  style={{background: 'linear-gradient(135deg, #ef4444, #dc2626)'}}
                >
                  <LogOut size={20} />
                  Sim, Sair
                </button>
                
                <button 
                  className="payment-btn payment-btn-secondary"
                  onClick={() => setLogoutModalOpen(false)}
                >
                  <X size={20} />
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}