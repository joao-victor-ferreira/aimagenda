import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Plus,
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
  Filter,
  Users,
  Grid,
  List,
  ChevronDown,
} from 'lucide-react';

export default function AgendaEquipe() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // week, day, month
  const [showNewModal, setShowNewModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMember, setFilterMember] = useState('all');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [newAppointment, setNewAppointment] = useState({
    memberId: '',
    client: '',
    service: '',
    date: '',
    time: '',
    duration: 60,
    notes: '',
  });

  // Membros da equipe (virá da API)
  const teamMembers = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@empresa.com',
      role: 'admin',
      avatar: 'JS',
      color: '#3b82f6',
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@empresa.com',
      role: 'editor',
      avatar: 'MS',
      color: '#8b5cf6',
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro@empresa.com',
      role: 'viewer',
      avatar: 'PC',
      color: '#10b981',
    },
    {
      id: 4,
      name: 'Ana Oliveira',
      email: 'ana@empresa.com',
      role: 'editor',
      avatar: 'AO',
      color: '#f59e0b',
    },
  ];

  // Agendamentos (virá da API)
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      memberId: 1,
      memberName: 'João Silva',
      memberAvatar: 'JS',
      memberColor: '#3b82f6',
      client: {
        name: 'Cliente A',
        email: 'clientea@email.com',
        phone: '+55 11 98765-4321',
      },
      service: 'Consulta',
      date: '2025-11-11',
      time: '09:00',
      duration: 60,
      status: 'confirmed',
      notes: 'Primeira consulta',
      createdBy: 'Manual',
    },
    {
      id: 2,
      memberId: 2,
      memberName: 'Maria Santos',
      memberAvatar: 'MS',
      memberColor: '#8b5cf6',
      client: {
        name: 'Cliente B',
        email: 'clienteb@email.com',
        phone: '+55 11 98765-1234',
      },
      service: 'Reunião',
      date: '2025-11-11',
      time: '10:30',
      duration: 45,
      status: 'confirmed',
      notes: '',
      createdBy: 'IA',
    },
    {
      id: 3,
      memberId: 1,
      memberName: 'João Silva',
      memberAvatar: 'JS',
      memberColor: '#3b82f6',
      client: {
        name: 'Cliente C',
        email: 'clientec@email.com',
        phone: '+55 11 98765-5678',
      },
      service: 'Follow-up',
      date: '2025-11-11',
      time: '14:00',
      duration: 30,
      status: 'pending',
      notes: 'Aguardando confirmação',
      createdBy: 'Manual',
    },
    {
      id: 4,
      memberId: 3,
      memberName: 'Pedro Costa',
      memberAvatar: 'PC',
      memberColor: '#10b981',
      client: {
        name: 'Cliente D',
        email: 'cliented@email.com',
        phone: '+55 11 98765-9999',
      },
      service: 'Avaliação',
      date: '2025-11-12',
      time: '09:00',
      duration: 90,
      status: 'confirmed',
      notes: 'Avaliação completa',
      createdBy: 'IA',
    },
    {
      id: 5,
      memberId: 2,
      memberName: 'Maria Santos',
      memberAvatar: 'MS',
      memberColor: '#8b5cf6',
      client: {
        name: 'Cliente E',
        email: 'clientee@email.com',
        phone: '+55 11 98765-8888',
      },
      service: 'Consulta',
      date: '2025-11-12',
      time: '11:00',
      duration: 60,
      status: 'confirmed',
      notes: '',
      createdBy: 'Manual',
    },
    {
      id: 6,
      memberId: 4,
      memberName: 'Ana Oliveira',
      memberAvatar: 'AO',
      memberColor: '#f59e0b',
      client: {
        name: 'Cliente F',
        email: 'clientef@email.com',
        phone: '+55 11 98765-7777',
      },
      service: 'Reunião',
      date: '2025-11-13',
      time: '15:00',
      duration: 45,
      status: 'pending',
      notes: 'Confirmar horário',
      createdBy: 'IA',
    },
  ]);

  const services = ['Consulta', 'Reunião', 'Avaliação', 'Follow-up', 'Terapia'];

  const getStatusConfig = (status) => {
    const configs = {
      confirmed: {
        label: 'Confirmado',
        color: '#10b981',
        bg: '#d1fae5',
        icon: CheckCircle,
      },
      pending: {
        label: 'Pendente',
        color: '#f59e0b',
        bg: '#fef3c7',
        icon: AlertCircle,
      },
      cancelled: {
        label: 'Cancelado',
        color: '#ef4444',
        bg: '#fee2e2',
        icon: XCircle,
      },
    };
    return configs[status] || configs.pending;
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.memberName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    const matchesMember = filterMember === 'all' || apt.memberId === parseInt(filterMember);
    return matchesSearch && matchesStatus && matchesMember;
  });

  // Função para obter dias da semana
  const getWeekDays = (date) => {
    const week = [];
    const current = new Date(date);
    const day = current.getDay();
    const diff = current.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(current.setDate(diff));

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      week.push(d);
    }
    return week;
  };

  const weekDays = getWeekDays(currentDate);

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const navigateDay = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatDateLong = (date) => {
    return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getAppointmentsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredAppointments.filter(apt => apt.date === dateStr);
  };

  const getAppointmentsForMemberAndDate = (memberId, date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredAppointments.filter(apt => apt.memberId === memberId && apt.date === dateStr);
  };

  const stats = [
    { label: 'Hoje', value: getAppointmentsForDate(new Date()).length, color: '#3b82f6' },
    { label: 'Semana', value: filteredAppointments.length, color: '#8b5cf6' },
    { label: 'Confirmados', value: filteredAppointments.filter(a => a.status === 'confirmed').length, color: '#10b981' },
    { label: 'Pendentes', value: filteredAppointments.filter(a => a.status === 'pending').length, color: '#f59e0b' },
  ];

  const TimelineView = () => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8h às 19h

    return (
      <div style={styles.timelineWrapper}>
        <div style={styles.timelineContainer}>
          <div style={styles.timelineGrid}>
            {/* Header com dias da semana */}
            <div style={styles.timelineHeader}>
              <div style={styles.timeCorner}>Horário</div>
              {weekDays.map((day, idx) => (
                <div
                  key={idx}
                  style={{
                    ...styles.dayHeader,
                    ...(isToday(day) ? styles.todayHeader : {}),
                  }}
                >
                  <div style={styles.dayName}>
                    {day.toLocaleDateString('pt-BR', { weekday: 'short' })}
                  </div>
                  <div style={styles.dayNumber}>{day.getDate()}</div>
                </div>
              ))}
            </div>

            {/* Grid de horários */}
            <div style={styles.timelineBody}>
              {hours.map((hour) => (
                <div key={hour} style={styles.timeRow}>
                  <div style={styles.timeLabel}>{hour}:00</div>
                  {weekDays.map((day, dayIdx) => {
                    const dayAppointments = getAppointmentsForDate(day);
                    const hourAppointments = dayAppointments.filter(apt => {
                      const aptHour = parseInt(apt.time.split(':')[0]);
                      return aptHour === hour;
                    });

                    return (
                      <div key={dayIdx} style={styles.timeSlot}>
                        {hourAppointments.map((apt) => {
                          const statusConfig = getStatusConfig(apt.status);
                          return (
                            <div
                              key={apt.id}
                              style={{
                                ...styles.appointmentBlock,
                                borderLeft: `4px solid ${apt.memberColor}`,
                              }}
                              onClick={() => {
                                setSelectedAppointment(apt);
                                setShowDetailModal(true);
                              }}
                            >
                              <div style={styles.blockTime}>{apt.time}</div>
                              <div style={styles.blockClient}>{apt.client.name}</div>
                              <div style={styles.blockService}>{apt.service}</div>
                              <div style={styles.blockMember}>
                                <div
                                  style={{
                                    ...styles.memberBadge,
                                    background: apt.memberColor,
                                  }}
                                >
                                  {apt.memberAvatar}
                                </div>
                                <span>{apt.memberName.split(' ')[0]}</span>
                              </div>
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
      </div>
    );
  };

  const ListView = () => {
    // Agrupa por membro
    const groupedByMember = teamMembers.map(member => ({
      ...member,
      appointments: filteredAppointments.filter(apt => apt.memberId === member.id),
    }));

    return (
      <div style={styles.listView}>
        {groupedByMember.map((member) => (
          <div key={member.id} style={styles.memberSection}>
            <div style={styles.memberHeader}>
              <div style={styles.memberInfo}>
                <div style={{ ...styles.memberAvatar, background: member.color }}>
                  {member.avatar}
                </div>
                <div>
                  <h3 style={styles.memberHeaderName}>{member.name}</h3>
                  <p style={styles.memberHeaderCount}>
                    {member.appointments.length} {member.appointments.length === 1 ? 'agendamento' : 'agendamentos'}
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.appointmentsList}>
              {member.appointments.length === 0 ? (
                <div style={styles.emptyState}>
                  <Calendar size={32} color="#d1d5db" />
                  <p style={styles.emptyText}>Nenhum agendamento</p>
                </div>
              ) : (
                member.appointments.map((apt) => {
                  const statusConfig = getStatusConfig(apt.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div
                      key={apt.id}
                      style={styles.appointmentCard}
                      onClick={() => {
                        setSelectedAppointment(apt);
                        setShowDetailModal(true);
                      }}
                    >
                      <div style={styles.cardHeader}>
                        <div style={styles.cardDate}>
                          <Calendar size={16} color="#6b7280" />
                          <span>{formatDate(new Date(apt.date))}</span>
                        </div>
                        <div
                          style={{
                            ...styles.statusBadge,
                            background: statusConfig.bg,
                            color: statusConfig.color,
                          }}
                        >
                          <StatusIcon size={14} />
                          {statusConfig.label}
                        </div>
                      </div>

                      <div style={styles.cardBody}>
                        <h4 style={styles.cardClientName}>{apt.client.name}</h4>
                        <div style={styles.cardDetails}>
                          <div style={styles.cardDetail}>
                            <Clock size={14} color="#6b7280" />
                            <span>{apt.time} ({apt.duration} min)</span>
                          </div>
                          <div style={styles.cardDetail}>
                            <MessageSquare size={14} color="#6b7280" />
                            <span>{apt.service}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <style>{mediaQueries}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={{ width: '100%' }}>
          <div style={styles.headerBadge}>
            <Users size={16} />
            <span>Agenda da Equipe</span>
          </div>
          <h1 style={styles.title}>Agenda Compartilhada</h1>
          <p style={styles.subtitle}>Visualize os agendamentos de toda a equipe</p>
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

      {/* Stats */}
      <div style={styles.statsGrid} className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={{ ...styles.statDot, background: stat.color }}></div>
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
              placeholder={isMobile ? 'Buscar...' : 'Buscar por cliente, serviço ou membro...'}
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            style={styles.filterSelect}
            value={filterMember}
            onChange={(e) => setFilterMember(e.target.value)}
          >
            <option value="all">Todos os membros</option>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>

          <select
            style={styles.filterSelect}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos os status</option>
            <option value="confirmed">Confirmados</option>
            <option value="pending">Pendentes</option>
            <option value="cancelled">Cancelados</option>
          </select>
        </div>

        {!isMobile && (
          <div style={styles.viewToggle}>
            <button
              style={{
                ...styles.viewBtn,
                ...(viewMode === 'week' ? styles.viewBtnActive : {}),
              }}
              onClick={() => setViewMode('week')}
            >
              <Grid size={18} />
              Semana
            </button>
            <button
              style={{
                ...styles.viewBtn,
                ...(viewMode === 'list' ? styles.viewBtnActive : {}),
              }}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
              Lista
            </button>
          </div>
        )}
      </div>

      {/* Navegação de data */}
      <div style={styles.dateNav}>
        <button
          style={styles.navBtn}
          onClick={() => viewMode === 'week' ? navigateWeek(-1) : navigateDay(-1)}
        >
          <ChevronLeft size={20} />
        </button>

        <div style={styles.dateDisplay}>
          {viewMode === 'week' ? (
            <>
              <Calendar size={18} />
              <span>
                {formatDate(weekDays[0])} - {formatDate(weekDays[6])}
              </span>
            </>
          ) : (
            <>
              <Calendar size={18} />
              <span>{formatDateLong(currentDate)}</span>
            </>
          )}
        </div>

        <button style={styles.todayBtn} onClick={goToToday}>
          Hoje
        </button>

        <button
          style={styles.navBtn}
          onClick={() => viewMode === 'week' ? navigateWeek(1) : navigateDay(1)}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Visualização */}
      {viewMode === 'week' ? <TimelineView /> : <ListView />}

      {/* Modal de Novo Agendamento */}
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
                    Membro da Equipe *
                  </label>
                  <select
                    style={styles.select}
                    value={newAppointment.memberId}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, memberId: e.target.value })
                    }
                  >
                    <option value="">Selecione...</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <User size={16} />
                    Cliente *
                  </label>
                  <input
                    type="text"
                    style={styles.input}
                    placeholder="Nome do cliente"
                    value={newAppointment.client}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, client: e.target.value })
                    }
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <MessageSquare size={16} />
                    Serviço *
                  </label>
                  <select
                    style={styles.select}
                    value={newAppointment.service}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, service: e.target.value })
                    }
                  >
                    <option value="">Selecione...</option>
                    {services.map((service, idx) => (
                      <option key={idx} value={service}>
                        {service}
                      </option>
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
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, date: e.target.value })
                    }
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
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, time: e.target.value })
                    }
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <Clock size={16} />
                    Duração (min) *
                  </label>
                  <select
                    style={styles.select}
                    value={newAppointment.duration}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, duration: parseInt(e.target.value) })
                    }
                  >
                    <option value="15">15 minutos</option>
                    <option value="30">30 minutos</option>
                    <option value="45">45 minutos</option>
                    <option value="60">1 hora</option>
                    <option value="90">1h 30min</option>
                    <option value="120">2 horas</option>
                  </select>
                </div>

                <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                  <label style={styles.label}>Observações</label>
                  <textarea
                    style={styles.textarea}
                    placeholder="Adicione observações..."
                    value={newAppointment.notes}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, notes: e.target.value })
                    }
                    rows={3}
                  />
                </div>
              </div>

              <div style={styles.aiSuggestion}>
                <Sparkles size={20} color="#8b5cf6" />
                <div style={{ flex: 1 }}>
                  <h4 style={styles.aiSuggestionTitle}>Sugestão da IA</h4>
                  <p style={styles.aiSuggestionText}>
                    Deixe a IA encontrar o melhor horário disponível
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

      {/* Modal de Detalhes */}
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
              {/* Membro responsável */}
              <div style={styles.memberDetailSection}>
                <h3 style={styles.detailSectionTitle}>Membro Responsável</h3>
                <div style={styles.memberDetailCard}>
                  <div
                    style={{
                      ...styles.memberAvatar,
                      background: selectedAppointment.memberColor,
                    }}
                  >
                    {selectedAppointment.memberAvatar}
                  </div>
                  <div>
                    <div style={styles.memberDetailName}>
                      {selectedAppointment.memberName}
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.detailGrid}>
                <div style={styles.detailSection}>
                  <h3 style={styles.detailSectionTitle}>Cliente</h3>
                  <div style={styles.detailList}>
                    <div style={styles.detailItem}>
                      <User size={18} color="#6b7280" />
                      <div>
                        <div style={styles.detailLabel}>Nome</div>
                        <div style={styles.detailValue}>
                          {selectedAppointment.client.name}
                        </div>
                      </div>
                    </div>
                    <div style={styles.detailItem}>
                      <Mail size={18} color="#6b7280" />
                      <div>
                        <div style={styles.detailLabel}>Email</div>
                        <div style={styles.detailValue}>
                          {selectedAppointment.client.email}
                        </div>
                      </div>
                    </div>
                    <div style={styles.detailItem}>
                      <Phone size={18} color="#6b7280" />
                      <div>
                        <div style={styles.detailLabel}>Telefone</div>
                        <div style={styles.detailValue}>
                          {selectedAppointment.client.phone}
                        </div>
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
                        <div style={styles.detailValue}>
                          {selectedAppointment.service}
                        </div>
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
                        <div style={styles.detailValue}>
                          {selectedAppointment.time} ({selectedAppointment.duration} min)
                        </div>
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
                    <div
                      style={{
                        ...styles.statusBadgeLarge,
                        background: statusConfig.bg,
                        color: statusConfig.color,
                      }}
                    >
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
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
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
  }
