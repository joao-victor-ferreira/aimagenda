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
import Integracao from './Integracao';
import AIConfiguracao from './AIConfiguracao';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Início' },
    { id: 'clients', icon: Users, label: 'Clientes' },
    { id: 'appointments', icon: Calendar, label: 'Agendamentos' },
    { id: 'integrations', icon: Zap, label: 'Integrações' },
    { id: 'ai', icon: Brain, label: 'IA' },
    { id: 'insights', icon: TrendingUp, label: 'Insights' },
    { id: 'team', icon: UsersRound, label: 'Equipe' }
  ];

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

  // 🔹 Conteúdo dinâmico de acordo com o menu selecionado
  const renderContent = () => {
    switch (activeMenu) {
      case 'clients':
        return (
          <div style={{ padding: '2rem' }}>
            <h2 style={styles.sectionTitle}>Clientes</h2>
            <p style={styles.sectionText}>Gerencie seus clientes cadastrados, veja histórico e informações de contato.</p>
          </div>
        );

      case 'appointments':
        return (
          <div style={{ padding: '2rem' }}>
            <h2 style={styles.sectionTitle}>Agendamentos</h2>
            <p style={styles.sectionText}>Visualize e edite seus compromissos de forma rápida e intuitiva.</p>
          </div>
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
          <div style={{ padding: '2rem' }}>
            <h2 style={styles.sectionTitle}>Insights</h2>
            <p style={styles.sectionText}>Veja análises e relatórios de desempenho da sua empresa em tempo real.</p>
          </div>
        );

      case 'team':
        return (
          <div style={{ padding: '2rem' }}>
            <h2 style={styles.sectionTitle}>Equipe</h2>
            <p style={styles.sectionText}>Gerencie os membros da sua equipe e acompanhe suas atividades.</p>
          </div>
        );

      default:
        // 🔹 Página inicial (Dashboard)
        return (
          <>
            <div style={styles.statsGrid}>
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
                return (
                  <div key={index} style={styles.statCard}>
                    <div style={styles.statHeader}>
                      <div style={{ ...styles.statIcon, background: stat.bgColor }}>
                        <Icon size={24} color={stat.color} />
                      </div>
                      <div style={{ ...styles.statChange, color: stat.trend === 'up' ? '#10b981' : '#ef4444' }}>
                        <TrendIcon size={16} /> {stat.change}
                      </div>
                    </div>
                    <h3 style={styles.statTitle}>{stat.title}</h3>
                    <p style={styles.statValue}>{stat.value}</p>
                  </div>
                );
              })}
            </div>

            <div style={styles.contentGrid}>
              {/* Atividades Recentes */}
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={styles.cardTitleContainer}>
                    <Activity size={20} />
                    <h2 style={styles.cardTitle}>Atividades Recentes</h2>
                  </div>
                  <button style={styles.viewAllBtn}>Ver tudo</button>
                </div>

                <div style={styles.activityList}>
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} style={styles.activityItem}>
                        <div style={{ ...styles.activityIcon, background: `${activity.color}15`, color: activity.color }}>
                          <Icon size={18} />
                        </div>
                        <div style={styles.activityContent}>
                          <h4 style={styles.activityTitle}>{activity.title}</h4>
                          <p style={styles.activityDescription}>{activity.description}</p>
                        </div>
                        <div style={styles.activityMeta}>
                          <span style={styles.activityTime}>{activity.time}</span>
                          <span
                            style={{
                              ...styles.activityStatus,
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
              <div style={styles.sidebarContent}>
                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <h2 style={styles.cardTitle}>Ações Rápidas</h2>
                  </div>
                  <div style={styles.quickActionsGrid}>
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <button key={index} style={styles.quickActionBtn}>
                          <div style={{ ...styles.quickActionIcon, background: `${action.color}15`, color: action.color }}>
                            <Icon size={20} />
                          </div>
                          <span style={styles.quickActionLabel}>{action.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={styles.aiCard}>
                  <div style={styles.aiHeader}>
                    <div style={styles.aiIconContainer}>
                      <Brain size={32} color="white" />
                      <span style={styles.aiPulse}></span>
                    </div>
                    <div>
                      <h3 style={styles.aiTitle}>IA Ativa</h3>
                      <p style={styles.aiSubtitle}>Respondendo automaticamente</p>
                    </div>
                  </div>
                  <div style={styles.aiStats}>
                    <div style={styles.aiStatItem}>
                      <span style={styles.aiStatLabel}>Respostas hoje</span>
                      <span style={styles.aiStatValue}>156</span>
                    </div>
                    <div style={styles.aiStatItem}>
                      <span style={styles.aiStatLabel}>Taxa de sucesso</span>
                      <span style={styles.aiStatValue}>98%</span>
                    </div>
                    <div style={styles.aiStatItem}>
                      <span style={styles.aiStatLabel}>Tempo médio</span>
                      <span style={styles.aiStatValue}>2.3s</span>
                    </div>
                  </div>
                  <button style={styles.aiConfigBtn}>
                    <Settings size={16} /> Configurar IA
                  </button>
                </div>
              </div>
            </div>
          </>
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
              >
                <Icon size={20} />
                <span style={styles.menuLabel}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div style={styles.sidebarFooter}>
          <button style={styles.settingsBtn}>
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
            <button style={styles.iconButton}>
              <Bell size={20} />
              <span style={styles.notificationDot}></span>
            </button>

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
                  <button style={styles.dropdownItem}>
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
    </div>
  );
}

const styles = {
  container: { display: 'flex', minHeight: '100vh', background: '#fafafa', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  sectionTitle: { fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' },
  sectionText: { color: '#6b7280', marginTop: '0.5rem' },
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
  menuList: { padding: '1rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', },
  menuItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', marginBottom: '0rem', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#6b7280', fontSize: '0.875rem', fontWeight: '500', width: '100%' },
  menuItemActive: { background: 'linear-gradient(135deg, #eff6ff, #f3e8ff)', color: '#3b82f6', fontWeight: '600' },
  menuLabel: { flex: 1, textAlign: 'left' },
  sidebarFooter: { padding: '1rem', borderTop: '1px solid #f3f4f6' },
  settingsBtn: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', color: '#6b7280', fontSize: '0.875rem', fontWeight: '500' },
  mainContent: { flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' },
  header: { background: 'white', borderBottom: '1px solid #e5e7eb', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0 },
  headerTitle: { fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: 0 },
  headerSubtitle: { fontSize: '0.875rem', color: '#6b7280', margin: 0 },
  headerRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
  searchContainer: { position: 'relative' },
  searchIcon: { position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' },
  searchInput: { padding: '0.5rem 0.75rem 0.5rem 2.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '0.875rem', width: '250px' },
  iconButton: { padding: '0.5rem', background: 'transparent', border: 'none', borderRadius: '8px', color: '#6b7280', position: 'relative' },
  notificationDot: { position: 'absolute', top: '0.5rem', right: '0.5rem', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' },
  userMenu: { position: 'relative' },
  userButton: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer' },
  userAvatar: { width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600' },
  userInfo: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  userName: { fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' },
  userRole: { fontSize: '0.75rem', color: '#6b7280' },
  userDropdown: { position: 'absolute', right: 0, top: '110%', background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', width: '180px', zIndex: 10 },
  dropdownItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', border: 'none', background: 'transparent', cursor: 'pointer', color: '#374151', fontSize: '0.875rem', width: '100%', textAlign: 'left' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', padding: '2rem' },
  statCard: { background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  statHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  statIcon: { padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  statChange: { display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: '600' },
  statTitle: { color: '#6b7280', fontSize: '0.875rem', margin: 0 },
  statValue: { fontSize: '1.75rem', fontWeight: '700', marginTop: '0.25rem', color: '#111827' },
  contentGrid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', padding: '0 2rem 2rem' },
  card: { background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  cardTitleContainer: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  cardTitle: { fontSize: '1rem', fontWeight: '600', margin: 0 },
  viewAllBtn: { fontSize: '0.875rem', color: '#3b82f6', background: 'transparent', border: 'none', cursor: 'pointer' },
  activityList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  activityItem: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.75rem' },
  activityIcon: { width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  activityContent: { flex: 1, marginLeft: '1rem' },
  activityTitle: { fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: 0 },
  activityDescription: { fontSize: '0.75rem', color: '#6b7280', margin: 0 },
  activityMeta: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  activityTime: { fontSize: '0.75rem', color: '#9ca3af' },
  activityStatus: { width: '10px', height: '10px', borderRadius: '50%' },
  sidebarContent: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  quickActionsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' },
  quickActionBtn: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '10px', cursor: 'pointer', transition: '0.2s' },
  quickActionIcon: { padding: '0.5rem', borderRadius: '8px', marginBottom: '0.5rem' },
  quickActionLabel: { fontSize: '0.75rem', color: '#374151', fontWeight: '500' },
  aiCard: { background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', borderRadius: '12px', padding: '1.5rem', position: 'relative', overflow: 'hidden' },
  aiHeader: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' },
  aiIconContainer: { position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  aiPulse: { position: 'absolute', width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', animation: 'pulse 2s infinite' },
  aiTitle: { fontWeight: '700', fontSize: '1.125rem', margin: 0 },
  aiSubtitle: { fontSize: '0.875rem', opacity: 0.9, margin: 0 },
  aiStats: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' },
  aiStatItem: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  aiStatLabel: { fontSize: '0.75rem', opacity: 0.8 },
  aiStatValue: { fontWeight: '700', fontSize: '1rem' },
  aiConfigBtn: { background: 'white', color: '#3b82f6', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', cursor: 'pointer', width: '100%', justifyContent: 'center' }
};
