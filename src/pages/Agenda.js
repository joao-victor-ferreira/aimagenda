import React, { useState } from 'react';
import { 
  Calendar,
  Clock,
  Plus,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Save,
  Edit,
  Trash2,
  Eye,
  User,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Sparkles,
  Download,
  RefreshCw
} from 'lucide-react';

export default function Agenda() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'list'
  const [showNewModal, setShowNewModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [newAppointment, setNewAppointment] = useState({
    client: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });

  // Mock data
  const appointments = [
    {
      id: 1,
      client: { name: 'João Silva', email: 'joao@email.com', phone: '+55 11 98765-4321' },
      service: 'Consulta',
      date: '2025-01-30',
      time: '09:00',
      duration: 60,
      status: 'confirmed',
      notes: 'Primeiro atendimento',
      createdBy: 'IA'
    },
    {
      id: 2,
      client: { name: 'Maria Santos', email: 'maria@email.com', phone: '+55 11 98765-1234' },
      service: 'Reunião de Follow-up',
      date: '2025-01-30',
      time: '10:30',
      duration: 30,
      status: 'confirmed',
      notes: '',
      createdBy: 'Manual'
    },
    {
      id: 3,
      client: { name: 'Pedro Costa', email: 'pedro@email.com', phone: '+55 11 98765-5678' },
      service: 'Avaliação',
      date: '2025-01-30',
      time: '14:00',
      duration: 45,
      status: 'pending',
      notes: 'Aguardando confirmação',
      createdBy: 'IA'
    },
    {
      id: 4,
      client: { name: 'Ana Oliveira', email: 'ana@email.com', phone: '+55 11 98765-9012' },
      service: 'Consulta',
      date: '2025-01-30',
      time: '16:00',
      duration: 60,
      status: 'confirmed',
      notes: '',
      createdBy: 'Manual'
    },
    {
      id: 5,
      client: { name: 'Carlos Ferreira', email: 'carlos@email.com', phone: '+55 11 98765-3456' },
      service: 'Reunião',
      date: '2025-01-31',
      time: '11:00',
      duration: 30,
      status: 'cancelled',
      notes: 'Cliente solicitou cancelamento',
      createdBy: 'IA'
    }
  ];

  const clients = [
    'João Silva',
    'Maria Santos',
    'Pedro Costa',
    'Ana Oliveira',
    'Carlos Ferreira',
    'Juliana Rocha'
  ];

  const services = [
    'Consulta',
    'Reunião',
    'Avaliação',
    'Follow-up',
    'Workshop',
    'Treinamento'
  ];

  const getStatusConfig = (status) => {
    switch(status) {
      case 'confirmed':
        return { label: 'Confirmado', color: '#10b981', bg: '#d1fae5', icon: CheckCircle };
      case 'pending':
        return { label: 'Pendente', color: '#f59e0b', bg: '#fef3c7', icon: AlertCircle };
      case 'cancelled':
        return { label: 'Cancelado', color: '#ef4444', bg: '#fee2e2', icon: XCircle };
      default:
        return { label: 'Desconhecido', color: '#6b7280', bg: '#f3f4f6', icon: AlertCircle };
    }
  };

  const getWeekDays = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = 8 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const getAppointmentsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
  };

  const handleAISuggestion = () => {
    // AI suggestion logic
    const nextAvailable = {
      date: '2025-02-01',
      time: '09:00'
    };
    setNewAppointment(prev => ({
      ...prev,
      date: nextAvailable.date,
      time: nextAvailable.time
    }));
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = 
      apt.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || apt.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: 'Hoje', value: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length, color: '#3b82f6' },
    { label: 'Confirmados', value: appointments.filter(a => a.status === 'confirmed').length, color: '#10b981' },
    { label: 'Pendentes', value: appointments.filter(a => a.status === 'pending').length, color: '#f59e0b' },
    { label: 'Esta Semana', value: appointments.length, color: '#8b5cf6' }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.headerBadge}>
            <Calendar size={16} />
            <span>Agendamentos</span>
          </div>
          <h1 style={styles.title}>Gerenciar Agendamentos</h1>
          <p style={styles.subtitle}>
            Visualize e controle todos os seus compromissos
          </p>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.btnSecondary}>
            <Download size={18} />
            Exportar
          </button>
          <button style={styles.btnPrimary} onClick={() => setShowNewModal(true)}>
            <Plus size={18} />
            Novo Agendamento
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
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

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.toolbarLeft}>
          <div style={styles.searchContainer}>
            <Search size={18} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar por cliente ou serviço..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={styles.filterButtons}>
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
              Confirmados
            </button>
            <button
              style={{...styles.filterBtn, ...(filterStatus === 'pending' ? styles.filterBtnActive : {})}}
              onClick={() => setFilterStatus('pending')}
            >
              <AlertCircle size={16} />
              Pendentes
            </button>
            <button
              style={{...styles.filterBtn, ...(filterStatus === 'cancelled' ? styles.filterBtnActive : {})}}
              onClick={() => setFilterStatus('cancelled')}
            >
              <XCircle size={16} />
              Cancelados
            </button>
          </div>
        </div>

        <div style={styles.viewToggle}>
          <button
            style={{...styles.viewBtn, ...(viewMode === 'week' ? styles.viewBtnActive : {})}}
            onClick={() => setViewMode('week')}
          >
            <Calendar size={16} />
            Semana
          </button>
          <button
            style={{...styles.viewBtn, ...(viewMode === 'list' ? styles.viewBtnActive : {})}}
            onClick={() => setViewMode('list')}
          >
            Lista
          </button>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'week' && (
        <div style={styles.calendarContainer}>
          <div style={styles.calendarHeader}>
            <button style={styles.navBtn}>
              <ChevronLeft size={20} />
            </button>
            <h2 style={styles.calendarTitle}>
              {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </h2>
            <button style={styles.navBtn}>
              <ChevronRight size={20} />
            </button>
            <button style={styles.todayBtn}>
              <RefreshCw size={16} />
              Hoje
            </button>
          </div>

          <div style={styles.calendar}>
            {/* Week Header */}
            <div style={styles.weekHeader}>
              <div style={styles.timeColumn}></div>
              {getWeekDays().map((date, index) => {
                const isToday = date.toDateString() === new Date().toDateString();
                return (
                  <div key={index} style={styles.dayHeader}>
                    <div style={styles.dayName}>
                      {date.toLocaleDateString('pt-BR', { weekday: 'short' })}
                    </div>
                    <div style={{
                      ...styles.dayNumber,
                      ...(isToday ? styles.dayNumberToday : {})
                    }}>
                      {date.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Time Grid */}
            <div style={styles.timeGrid}>
              {timeSlots.map((time, timeIndex) => (
                <div key={timeIndex} style={styles.timeRow}>
                  <div style={styles.timeLabel}>{time}</div>
                  {getWeekDays().map((date, dayIndex) => {
                    const dayAppointments = getAppointmentsForDate(date).filter(
                      apt => apt.time === time
                    );
                    
                    return (
                      <div key={dayIndex} style={styles.timeSlot}>
                        {dayAppointments.map(apt => {
                          const statusConfig = getStatusConfig(apt.status);
                          return (
                            <div
                              key={apt.id}
                              style={{
                                ...styles.appointmentBlock,
                                background: statusConfig.bg,
                                borderLeft: `3px solid ${statusConfig.color}`
                              }}
                              onClick={() => {
                                setSelectedAppointment(apt);
                                setShowDetailModal(true);
                              }}
                            >
                              <div style={styles.appointmentTime}>{apt.time}</div>
                              <div style={styles.appointmentClient}>{apt.client.name}</div>
                              <div style={styles.appointmentService}>{apt.service}</div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
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
                        <div style={styles.clientAvatar}>
                          {apt.client.name.charAt(0)}
                        </div>
                        <div>
                          <div style={styles.clientName}>{apt.client.name}</div>
                          <div style={styles.clientEmail}>{apt.client.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>{apt.service}</td>
                    <td style={styles.td}>
                      {new Date(apt.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td style={styles.td}>
                      <div style={styles.timeCell}>
                        <Clock size={14} />
                        {apt.time}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{
                        ...styles.statusBadge,
                        background: statusConfig.bg,
                        color: statusConfig.color
                      }}>
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
                        <button
                          style={styles.actionBtn}
                          onClick={() => {
                            setSelectedAppointment(apt);
                            setShowDetailModal(true);
                          }}
                        >
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

      {/* New Appointment Modal */}
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
                    {clients.map((client, idx) => (
                      <option key={idx} value={client} />
                    ))}
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
                    {services.map((service, idx) => (
                      <option key={idx} value={service}>{service}</option>
                    ))}
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
                    placeholder="Adicione observações sobre o agendamento..."
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>

              {/* AI Suggestion */}
              <div style={styles.aiSuggestion}>
                <Sparkles size={20} color="#8b5cf6" />
                <div style={{flex: 1}}>
                  <h4 style={styles.aiSuggestionTitle}>Sugestão da IA</h4>
                  <p style={styles.aiSuggestionText}>
                    Deixe a IA encontrar o melhor horário disponível automaticamente
                  </p>
                </div>
                <button style={styles.aiButton} onClick={handleAISuggestion}>
                  <Sparkles size={16} />
                  Gerar Sugestão
                </button>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.btnCancel} onClick={() => setShowNewModal(false)}>
                Cancelar
              </button>
              <button style={styles.btnSave}>
                <Save size={18} />
                Criar Agendamento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedAppointment && (
        <div style={styles.modalOverlay} onClick={() => setShowDetailModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitleContainer}>
                <Eye size={24} color="#3b82f6" />
                <h2 style={styles.modalTitle}>Detalhes do Agendamento</h2>
              </div>
              <button style={styles.btnClose} onClick={() => setShowDetailModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.detailGrid}>
                <div style={styles.detailSection}>
                  <h3 style={styles.detailSectionTitle}>Informações do Cliente</h3>
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
                  <h3 style={styles.detailSectionTitle}>Detalhes do Agendamento</h3>
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
                          {new Date(selectedAppointment.date).toLocaleDateString('pt-BR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
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
                    <div style={{
                      ...styles.statusBadgeLarge,
                      background: statusConfig.bg,
                      color: statusConfig.color
                    }}>
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
                Cancelar Agendamento
              </button>
              <div style={{display: 'flex', gap: '0.75rem'}}>
                <button style={styles.btnSecondary}>
                  <MessageSquare size={18} />
                  Enviar Mensagem
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
    marginBottom: '2rem'
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
  statDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
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
    marginBottom: '2rem',
    background: 'white',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  toolbarLeft: {
    display: 'flex',
    gap: '1rem',
    flex: 1,
    flexWrap: 'wrap'
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    minWidth: '300px',
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
    borderRadius: '8px',
    fontSize: '0.875rem',
    outline: 'none'
  },
  filterButtons: {
    display: 'flex',
    gap: '0.5rem'
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
  viewToggle: {
    display: 'flex',
    gap: '0.5rem',
    background: '#f9fafb',
    padding: '0.25rem',
    borderRadius: '8px'
  },
  viewBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#6b7280',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  viewBtnActive: {
    background: 'white',
    color: '#3b82f6',
    fontWeight: '600',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  calendarContainer: {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden'
  },
  calendarHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    borderBottom: '1px solid #e5e7eb'
  },
  navBtn: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: '#6b7280'
  },
  calendarTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
    textTransform: 'capitalize',
    flex: 1
  },
  todayBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  calendar: {
    overflowX: 'auto'
  },
  weekHeader: {
    display: 'grid',
    gridTemplateColumns: '80px repeat(7, 1fr)',
    borderBottom: '1px solid #e5e7eb',
    background: '#fafafa'
  },
  timeColumn: {
    width: '80px'
  },
  dayHeader: {
    padding: '1rem',
    textAlign: 'center',
    borderLeft: '1px solid #e5e7eb'
  },
  dayName: {
    fontSize: '0.75rem',
    color: '#6b7280',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: '0.5rem'
  },
  dayNumber: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#374151'
  },
  dayNumberToday: {
    color: '#3b82f6',
    background: '#eff6ff',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto'
  },
  timeGrid: {
    display: 'flex',
    flexDirection: 'column'
  },
  timeRow: {
    display: 'grid',
    gridTemplateColumns: '80px repeat(7, 1fr)',
    minHeight: '80px',
    borderBottom: '1px solid #f3f4f6'
  },
  timeLabel: {
    padding: '0.5rem',
    fontSize: '0.75rem',
    color: '#6b7280',
    fontWeight: '500',
    textAlign: 'right',
    paddingRight: '1rem'
  },
  timeSlot: {
    padding: '0.5rem',
    borderLeft: '1px solid #f3f4f6',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  appointmentBlock: {
    padding: '0.5rem',
    borderRadius: '6px',
    marginBottom: '0.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '0.75rem'
  },
  appointmentTime: {
    fontWeight: '700',
    marginBottom: '0.25rem',
    color: '#1f2937'
  },
  appointmentClient: {
    fontWeight: '600',
    marginBottom: '0.25rem',
    color: '#374151'
  },
  appointmentService: {
    color: '#6b7280',
    fontSize: '0.7rem'
  },
  listContainer: {
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
    fontWeight: '600'
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
    backdropFilter: 'blur(4px)'
  },
  modal: {
    background: 'white',
    borderRadius: '16px',
    maxWidth: '700px',
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
    marginBottom: '2rem'
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
  select: {
    padding: '0.75rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    cursor: 'pointer',
    background: 'white'
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
    padding: '1.5rem',
    background: 'linear-gradient(135deg, #f3e8ff, #eff6ff)',
    borderRadius: '12px',
    border: '1px solid #e9d5ff'
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
    padding: '0.75rem 1.5rem',
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
    padding: '1.5rem 2rem',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btnCancel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
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
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginBottom: '2rem'
  },
  detailSection: {
    padding: '1.5rem',
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
    fontWeight: '500'
  },
  notesSection: {
    padding: '1.5rem',
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
    alignItems: 'center'
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