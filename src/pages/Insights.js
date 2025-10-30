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
  Filter,
  ChevronRight
} from 'lucide-react';

export default function Insights() {
  const [period, setPeriod] = useState('week'); // 'week', 'month', 'year'

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
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.headerBadge}>
            <BarChart3 size={16} />
            <span>Analytics</span>
          </div>
          <h1 style={styles.title}>Insights & Analytics</h1>
          <p style={styles.subtitle}>
            Acompanhe o desempenho da IA e da sua operação em tempo real
          </p>
        </div>
        <div style={styles.headerActions}>
          <div style={styles.periodSelector}>
            <button
              style={{...styles.periodBtn, ...(period === 'week' ? styles.periodBtnActive : {})}}
              onClick={() => setPeriod('week')}
            >
              Semana
            </button>
            <button
              style={{...styles.periodBtn, ...(period === 'month' ? styles.periodBtnActive : {})}}
              onClick={() => setPeriod('month')}
            >
              Mês
            </button>
            <button
              style={{...styles.periodBtn, ...(period === 'year' ? styles.periodBtnActive : {})}}
              onClick={() => setPeriod('year')}
            >
              Ano
            </button>
          </div>
          <button style={styles.btnExport}>
            <Download size={18} />
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* Main Metrics */}
      <div style={styles.metricsGrid}>
        {mainMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? ArrowUp : ArrowDown;
          
          return (
            <div key={index} style={styles.metricCard}>
              <div style={styles.metricHeader}>
                <div style={{...styles.metricIcon, background: `${metric.color}15`, color: metric.color}}>
                  <Icon size={24} />
                </div>
                <div style={{
                  ...styles.metricChange,
                  color: metric.trend === 'up' ? '#10b981' : '#ef4444'
                }}>
                  <TrendIcon size={16} />
                  {metric.change}
                </div>
              </div>
              <h3 style={styles.metricLabel}>{metric.label}</h3>
              <p style={styles.metricValue}>{metric.value}</p>
              <p style={styles.metricDescription}>{metric.description}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div style={styles.chartsGrid}>
        {/* Weekly Growth */}
        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <div>
              <h3 style={styles.chartTitle}>Agendamentos por Dia</h3>
              <p style={styles.chartSubtitle}>Últimos 7 dias</p>
            </div>
            <div style={styles.chartLegend}>
              <div style={styles.legendItem}>
                <div style={{...styles.legendDot, background: '#3b82f6'}}></div>
                <span>Total</span>
              </div>
              <div style={styles.legendItem}>
                <div style={{...styles.legendDot, background: '#8b5cf6'}}></div>
                <span>IA</span>
              </div>
            </div>
          </div>
          <div style={styles.barChart}>
            {weeklyData.map((day, index) => (
              <div key={index} style={styles.barGroup}>
                <div style={styles.barContainer}>
                  <div
                    style={{
                      ...styles.bar,
                      height: `${(day.appointments / maxAppointments) * 100}%`,
                      background: '#3b82f6'
                    }}
                    title={`${day.appointments} agendamentos`}
                  >
                    <span style={styles.barValue}>{day.appointments}</span>
                  </div>
                  <div
                    style={{
                      ...styles.bar,
                      height: `${(day.ai / maxAppointments) * 100}%`,
                      background: '#8b5cf6',
                      marginLeft: '4px'
                    }}
                    title={`${day.ai} pela IA`}
                  >
                    <span style={styles.barValue}>{day.ai}</span>
                  </div>
                </div>
                <span style={styles.barLabel}>{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Busy Hours */}
        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <div>
              <h3 style={styles.chartTitle}>Horários Mais Movimentados</h3>
              <p style={styles.chartSubtitle}>Volume de agendamentos por hora</p>
            </div>
          </div>
          <div style={styles.hoursList}>
            {busyHours.map((hour, index) => (
              <div key={index} style={styles.hourItem}>
                <div style={styles.hourLabel}>{hour.hour}</div>
                <div style={styles.hourBarContainer}>
                  <div
                    style={{
                      ...styles.hourBar,
                      width: `${hour.percentage}%`
                    }}
                  ></div>
                </div>
                <div style={styles.hourCount}>{hour.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Grid */}
      <div style={styles.secondaryGrid}>
        {/* Top Clients */}
        <div style={styles.listCard}>
          <div style={styles.listHeader}>
            <div>
              <h3 style={styles.listTitle}>
                <Users size={20} />
                Clientes Mais Ativos
              </h3>
              <p style={styles.listSubtitle}>Top 5 da semana</p>
            </div>
            <button style={styles.viewAllBtn}>
              Ver todos
              <ChevronRight size={16} />
            </button>
          </div>
          <div style={styles.clientsList}>
            {topClients.map((client, index) => (
              <div key={index} style={styles.clientItem}>
                <div style={styles.clientRank}>#{index + 1}</div>
                <div style={styles.clientAvatar}>{client.avatar}</div>
                <div style={styles.clientInfo}>
                  <div style={styles.clientName}>{client.name}</div>
                  <div style={styles.clientStats}>
                    {client.appointments} agendamentos
                  </div>
                </div>
                <div style={styles.clientValue}>{client.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Sources */}
        <div style={styles.listCard}>
          <div style={styles.listHeader}>
            <div>
              <h3 style={styles.listTitle}>
                <Activity size={20} />
                Fontes de Contato
              </h3>
              <p style={styles.listSubtitle}>Canal de origem dos leads</p>
            </div>
          </div>
          <div style={styles.sourcesList}>
            {contactSources.map((source, index) => {
              const Icon = source.icon;
              return (
                <div key={index} style={styles.sourceItem}>
                  <div style={{...styles.sourceIcon, background: `${source.color}15`, color: source.color}}>
                    <Icon size={24} />
                  </div>
                  <div style={styles.sourceInfo}>
                    <div style={styles.sourceName}>{source.source}</div>
                    <div style={styles.sourceBar}>
                      <div
                        style={{
                          ...styles.sourceProgress,
                          width: `${source.percentage}%`,
                          background: source.color
                        }}
                      ></div>
                    </div>
                  </div>
                  <div style={styles.sourceStats}>
                    <div style={styles.sourceCount}>{source.count}</div>
                    <div style={styles.sourcePercentage}>{source.percentage}%</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={styles.sourceSummary}>
            <Brain size={18} color="#8b5cf6" />
            <span>
              A IA processou <strong>299 interações</strong> automaticamente
            </span>
          </div>
        </div>
      </div>

      {/* AI Performance */}
      <div style={styles.performanceCard}>
        <div style={styles.performanceHeader}>
          <div>
            <h3 style={styles.performanceTitle}>
              <Brain size={24} />
              Performance da IA
            </h3>
            <p style={styles.performanceSubtitle}>
              Métricas de eficiência do assistente inteligente
            </p>
          </div>
        </div>
        <div style={styles.performanceGrid}>
          {aiPerformance.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} style={styles.performanceItem}>
                <div style={styles.performanceIcon}>
                  <Icon size={24} color="#8b5cf6" />
                </div>
                <div>
                  <div style={styles.performanceMetric}>{item.metric}</div>
                  <div style={styles.performanceValue}>{item.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insights Cards */}
      <div style={styles.insightsGrid}>
        <div style={styles.insightCard}>
          <div style={styles.insightIcon}>
            <TrendingUp size={28} color="#10b981" />
          </div>
          <h4 style={styles.insightTitle}>Crescimento Acelerado</h4>
          <p style={styles.insightText}>
            Seus agendamentos cresceram <strong>18% esta semana</strong> comparado à semana anterior.
          </p>
        </div>

        <div style={styles.insightCard}>
          <div style={styles.insightIcon}>
            <Clock size={28} color="#3b82f6" />
          </div>
          <h4 style={styles.insightTitle}>Horário de Pico</h4>
          <p style={styles.insightText}>
            <strong>09:00 - 10:00</strong> é seu horário mais procurado. Considere adicionar mais disponibilidade.
          </p>
        </div>

        <div style={styles.insightCard}>
          <div style={styles.insightIcon}>
            <MessageSquare size={28} color="#8b5cf6" />
          </div>
          <h4 style={styles.insightTitle}>WhatsApp Domina</h4>
          <p style={styles.insightText}>
            <strong>52% dos contatos</strong> vêm do WhatsApp. Continue investindo nesse canal.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    background: '#fafafa',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
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
  headerActions: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  },
  periodSelector: {
    display: 'flex',
    gap: '0.25rem',
    background: '#f3f4f6',
    padding: '0.25rem',
    borderRadius: '8px'
  },
  periodBtn: {
    padding: '0.5rem 1rem',
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#6b7280',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  periodBtnActive: {
    background: 'white',
    color: '#3b82f6',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  btnExport: {
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
    transition: 'all 0.2s'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  metricCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s'
  },
  metricHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem'
  },
  metricIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  metricChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.875rem',
    fontWeight: '600'
  },
  metricLabel: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '0.5rem',
    fontWeight: '500'
  },
  metricValue: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.5rem',
    lineHeight: 1
  },
  metricDescription: {
    fontSize: '0.875rem',
    color: '#9ca3af'
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  chartCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
  },
  chartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem'
  },
  chartTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.25rem'
  },
  chartSubtitle: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  chartLegend: {
    display: 'flex',
    gap: '1rem'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  legendDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  },
  barChart: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '200px',
    gap: '1rem',
    padding: '1rem 0'
  },
  barGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    flex: 1
  },
  barContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '100%',
    justifyContent: 'center'
  },
  bar: {
    width: '20px',
    borderRadius: '4px 4px 0 0',
    transition: 'all 0.3s',
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '4px'
  },
  barValue: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'white'
  },
  barLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
    fontWeight: '600'
  },
  hoursList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  hourItem: {
    display: 'grid',
    gridTemplateColumns: '60px 1fr 50px',
    gap: '1rem',
    alignItems: 'center'
  },
  hourLabel: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151'
  },
  hourBarContainer: {
    height: '24px',
    background: '#f3f4f6',
    borderRadius: '12px',
    overflow: 'hidden'
  },
  hourBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
    borderRadius: '12px',
    transition: 'width 0.3s'
  },
  hourCount: {
    fontSize: '0.875rem',
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'right'
  },
  secondaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  listCard: {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden'
  },
  listHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.25rem'
  },
  listSubtitle: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  viewAllBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.5rem 1rem',
    background: 'transparent',
    border: 'none',
    color: '#3b82f6',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s'
  },
  clientsList: {
    padding: '1rem'
  },
  clientItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '0.5rem',
    transition: 'all 0.2s'
  },
  clientRank: {
    width: '32px',
    height: '32px',
    background: '#f3f4f6',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.875rem',
    fontWeight: '700',
    color: '#6b7280'
  },
  clientAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: '1rem'
  },
  clientInfo: {
    flex: 1
  },
  clientName: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.25rem'
  },
  clientStats: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  clientValue: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#10b981'
  },
  sourcesList: {
    padding: '1.5rem'
  },
  sourceItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  sourceIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  sourceInfo: {
    flex: 1
  },
  sourceName: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem'
  },
  sourceBar: {
    height: '8px',
    background: '#f3f4f6',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  sourceProgress: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s'
  },
  sourceStats: {
    textAlign: 'right'
  },
  sourceCount: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1f2937'
  },
  sourcePercentage: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  sourceSummary: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 1.5rem',
    background: 'linear-gradient(135deg, #f3e8ff, #eff6ff)',
    fontSize: '0.875rem',
    color: '#6b7280',
    borderTop: '1px solid #e5e7eb'
  },
  performanceCard: {
    background: 'linear-gradient(135deg, #1e3a8a, #312e81)',
    padding: '2rem',
    borderRadius: '16px',
    marginBottom: '2rem',
    color: 'white'
  },
  performanceHeader: {
    marginBottom: '2rem'
  },
  performanceTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.5rem'
  },
  performanceSubtitle: {
    fontSize: '1rem',
    opacity: 0.9
  },
  performanceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem'
  },
  performanceItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)'
  },
  performanceIcon: {
    width: '56px',
    height: '56px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  performanceMetric: {
    fontSize: '0.875rem',
    opacity: 0.9,
    marginBottom: '0.25rem'
  },
  performanceValue: {
    fontSize: '1.75rem',
    fontWeight: '700'
  },
  insightsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.5rem'
  },
  insightCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s'
  },
  insightIcon: {
    width: '56px',
    height: '56px',
    background: '#f9fafb',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem'
  },
  insightTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.75rem'
  },
  insightText: {
    fontSize: '0.95rem',
    color: '#6b7280',
    lineHeight: '1.6',
    margin: 0
  }
};