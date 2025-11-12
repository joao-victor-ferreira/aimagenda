import React, { useState } from 'react';
import {
  LogOut,
  AlertCircle,
  Clock,
  CreditCard,
  AlertTriangle,
  DollarSign,
  Crown,
} from 'lucide-react';

import '../css/ModalPagamento.css';

function ModalPagamento({
  user,
  visible,
  onClose,
  handleLogout,
  handlePagamento,
}) {
  return (
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
                Identificamos uma pendência no pagamento da sua assinatura. Para
                continuar utilizando todos os recursos, regularize sua situação.
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
              <li className="payment-features-item">
                Acesso ao dashboard completo
              </li>
              <li className="payment-features-item">
                Gerenciamento de clientes
              </li>
              <li className="payment-features-item">Criação de agendamentos</li>
              <li className="payment-features-item">
                Integrações e automações
              </li>
              <li className="payment-features-item">Relatórios e insights</li>
              <li className="payment-features-item">
                Suporte técnico prioritário
              </li>
            </ul>
          </div>

          <div className="payment-modal-actions">
            <button
              className="payment-btn payment-btn-primary"
              onClick={handlePagamento}
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
            Precisa de ajuda?{' '}
            <a href="#" className="payment-help-link">
              Fale com o suporte
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default ModalPagamento;
