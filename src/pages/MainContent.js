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
  Activity,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Mail,
  BarChart3
} from 'lucide-react';

function MainContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const stats = [
    { title: 'Clientes Ativos', value: '284', change: '+12%', trend: 'up', icon: Users, color: '#3b82f6', bgColor: '#eff6ff' },
    { title: 'Agendamentos Hoje', value: '12', change: '+8%', trend: 'up', icon: Calendar, color: '#10b981', bgColor: '#d1fae5' },
    { title: 'Mensagens IA', value: '156', change: '+24%', trend: 'up', icon: MessageSquare, color: '#8b5cf6', bgColor: '#f3e8ff' },
    { title: 'Taxa de Conversão', value: '94%', change: '+2%', trend: 'up', icon: TrendingUp, color: '#f59e0b', bgColor: '#fef3c7' }
  ];

  const recentActivities = [
    { id: 1, icon: Brain, color: '#8b5cf6', title: 'IA respondeu João Silva', description: 'Agendamento confirmado para amanhã às 14h', time: '2 min atrás', status: 'success' },
    { id: 2, icon: Calendar, color: '#10b981', title: 'Novo agendamento', description: 'Maria Santos - Consulta de acompanhamento', time: '15 min atrás', status: 'success' },
    { id: 3, icon: MessageSquare, color: '#3b82f6', title: 'Nova mensagem recebida', description: 'Pedro Costa perguntou sobre disponibilidade', time: '1 hora atrás', status: 'pending' },
    { id: 4, icon: Sparkles, color: '#f59e0b', title: 'IA aprendeu nova preferência', description: 'Horários de manhã são mais populares', time: '2 horas atrás', status: 'info' },
    { id: 5, icon: Zap, color: '#ec4899', title: 'Integração sincronizada', description: 'Google Calendar atualizado com sucesso', time: '3 horas atrás', status: 'success' }
  ];

  const quickActions = [
    { icon: Calendar, label: 'Novo Agendamento', color: '#3b82f6' },
    { icon: Users, label: 'Adicionar Cliente', color: '#10b981' },
    { icon: Mail, label: 'Enviar Campanha', color: '#8b5cf6' },
    { icon: BarChart3, label: 'Ver Relatório', color: '#f59e0b' }
  ];

  return (
    <div className="main-content-wrapper">
      <style>{`
        .main-content-wrapper {
          padding: 1rem;
          background: #fafafa;
          min-height: 100vh;
        }

        @media (min-width: 768px) {
          .main-content-wrapper {
            padding: 2rem;
          }
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.3s;
        }

        @media (min-width: 768px) {
          .stat-card {
            padding: 1.5rem;
          }
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .stat-icon {
          padding: 0.5rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-change {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8rem;
          font-weight: 600;
        }

        @media (min-width: 768px) {
          .stat-change {
            font-size: 0.875rem;
          }
        }

        .stat-title {
          color: #6b7280;
          font-size: 0.8rem;
          margin: 0;
          font-weight: 500;
        }

        @media (min-width: 768px) {
          .stat-title {
            font-size: 0.875rem;
          }
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 0.25rem;
          color: #111827;
        }

        @media (min-width: 768px) {
          .stat-value {
            font-size: 1.75rem;
          }
        }

        /* Content Grid */
        .content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 1024px) {
          .content-grid {
            grid-template-columns: 2fr 1fr;
          }
        }

        .card {
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        @media (min-width: 768px) {
          .card {
            padding: 1.5rem;
          }
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .card-title-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .card-title {
          font-size: 0.95rem;
          font-weight: 600;
          margin: 0;
          color: #1f2937;
        }

        @media (min-width: 768px) {
          .card-title {
            font-size: 1rem;
          }
        }

        .view-all-btn {
          font-size: 0.8rem;
          color: #3b82f6;
          background: transparent;
          border: none;
          cursor: pointer;
          font-weight: 500;
        }

        @media (min-width: 768px) {
          .view-all-btn {
            font-size: 0.875rem;
          }
        }

        .view-all-btn:hover {
          text-decoration: underline;
        }

        /* Activity List */
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f3f4f6;
        }

        @media (min-width: 768px) {
          .activity-item {
            align-items: center;
            gap: 1rem;
          }
        }

        .activity-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .activity-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
          min-width: 0;
        }

        .activity-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 0.25rem 0;
        }

        @media (min-width: 768px) {
          .activity-title {
            font-size: 0.875rem;
          }
        }

        .activity-description {
          font-size: 0.75rem;
          color: #6b7280;
          margin: 0;
          line-height: 1.4;
        }

        .activity-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .activity-meta {
            flex-direction: row;
            align-items: center;
          }
        }

        .activity-time {
          font-size: 0.7rem;
          color: #9ca3af;
          white-space: nowrap;
        }

        @media (min-width: 768px) {
          .activity-time {
            font-size: 0.75rem;
          }
        }

        .activity-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .activity-status {
            width: 10px;
            height: 10px;
          }
        }

        /* Sidebar Content */
        .sidebar-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Quick Actions */
        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .quick-action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: #f9fafb;
          border: 1px solid #f3f4f6;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .quick-action-btn:hover {
          background: #f3f4f6;
          border-color: #e5e7eb;
          transform: translateY(-2px);
        }

        .quick-action-icon {
          padding: 0.5rem;
          border-radius: 8px;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quick-action-label {
          font-size: 0.7rem;
          color: #374151;
          font-weight: 500;
          text-align: center;
        }

        @media (min-width: 768px) {
          .quick-action-label {
            font-size: 0.75rem;
          }
        }

        /* AI Card */
        .ai-card {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border-radius: 12px;
          padding: 1.25rem;
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .ai-card {
            padding: 1.5rem;
          }
        }

        .ai-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .ai-icon-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ai-pulse {
          position: absolute;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          animation: pulse 2s infinite;
        }

        @media (min-width: 768px) {
          .ai-pulse {
            width: 50px;
            height: 50px;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
        }

        .ai-title {
          font-weight: 700;
          font-size: 1rem;
          margin: 0;
        }

        @media (min-width: 768px) {
          .ai-title {
            font-size: 1.125rem;
          }
        }

        .ai-subtitle {
          font-size: 0.8rem;
          opacity: 0.9;
          margin: 0;
        }

        @media (min-width: 768px) {
          .ai-subtitle {
            font-size: 0.875rem;
          }
        }

        .ai-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        @media (min-width: 768px) {
          .ai-stats {
            gap: 1rem;
          }
        }

        .ai-stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .ai-stat-label {
          font-size: 0.7rem;
          opacity: 0.8;
          line-height: 1.2;
        }

        @media (min-width: 768px) {
          .ai-stat-label {
            font-size: 0.75rem;
          }
        }

        .ai-stat-value {
          font-weight: 700;
          font-size: 0.95rem;
          margin-top: 0.25rem;
        }

        @media (min-width: 768px) {
          .ai-stat-value {
            font-size: 1rem;
          }
        }

        .ai-config-btn {
          background: white;
          color: #3b82f6;
          border: none;
          border-radius: 8px;
          padding: 0.65rem 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          transition: all 0.2s;
          font-size: 0.85rem;
        }

        @media (min-width: 768px) {
          .ai-config-btn {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
          }
        }

        .ai-config-btn:hover {
          background: #f9fafb;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
      `}</style>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          return (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <div className="stat-icon" style={{ background: stat.bgColor }}>
                  <Icon size={24} color={stat.color} />
                </div>
                <div className="stat-change" style={{ color: stat.trend === 'up' ? '#10b981' : '#ef4444' }}>
                  <TrendIcon size={16} /> {stat.change}
                </div>
              </div>
              <h3 className="stat-title">{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="content-grid">
        {/* Atividades Recentes */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-container">
              <Activity size={20} />
              <h2 className="card-title">Atividades Recentes</h2>
            </div>
            <button className="view-all-btn">Ver tudo</button>
          </div>

          <div className="activity-list">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon" style={{ background: `${activity.color}15`, color: activity.color }}>
                    <Icon size={18} />
                  </div>
                  <div className="activity-content">
                    <h4 className="activity-title">{activity.title}</h4>
                    <p className="activity-description">{activity.description}</p>
                  </div>
                  <div className="activity-meta">
                    <span className="activity-time">{activity.time}</span>
                    <span
                      className="activity-status"
                      style={{
                        background:
                          activity.status === 'success'
                            ? '#10b981'
                            : activity.status === 'pending'
                            ? '#f59e0b'
                            : '#3b82f6'
                      }}
                    ></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ações rápidas + IA */}
        <div className="sidebar-content">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Ações Rápidas</h2>
            </div>
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button key={index} className="quick-action-btn">
                    <div className="quick-action-icon" style={{ background: `${action.color}15`, color: action.color }}>
                      <Icon size={20} />
                    </div>
                    <span className="quick-action-label">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="ai-card">
            <div className="ai-header">
              <div className="ai-icon-container">
                <Brain size={28} color="white" />
                <span className="ai-pulse"></span>
              </div>
              <div>
                <h3 className="ai-title">IA Ativa</h3>
                <p className="ai-subtitle">Respondendo automaticamente</p>
              </div>
            </div>
            <div className="ai-stats">
              <div className="ai-stat-item">
                <span className="ai-stat-label">Respostas hoje</span>
                <span className="ai-stat-value">156</span>
              </div>
              <div className="ai-stat-item">
                <span className="ai-stat-label">Taxa de sucesso</span>
                <span className="ai-stat-value">98%</span>
              </div>
              <div className="ai-stat-item">
                <span className="ai-stat-label">Tempo médio</span>
                <span className="ai-stat-value">2.3s</span>
              </div>
            </div>
            <button className="ai-config-btn">
              <Settings size={16} /> Configurar IA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;