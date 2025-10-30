import React, { useState } from 'react';
import { 
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  Phone,
  Mail,
  User,
  MessageSquare,
  Calendar,
  Clock,
  Tag,
  Download,
  Upload,
  Star,
  Activity,
  TrendingUp,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function Cliente() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');

  const [newClient, setNewClient] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'João Silva',
      phone: '+55 11 98765-4321',
      email: 'joao@email.com',
      lastInteraction: '2025-01-29',
      status: 'active',
      tags: ['VIP', 'Recorrente'],
      notes: 'Cliente preferencial',
      totalAppointments: 12,
      totalValue: 8500,
      satisfactionRate: 5,
      history: [
        {
          id: 1,
          type: 'ai_message',
          date: '2025-01-29 10:30',
          content: 'IA: Olá João! Gostaria de agendar sua consulta mensal?',
          response: 'João: Sim, pode ser amanhã às 14h?'
        },
        {
          id: 2,
          type: 'appointment',
          date: '2025-01-28 14:00',
          content: 'Consulta realizada',
          status: 'completed'
        },
        {
          id: 3,
          type: 'feedback',
          date: '2025-01-28 15:30',
          content: 'Avaliação: 5 estrelas - Excelente atendimento!'
        }
      ]
    },
    {
      id: 2,
      name: 'Maria Santos',
      phone: '+55 11 98765-1234',
      email: 'maria@email.com',
      lastInteraction: '2025-01-28',
      status: 'active',
      tags: ['Recorrente'],
      notes: '',
      totalAppointments: 8,
      totalValue: 5200,
      satisfactionRate: 5,
      history: [
        {
          id: 1,
          type: 'ai_message',
          date: '2025-01-28 16:00',
          content: 'IA: Olá Maria! Seu agendamento está confirmado para amanhã.',
          response: 'Maria: Perfeito, obrigada!'
        }
      ]
    },
    {
      id: 3,
      name: 'Pedro Costa',
      phone: '+55 11 98765-5678',
      email: 'pedro@email.com',
      lastInteraction: '2025-01-20',
      status: 'inactive',
      tags: ['Inativo'],
      notes: 'Não responde há 2 semanas',
      totalAppointments: 3,
      totalValue: 2100,
      satisfactionRate: 4,
      history: []
    },
    {
      id: 4,
      name: 'Ana Oliveira',
      phone: '+55 11 98765-9012',
      email: 'ana@email.com',
      lastInteraction: '2025-01-29',
      status: 'active',
      tags: ['VIP'],
      notes: 'Empresária, horários flexíveis',
      totalAppointments: 15,
      totalValue: 12300,
      satisfactionRate: 5,
      history: []
    },
    {
      id: 5,
      name: 'Carlos Ferreira',
      phone: '+55 11 98765-3456',
      email: 'carlos@email.com',
      lastInteraction: '2025-01-29',
      status: 'new',
      tags: ['Novo'],
      notes: 'Primeiro contato via WhatsApp',
      totalAppointments: 1,
      totalValue: 800,
      satisfactionRate: 4,
      history: []
    }
  ]);

  const stats = [
    { label: 'Total de Clientes', value: clients.length, icon: Users, color: '#3b82f6' },
    { label: 'Clientes Ativos', value: clients.filter(c => c.status === 'active').length, icon: CheckCircle, color: '#10b981' },
    { label: 'Novos este Mês', value: clients.filter(c => c.tags.includes('Novo')).length, icon: TrendingUp, color: '#f59e0b' },
    { label: 'Taxa de Retenção', value: '94%', icon: Star, color: '#8b5cf6' }
  ];

  const tagConfig = {
    'Novo': { color: '#3b82f6', bg: '#eff6ff' },
    'Recorrente': { color: '#10b981', bg: '#d1fae5' },
    'VIP': { color: '#8b5cf6', bg: '#f3e8ff' },
    'Inativo': { color: '#6b7280', bg: '#f3f4f6' }
  };

  const getStatusConfig = (status) => {
    switch(status) {
      case 'active':
        return { label: 'Ativo', color: '#10b981', bg: '#d1fae5' };
      case 'inactive':
        return { label: 'Inativo', color: '#6b7280', bg: '#f3f4f6' };
      case 'new':
        return { label: 'Novo', color: '#3b82f6', bg: '#eff6ff' };
      default:
        return { label: 'Desconhecido', color: '#6b7280', bg: '#f3f4f6' };
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = filterTag === 'all' || client.tags.includes(filterTag);
    
    return matchesSearch && matchesTag;
  });

  const handleAddClient = () => {
    const client = {
      id: clients.length + 1,
      ...newClient,
      lastInteraction: new Date().toISOString().split('T')[0],
      status: 'new',
      tags: ['Novo'],
      totalAppointments: 0,
      totalValue: 0,
      satisfactionRate: 0,
      history: []
    };
    
    setClients([...clients, client]);
    setShowAddModal(false);
    setNewClient({ name: '', phone: '', email: '', notes: '' });
  };

  const handleDeleteClient = (clientId) => {
   
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.headerBadge}>
            <Users size={16} />
            <span>Clientes</span>
          </div>
          <h1 style={styles.title}>Gerenciar Clientes</h1>
          <p style={styles.subtitle}>
            Organize e acompanhe seu relacionamento com os clientes
          </p>
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
            Adicionar Cliente
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} style={styles.statCard}>
              <div style={{...styles.statIcon, background: `${stat.color}15`, color: stat.color}}>
                <Icon size={24} />
              </div>
              <div>
                <p style={styles.statLabel}>{stat.label}</p>
                <p style={styles.statValue}>{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.searchContainer}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por nome, telefone ou email..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={styles.filters}>
          <button
            style={{...styles.filterBtn, ...(filterTag === 'all' ? styles.filterBtnActive : {})}}
            onClick={() => setFilterTag('all')}
          >
            Todos
          </button>
          {Object.keys(tagConfig).map(tag => (
            <button
              key={tag}
              style={{
                ...styles.filterBtn,
                ...(filterTag === tag ? styles.filterBtnActive : {})
              }}
              onClick={() => setFilterTag(tag)}
            >
              <Tag size={14} />
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Cliente</th>
              <th style={styles.th}>Contato</th>
              <th style={styles.th}>Última Interação</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Tags</th>
              <th style={styles.th}>Estatísticas</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => {
              const statusConfig = getStatusConfig(client.status);
              
              return (
                <tr key={client.id} style={styles.tableRow}>
                  <td style={styles.td}>
                    <div style={styles.clientCell}>
                      <div style={styles.clientAvatar}>
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={styles.clientName}>{client.name}</div>
                        <div style={styles.clientId}>ID: #{client.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.contactCell}>
                      <div style={styles.contactItem}>
                        <Phone size={14} />
                        {client.phone}
                      </div>
                      <div style={styles.contactItem}>
                        <Mail size={14} />
                        {client.email}
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.dateCell}>
                      <Clock size={14} />
                      {new Date(client.lastInteraction).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={{
                      ...styles.statusBadge,
                      background: statusConfig.bg,
                      color: statusConfig.color
                    }}>
                      {statusConfig.label}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.tagsCell}>
                      {client.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          style={{
                            ...styles.tagBadge,
                            background: tagConfig[tag]?.bg || '#f3f4f6',
                            color: tagConfig[tag]?.color || '#6b7280'
                          }}
                        >
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.statsCell}>
                      <div style={styles.statItem}>
                        <Calendar size={14} color="#6b7280" />
                        <span>{client.totalAppointments}</span>
                      </div>
                      <div style={styles.statItem}>
                        <Star size={14} color="#f59e0b" fill="#f59e0b" />
                        <span>{client.satisfactionRate}</span>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionButtons}>
                      <button
                        style={styles.actionBtn}
                        onClick={() => {
                          setSelectedClient(client);
                          setShowHistoryModal(true);
                        }}
                        title="Ver Histórico"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        style={styles.actionBtn}
                        onClick={() => {
                          setSelectedClient(client);
                          setShowEditModal(true);
                        }}
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        style={styles.actionBtn}
                        onClick={() => handleDeleteClient(client.id)}
                        title="Excluir"
                      >
                        <Trash2 size={16} color="#ef4444" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredClients.length === 0 && (
          <div style={styles.emptyState}>
            <Users size={48} color="#d1d5db" />
            <h3 style={styles.emptyTitle}>Nenhum cliente encontrado</h3>
            <p style={styles.emptyText}>
              Tente ajustar os filtros ou adicionar um novo cliente
            </p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitleContainer}>
                <Plus size={24} color="#3b82f6" />
                <h2 style={styles.modalTitle}>Adicionar Novo Cliente</h2>
              </div>
              <button style={styles.btnClose} onClick={() => setShowAddModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <User size={16} />
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    style={styles.input}
                    placeholder="Ex: João Silva"
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <Phone size={16} />
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    style={styles.input}
                    placeholder="+55 11 98765-4321"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  />
                </div>

                <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                  <label style={styles.label}>
                    <Mail size={16} />
                    Email *
                  </label>
                  <input
                    type="email"
                    style={styles.input}
                    placeholder="email@exemplo.com"
                    value={newClient.email}
                    onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  />
                </div>

                <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                  <label style={styles.label}>
                    <FileText size={16} />
                    Observações
                  </label>
                  <textarea
                    style={styles.textarea}
                    placeholder="Adicione notas sobre o cliente..."
                    value={newClient.notes}
                    onChange={(e) => setNewClient({...newClient, notes: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>

              <div style={styles.aiSuggestion}>
                <Sparkles size={20} color="#8b5cf6" />
                <div style={{flex: 1}}>
                  <h4 style={styles.aiSuggestionTitle}>Tags Automáticas</h4>
                  <p style={styles.aiSuggestionText}>
                    A IA irá analisar o perfil e sugerir tags automaticamente
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.btnCancel} onClick={() => setShowAddModal(false)}>
                Cancelar
              </button>
              <button style={styles.btnSave} onClick={handleAddClient}>
                <Save size={18} />
                Salvar Cliente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && selectedClient && (
        <div style={styles.modalOverlay} onClick={() => setShowHistoryModal(false)}>
          <div style={{...styles.modal, maxWidth: '900px'}} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitleContainer}>
                <Activity size={24} color="#3b82f6" />
                <h2 style={styles.modalTitle}>Histórico de Interações</h2>
              </div>
              <button style={styles.btnClose} onClick={() => setShowHistoryModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              {/* Client Summary */}
              <div style={styles.clientSummary}>
                <div style={styles.summaryLeft}>
                  <div style={styles.clientAvatarLarge}>
                    {selectedClient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 style={styles.clientNameLarge}>{selectedClient.name}</h3>
                    <div style={styles.clientContact}>
                      <Phone size={14} />
                      {selectedClient.phone}
                    </div>
                    <div style={styles.clientContact}>
                      <Mail size={14} />
                      {selectedClient.email}
                    </div>
                  </div>
                </div>
                <div style={styles.summaryStats}>
                  <div style={styles.summaryStatItem}>
                    <Calendar size={20} color="#3b82f6" />
                    <div>
                      <div style={styles.summaryStatValue}>{selectedClient.totalAppointments}</div>
                      <div style={styles.summaryStatLabel}>Agendamentos</div>
                    </div>
                  </div>
                  <div style={styles.summaryStatItem}>
                    <TrendingUp size={20} color="#10b981" />
                    <div>
                      <div style={styles.summaryStatValue}>R$ {selectedClient.totalValue.toLocaleString()}</div>
                      <div style={styles.summaryStatLabel}>Valor Total</div>
                    </div>
                  </div>
                  <div style={styles.summaryStatItem}>
                    <Star size={20} color="#f59e0b" />
                    <div>
                      <div style={styles.summaryStatValue}>{selectedClient.satisfactionRate}/5</div>
                      <div style={styles.summaryStatLabel}>Satisfação</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div style={styles.timelineSection}>
                <h4 style={styles.timelineTitle}>
                  <Activity size={18} />
                  Linha do Tempo
                </h4>
                
                {selectedClient.history.length > 0 ? (
                  <div style={styles.timeline}>
                    {selectedClient.history.map((item, index) => (
                      <div key={item.id} style={styles.timelineItem}>
                        <div style={{
                          ...styles.timelineIcon,
                          background: item.type === 'ai_message' ? '#f3e8ff' :
                                     item.type === 'appointment' ? '#eff6ff' : '#fef3c7'
                        }}>
                          {item.type === 'ai_message' && <MessageSquare size={16} color="#8b5cf6" />}
                          {item.type === 'appointment' && <Calendar size={16} color="#3b82f6" />}
                          {item.type === 'feedback' && <Star size={16} color="#f59e0b" />}
                        </div>
                        <div style={styles.timelineContent}>
                          <div style={styles.timelineDate}>{item.date}</div>
                          <div style={styles.timelineText}>{item.content}</div>
                          {item.response && (
                            <div style={styles.timelineResponse}>{item.response}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={styles.emptyTimeline}>
                    <MessageSquare size={32} color="#d1d5db" />
                    <p>Nenhuma interação registrada ainda</p>
                  </div>
                )}
              </div>

              {/* Notes */}
              {selectedClient.notes && (
                <div style={styles.notesSection}>
                  <h4 style={styles.notesTitle}>
                    <FileText size={18} />
                    Observações
                  </h4>
                  <p style={styles.notesText}>{selectedClient.notes}</p>
                </div>
              )}
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.btnSecondary}>
                <MessageSquare size={18} />
                Enviar Mensagem
              </button>
              <button style={styles.btnSecondary}>
                <Calendar size={18} />
                Novo Agendamento
              </button>
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
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  btnSecondary: {
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
  },
  statIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: '0 0 0.25rem 0'
  },
  statValue: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    background: 'white',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    minWidth: '300px',
    maxWidth: '500px'
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
    borderRadius: '8px',
    fontSize: '0.875rem',
    outline: 'none'
  },
  filters: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  filterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'transparent',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
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
  tableContainer: {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    background: '#fafafa',
    borderBottom: '1px solid #e5e7eb'
  },
  th: {
    padding: '1rem',
    textAlign: 'left',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  tableRow: {
    borderBottom: '1px solid #f3f4f6',
    transition: 'background 0.2s'
  },
  td: {
    padding: '1rem',
    fontSize: '0.875rem',
    color: '#374151'
  },
  clientCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
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
    fontSize: '0.875rem',
    flexShrink: 0
  },
  clientName: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.25rem'
  },
  clientId: {
    fontSize: '0.75rem',
    color: '#6b7280'
  },
  contactCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  dateCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#6b7280'
  },
  statusBadge: {
    display: 'inline-flex',
    padding: '0.375rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600'
  },
  tagsCell: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem'
  },
  tagBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600'
  },
  statsCell: {
    display: 'flex',
    gap: '1rem'
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    fontSize: '0.875rem',
    color: '#374151'
  },
  actionButtons: {
    display: 'flex',
    gap: '0.5rem'
  },
  actionBtn: {
    padding: '0.5rem',
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'all 0.2s'
  },
  emptyState: {
    padding: '4rem 2rem',
    textAlign: 'center'
  },
  emptyTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#374151',
    margin: '1rem 0 0.5rem'
  },
  emptyText: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0
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
    borderRadius: '16px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },
  modalHeader: {
    padding: '2rem',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0
  },
  btnClose: {
    width: '32px',
    height: '32px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.5rem',
    color: '#6b7280',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    gap: '1.5rem',
    marginBottom: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151'
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'inherit'
  },
  textarea: {
    padding: '0.75rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  aiSuggestion: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: 'linear-gradient(135deg, #f3e8ff, #eff6ff)',
    borderRadius: '8px'
  },
  aiSuggestionTitle: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 0.25rem 0'
  },
  aiSuggestionText: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0
  },
  modalFooter: {
    padding: '1.5rem 2rem',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem'
  },
  btnCancel: {
    padding: '0.75rem 1.5rem',
    background: 'transparent',
    color: '#6b7280',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
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
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  clientSummary: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    background: '#f9fafb',
    borderRadius: '12px',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  summaryLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  clientAvatarLarge: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: '1.5rem',
    flexShrink: 0
  },
  clientNameLarge: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.5rem'
  },
  clientContact: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '0.25rem'
  },
  summaryStats: {
    display: 'flex',
    gap: '2rem'
  },
  summaryStatItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  summaryStatValue: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937'
  },
  summaryStatLabel: {
    fontSize: '0.75rem',
    color: '#6b7280'
  },
  timelineSection: {
    marginBottom: '2rem'
  },
  timelineTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  timelineItem: {
    display: 'flex',
    gap: '1rem',
    position: 'relative',
    paddingLeft: '2.5rem'
  },
  timelineIcon: {
    position: 'absolute',
    left: 0,
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  timelineContent: {
    flex: 1,
    paddingBottom: '1rem',
    borderBottom: '1px solid #f3f4f6'
  },
  timelineDate: {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginBottom: '0.5rem'
  },
  timelineText: {
    fontSize: '0.875rem',
    color: '#374151',
    lineHeight: '1.6',
    marginBottom: '0.5rem'
  },
  timelineResponse: {
    fontSize: '0.875rem',
    color: '#1f2937',
    fontStyle: 'italic',
    padding: '0.75rem',
    background: '#eff6ff',
    borderRadius: '8px',
    borderLeft: '3px solid #3b82f6'
  },
  emptyTimeline: {
    padding: '3rem',
    textAlign: 'center',
    color: '#9ca3af'
  },
  notesSection: {
    padding: '1.5rem',
    background: '#fef3c7',
    borderRadius: '12px'
  },
  notesTitle: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#92400e',
    marginBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  notesText: {
    fontSize: '0.875rem',
    color: '#78350f',
    lineHeight: '1.6',
    margin: 0
  }
};