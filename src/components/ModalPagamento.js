import React, { useState } from 'react'
import {
  LogOut,
  AlertCircle,
  Clock,
  CreditCard,
  AlertTriangle,
  DollarSign,
  Crown
} from 'lucide-react';


function ModalPagamento({ user, visible, onClose, onLogout, onPayment }) {

  return (
     <>
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
                    {user?.plano}
                  </p>
                </div>

                <div className="payment-info-card">
                  <p className="payment-info-label">Valor Devido</p>
                  <p className="payment-info-value danger">
                    <DollarSign size={20} />
                    R$ {user?.valorDevido}
                  </p>
                </div>

                <div className="payment-info-card">
                  <p className="payment-info-label">Vencimento</p>
                  <p className="payment-info-value warning">
                    <Clock size={20} />
                    {user?.dataVencimento}
                  </p>
                </div>

                <div className="payment-info-card">
                  <p className="payment-info-label">Dias em Atraso</p>
                  <p className="payment-info-value danger">
                    <AlertTriangle size={20} />
                    {user?.diasAtraso} dias
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
                  onClick={onClose}
                >
                  <CreditCard size={20} />
                  Regularizar Pagamento
                </button>
                
                <button 
                  className="payment-btn payment-btn-secondary"
                  onClick={onLogout}
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
  )
}

export default ModalPagamento