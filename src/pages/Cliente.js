import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Upload,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Eye,
  Tag,
  TrendingUp,
  MessageSquare,
  Star,
  X,
  Save,
  User
} from 'lucide-react';

export default function Cliente() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const clients = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '+55 11 98765-4321',
      company: 'Tech Solutions',
      location: 'São Paulo, SP',
      status: 'active',
      appointments: 12,
      lastAppointment: '2025-01-15',
      nextAppointment: '2025-02-10',
      totalValue: 'R$ 8.500',
      tags: ['VIP', 'Recorrente'],
      rating: 5,
      avatar: 'JS'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '+55 11 98765-1234',
      company: 'Design Studio',
      location: 'Rio de Janeiro, RJ',
      status: 'active',
      appointments: 8,
      lastAppointment: '2025-01-20',
      nextAppointment: '2025-02-05',
      totalValue: 'R$ 5.200',
      tags: ['Premium'],
      rating: 5,
      avatar: 'MS'
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro.costa@email.com',
      phone: '+55 11 98765-5678',
      company: 'Marketing Pro',
      location: 'Belo Horizonte, MG',
      status: 'inactive',
      appointments: 5,
      lastAppointment: '2024-12-10',
      nextAppointment: null,
      totalValue: 'R$ 3.800',
      tags: ['Regular'],
      rating: 4,
      avatar: 'PC'
    },
    {
      id: 4,
      name: 'Ana Oliveira',
      email: 'ana.oliveira@email.com',
      phone: '+55 11 98765-9012',
      company: 'Consultoria ABC',
      location: 'Curitiba, PR',
      status: 'active',
      appointments: 15,
      lastAppointment: '2025-01-25',
      nextAppointment: '2025-02-08',
      totalValue: 'R$ 12.300',
      tags: ['VIP', 'Premium'],
      rating: 5,
      avatar: 'AO'
    },
    {
      id: 5,
      name: 'Carlos Ferreira',
      email: 'carlos.f@email.com',
      phone: '+55 11 98765-3456',
      company: 'Startup Labs',
      location: 'Porto Alegre, RS',
      status: 'pending',
      appointments: 2,
      lastAppointment: '2025-01-10',
      nextAppointment: '2025-02-15',
      totalValue: 'R$ 1.500',
      tags: ['Novo'],
      rating: 4,
      avatar: 'CF'
    },
    {
      id: 6,
      name: 'Juliana Rocha',
      email: 'ju.rocha@email.com',
      phone: '+55 11 98765-7890',
      company: 'Agência Digital',
      location: 'Brasília, DF',
      status: 'active',
      appointments: 10,
      lastAppointment: '2025-01-22',
      nextAppointment: '2025-02-12',
      totalValue: 'R$ 7.800',
      tags: ['Recorrente'],
      rating: 5,
      avatar: 'JR'
    }
  ];

  const stats = [
    { label: 'Total de Clientes', value: '284', icon: Users, color: '#3b82f6', change: '+12%' },
    { label: 'Clientes Ativos', value: '218', icon: CheckCircle, color: '#10b981', change: '+8%' },
    { label: 'Novos este mês', value: '24', icon: TrendingUp, color: '#f59e0b', change: '+15%' },
    { label: 'Taxa de Retenção', value: '94%', icon: Star, color: '#ec4899', change: '+2%' }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || client.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return { bg: '#d1fae5', color: '#10b981' };
      case 'inactive': return { bg: '#fee2e2', color: '#ef4444' };
      case 'pending': return { bg: '#fef3c7', color: '#f59e0b' };
      default: return { bg: '#e5e7eb', color: '#6b7280' };
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'pending': return 'Pendente';
      default: return 'Desconhecido';
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Clientes</h1>
          <p style={styles.subtitle}>Gerencie seus clientes e acompanhe o relacionamento</p>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.btnSecondary}>
            <Upload size={18} />
            Importar
          </button>
          <button style={styles.btnSecondary}>
            <Download size={18} />
            Exportar
          </button>
          <button style={styles.btnPrimary} onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            Novo Cliente
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} style={styles.statCard}>
              <div style={styles.statHeader}>
                <div style={{...styles.statIcon, background: stat.color}}>
                  <Icon size={24} color="white" />
                </div>
                <span style={styles.statChange}>{stat.change}</span>
              </div>
              <div style={styles.statLabel}>{stat.label}</div>
              <div style={styles.statValue}>{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div style={styles.filtersBar}>
        <div style={styles.searchContainer}>
          <Search size={20} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por nome, email ou empresa..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={styles.filterButtons}>
          <button
            style={{...styles.filterBtn, ...(selectedFilter === 'all' ? styles.filterBtnActive : {})}}
            onClick={() => setSelectedFilter('all')}
          >
            Todos ({clients.length})
          </button>
          <button
            style={{...styles.filterBtn, ...(selectedFilter === 'active' ? styles.filterBtnActive : {})}}
            onClick={() => setSelectedFilter('active')}
          >
            <CheckCircle size={16} />
            Ativos ({clients.filter(c => c.status === 'active').length})
          </button>
          <button
            style={{...styles.filterBtn, ...(selectedFilter === 'inactive' ? styles.filterBtnActive : {})}}
            onClick={() => setSelectedFilter('inactive')}
          >
            <XCircle size={16} />
            Inativos ({clients.filter(c => c.status === 'inactive').length})
          </button>
          <button
            style={{...styles.filterBtn, ...(selectedFilter === 'pending' ? styles.filterBtnActive : {})}}
            onClick={() => setSelectedFilter('pending')}
          >
            <Clock size={16} />
            Pendentes ({clients.filter(c => c.status === 'pending').length})
          </button>
        </div>

        <button style={styles.btnIcon}>
          <Filter size={20} />
        </button>
      </div>

      {/* Clients Grid */}
      <div style={styles.clientsGrid}>
        {filteredClients.map((client) => {
          const statusStyle = getStatusColor(client.status);
          return (
            <div key={client.id} style={styles.clientCard}>
              {/* Card Header */}
              <div style={styles.cardHeader}>
                <div style={styles.clientAvatar}>
                  {client.avatar}
                </div>
                <button style={styles.btnIconSmall}>
                  <MoreVertical size={18} />
                </button>
              </div>

              {/* Client Info */}
              <div style={styles.clientInfo}>
                <h3 style={styles.clientName}>{client.name}</h3>
                <p style={styles.clientCompany}>{client.company}</p>
                
                <div style={styles.clientDetails}>
                  <div style={styles.detailItem}>
                    <Mail size={14} />
                    <span>{client.email}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <Phone size={14} />
                    <span>{client.phone}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <MapPin size={14} />
                    <span>{client.location}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div style={styles.clientStats}>
                <div style={styles.clientStatItem}>
                  <Calendar size={16} color="#6b7280" />
                  <div>
                    <span style={styles.statItemLabel}>Agendamentos</span>
                    <span style={styles.statItemValue}>{client.appointments}</span>
                  </div>
                </div>
                <div style={styles.clientStatItem}>
                  <TrendingUp size={16} color="#6b7280" />
                  <div>
                    <span style={styles.statItemLabel}>Total</span>
                    <span style={styles.statItemValue}>{client.totalValue}</span>
                  </div>
                </div>
              </div>

              {/* Tags and Status */}
              <div style={styles.cardFooter}>
                <div style={styles.tags}>
                  {client.tags.map((tag, idx) => (
                    <span key={idx} style={styles.tag}>
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{...styles.statusBadge, background: statusStyle.bg, color: statusStyle.color}}>
                  {getStatusLabel(client.status)}
                </div>
              </div>

              {/* Rating */}
              <div style={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < client.rating ? '#f59e0b' : 'none'}
                    color={i < client.rating ? '#f59e0b' : '#d1d5db'}
                  />
                ))}
              </div>

              {/* Actions */}
              <div style={styles.cardActions}>
                <button style={styles.actionBtn} onClick={() => setSelectedClient(client)}>
                  <Eye size={16} />
                  Ver Perfil
                </button>
                <button style={styles.actionBtn}>
                  <MessageSquare size={16} />
                  Contatar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                <User size={24} />
                Novo Cliente
              </h2>
              <button style={styles.btnClose} onClick={() => setShowAddModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nome Completo *</label>
                  <input type="text" style={styles.input} placeholder="Ex: João Silva" />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email *</label>
                  <input type="email" style={styles.input} placeholder="email@exemplo.com" />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Telefone *</label>
                  <input type="tel" style={styles.input} placeholder="+55 11 98765-4321" />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Empresa</label>
                  <input type="text" style={styles.input} placeholder="Nome da Empresa" />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Localização</label>
                  <input type="text" style={styles.input} placeholder="Cidade, Estado" />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Status</label>
                  <select style={styles.input}>
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                    <option value="pending">Pendente</option>
                  </select>
                </div>

                <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                  <label style={styles.label}>Tags</label>
                  <input type="text" style={styles.input} placeholder="VIP, Premium, Recorrente (separadas por vírgula)" />
                </div>

                <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                  <label style={styles.label}>Observações</label>
                  <textarea style={{...styles.input, minHeight: '100px', resize: 'vertical'}} placeholder="Adicione observações sobre o cliente..."></textarea>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.btnCancel} onClick={() => setShowAddModal(false)}>
                Cancelar
              </button>
              <button style={styles.btnSave}>
                <Save size={18} />
                Salvar Cliente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Client Detail Modal */}
      {selectedClient && (
        <div style={styles.modalOverlay} onClick={() => setSelectedClient(null)}>
          <div style={{...styles.modal, maxWidth: '900px'}} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.clientDetailHeader}>
                <div style={{...styles.clientAvatar, width: '60px', height: '60px', fontSize: '24px'}}>
                  {selectedClient.avatar}
                </div>
                <div>
                  <h2 style={styles.modalTitle}>{selectedClient.name}</h2>
                  <p style={{color: '#6b7280', fontSize: '14px'}}>{selectedClient.company}</p>
                </div>
              </div>
              <button style={styles.btnClose} onClick={() => setSelectedClient(null)}>
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.detailGrid}>
                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>Informações de Contato</h3>
                  <div style={styles.detailList}>
                    <div style={styles.detailRow}>
                      <Mail size={18} color="#6b7280" />
                      <span>{selectedClient.email}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <Phone size={18} color="#6b7280" />
                      <span>{selectedClient.phone}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <MapPin size={18} color="#6b7280" />
                      <span>{selectedClient.location}</span>
                    </div>
                  </div>
                </div>

                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>Estatísticas</h3>
                  <div style={styles.statsListDetail}>
                    <div style={styles.statDetailItem}>
                      <span style={styles.statDetailLabel}>Total de Agendamentos</span>
                      <span style={styles.statDetailValue}>{selectedClient.appointments}</span>
                    </div>
                    <div style={styles.statDetailItem}>
                      <span style={styles.statDetailLabel}>Valor Total</span>
                      <span style={styles.statDetailValue}>{selectedClient.totalValue}</span>
                    </div>
                    <div style={styles.statDetailItem}>
                      <span style={styles.statDetailLabel}>Último Agendamento</span>
                      <span style={styles.statDetailValue}>{selectedClient.lastAppointment}</span>
                    </div>
                    <div style={styles.statDetailItem}>
                      <span style={styles.statDetailLabel}>Próximo Agendamento</span>
                      <span style={styles.statDetailValue}>{selectedClient.nextAppointment || 'Nenhum'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.actionsGrid}>
                <button style={styles.actionBtnLarge}>
                  <Calendar size={20} />
                  Novo Agendamento
                </button>
                <button style={styles.actionBtnLarge}>
                  <MessageSquare size={20} />
                  Enviar Mensagem
                </button>
                <button style={styles.actionBtnLarge}>
                  <Edit size={20} />
                  Editar Informações
                </button>
                <button style={{...styles.actionBtnLarge, background: '#fee2e2', color: '#ef4444'}}>
                  <Trash2 size={20} />
                  Excluir Cliente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    background: '#f9fafb',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '1rem'
  },
  headerActions: {
    display: 'flex',
    gap: '0.75rem'
  },
  btnPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
  },
  btnSecondary: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'white',
    color: '#1f2937',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  statCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '1rem',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s'
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statChange: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#10b981',
    background: '#d1fae5',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.5rem'
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '0.5rem',
    display: 'block'
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1f2937'
  },
  filtersBar: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    alignItems: 'center',
    background: 'white',
    padding: '1rem',
    borderRadius: '1rem',
    border: '1px solid #e5e7eb'
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    maxWidth: '400px'
  },
  searchIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af'
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 3rem',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    outline: 'none'
  },
  filterButtons: {
    display: 'flex',
    gap: '0.5rem',
    flex: 1
  },
  filterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'transparent',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#6b7280',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  filterBtnActive: {
    background: 'linear-gradient(135deg, #eff6ff, #f3e8ff)',
    color: '#3b82f6',
    borderColor: '#3b82f6',
    fontWeight: '600'
  },
  btnIcon: {
    padding: '0.75rem',
    background: 'transparent',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'all 0.2s'
  },
  clientsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '1.5rem'
  },
  clientCard: {
    background: 'white',
    borderRadius: '1rem',
    border: '1px solid #e5e7eb',
    padding: '1.5rem',
    transition: 'all 0.3s',
    cursor: 'pointer'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem'
  },
  clientAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: '18px'
  },
  btnIconSmall: {
    padding: '0.5rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#6b7280',
    borderRadius: '0.5rem',
    transition: 'all 0.2s'
  },
  clientInfo: {
    marginBottom: '1rem'
  },
  clientName: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.25rem'
  },
  clientCompany: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '1rem'
  },
  clientDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  clientStats: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1rem',
    padding: '1rem',
    background: '#f9fafb',
    borderRadius: '0.75rem'
  },
  clientStatItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  statItemLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
    display: 'block'
  },
  statItemValue: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1f2937',
    display: 'block'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #e5e7eb'
  },
  tags: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.25rem 0.75rem',
    background: '#eff6ff',
    color: '#3b82f6',
    fontSize: '0.75rem',
    fontWeight: '600',
    borderRadius: '9999px'
  },
  statusBadge: {
    padding: '0.375rem 0.75rem',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
    fontWeight: '600'
  },
  rating: {
    display: 'flex',
    gap: '0.25rem',
    marginBottom: '1rem'
  },
  cardActions: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem'
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    background: 'linear-gradient(135deg, #f9fafb, #ffffff)',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#1f2937',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)'
  },
  modal: {
    background: 'white',
    borderRadius: '1.5rem',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem',
    borderBottom: '1px solid #e5e7eb'
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  btnClose: {
    padding: '0.5rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#6b7280',
    borderRadius: '0.5rem',
    transition: 'all 0.2s'
  },
  modalBody: {
    padding: '2rem',
    overflowY: 'auto',
    flex: 1
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151'
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'inherit'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    padding: '1.5rem 2rem',
    borderTop: '1px solid #e5e7eb'
  },
  btnCancel: {
    padding: '0.75rem 1.5rem',
    background: 'transparent',
    color: '#6b7280',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  btnSave: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: 'white',
    border: 'none',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  clientDetailHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginBottom: '2rem'
  },
  detailSection: {
    background: '#f9fafb',
    padding: '1.5rem',
    borderRadius: '1rem'
  },
  sectionTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1rem'
  },
  detailList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '0.875rem',
    color: '#374151'
  },
  statsListDetail: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  statDetailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #e5e7eb'
  },
  statDetailLabel: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  statDetailValue: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#1f2937'
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem'
  },
  actionBtnLarge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    padding: '1rem',
    background: 'linear-gradient(135deg, #f9fafb, #ffffff)',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#1f2937',
    cursor: 'pointer',
    transition: 'all 0.2s'
  }
}