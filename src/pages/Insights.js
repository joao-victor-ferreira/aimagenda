import React, { useState } from 'react';
import { 
  TrendingUp,
  BarChart3,
  Clock,
  Zap,
  Users,
  Calendar,
  MessageSquare,
  Mail,
  Globe,
  Brain,
  Target,
  Award,
  Activity,
  ArrowUp,
  ArrowDown,
  Download,
  ChevronRight
} from 'lucide-react';
import '../css/Insights.css';   


export default function Insights() {
  const [period, setPeriod] = useState('week');

  const mainMetrics = [
    {
      label: 'Taxa de Resposta da IA',
      value: '98.5%',
      change: '+2.3%',
      trend: 'up',
      icon: Brain,
      color: '#8b5cf6',
      description: 'IA respondeu com sucesso'
    },
    {
      label: 'Tempo Médio de Resposta',
      value: '2.3s',
      change: '-0.5s',
      trend: 'up',
      icon: Zap,
      color: '#f59e0b',
      description: 'Mais rápido que semana passada'
    },
    {
      label: 'Agendamentos Esta Semana',
      value: '124',
      change: '+18%',
      trend: 'up',
      icon: Calendar,
      color: '#3b82f6',
      description: '94 confirmados, 30 pendentes'
    },
    {
      label: 'Taxa de Conversão',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: Target,
      color: '#10b981',
      description: 'De contatos para agendamentos'
    }
  ];

  const weeklyData = [
    { day: 'Seg', appointments: 18, ai: 15 },
    { day: 'Ter', appointments: 22, ai: 19 },
    { day: 'Qua', appointments: 25, ai: 22 },
    { day: 'Qui', appointments: 20, ai: 17 },
    { day: 'Sex', appointments: 24, ai: 20 },
    { day: 'Sáb', appointments: 10, ai: 8 },
    { day: 'Dom', appointments: 5, ai: 4 }
  ];

  const busyHours = [
    { hour: '09:00', count: 45, percentage: 90 },
    { hour: '10:00', count: 38, percentage: 76 },
    { hour: '11:00', count: 35, percentage: 70 },
    { hour: '14:00', count: 42, percentage: 84 },
    { hour: '15:00', count: 40, percentage: 80 },
    { hour: '16:00', count: 32, percentage: 64 },
    { hour: '17:00', count: 28, percentage: 56 }
  ];

  const topClients = [
    { name: 'João Silva', appointments: 12, value: 'R$ 8.500', avatar: 'JS' },
    { name: 'Maria Santos', appointments: 10, value: 'R$ 7.200', avatar: 'MS' },
    { name: 'Pedro Costa', appointments: 8, value: 'R$ 5.800', avatar: 'PC' },
    { name: 'Ana Oliveira', appointments: 7, value: 'R$ 4.900', avatar: 'AO' },
    { name: 'Carlos Ferreira', appointments: 6, value: 'R$ 4.200', avatar: 'CF' }
  ];

  const contactSources = [
    { source: 'WhatsApp', count: 156, percentage: 52, icon: MessageSquare, color: '#25d366' },
    { source: 'Site', count: 89, percentage: 30, icon: Globe, color: '#3b82f6' },
    { source: 'Email', count: 54, percentage: 18, icon: Mail, color: '#ef4444' }
  ];

  const aiPerformance = [
    { metric: 'Mensagens Processadas', value: '1.2k', icon: MessageSquare },
    { metric: 'Respostas Corretas', value: '1.18k', icon: Brain },
    { metric: 'Tempo Total Economizado', value: '48h', icon: Clock },
    { metric: 'Satisfação do Cliente', value: '4.8/5', icon: Award }
  ];

  const maxAppointments = Math.max(...weeklyData.map(d => d.appointments));

  return (
    <div className="container2">
     

      {/* Header */}
      <div className="header">
        <div>
          <div className="header-badge">
            <BarChart3 size={16} />
            <span>Analytics</span>
          </div>
          <h1 className="title">Insights & Analytics</h1>
          <p className="subtitle">
            Acompanhe o desempenho da IA e da sua operação em tempo real
          </p>
        </div>
        <div className="header-actions">
          <div className="period-selector">
            <button
              className={`period-btn ${period === 'week' ? 'active' : ''}`}
              onClick={() => setPeriod('week')}
            >
              Semana
            </button>
            <button
              className={`period-btn ${period === 'month' ? 'active' : ''}`}
              onClick={() => setPeriod('month')}
            >
              Mês
            </button>
            <button
              className={`period-btn ${period === 'year' ? 'active' : ''}`}
              onClick={() => setPeriod('year')}
            >
              Ano
            </button>
          </div>
          <button className="btn-export">
            <Download size={18} />
            <span>Exportar Relatório</span>
          </button>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="metrics-grid">
        {mainMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? ArrowUp : ArrowDown;
          
          return (
            <div key={index} className="metric-card">
              <div className="metric-header">
                <div className="metric-icon" style={{background: `${metric.color}15`, color: metric.color}}>
                  <Icon size={24} />
                </div>
                <div className="metric-change" style={{color: metric.trend === 'up' ? '#10b981' : '#ef4444'}}>
                  <TrendIcon size={16} />
                  {metric.change}
                </div>
              </div>
              <h3 className="metric-label">{metric.label}</h3>
              <p className="metric-value">{metric.value}</p>
              <p className="metric-description">{metric.description}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Weekly Growth */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Agendamentos por Dia</h3>
              <p className="chart-subtitle">Últimos 7 dias</p>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-dot" style={{background: '#3b82f6'}}></div>
                <span>Total</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{background: '#8b5cf6'}}></div>
                <span>IA</span>
              </div>
            </div>
          </div>
          <div className="bar-chart">
            {weeklyData.map((day, index) => (
              <div key={index} className="bar-group">
                <div className="bar-container">
                  <div
                    className="bar"
                    style={{
                      height: `${(day.appointments / maxAppointments) * 100}%`,
                      background: '#3b82f6'
                    }}
                    title={`${day.appointments} agendamentos`}
                  >
                    <span className="bar-value">{day.appointments}</span>
                  </div>
                  <div
                    className="bar"
                    style={{
                      height: `${(day.ai / maxAppointments) * 100}%`,
                      background: '#8b5cf6',
                      marginLeft: '4px'
                    }}
                    title={`${day.ai} pela IA`}
                  >
                    <span className="bar-value">{day.ai}</span>
                  </div>
                </div>
                <span className="bar-label">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Busy Hours */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Horários Mais Movimentados</h3>
              <p className="chart-subtitle">Volume de agendamentos por hora</p>
            </div>
          </div>
          <div className="hours-list">
            {busyHours.map((hour, index) => (
              <div key={index} className="hour-item">
                <div className="hour-label">{hour.hour}</div>
                <div className="hour-bar-container">
                  <div className="hour-bar" style={{width: `${hour.percentage}%`}}></div>
                </div>
                <div className="hour-count">{hour.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Grid */}
      <div className="secondary-grid">
        {/* Top Clients */}
        <div className="list-card">
          <div className="list-header">
            <div>
              <h3 className="list-title">
                <Users size={20} />
                Clientes Mais Ativos
              </h3>
              <p className="list-subtitle">Top 5 da semana</p>
            </div>
            <button className="view-all-btn">
              Ver todos
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="clients-list">
            {topClients.map((client, index) => (
              <div key={index} className="client-item">
                <div className="client-rank">#{index + 1}</div>
                <div className="client-avatar">{client.avatar}</div>
                <div className="client-info">
                  <div className="client-name">{client.name}</div>
                  <div className="client-stats">
                    {client.appointments} agendamentos
                  </div>
                </div>
                <div className="client-value">{client.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Sources */}
        <div className="list-card">
          <div className="list-header">
            <div>
              <h3 className="list-title">
                <Activity size={20} />
                Fontes de Contato
              </h3>
              <p className="list-subtitle">Canal de origem dos leads</p>
            </div>
          </div>
          <div className="sources-list">
            {contactSources.map((source, index) => {
              const Icon = source.icon;
              return (
                <div key={index} className="source-item">
                  <div className="source-icon" style={{background: `${source.color}15`, color: source.color}}>
                    <Icon size={24} />
                  </div>
                  <div className="source-info">
                    <div className="source-name">{source.source}</div>
                    <div className="source-bar">
                      <div className="source-progress" style={{width: `${source.percentage}%`, background: source.color}}></div>
                    </div>
                  </div>
                  <div className="source-stats">
                    <div className="source-count">{source.count}</div>
                    <div className="source-percentage">{source.percentage}%</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="source-summary">
            <Brain size={18} color="#8b5cf6" />
            <span>
              A IA processou <strong>299 interações</strong> automaticamente
            </span>
          </div>
        </div>
      </div>

      {/* AI Performance */}
      <div className="performance-card">
        <div className="performance-header">
          <div>
            <h3 className="performance-title">
              <Brain size={24} />
              Performance da IA
            </h3>
            <p className="performance-subtitle">
              Métricas de eficiência do assistente inteligente
            </p>
          </div>
        </div>
        <div className="performance-grid">
          {aiPerformance.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="performance-item">
                <div className="performance-icon">
                  <Icon size={24} color="#8b5cf6" />
                </div>
                <div>
                  <div className="performance-metric">{item.metric}</div>
                  <div className="performance-value">{item.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insights Cards */}
      <div className="insights-grid">
        <div className="insight-card">
          <div className="insight-icon">
            <TrendingUp size={28} color="#10b981" />
          </div>
          <h4 className="insight-title">Crescimento Acelerado</h4>
          <p className="insight-text">
            Seus agendamentos cresceram <strong>18% esta semana</strong> comparado à semana anterior.
          </p>
        </div>

        <div className="insight-card">
          <div className="insight-icon">
            <Clock size={28} color="#3b82f6" />
          </div>
          <h4 className="insight-title">Horário de Pico</h4>
          <p className="insight-text">
            <strong>09:00 - 10:00</strong> é seu horário mais procurado. Considere adicionar mais disponibilidade.
          </p>
        </div>

        <div className="insight-card">
          <div className="insight-icon">
            <MessageSquare size={28} color="#8b5cf6" />
          </div>
          <h4 className="insight-title">WhatsApp Domina</h4>
          <p className="insight-text">
            <strong>52% dos contatos</strong> vêm do WhatsApp. Continue investindo nesse canal.
          </p>
        </div>
      </div>
    </div>
  );
}