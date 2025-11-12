import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Search,
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
  Sparkles,
} from 'lucide-react';

export default function Cliente() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);

  const getToken = () => localStorage.getItem('token');
  const API_URL = 'http://localhost:5000/api/clientes';

  const [newClient, setNewClient] = useState({
    nome: '',
    telefone: '',
    email: '',
    observacoes: '',
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 🔹 Carregar clientes
  const carregarClientes = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error('Erro ao buscar clientes');
      const data = await res.json();

      // Mapear dados do backend para o formato do frontend
      setClients(
        data.map((c) => ({
          id: c._id,
          _id: c._id,
          name: c.nome || 'Sem nome',
          nome: c.nome || 'Sem nome',
          phone: c.telefone || '—',
          telefone: c.telefone || '—',
          email: c.email || '—',
          tags: c.tags || [],
          status: c.status || 'new',
          lastInteraction:
            c.ultimaInteracao || c.createdAt || new Date().toISOString(),
          totalAppointments: c.totalAgendamentos || 0,
          satisfactionRate: c.taxaSatisfacao || 5,
          totalValue: c.valorTotal || 0,
          history: (c.historico || []).map((h) => ({
            id: h._id || Math.random().toString(36),
            date: new Date(h.data || h.createdAt).toLocaleDateString('pt-BR'),
            content: h.descricao || h.content || 'Sem descrição',
            response: h.resposta || h.response || '',
          })),
          notes: c.observacoes || '',
        })),
      );
    } catch (err) {
      console.error('❌ Erro ao carregar clientes:', err);
      alert('Erro ao carregar clientes: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  // 🔹 Criar cliente
  const criarCliente = async () => {
    if (!newClient.nome || !newClient.telefone) {
      alert('Nome e telefone são obrigatórios!');
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(newClient),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.mensagem || 'Erro ao criar cliente');
      }

      const novo = await res.json();

      // Mapear novo cliente para o formato do frontend
      const clienteMapeado = {
        id: novo._id,
        _id: novo._id,
        name: novo.nome,
        nome: novo.nome,
        phone: novo.telefone,
        telefone: novo.telefone,
        email: novo.email || '—',
        tags: novo.tags || [],
        status: novo.status || 'new',
        lastInteraction: novo.ultimaInteracao || novo.createdAt,
        totalAppointments: 0,
        satisfactionRate: 5,
        totalValue: 0,
        history: [],
        notes: novo.observacoes || '',
      };

      setClients([clienteMapeado, ...clients]);
      setShowAddModal(false);
      setNewClient({ nome: '', telefone: '', email: '', observacoes: '' });
      alert('Cliente adicionado com sucesso!');
    } catch (err) {
      console.error('Erro ao adicionar cliente:', err);
      alert('Erro ao adicionar cliente: ' + err.message);
    }
  };

  // 🔹 Deletar cliente
  const deletarCliente = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este cliente?')) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.mensagem || 'Erro ao excluir cliente');
      }

      setClients(clients.filter((c) => c._id !== id && c.id !== id));
      alert('Cliente excluído com sucesso!');
    } catch (err) {
      console.error('Erro ao excluir cliente:', err);
      alert('Erro ao excluir cliente: ' + err.message);
    }
  };

  const tagConfig = {
    Novo: { color: '#3b82f6', bg: '#eff6ff' },
    Recorrente: { color: '#10b981', bg: '#d1fae5' },
    VIP: { color: '#8b5cf6', bg: '#f3e8ff' },
    Inativo: { color: '#6b7280', bg: '#f3f4f6' },
  };

  const getStatusConfig = (status) => {
    const configs = {
      active: { label: 'Ativo', color: '#10b981', bg: '#d1fae5' },
      inactive: { label: 'Inativo', color: '#6b7280', bg: '#f3f4f6' },
      new: { label: 'Novo', color: '#3b82f6', bg: '#eff6ff' },
    };
    return configs[status] || configs.new;
  };

  const stats = [
    { label: 'Total', value: clients.length, icon: Users, color: '#3b82f6' },
    {
      label: 'Ativos',
      value: clients.filter((c) => c.status === 'active').length,
      icon: CheckCircle,
      color: '#10b981',
    },
    {
      label: 'Novos',
      value: clients.filter((c) => (c.tags || []).includes('Novo')).length,
      icon: TrendingUp,
      color: '#f59e0b',
    },
    { label: 'Retenção', value: '94%', icon: Star, color: '#8b5cf6' },
  ];

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone?.includes(searchTerm) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag =
      filterTag === 'all' || (client.tags || []).includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const handleAddClient = () => criarCliente();
  const handleDeleteClient = (id) => deletarCliente(id);

  const ClientCard = ({ client }) => {
    const statusConfig = getStatusConfig(client.status);
    return (
      <div style={styles.clientCard}>
        <div style={styles.cardHeader}>
          <div style={styles.clientCell}>
            <div style={styles.clientAvatar}>
              {client.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <div style={styles.clientName}>{client.name}</div>
              <div style={styles.clientId}>
                ID: #{client.id.substring(0, 8)}
              </div>
            </div>
          </div>
          <div
            style={{
              ...styles.statusBadge,
              background: statusConfig.bg,
              color: statusConfig.color,
            }}
          >
            {statusConfig.label}
          </div>
        </div>

        <div style={styles.cardBody}>
          <div style={styles.cardInfoRow}>
            <Phone size={14} color="#6b7280" />
            <span style={styles.cardInfoText}>{client.phone}</span>
          </div>
          <div style={styles.cardInfoRow}>
            <Mail size={14} color="#6b7280" />
            <span style={styles.cardInfoText}>{client.email}</span>
          </div>
          <div style={styles.cardInfoRow}>
            <Clock size={14} color="#6b7280" />
            <span style={styles.cardInfoText}>
              {new Date(client.lastInteraction).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>

        <div style={styles.cardTags}>
          {client.tags.map((tag, idx) => (
            <span
              key={idx}
              style={{
                ...styles.tagBadge,
                background: tagConfig[tag]?.bg,
                color: tagConfig[tag]?.color,
              }}
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>

        <div style={styles.cardStats}>
          <div style={styles.cardStatItem}>
            <Calendar size={16} color="#6b7280" />
            <span>{client.totalAppointments} agendamentos</span>
          </div>
          <div style={styles.cardStatItem}>
            <Star size={16} color="#f59e0b" fill="#f59e0b" />
            <span>{client.satisfactionRate}/5</span>
          </div>
        </div>

        <div style={styles.cardActions}>
          <button
            style={styles.cardActionBtn}
            onClick={() => {
              setSelectedClient(client);
              setShowHistoryModal(true);
            }}
          >
            <Eye size={16} />
            Ver Histórico
          </button>
          <button
            style={styles.cardActionBtn}
            onClick={() => handleDeleteClient(client.id)}
          >
            <Trash2 size={16} color="#ef4444" />
            Excluir
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ width: '100%' }}>
          <div style={styles.headerBadge}>
            <Users size={16} />
            <span>Clientes</span>
          </div>
          <h1 style={styles.title}>Gerenciar Clientes</h1>
          <p style={styles.subtitle}>Organize e acompanhe seu relacionamento</p>
        </div>
        <div style={styles.headerActions}>
          {!isMobile && (
            <>
              <button style={styles.btnSecondary}>
                <Download size={18} />
                Exportar
              </button>
            </>
          )}
          <button
            style={styles.btnPrimary}
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={18} />
            {!isMobile && 'Adicionar'}
          </button>
        </div>
      </div>

      <div style={styles.statsGrid}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} style={styles.statCard}>
              <div
                style={{
                  ...styles.statIcon,
                  background: `${stat.color}15`,
                  color: stat.color,
                }}
              >
                <Icon size={20} />
              </div>
              <div>
                <p style={styles.statLabel}>{stat.label}</p>
                <p style={styles.statValue}>{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={styles.toolbar}>
        <div style={styles.searchContainer}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder={
              isMobile ? 'Buscar...' : 'Buscar por nome, telefone ou email...'
            }
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={styles.filters}>
          <button
            style={{
              ...styles.filterBtn,
              ...(filterTag === 'all' ? styles.filterBtnActive : {}),
            }}
            onClick={() => setFilterTag('all')}
          >
            Todos
          </button>
          {Object.keys(tagConfig).map((tag) => (
            <button
              key={tag}
              style={{
                ...styles.filterBtn,
                ...(filterTag === tag ? styles.filterBtnActive : {}),
              }}
              onClick={() => setFilterTag(tag)}
            >
              <Tag size={14} />
              {tag}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={styles.emptyState}>
          <Activity size={48} color="#3b82f6" />
          <h3 style={styles.emptyTitle}>Carregando clientes...</h3>
        </div>
      ) : isMobile ? (
        <div style={styles.cardsGrid}>
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      ) : (
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
                          {client.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <div style={styles.clientName}>{client.name}</div>
                          <div style={styles.clientId}>
                            ID: #{client.id.substring(0, 8)}
                          </div>
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
                        {new Date(client.lastInteraction).toLocaleDateString(
                          'pt-BR',
                        )}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div
                        style={{
                          ...styles.statusBadge,
                          background: statusConfig.bg,
                          color: statusConfig.color,
                        }}
                      >
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
                              background: tagConfig[tag]?.bg,
                              color: tagConfig[tag]?.color,
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
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          style={styles.actionBtn}
                          onClick={() => handleDeleteClient(client.id)}
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
        </div>
      )}

      {filteredClients.length === 0 && !loading && (
        <div style={styles.emptyState}>
          <Users size={48} color="#d1d5db" />
          <h3 style={styles.emptyTitle}>Nenhum cliente encontrado</h3>
          <p style={styles.emptyText}>
            Tente ajustar os filtros ou adicionar um novo cliente
          </p>
        </div>
      )}

      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitleContainer}>
                <Plus size={24} color="#3b82f6" />
                <h2 style={styles.modalTitle}>Adicionar Cliente</h2>
              </div>
              <button
                style={styles.btnClose}
                onClick={() => setShowAddModal(false)}
              >
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
                    value={newClient.nome}
                    onChange={(e) =>
                      setNewClient({ ...newClient, nome: e.target.value })
                    }
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
                    value={newClient.telefone}
                    onChange={(e) =>
                      setNewClient({ ...newClient, telefone: e.target.value })
                    }
                  />
                </div>
                <div
                  style={{
                    ...styles.formGroup,
                    gridColumn: isMobile ? '1' : '1 / -1',
                  }}
                >
                  <label style={styles.label}>
                    <Mail size={16} />
                    Email
                  </label>
                  <input
                    type="email"
                    style={styles.input}
                    placeholder="email@exemplo.com"
                    value={newClient.email}
                    onChange={(e) =>
                      setNewClient({ ...newClient, email: e.target.value })
                    }
                  />
                </div>
                <div
                  style={{
                    ...styles.formGroup,
                    gridColumn: isMobile ? '1' : '1 / -1',
                  }}
                >
                  <label style={styles.label}>
                    <FileText size={16} />
                    Observações
                  </label>
                  <textarea
                    style={styles.textarea}
                    placeholder="Adicione notas sobre o cliente..."
                    rows={3}
                    value={newClient.observacoes}
                    onChange={(e) =>
                      setNewClient({
                        ...newClient,
                        observacoes: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div style={styles.aiSuggestion}>
                <Sparkles size={20} color="#8b5cf6" />
                <div style={{ flex: 1 }}>
                  <h4 style={styles.aiSuggestionTitle}>Tags Automáticas</h4>
                  <p style={styles.aiSuggestionText}>
                    A IA irá analisar o perfil e sugerir tags automaticamente
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button
                style={styles.btnCancel}
                onClick={() => setShowAddModal(false)}
              >
                Cancelar
              </button>
              <button style={styles.btnSave} onClick={handleAddClient}>
                <Save size={18} />
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {showHistoryModal && selectedClient && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowHistoryModal(false)}
        >
          <div
            style={{ ...styles.modal, maxWidth: isMobile ? '95%' : '900px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <div style={styles.modalTitleContainer}>
                <Activity size={24} color="#3b82f6" />
                <h2 style={styles.modalTitle}>Histórico</h2>
              </div>
              <button
                style={styles.btnClose}
                onClick={() => setShowHistoryModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.clientSummary}>
                <div style={styles.summaryLeft}>
                  <div style={styles.clientAvatarLarge}>
                    {selectedClient.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h3 style={styles.clientNameLarge}>
                      {selectedClient.name}
                    </h3>
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
                      <div style={styles.summaryStatValue}>
                        {selectedClient.totalAppointments}
                      </div>
                      <div style={styles.summaryStatLabel}>Agendamentos</div>
                    </div>
                  </div>
                  <div style={styles.summaryStatItem}>
                    <TrendingUp size={20} color="#10b981" />
                    <div>
                      <div style={styles.summaryStatValue}>
                        R$ {selectedClient.totalValue.toLocaleString()}
                      </div>
                      <div style={styles.summaryStatLabel}>Valor Total</div>
                    </div>
                  </div>
                  <div style={styles.summaryStatItem}>
                    <Star size={20} color="#f59e0b" />
                    <div>
                      <div style={styles.summaryStatValue}>
                        {selectedClient.satisfactionRate}/5
                      </div>
                      <div style={styles.summaryStatLabel}>Satisfação</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.timelineSection}>
                <h4 style={styles.timelineTitle}>
                  <Activity size={18} />
                  Linha do Tempo
                </h4>
                {selectedClient.history.length > 0 ? (
                  <div style={styles.timeline}>
                    {selectedClient.history.map((item) => (
                      <div key={item.id} style={styles.timelineItem}>
                        <div
                          style={{
                            ...styles.timelineIcon,
                            background: '#f3e8ff',
                          }}
                        >
                          <MessageSquare size={16} color="#8b5cf6" />
                        </div>
                        <div style={styles.timelineContent}>
                          <div style={styles.timelineDate}>{item.date}</div>
                          <div style={styles.timelineText}>{item.content}</div>
                          {item.response && (
                            <div style={styles.timelineResponse}>
                              {item.response}
                            </div>
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
                Mensagem
              </button>
              <button style={styles.btnSecondary}>
                <Calendar size={18} />
                Agendamento
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
    padding: '1rem',
    background: '#fafafa',
    minHeight: '100vh',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
    flexWrap: 'wrap',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
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
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem',
    background: 'white',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  },
  searchContainer: {
    position: 'relative',
    width: '100%',
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
  filters: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    overflowX: 'auto',
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
    whiteSpace: 'nowrap',
  },
  filterBtnActive: {
    background: 'linear-gradient(135deg, #eff6ff, #f3e8ff)',
    color: '#3b82f6',
    borderColor: '#3b82f6',
    fontWeight: '600',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem',
  },
  clientCard: {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    transition: 'all 0.2s',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderBottom: '1px solid #f3f4f6',
  },
  cardBody: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  cardInfoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  cardInfoText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  cardTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    padding: '0 1rem 1rem',
  },
  cardStats: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    background: '#f9fafb',
    borderTop: '1px solid #f3f4f6',
  },
  cardStatItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#374151',
  },
  cardActions: {
    display: 'flex',
    gap: '0.5rem',
    padding: '1rem',
    borderTop: '1px solid #f3f4f6',
  },
  cardActionBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  tableContainer: {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '1000px',
  },
  tableHeader: {
    background: '#fafafa',
    borderBottom: '1px solid #e5e7eb',
  },
  th: {
    padding: '1rem',
    textAlign: 'left',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tableRow: {
    borderBottom: '1px solid #f3f4f6',
    transition: 'background 0.2s',
  },
  td: {
    padding: '1rem',
    fontSize: '0.875rem',
    color: '#374151',
  },
  clientCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
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
    flexShrink: 0,
  },
  clientName: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.25rem',
  },
  clientId: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  contactCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  dateCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#6b7280',
  },
  statusBadge: {
    display: 'inline-flex',
    padding: '0.375rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  tagsCell: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  tagBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  statsCell: {
    display: 'flex',
    gap: '1rem',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    fontSize: '0.875rem',
    color: '#374151',
  },
  actionButtons: {
    display: 'flex',
    gap: '0.5rem',
  },
  actionBtn: {
    padding: '0.5rem',
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'all 0.2s',
  },
  emptyState: {
    padding: '3rem 1rem',
    textAlign: 'center',
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  },
  emptyTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#374151',
    margin: '1rem 0 0.5rem',
  },
  emptyText: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0,
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
    maxWidth: '600px',
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
    fontSize: '1.5rem',
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
    gridTemplateColumns: '1fr',
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
    padding: '1rem',
    background: 'linear-gradient(135deg, #f3e8ff, #eff6ff)',
    borderRadius: '8px',
  },
  aiSuggestionTitle: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 0.25rem 0',
  },
  aiSuggestionText: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0,
  },
  modalFooter: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    flexWrap: 'wrap',
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
    transition: 'all 0.2s',
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
    transition: 'all 0.2s',
  },
  clientSummary: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1.5rem',
    background: '#f9fafb',
    borderRadius: '12px',
    marginBottom: '2rem',
  },
  summaryLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
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
    flexShrink: 0,
  },
  clientNameLarge: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  clientContact: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '0.25rem',
  },
  summaryStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: '1rem',
  },
  summaryStatItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  summaryStatValue: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
  },
  summaryStatLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  timelineSection: {
    marginBottom: '2rem',
  },
  timelineTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  timelineItem: {
    display: 'flex',
    gap: '1rem',
    position: 'relative',
    paddingLeft: '2.5rem',
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
    flexShrink: 0,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: '1rem',
    borderBottom: '1px solid #f3f4f6',
  },
  timelineDate: {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginBottom: '0.5rem',
  },
  timelineText: {
    fontSize: '0.875rem',
    color: '#374151',
    lineHeight: '1.6',
    marginBottom: '0.5rem',
  },
  timelineResponse: {
    fontSize: '0.875rem',
    color: '#1f2937',
    fontStyle: 'italic',
    padding: '0.75rem',
    background: '#eff6ff',
    borderRadius: '8px',
    borderLeft: '3px solid #3b82f6',
  },
  emptyTimeline: {
    padding: '3rem 1rem',
    textAlign: 'center',
    color: '#9ca3af',
  },
  notesSection: {
    padding: '1.5rem',
    background: '#fef3c7',
    borderRadius: '12px',
  },
  notesTitle: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#92400e',
    marginBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  notesText: {
    fontSize: '0.875rem',
    color: '#78350f',
    lineHeight: '1.6',
    margin: 0,
  },
};
