import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Filter,
  Search,
  MapPin,
  Phone,
  Mail,
  X,
  Edit,
  Trash2,
  Check,
  User,
  FileText,
  MoreVertical
} from 'lucide-react';

export default function Agenda() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('week'); // 'day', 'week', 'month'
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [hoveredAppointment, setHoveredAppointment] = useState(null);

  const appointments = [
    {
      id: 1,
      title: 'Consulta - João Silva',
      client: 'João Silva',
      phone: '(11) 99999-8888',
      email: 'joao@email.com',
      time: '09:00',
      duration: 60,
      type: 'Consulta',
      status: 'confirmed',
      color: '#3b82f6',
      notes: 'Cliente preferencial. Lembrar de confirmar via WhatsApp.'
    },
    {
      id: 2,
      title: 'Reunião - Maria Santos',
      client: 'Maria Santos',
      phone: '(11) 98888-7777',
      email: 'maria@email.com',
      time: '10:30',
      duration: 90,
      type: 'Reunião',
      status: 'confirmed',
      color: '#10b981',
      notes: 'Discussão sobre novo projeto.'
    },
    {
      id: 3,
      title: 'Avaliação - Pedro Costa',
      client: 'Pedro Costa',
      phone: '(11) 97777-6666',
      email: 'pedro@email.com',
      time: '14:00',
      duration: 45,
      type: 'Avaliação',
      status: 'pending',
      color: '#f59e0b',
      notes: 'Primeira avaliação.'
    },
    {
      id: 4,
      title: 'Follow-up - Ana Oliveira',
      client: 'Ana Oliveira',
      phone: '(11) 96666-5555',
      email: 'ana@email.com',
      time: '16:00',
      duration: 30,
      type: 'Follow-up',
      status: 'confirmed',
      color: '#8b5cf6',
      notes: 'Retorno pós-consulta.'
    }
  ];

  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8h às 20h
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      background: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      overflow: 'hidden'
    },
    sidebar: {
      width: '320px',
      background: 'white',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column'
    },
    sidebarHeader: {
      padding: '1.5rem',
      borderBottom: '1px solid #e5e7eb'
    },
    miniCalendar: {
      background: 'white',
      borderRadius: '0.75rem',
      padding: '1rem'
    },
    miniCalendarHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    },
    monthYear: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#1f2937'
    },
    navButton: {
      padding: '0.25rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#6b7280',
      borderRadius: '0.375rem',
      transition: 'all 0.2s'
    },
    miniCalendarGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '0.25rem',
      textAlign: 'center'
    },
    miniDayHeader: {
      fontSize: '0.75rem',
      fontWeight: '600',
      color: '#6b7280',
      padding: '0.5rem 0'
    },
    miniDay: {
      padding: '0.5rem',
      fontSize: '0.875rem',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
      color: '#4b5563'
    },
    miniDayToday: {
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      color: 'white',
      fontWeight: '600'
    },
    miniDayHover: {
      background: '#f3f4f6'
    },
    appointmentsList: {
      flex: 1,
      overflowY: 'auto',
      padding: '1rem'
    },
    sectionTitle: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#6b7280',
      marginBottom: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    appointmentCard: {
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '0.75rem',
      padding: '1rem',
      marginBottom: '0.75rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
      borderLeft: '4px solid'
    },
    appointmentCardHover: {
      transform: 'translateX(5px)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    appointmentTime: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    appointmentClient: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '0.25rem'
    },
    appointmentType: {
      display: 'inline-block',
      fontSize: '0.75rem',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.375rem',
      fontWeight: '500'
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    },
    header: {
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '1.5rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem'
    },
    dateNavigation: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    todayButton: {
      padding: '0.5rem 1rem',
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      color: '#1f2937'
    },
    currentDate: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937'
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    viewSelector: {
      display: 'flex',
      background: '#f3f4f6',
      borderRadius: '0.5rem',
      padding: '0.25rem'
    },
    viewButton: {
      padding: '0.5rem 1rem',
      background: 'transparent',
      border: 'none',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      color: '#6b7280'
    },
    viewButtonActive: {
      background: 'white',
      color: '#2563eb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    },
    actionButton: {
      padding: '0.5rem 1rem',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      background: 'white',
      color: '#1f2937',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    addButton: {
      padding: '0.5rem 1.5rem',
      background: 'linear-gradient(90deg, #2563eb, #9333ea)',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    addButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)'
    },
    calendarContent: {
      flex: 1,
      overflow: 'auto',
      background: '#ffffff'
    },
    timelineGrid: {
      display: 'grid',
      gridTemplateColumns: '60px 1fr',
      minHeight: '100%'
    },
    timeColumn: {
      borderRight: '1px solid #e5e7eb',
      background: '#fafafa'
    },
    timeSlot: {
      height: '80px',
      borderBottom: '1px solid #e5e7eb',
      padding: '0.5rem',
      fontSize: '0.75rem',
      color: '#6b7280',
      textAlign: 'right'
    },
    eventsColumn: {
      position: 'relative'
    },
    hourRow: {
      height: '80px',
      borderBottom: '1px solid #e5e7eb',
      position: 'relative'
    },
    eventBlock: {
      position: 'absolute',
      left: '0.5rem',
      right: '0.5rem',
      borderRadius: '0.5rem',
      padding: '0.5rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
      overflow: 'hidden',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    },
    eventBlockHover: {
      transform: 'scale(1.02)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
      zIndex: 10
    },
    eventTitle: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: 'white',
      marginBottom: '0.25rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    eventTime: {
      fontSize: '0.75rem',
      color: 'rgba(255, 255, 255, 0.9)'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem'
    },
    modalContent: {
      background: 'white',
      borderRadius: '1rem',
      width: '100%',
      maxWidth: '500px',
      maxHeight: '90vh',
      overflow: 'auto',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    modalHeader: {
      padding: '1.5rem',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    modalTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#1f2937'
    },
    closeButton: {
      padding: '0.5rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#6b7280',
      borderRadius: '0.375rem',
      transition: 'all 0.2s'
    },
    modalBody: {
      padding: '1.5rem'
    },
    infoRow: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      marginBottom: '1.25rem'
    },
    infoIcon: {
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    infoContent: {
      flex: 1
    },
    infoLabel: {
      fontSize: '0.75rem',
      fontWeight: '600',
      color: '#6b7280',
      marginBottom: '0.25rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    infoValue: {
      fontSize: '0.95rem',
      color: '#1f2937',
      fontWeight: '500'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '0.375rem 0.75rem',
      borderRadius: '0.5rem',
      fontSize: '0.75rem',
      fontWeight: '600'
    },
    statusConfirmed: {
      background: '#d1fae5',
      color: '#10b981'
    },
    statusPending: {
      background: '#fef3c7',
      color: '#f59e0b'
    },
    notesBox: {
      background: '#f9fafb',
      borderRadius: '0.5rem',
      padding: '1rem',
      marginTop: '1rem'
    },
    notesTitle: {
      fontSize: '0.75rem',
      fontWeight: '600',
      color: '#6b7280',
      marginBottom: '0.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    notesText: {
      fontSize: '0.875rem',
      color: '#4b5563',
      lineHeight: '1.5'
    },
    modalFooter: {
      padding: '1rem 1.5rem',
      borderTop: '1px solid #e5e7eb',
      display: 'flex',
      gap: '0.75rem',
      justifyContent: 'flex-end'
    },
    modalButton: {
      padding: '0.625rem 1.25rem',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      border: 'none'
    },
    buttonEdit: {
      background: '#eff6ff',
      color: '#2563eb'
    },
    buttonDelete: {
      background: '#fee2e2',
      color: '#dc2626'
    }
  };

  const [addButtonHover, setAddButtonHover] = useState(false);

  const getAppointmentPosition = (time, duration) => {
    const [hour, minute] = time.split(':').map(Number);
    const startMinutes = (hour - 8) * 60 + minute;
    const top = (startMinutes / 60) * 80;
    const height = (duration / 60) * 80;
    return { top: `${top}px`, height: `${height}px` };
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          {/* Mini Calendar */}
          <div style={styles.miniCalendar}>
            <div style={styles.miniCalendarHeader}>
              <button style={styles.navButton}>
                <ChevronLeft style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
              <span style={styles.monthYear}>Outubro 2025</span>
              <button style={styles.navButton}>
                <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>
            <div style={styles.miniCalendarGrid}>
              {weekDays.map((day) => (
                <div key={day} style={styles.miniDayHeader}>{day}</div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 2;
                const isToday = day === 26;
                return (
                  <div
                    key={i}
                    style={{
                      ...styles.miniDay,
                      ...(isToday ? styles.miniDayToday : {}),
                      ...(hoveredDay === i && !isToday ? styles.miniDayHover : {})
                    }}
                    onMouseEnter={() => setHoveredDay(i)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    {day > 0 && day <= 31 ? day : ''}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div style={styles.appointmentsList}>
          <div style={styles.sectionTitle}>Hoje - 4 agendamentos</div>
          {appointments.map((apt) => (
            <div
              key={apt.id}
              style={{
                ...styles.appointmentCard,
                borderLeftColor: apt.color,
                ...(hoveredAppointment === apt.id ? styles.appointmentCardHover : {})
              }}
              onClick={() => handleAppointmentClick(apt)}
              onMouseEnter={() => setHoveredAppointment(apt.id)}
              onMouseLeave={() => setHoveredAppointment(null)}
            >
              <div style={styles.appointmentTime}>
                <Clock style={{ width: '0.875rem', height: '0.875rem', display: 'inline', marginRight: '0.25rem' }} />
                {apt.time} - {apt.duration}min
              </div>
              <div style={styles.appointmentClient}>{apt.client}</div>
              <span style={{
                ...styles.appointmentType,
                background: `${apt.color}20`,
                color: apt.color
              }}>
                {apt.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.dateNavigation}>
              <button style={styles.todayButton}>Hoje</button>
              <button style={styles.navButton}>
                <ChevronLeft style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
              <button style={styles.navButton}>
                <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>
            <h2 style={styles.currentDate}>26 de Outubro, 2025</h2>
          </div>

          <div style={styles.headerRight}>
            <div style={styles.viewSelector}>
              <button style={{
                ...styles.viewButton,
                ...(view === 'day' ? styles.viewButtonActive : {})
              }} onClick={() => setView('day')}>
                Dia
              </button>
              <button style={{
                ...styles.viewButton,
                ...(view === 'week' ? styles.viewButtonActive : {})
              }} onClick={() => setView('week')}>
                Semana
              </button>
              <button style={{
                ...styles.viewButton,
                ...(view === 'month' ? styles.viewButtonActive : {})
              }} onClick={() => setView('month')}>
                Mês
              </button>
            </div>

            <button style={styles.actionButton}>
              <Filter style={{ width: '1rem', height: '1rem' }} />
              Filtrar
            </button>

            <button
              onMouseEnter={() => setAddButtonHover(true)}
              onMouseLeave={() => setAddButtonHover(false)}
              style={{
                ...styles.addButton,
                ...(addButtonHover ? styles.addButtonHover : {})
              }}
            >
              <Plus style={{ width: '1rem', height: '1rem' }} />
              Novo Agendamento
            </button>
          </div>
        </div>

        {/* Calendar Timeline */}
        <div style={styles.calendarContent}>
          <div style={styles.timelineGrid}>
            {/* Time Column */}
            <div style={styles.timeColumn}>
              {hours.map((hour) => (
                <div key={hour} style={styles.timeSlot}>
                  {hour}:00
                </div>
              ))}
            </div>

            {/* Events Column */}
            <div style={styles.eventsColumn}>
              {hours.map((hour) => (
                <div key={hour} style={styles.hourRow}></div>
              ))}
              
              {/* Event Blocks */}
              {appointments.map((apt) => {
                const position = getAppointmentPosition(apt.time, apt.duration);
                return (
                  <div
                    key={apt.id}
                    style={{
                      ...styles.eventBlock,
                      ...position,
                      background: apt.color,
                      ...(hoveredAppointment === apt.id ? styles.eventBlockHover : {})
                    }}
                    onClick={() => handleAppointmentClick(apt)}
                    onMouseEnter={() => setHoveredAppointment(apt.id)}
                    onMouseLeave={() => setHoveredAppointment(null)}
                  >
                    <div style={styles.eventTitle}>{apt.title}</div>
                    <div style={styles.eventTime}>
                      {apt.time} - {apt.duration} min
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {showModal && selectedAppointment && (
        <div style={styles.modal} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Detalhes do Agendamento</h3>
              <button style={styles.closeButton} onClick={() => setShowModal(false)}>
                <X style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>

            <div style={styles.modalBody}>
              {/* Cliente */}
              <div style={styles.infoRow}>
                <div style={{
                  ...styles.infoIcon,
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                }}>
                  <User style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                </div>
                <div style={styles.infoContent}>
                  <div style={styles.infoLabel}>Cliente</div>
                  <div style={styles.infoValue}>{selectedAppointment.client}</div>
                </div>
              </div>

              {/* Horário */}
              <div style={styles.infoRow}>
                <div style={{
                  ...styles.infoIcon,
                  background: 'linear-gradient(135deg, #10b981, #059669)'
                }}>
                  <Clock style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                </div>
                <div style={styles.infoContent}>
                  <div style={styles.infoLabel}>Horário</div>
                  <div style={styles.infoValue}>{selectedAppointment.time} - {selectedAppointment.duration} minutos</div>
                </div>
              </div>

              {/* Telefone */}
              <div style={styles.infoRow}>
                <div style={{
                  ...styles.infoIcon,
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)'
                }}>
                  <Phone style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                </div>
                <div style={styles.infoContent}>
                  <div style={styles.infoLabel}>Telefone</div>
                  <div style={styles.infoValue}>{selectedAppointment.phone}</div>
                </div>
              </div>

              {/* Email */}
              <div style={styles.infoRow}>
                <div style={{
                  ...styles.infoIcon,
                  background: 'linear-gradient(135deg, #ec4899, #f43f5e)'
                }}>
                  <Mail style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                </div>
                <div style={styles.infoContent}>
                  <div style={styles.infoLabel}>Email</div>
                  <div style={styles.infoValue}>{selectedAppointment.email}</div>
                </div>
              </div>

              {/* Status */}
              <div style={styles.infoRow}>
                <div style={{
                  ...styles.infoIcon,
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                }}>
                  <Check style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                </div>
                <div style={styles.infoContent}>
                  <div style={styles.infoLabel}>Status</div>
                  <span style={{
                    ...styles.statusBadge,
                    ...(selectedAppointment.status === 'confirmed' ? styles.statusConfirmed : styles.statusPending)
                  }}>
                    {selectedAppointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                  </span>
                </div>
              </div>

              {/* Notas */}
              {selectedAppointment.notes && (
                <div style={styles.notesBox}>
                  <div style={styles.notesTitle}>
                    <FileText style={{ width: '0.875rem', height: '0.875rem', display: 'inline', marginRight: '0.25rem' }} />
                    Observações
                  </div>
                  <div style={styles.notesText}>{selectedAppointment.notes}</div>
                </div>
              )}
            </div>

            <div style={styles.modalFooter}>
              <button style={{ ...styles.modalButton, ...styles.buttonEdit }}>
                <Edit style={{ width: '1rem', height: '1rem' }} />
                Editar
              </button>
              <button style={{ ...styles.modalButton, ...styles.buttonDelete }}>
                <Trash2 style={{ width: '1rem', height: '1rem' }} />
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}