`;

const styles = {
  container: {
    padding: '1rem',
    background: '#fafafa',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
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
    marginBottom: '0.75rem',
  },
  title: {
    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
    color: '#6b7280',
  },
  headerActions: {
    display: 'flex',
    gap: '0.5rem',
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
    whiteSpace: 'nowrap',
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
    transition: 'all 0.2s',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: 'white',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  },
  statDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  statLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
    margin: '0 0 0.25rem 0',
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    background: 'white',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  toolbarLeft: {
    display: 'flex',
    gap: '0.75rem',
    flex: 1,
    flexWrap: 'wrap',
  },
  searchContainer: {
    position: 'relative',
    flex: '1 1 200px',
    minWidth: '200px',
  },
  searchIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 3rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box',
  },
  filterSelect: {
    padding: '0.75rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    outline: 'none',
    cursor: 'pointer',
    background: 'white',
    minWidth: '150px',
  },
  viewToggle: {
    display: 'flex',
    gap: '0.5rem',
    background: '#f3f4f6',
    padding: '0.25rem',
    borderRadius: '8px',
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
    transition: 'all 0.2s',
  },
  viewBtnActive: {
    background: 'white',
    color: '#3b82f6',
    fontWeight: '600',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  dateNav: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
    background: 'white',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    flexWrap: 'wrap',
  },
  navBtn: {
    padding: '0.5rem',
    background: 'transparent',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  dateDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  todayBtn: {
    padding: '0.5rem 1rem',
    background: 'linear-gradient(135deg, #eff6ff, #f3e8ff)',
    color: '#3b82f6',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  timelineWrapper: {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    padding: '1rem',
  },
  timelineContainer: {
    overflowX: 'auto',
    overflowY: 'auto',
    maxHeight: '70vh',
    width: '100%',
  },
  timelineGrid: {
    minWidth: 'max-content',
    width: '100%',
  },
  timelineHeader: {
    display: 'grid',
    gridTemplateColumns: '80px repeat(7, minmax(120px, 1fr))',
    borderBottom: '2px solid #e5e7eb',
    position: 'sticky',
    top: 0,
    background: 'white',
    zIndex: 10,
  },
  timeCorner: {
    padding: '0.75rem',
    fontSize: '0.7rem',
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    borderRight: '1px solid #e5e7eb',
    background: '#fafafa',
  },
  dayHeader: {
    padding: '0.75rem',
    textAlign: 'center',
    borderRight: '1px solid #e5e7eb',
    minWidth: '120px',
  },
  todayHeader: {
    background: 'linear-gradient(135deg, #eff6ff, #f3e8ff)',
  },
  dayName: {
    fontSize: '0.7rem',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: '0.25rem',
  },
  dayNumber: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1f2937',
  },
  timelineBody: {
    display: 'flex',
    flexDirection: 'column',
  },
  timeRow: {
    display: 'grid',
    gridTemplateColumns: '80px repeat(7, minmax(120px, 1fr))',
    borderBottom: '1px solid #f3f4f6',
    minHeight: '80px',
  },
  timeLabel: {
    padding: '0.75rem 0.5rem',
    fontSize: '0.7rem',
    color: '#6b7280',
    borderRight: '1px solid #e5e7eb',
    fontWeight: '500',
    background: '#fafafa',
    display: 'flex',
    alignItems: 'flex-start',
  },
  timeSlot: {
    padding: '0.5rem',
    borderRight: '1px solid #f3f4f6',
    position: 'relative',
    minHeight: '80px',
    minWidth: '120px',
  },
  appointmentBlock: {
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '0.7rem',
  },
  blockTime: {
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.25rem',
    fontSize: '0.7rem',
  },
  blockClient: {
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.25rem',
    fontSize: '0.7rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  blockService: {
    color: '#6b7280',
    marginBottom: '0.5rem',
    fontSize: '0.65rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  blockMember: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.65rem',
    color: '#6b7280',
  },
  memberBadge: {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '0.55rem',
    fontWeight: '600',
  },
  listView: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  memberSection: {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
  },
  memberHeader: {
    padding: '1.5rem',
    background: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
  },
  memberInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  memberAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: '1.125rem',
    flexShrink: 0,
  },
  memberHeaderName: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 0.25rem 0',
  },
  memberHeaderCount: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0,
  },
  appointmentsList: {
    padding: '1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem',
  },
  appointmentCard: {
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  cardDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.375rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  cardClientName: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 0.5rem 0',
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  cardDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  emptyState: {
    padding: '2rem',
    textAlign: 'center',
    gridColumn: '1 / -1',
  },
  emptyText: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginTop: '0.5rem',
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
    padding: '1rem',
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
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  modalHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  modalTitle: {
    fontSize: 'clamp(1.125rem, 4vw, 1.5rem)',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
  },
  btnClose: {
    width: '32px',
    height: '32px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: '#6b7280',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    flexShrink: 0,
  },
  modalBody: {
    padding: '1.5rem',
    overflowY: 'auto',
    flex: 1,
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
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
    boxSizing: 'border-box',
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
    boxSizing: 'border-box',
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
    boxSizing: 'border-box',
  },
  aiSuggestion: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.25rem',
    background: 'linear-gradient(135deg, #f3e8ff, #eff6ff)',
    borderRadius: '12px',
    border: '1px solid #e9d5ff',
    flexWrap: 'wrap',
  },
  aiSuggestionTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 0.25rem 0',
  },
  aiSuggestionText: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0,
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
    whiteSpace: 'nowrap',
  },
  modalFooter: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap',
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
    transition: 'all 0.2s',
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
    transition: 'all 0.2s',
  },
  memberDetailSection: {
    marginBottom: '1.5rem',
    padding: '1.25rem',
    background: '#f9fafb',
    borderRadius: '12px',
  },
  memberDetailCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  memberDetailName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  detailSection: {
    padding: '1.25rem',
    background: '#f9fafb',
    borderRadius: '12px',
  },
  detailSectionTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  detailList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  detailItem: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginBottom: '0.25rem',
  },
  detailValue: {
    fontSize: '0.875rem',
    color: '#1f2937',
    fontWeight: '500',
    wordBreak: 'break-word',
  },
  notesSection: {
    padding: '1.25rem',
    background: '#fef3c7',
    borderRadius: '12px',
    marginBottom: '1.5rem',
  },
  notesTitle: {
    fontSize: '0.875rem',
    fontWeight: '700',
    color: '#92400e',
    marginBottom: '0.5rem',
  },
  notesText: {
    fontSize: '0.875rem',
    color: '#78350f',
    margin: 0,
    lineHeight: '1.6',
  },
  statusSection: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  statusBadgeLarge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '700',
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
    fontWeight: '600',
  },
};