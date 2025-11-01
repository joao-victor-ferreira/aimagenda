import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Plus, Filter, Search, ChevronLeft, ChevronRight, X, Save,
  Edit, Trash2, Eye, User, Phone, Mail, MessageSquare, CheckCircle, XCircle,
  AlertCircle, Sparkles, Download, RefreshCw
} from 'lucide-react';

export default function Agenda() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('list');
  const [showNewModal, setShowNewModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [newAppointment, setNewAppointment] = useState({
    client: '', service: '', date: '', time: '', notes: ''
  });

  const appointments = [
    {
      id: 1,
      client: { name: 'João Silva', email: 'joao@email.com', phone: '+55 11 98765-4321' },
      service: 'Consulta', date: '2025-01-30', time: '09:00', duration: 60,
      status: 'confirmed', notes: 'Primeiro atendimento', createdBy: 'IA'
    },
    {
      id: 2,
      client: { name: 'Maria Santos', email: 'maria@email.com', phone: '+55 11 98765-1234' },
      service: 'Reunião de Follow-up', date: '2025-01-30', time: '10:30', duration: 30,
      status: 'confirmed', notes: '', createdBy: 'Manual'
    },
    {
      id: 3,
      client: { name: 'Pedro Costa', email: 'pedro@email.com', phone: '+55 11 98765-5678' },
      service: 'Avaliação', date: '2025-01-30', time: '14:00', duration: 45,
      status: 'pending', notes: 'Aguardando confirmação', createdBy: 'IA'
    }
  ];

  const clients = ['João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Oliveira'];
  const services = ['Consulta', 'Reunião', 'Avaliação', 'Follow-up'];

  const getStatusConfig = (status) => {
    const configs = {
      confirmed: { label: 'Confirmado', color: '#10b981', bg: '#d1fae5', icon: CheckCircle },
      pending: { label: 'Pendente', color: '#f59e0b', bg: '#fef3c7', icon: AlertCircle },
      cancelled: { label: 'Cancelado', color: '#ef4444', bg: '#fee2e2', icon: XCircle }
    };
    return configs[status] || configs.pending;
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = 
      apt.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || apt.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: 'Hoje', value: 3, color: '#3b82f6' },
    { label: 'Confirmados', value: 2, color: '#10b981' },
    { label: 'Pendentes', value: 1, color: '#f59e0b' },
    { label: 'Semana', value: appointments.length, color: '#8b5cf6' }
  ];

  const AppointmentCard = ({ apt }) => {
    const statusConfig = getStatusConfig(apt.status);
    const StatusIcon = statusConfig.icon;
    
    return (
      <div style={styles.appointmentCard} onClick={() => { setSelectedAppointment(apt); setShowDetailModal(true); }}>
        <div style={styles.cardTop}>
          <div style={styles.clientCell}>
            <div style={styles.clientAvatar}>{apt.client.name.charAt(0)}</div>
            <div>
              <div style={styles.clientName}>{apt.client.name}</div>
              <div style={styles.clientEmail}>{apt.service}</div>
            </div>
          </div>
          <div style={{...styles.statusBadge, background: statusConfig.bg, color: statusConfig.color}}>
            <StatusIcon size={14} />
            {statusConfig.label}
          </div>
        </div>
        <div style={styles.cardDetails}>
          <div style={styles.detailRow}>
            <Calendar size={14} color="#6b7280" />
            <span>{new Date(apt.date).toLocaleDateString('pt-BR')}</span>
          </div>
          <div style={styles.detailRow}>
            <Clock size={14} color="#6b7280" />
            <span>{apt.time}</span>
          </div>
          <div style={styles.detailRow}>
            {apt.createdBy === 'IA' ? <Sparkles size={14} color="#8b5cf6" /> : <User size={14} color="#6b7280" />}
            <span>{apt.createdBy}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <style>{mediaQueries}</style>

      <div style={styles.header}>
        <div style={{width: '100%'}}>
          <div style={styles.headerBadge}>
            <Calendar size={16} />
            <span>Agendamentos</span>
          </div>
          <h1 style={styles.title}>Agendamentos</h1>
          <p style={styles.subtitle}>Visualize e controle seus compromissos</p>
        </div>
        <div style={styles.headerActions}>
          {!isMobile && (
            <button style={styles.btnSecondary}>
              <Download size={18} />
              Exportar
            </button>
          )}
          <button style={styles.btnPrimary} onClick={() => setShowNewModal(true)}>
            <Plus size={18} />
            {!isMobile && 'Novo'}
          </button>
        </div>
      </div>

      <div style={styles.statsGrid} className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={{...styles.statDot, background: stat.color}}></div>
            <div>
              <p style={styles.statLabel}>{stat.label}</p>
              <p style={styles.statValue}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.toolbar} className="toolbar">
        <div style={styles.searchContainer}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder={isMobile ? "Buscar..." : "Buscar por cliente ou serviço..."}
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={styles.filterButtons} className="filter-buttons">
          <button
            style={{...styles.filterBtn, ...(filterStatus === 'all' ? styles.filterBtnActive : {})}}
            onClick={() => setFilterStatus('all')}
          >
            Todos
          </button>
          <button
            style={{...styles.filterBtn, ...(filterStatus === 'confirmed' ? styles.filterBtnActive : {})}}
            onClick={() => setFilterStatus('confirmed')}
          >
            <CheckCircle size={16} />
            {!isMobile && 'Confirmados'}
          </button>
          <button
            style={{...styles.filterBtn, ...(filterStatus === 'pending' ? styles.filterBtnActive : {})}}
            onClick={() => setFilterStatus('pending')}
          >
            <AlertCircle size={16} />
            {!isMobile && 'Pendentes'}
          </button>
        </div>
      </div>

      {isMobile ? (
        <div style={styles.cardsGrid}>
          {filteredAppointments.map((apt) => <AppointmentCard key={apt.id} apt={apt} />)}
        </div>
      ) : (
        <div style={styles.listContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Cliente</th>
                <th style={styles.th}>Serviço</th>
                <th style={styles.th}>Data</th>
                <th style={styles.th}>Horário</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Origem</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((apt) => {
                const statusConfig = getStatusConfig(apt.status);
                const StatusIcon = statusConfig.icon;
                return (
                  <tr key={apt.id} style={styles.tableRow}>
                    <td style={styles.td}>
                      <div style={styles.clientCell}>
                        <div style={styles.clientAvatar}>{apt.client.name.charAt(0)}</div>
                        <div>
                          <div style={styles.clientName}>{apt.client.name}</div>
                          <div style={styles.clientEmail}>{apt.client.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>{apt.service}</td>
                    <td style={styles.td}>{new Date(apt.date).toLocaleDateString('pt-BR')}</td>
                    <td style={styles.td}>
                      <div style={styles.timeCell}>
                        <Clock size={14} />
                        {apt.time}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{...styles.statusBadge, background: statusConfig.bg, color: statusConfig.color}}>
                        <StatusIcon size={14} />
                        {statusConfig.label}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.originBadge}>
                        {apt.createdBy === 'IA' ? <Sparkles size={14} /> : <User size={14} />}
                        {apt.createdBy}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <button style={styles.actionBtn} onClick={() => { setSelectedAppointment(apt); setShowDetailModal(true); }}>
                          <Eye size={16} />
                        </button>
                        <button style={styles.actionBtn}>
                          <Edit size={16} />
                        </button>
                        <button style={{...styles.actionBtn, color: '#ef4444'}}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {showNewModal && (
        <div style={styles.modalOverlay} onClick={() => setShowNewModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitleContainer}>
                <Plus size={24} color="#3b82f6" />
                <h2 style={styles.modalTitle}>Novo Agendamento</h2>
              </div>
              <button style={styles.btnClose} onClick={() => setShowNewModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <User size={16} />
                    Cliente *
                  </label>
                  <input
                    type="text"
                    list="clients-list"
                    style={styles.input}
                    placeholder="Digite ou selecione..."
                    value={newAppointment.client}
                    onChange={(e) => setNewAppointment({...newAppointment, client: e.target.value})}
                  />
                  <datalist id="clients-list">
                    {clients.map((client, idx) => <option key={idx} value={client} />)}
                  </datalist>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <MessageSquare size={16} />
                    Serviço *
                  </label>
                  <select
                    style={styles.select}
                    value={newAppointment.service}
                    onChange={(e) => setNewAppointment({...newAppointment, service: e.target.value})}
                  >
                    <option value="">Selecione...</option>
                    {services.map((service, idx) => <option key={idx} value={service}>{service}</option>)}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <Calendar size={16} />
                    Data *
                  </label>
                  <input
                    type="date"
                    style={styles.input}
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <Clock size={16} />
                    Horário *
                  </label>
                  <input
                    type="time"
                    style={styles.input}
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  />
                </div>

                <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                  <label style={styles.label}>Observações</label>
                  <textarea
                    style={styles.textarea}
                    placeholder="Adicione observações..."
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>

              <div style={styles.aiSuggestion}>
                <Sparkles size={20} color="#8b5cf6" />
                <div style={{flex: 1}}>
                  <h4 style={styles.aiSuggestionTitle}>Sugestão da IA</h4>
                  <p style={styles.aiSuggestionText}>
                    Deixe a IA encontrar o melhor horário
                  </p>
                </div>
                <button style={styles.aiButton}>
                  <Sparkles size={16} />
                  Sugerir
                </button>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.btnCancel} onClick={() => setShowNewModal(false)}>
                Cancelar
              </button>
              <button style={styles.btnSave}>
                <Save size={18} />
                Criar
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedAppointment && (
        <div style={styles.modalOverlay} onClick={() => setShowDetailModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitleContainer}>
                <Eye size={24} color="#3b82f6" />
                <h2 style={styles.modalTitle}>Detalhes</h2>
              </div>
              <button style={styles.btnClose} onClick={() => setShowDetailModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.detailGrid}>
                <div style={styles.detailSection}>
                  <h3 style={styles.detailSectionTitle}>Cliente</h3>
                  <div style={styles.detailList}>
                    <div style={styles.detailItem}>
                      <User size={18} color="#6b7280" />
                      <div>
                        <div style={styles.detailLabel}>Nome</div>
                        <div style={styles.detailValue}>{selectedAppointment.client.name}</div>
                      </div>
                    </div>
                    <div style={styles.detailItem}>
                      <Mail size={18} color="#6b7280" />
                      <div>
                        <div style={styles.detailLabel}>Email</div>
                        <div style={styles.detailValue}>{selectedAppointment.client.email}</div>
                      </div>
                    </div>
                    <div style={styles.detailItem}>
                      <Phone size={18} color="#6b7280" />
                      <div>
                        <div style={styles.detailLabel}>Telefone</div>
                        <div style={styles.detailValue}>{selectedAppointment.client.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={styles.detailSection}>
                  <h3 style={styles.detailSectionTitle}>Agendamento</h3>
                  <div style={styles.detailList}>
                    <div style={styles.detailItem}>
                      <MessageSquare size={18} color="#6b7280" />
                      <div>
                        <div style={styles.detailLabel}>Serviço</div>
                        <div style={styles.detailValue}>{selectedAppointment.service}</div>
                      </div>
                    </div>
                    <div style={styles.detailItem}>
                      <Calendar size={18} color="#6b7280" />
                      <div>
                        <div style={styles.detailLabel}>Data</div>
                        <div style={styles.detailValue}>
                          {new Date(selectedAppointment.date).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    <div style={styles.detailItem}>
                      <Clock size={18} color="#6b7280" />
                      <div>
                        <div style={styles.detailLabel}>Horário</div>
                        <div style={styles.detailValue}>{selectedAppointment.time} ({selectedAppointment.duration} min)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedAppointment.notes && (
                <div style={styles.notesSection}>
                  <h4 style={styles.notesTitle}>Observações</h4>
                  <p style={styles.notesText}>{selectedAppointment.notes}</p>
                </div>
              )}

              <div style={styles.statusSection}>
                {(() => {
                  const statusConfig = getStatusConfig(selectedAppointment.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <div style={{...styles.statusBadgeLarge, background: statusConfig.bg, color: statusConfig.color}}>
                      <StatusIcon size={20} />
                      {statusConfig.label}
                    </div>
                  );
                })()}
                {selectedAppointment.createdBy === 'IA' && (
                  <div style={styles.aiCreatedBadge}>
                    <Sparkles size={16} />
                    Criado por IA
                  </div>
                )}
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.btnCancel}>
                <Trash2 size={18} />
                Cancelar
              </button>
              <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap'}}>
                <button style={styles.btnSecondary}>
                  <MessageSquare size={18} />
                  {!isMobile && 'Mensagem'}
                </button>
                <button style={styles.btnSave}>
                  <Edit size={18} />
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mediaQueries = `
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    
    .toolbar {
      flex-direction: column !important;
      align-items: stretch !important;
    }
    
    .filter-buttons {
      overflow-x: auto !important;
      flex-wrap: nowrap !important;
    }
  }
`;

const styles = {
  container: {
    padding: '1rem',
    background: '#fafafa',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
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
    marginBottom: '0.75rem'
  },
  title: {
    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.5rem'
  },
  subtitle: {
    fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
    color: '#6b7280'
  },
  headerActions: {
    display: 'flex',
    gap: '0.5rem'
  },
  btnPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap'
  },
  btnSecondary: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
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
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: 'white',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
  },
  statDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    flexShrink: 0
  },
  statLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
    margin: '0 0 0.25rem 0'
  },
  statValue: {
    fontSize: '1.5rem',
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
    gap: '1rem'
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    minWidth: '200px'
  },
  searchIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    pointerEvents: 'none'
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 3rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box'
  },
  filterButtons: {
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
    transition: 'all 0.2s',
    whiteSpace: 'nowrap'
  },
  filterBtnActive: {
    background: 'linear-gradient(135deg, #eff6ff, #f3e8ff)',
    color: '#3b82f6',
    borderColor: '#3b82f6',
    fontWeight: '600'
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem'
  },
  appointmentCard: {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    padding: '1.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
    gap: '1rem'
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  listContainer: {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '1000px'
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
    fontSize: '1rem',
    flexShrink: 0
  },
  clientName: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.25rem'
  },
  clientEmail: {
    fontSize: '0.75rem',
    color: '#6b7280'
  },
  timeCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.375rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    whiteSpace: 'nowrap'
  },
  originBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.25rem 0.5rem',
    background: '#f9fafb',
    borderRadius: '6px',
    fontSize: '0.75rem',
    color: '#6b7280'
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
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
    padding: '1rem'
  },
  modal: {
    background: 'white',
    borderRadius: '16px',
    maxWidth: '700px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },
  modalHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  modalTitle: {
    fontSize: 'clamp(1.125rem, 4vw, 1.5rem)',
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
    transition: 'all 0.2s',
    flexShrink: 0
  },
  modalBody: {
    padding: '1.5rem',
    overflowY: 'auto',
    flex: 1
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
    fontFamily: 'inherit',
    width: '100%',
    boxSizing: 'border-box'
  },
  select: {
    padding: '0.75rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    cursor: 'pointer',
    background: 'white',
    width: '100%',
    boxSizing: 'border-box'
  },
  textarea: {
    padding: '0.75rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    resize: 'vertical',
    width: '100%',
    boxSizing: 'border-box'
  },
  aiSuggestion: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.25rem',
    background: 'linear-gradient(135deg, #f3e8ff, #eff6ff)',
    borderRadius: '12px',
    border: '1px solid #e9d5ff',
    flexWrap: 'wrap'
  },
  aiSuggestionTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 0.25rem 0'
  },
  aiSuggestionText: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0
  },
  aiButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap'
  },
  modalFooter: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap'
  },
  btnCancel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
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
    padding: '0.75rem 1.25rem',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '1.5rem'
  },
  detailSection: {
    padding: '1.25rem',
    background: '#f9fafb',
    borderRadius: '12px'
  },
  detailSectionTitle: {
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
  detailItem: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start'
  },
  detailLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginBottom: '0.25rem'
  },
  detailValue: {
    fontSize: '0.875rem',
    color: '#1f2937',
    fontWeight: '500',
    wordBreak: 'break-word'
  },
  notesSection: {
    padding: '1.25rem',
    background: '#fef3c7',
    borderRadius: '12px',
    marginBottom: '1.5rem'
  },
  notesTitle: {
    fontSize: '0.875rem',
    fontWeight: '700',
    color: '#92400e',
    marginBottom: '0.5rem'
  },
  notesText: {
    fontSize: '0.875rem',
    color: '#78350f',
    margin: 0,
    lineHeight: '1.6'
  },
  statusSection: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  statusBadgeLarge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '700'
  },
  aiCreatedBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'linear-gradient(135deg, #f3e8ff, #eff6ff)',
    color: '#8b5cf6',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600'
  }
};