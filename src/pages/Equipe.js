import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, Mail, Shield, Edit, Trash2, Check, X, Clock, Search,
  Crown, Eye, Settings, Send, AlertCircle, CheckCircle
} from 'lucide-react';

export default function Equipe() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [inviteData, setInviteData] = useState({
    email: '', name: '', role: 'viewer'
  });

  const [members, setMembers] = useState([
    {
      id: 1, name: 'João Silva', email: 'joao@empresa.com', role: 'admin',
      status: 'online', avatar: 'JS', joinedAt: '2024-01-15', lastActive: 'Agora',
      permissions: ['read', 'edit', 'admin']
    },
    {
      id: 2, name: 'Maria Santos', email: 'maria@empresa.com', role: 'editor',
      status: 'online', avatar: 'MS', joinedAt: '2024-02-10', lastActive: '5 min atrás',
      permissions: ['read', 'edit']
    },
    {
      id: 3, name: 'Pedro Costa', email: 'pedro@empresa.com', role: 'viewer',
      status: 'offline', avatar: 'PC', joinedAt: '2024-03-05', lastActive: '2 horas atrás',
      permissions: ['read']
    },
    {
      id: 4, name: 'Ana Oliveira', email: 'ana@empresa.com', role: 'editor',
      status: 'online', avatar: 'AO', joinedAt: '2024-03-20', lastActive: 'Agora',
      permissions: ['read', 'edit']
    },
    {
      id: 5, name: 'Carlos Ferreira', email: 'carlos@empresa.com', role: 'viewer',
      status: 'offline', avatar: 'CF', joinedAt: '2024-04-01', lastActive: '1 dia atrás',
      permissions: ['read']
    }
  ]);

  const roles = [
    {
      id: 'admin', name: 'Administrador', icon: Crown, color: '#8b5cf6',
      description: 'Acesso total ao sistema', permissions: ['read', 'edit', 'admin']
    },
    {
      id: 'editor', name: 'Editor', icon: Edit, color: '#3b82f6',
      description: 'Pode criar e editar conteúdo', permissions: ['read', 'edit']
    },
    {
      id: 'viewer', name: 'Visualizador', icon: Eye, color: '#6b7280',
      description: 'Apenas visualização', permissions: ['read']
    }
  ];

  const getRoleConfig = (roleId) => roles.find(r => r.id === roleId) || roles[2];
  const getStatusColor = (status) => status === 'online' ? '#10b981' : '#6b7280';

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = [
    { label: 'Total', value: members.length, color: '#3b82f6' },
    { label: 'Online', value: members.filter(m => m.status === 'online').length, color: '#10b981' },
    { label: 'Admins', value: members.filter(m => m.role === 'admin').length, color: '#8b5cf6' },
    { label: 'Convites', value: 2, color: '#f59e0b' }
  ];

  const handleInvite = () => {
    console.log('Sending invite:', inviteData);
    setShowInviteModal(false);
    setInviteData({ email: '', name: '', role: 'viewer' });
  };

  const handleDeleteMember = (memberId) => {
 
  };

  const MemberCard = ({ member }) => {
    const roleConfig = getRoleConfig(member.role);
    const RoleIcon = roleConfig.icon;
    
    return (
      <div style={styles.memberCard}>
        <div style={styles.cardHeader}>
          <div style={styles.memberCell}>
            <div style={styles.memberAvatarContainer}>
              <div style={styles.memberAvatar}>{member.avatar}</div>
              <div style={{...styles.statusDot, background: getStatusColor(member.status)}}></div>
            </div>
            <div>
              <div style={styles.memberName}>{member.name}</div>
              <div style={styles.memberJoined}>
                {new Date(member.joinedAt).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
        </div>

        <div style={styles.cardBody}>
          <div style={styles.cardInfoRow}>
            <Mail size={14} color="#6b7280" />
            <span style={styles.cardInfoText}>{member.email}</span>
          </div>
          <div style={styles.cardInfoRow}>
            <Clock size={14} color="#6b7280" />
            <span style={styles.cardInfoText}>{member.lastActive}</span>
          </div>
        </div>

        <div style={styles.cardFooter}>
          <div style={{...styles.roleBadge, background: `${roleConfig.color}15`, color: roleConfig.color}}>
            <RoleIcon size={14} />
            {roleConfig.name}
          </div>
          <div style={styles.cardActions}>
            <button style={styles.cardActionBtn} onClick={() => { setSelectedMember(member); setShowEditModal(true); }}>
              <Edit size={16} />
            </button>
            <button style={styles.cardActionBtn} onClick={() => handleDeleteMember(member.id)}>
              <Trash2 size={16} color="#ef4444" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{width: '100%'}}>
          <div style={styles.headerBadge}>
            <Users size={16} />
            <span>Equipe</span>
          </div>
          <h1 style={styles.title}>Gestão de Equipe</h1>
          <p style={styles.subtitle}>Gerencie membros e permissões</p>
        </div>
        <div style={styles.headerActions}>
          {!isMobile && (
            <button style={styles.btnSecondary}>
              <Settings size={18} />
              Configurações
            </button>
          )}
          <button style={styles.btnPrimary} onClick={() => setShowInviteModal(true)}>
            <UserPlus size={18} />
            {!isMobile && 'Adicionar'}
          </button>
        </div>
      </div>

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

      {!isMobile && (
        <div style={styles.rolesSection}>
          <h2 style={styles.sectionTitle}>Níveis de Permissão</h2>
          <div style={styles.rolesGrid}>
            {roles.map((role) => {
              const Icon = role.icon;
              const count = members.filter(m => m.role === role.id).length;
              return (
                <div key={role.id} style={styles.roleCard}>
                  <div style={{...styles.roleIcon, background: `${role.color}15`, color: role.color}}>
                    <Icon size={24} />
                  </div>
                  <h3 style={styles.roleName}>{role.name}</h3>
                  <p style={styles.roleDescription}>{role.description}</p>
                  <div style={styles.rolePermissions}>
                    {role.permissions.map((perm, idx) => (
                      <div key={idx} style={styles.permissionBadge}>
                        <Check size={12} />
                        {perm === 'read' && 'Leitura'}
                        {perm === 'edit' && 'Edição'}
                        {perm === 'admin' && 'Admin'}
                      </div>
                    ))}
                  </div>
                  <div style={styles.roleCount}>
                    <Users size={16} />
                    {count} {count === 1 ? 'membro' : 'membros'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={styles.toolbar}>
        <div style={styles.searchContainer}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder={isMobile ? "Buscar..." : "Buscar por nome ou email..."}
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={styles.filters}>
          <select style={styles.filterSelect} value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="all">Todos</option>
            <option value="admin">Admins</option>
            <option value="editor">Editores</option>
            <option value="viewer">Visualizadores</option>
          </select>

          <select style={styles.filterSelect} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      {isMobile ? (
        <div style={styles.cardsGrid}>
          {filteredMembers.map((member) => <MemberCard key={member.id} member={member} />)}
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Membro</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Cargo</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Última Atividade</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => {
                const roleConfig = getRoleConfig(member.role);
                const RoleIcon = roleConfig.icon;
                return (
                  <tr key={member.id} style={styles.tableRow}>
                    <td style={styles.td}>
                      <div style={styles.memberCell}>
                        <div style={styles.memberAvatarContainer}>
                          <div style={styles.memberAvatar}>{member.avatar}</div>
                          <div style={{...styles.statusDot, background: getStatusColor(member.status)}}></div>
                        </div>
                        <div>
                          <div style={styles.memberName}>{member.name}</div>
                          <div style={styles.memberJoined}>
                            Entrou em {new Date(member.joinedAt).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.emailCell}>
                        <Mail size={14} color="#6b7280" />
                        {member.email}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{...styles.roleBadge, background: `${roleConfig.color}15`, color: roleConfig.color}}>
                        <RoleIcon size={14} />
                        {roleConfig.name}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.statusBadge}>
                        <div style={{...styles.statusIndicator, background: getStatusColor(member.status)}}></div>
                        {member.status === 'online' ? 'Online' : 'Offline'}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.lastActiveCell}>
                        <Clock size={14} color="#6b7280" />
                        {member.lastActive}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <button style={styles.actionBtn} onClick={() => { setSelectedMember(member); setShowEditModal(true); }}>
                          <Edit size={16} />
                        </button>
                        <button style={styles.actionBtn} onClick={() => handleDeleteMember(member.id)}>
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

      {filteredMembers.length === 0 && (
        <div style={styles.emptyState}>
          <Users size={48} color="#d1d5db" />
          <h3 style={styles.emptyTitle}>Nenhum membro encontrado</h3>
          <p style={styles.emptyText}>Tente ajustar os filtros ou adicionar novos membros</p>
        </div>
      )}

      {showInviteModal && (
        <div style={styles.modalOverlay} onClick={() => setShowInviteModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitleContainer}>
                <UserPlus size={24} color="#3b82f6" />
                <h2 style={styles.modalTitle}>Adicionar Membro</h2>
              </div>
              <button style={styles.btnClose} onClick={() => setShowInviteModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Users size={16} />
                  Nome Completo *
                </label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Ex: João Silva"
                  value={inviteData.name}
                  onChange={(e) => setInviteData({...inviteData, name: e.target.value})}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Mail size={16} />
                  Email *
                </label>
                <input
                  type="email"
                  style={styles.input}
                  placeholder="email@empresa.com"
                  value={inviteData.email}
                  onChange={(e) => setInviteData({...inviteData, email: e.target.value})}
                />
                <span style={styles.hint}>Um convite será enviado para este email</span>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Shield size={16} />
                  Nível de Permissão *
                </label>
                <div style={styles.rolesSelector}>
                  {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = inviteData.role === role.id;
                    return (
                      <label key={role.id} style={{...styles.roleOption, ...(isSelected ? styles.roleOptionActive : {})}}>
                        <input
                          type="radio"
                          name="role"
                          value={role.id}
                          checked={isSelected}
                          onChange={(e) => setInviteData({...inviteData, role: e.target.value})}
                          style={styles.radioInput}
                        />
                        <div style={{...styles.roleOptionIcon, color: role.color}}>
                          <Icon size={20} />
                        </div>
                        <div style={{flex: 1}}>
                          <div style={styles.roleOptionName}>{role.name}</div>
                          <div style={styles.roleOptionDesc}>{role.description}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div style={styles.inviteNote}>
                <AlertCircle size={18} color="#3b82f6" />
                <p>O membro receberá um email com instruções para acessar o sistema.</p>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.btnCancel} onClick={() => setShowInviteModal(false)}>
                Cancelar
              </button>
              <button style={styles.btnSave} onClick={handleInvite}>
                <Send size={18} />
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedMember && (
        <div style={styles.modalOverlay} onClick={() => setShowEditModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitleContainer}>
                <Edit size={24} color="#3b82f6" />
                <h2 style={styles.modalTitle}>Editar Membro</h2>
              </div>
              <button style={styles.btnClose} onClick={() => setShowEditModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.memberDetailHeader}>
                <div style={styles.memberDetailAvatar}>{selectedMember.avatar}</div>
                <div>
                  <h3 style={styles.memberDetailName}>{selectedMember.name}</h3>
                  <p style={styles.memberDetailEmail}>{selectedMember.email}</p>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Shield size={16} />
                  Nível de Permissão
                </label>
                <select
                  style={styles.select}
                  value={selectedMember.role}
                  onChange={(e) => setSelectedMember({...selectedMember, role: e.target.value})}
                >
                  <option value="admin">Administrador</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Visualizador</option>
                </select>
              </div>

              <div style={styles.permissionsSection}>
                <h4 style={styles.permissionsTitle}>Permissões</h4>
                <div style={styles.permissionsList}>
                  <div style={styles.permissionItem}>
                    <CheckCircle size={18} color="#10b981" />
                    <div>
                      <div style={styles.permissionName}>Leitura</div>
                      <div style={styles.permissionDesc}>Visualizar dados e relatórios</div>
                    </div>
                  </div>
                  <div style={styles.permissionItem}>
                    <CheckCircle size={18} color={selectedMember.role !== 'viewer' ? '#10b981' : '#d1d5db'} />
                    <div>
                      <div style={styles.permissionName}>Edição</div>
                      <div style={styles.permissionDesc}>Criar e editar conteúdo</div>
                    </div>
                  </div>
                  <div style={styles.permissionItem}>
                    <CheckCircle size={18} color={selectedMember.role === 'admin' ? '#10b981' : '#d1d5db'} />
                    <div>
                      <div style={styles.permissionName}>Administração</div>
                      <div style={styles.permissionDesc}>Acesso total ao sistema</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.dangerZone}>
                <h4 style={styles.dangerTitle}>Zona de Perigo</h4>
                <p style={styles.dangerText}>Ações irreversíveis que afetam permanentemente este membro</p>
                <button style={styles.btnDanger} onClick={() => { setShowEditModal(false); handleDeleteMember(selectedMember.id); }}>
                  <Trash2 size={16} />
                  Remover Membro
                </button>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.btnCancel} onClick={() => setShowEditModal(false)}>
                Cancelar
              </button>
              <button style={styles.btnSave}>
                <Check size={18} />
                Salvar
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
    gap: '0.5rem',
    flexWrap: 'wrap'
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
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
  rolesSection: {
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1rem'
  },
  rolesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem'
  },
  roleCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s'
  },
  roleIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem'
  },
  roleName: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.5rem'
  },
  roleDescription: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '1rem',
    lineHeight: '1.6'
  },
  rolePermissions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  permissionBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.25rem 0.75rem',
    background: '#f3f4f6',
    color: '#374151',
    fontSize: '0.75rem',
    fontWeight: '600',
    borderRadius: '9999px'
  },
  roleCount: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280',
    fontWeight: '500'
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem',
    background: 'white',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
  },
  searchContainer: {
    position: 'relative',
    width: '100%'
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
  filters: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  },
  filterSelect: {
    flex: 1,
    minWidth: '120px',
    padding: '0.75rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    outline: 'none',
    cursor: 'pointer',
    background: 'white'
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem'
  },
  memberCard: {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden'
  },
  cardHeader: {
    padding: '1rem',
    borderBottom: '1px solid #f3f4f6'
  },
  cardBody: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  cardInfoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  cardInfoText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    background: '#f9fafb',
    borderTop: '1px solid #f3f4f6'
  },
  cardActions: {
    display: 'flex',
    gap: '0.5rem'
  },
  cardActionBtn: {
    padding: '0.5rem',
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tableContainer: {
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
  memberCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  memberAvatarContainer: {
    position: 'relative'
  },
  memberAvatar: {
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
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: '2px solid white'
  },
  memberName: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.25rem'
  },
  memberJoined: {
    fontSize: '0.75rem',
    color: '#6b7280'
  },
  emailCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#6b7280'
  },
  roleBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.375rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    whiteSpace: 'nowrap'
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#374151'
  },
  statusIndicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%'
  },
  lastActiveCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
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
  emptyState: {
    padding: '3rem 1rem',
    textAlign: 'center',
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
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
    backdropFilter: 'blur(4px)',
    padding: '1rem'
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
  formGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    cursor: 'pointer',
    background: 'white',
    boxSizing: 'border-box'
  },
  hint: {
    display: 'block',
    fontSize: '0.75rem',
    color: '#6b7280',
    marginTop: '0.5rem'
  },
  rolesSelector: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  roleOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  roleOptionActive: {
    borderColor: '#3b82f6',
    background: '#eff6ff'
  },
  radioInput: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    flexShrink: 0
  },
  roleOptionIcon: {
    width: '40px',
    height: '40px',
    background: '#f9fafb',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  roleOptionName: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.25rem'
  },
  roleOptionDesc: {
    fontSize: '0.75rem',
    color: '#6b7280'
  },
  inviteNote: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    background: '#eff6ff',
    borderRadius: '8px',
    fontSize: '0.875rem',
    color: '#1e40af',
    marginTop: '1.5rem',
    alignItems: 'flex-start'
  },
  modalFooter: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    flexWrap: 'wrap'
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
  memberDetailHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    background: '#f9fafb',
    borderRadius: '12px',
    marginBottom: '2rem'
  },
  memberDetailAvatar: {
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
  memberDetailName: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 0.25rem 0'
  },
  memberDetailEmail: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0
  },
  permissionsSection: {
    marginTop: '2rem',
    padding: '1.5rem',
    background: '#f9fafb',
    borderRadius: '12px'
  },
  permissionsTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1rem'
  },
  permissionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  permissionItem: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start'
  },
  permissionName: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.25rem'
  },
  permissionDesc: {
    fontSize: '0.75rem',
    color: '#6b7280'
  },
  dangerZone: {
    marginTop: '2rem',
    padding: '1.5rem',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '12px'
  },
  dangerTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: '0.5rem'
  },
  dangerText: {
    fontSize: '0.875rem',
    color: '#991b1b',
    marginBottom: '1rem'
  },
  btnDanger: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  }
};