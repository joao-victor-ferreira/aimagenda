import React, { useState, useEffect } from 'react';
import {
  Brain,
  Save,
  RotateCcw,
  Sparkles,
  MessageSquare,
  Clock,
  Bell,
  Globe,
  Volume2,
  Shield,
  Zap,
  AlertCircle,
  CheckCircle,
  Eye,
  Calendar,
  User,
  Mail,
  Info,
  Loader,
  Trash2,
  Edit,
  Plus,
  X,
} from 'lucide-react';

export default function AIConfiguracao() {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState({
    name: 'AIM Assistant',
    language: 'pt-BR',
    tone: 'professional',
    personality: 'helpful',
    workingHours: {
      enabled: true,
      start: '09:00',
      end: '18:00',
      timezone: 'America/Sao_Paulo',
    },
    autoResponse: true,
    confirmationRequired: true,
    maxResponseTime: 30,
    notifications: {
      newAppointment: true,
      cancellation: true,
      reminder: true,
      aiResponse: false,
      dailySummary: true,
    },
    templates: {
      greeting:
        'Olá! Sou o assistente do AIM. Como posso ajudar com seu agendamento?',
      confirmation:
        'Seu agendamento foi confirmado para {data} às {hora}. Te enviarei um lembrete antes.',
      cancellation:
        'Entendo. Seu agendamento foi cancelado. Posso ajudar a remarcar?',
      unavailable: 'Esse horário não está disponível. Que tal {alternativa}?',
    },
    training: {
      scenarios: [],
    },
  });

  const [activeTab, setActiveTab] = useState('identity');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [newScenario, setNewScenario] = useState({
    situation: '',
    clientMessage: '',
    idealResponse: '',
    tags: '',
  });
  const [editingScenario, setEditingScenario] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setUnsavedChanges(false);
      setSaving(false);
      alert('✅ Configurações salvas com sucesso!');
    }, 1000);
  };

  const handleReset = () => {
  
  };

  const handleChange = (section, field, value) => {
    setConfig((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
    setUnsavedChanges(true);
  };

  const handleSimpleChange = (field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  const addScenario = () => {
    if (!newScenario.situation || !newScenario.clientMessage || !newScenario.idealResponse) {
      alert('⚠️ Preencha todos os campos obrigatórios');
      return;
    }

    const scenario = {
      id: Date.now(),
      situation: newScenario.situation,
      clientMessage: newScenario.clientMessage,
      idealResponse: newScenario.idealResponse,
      tags: newScenario.tags ? newScenario.tags.split(',').map(t => t.trim()).filter(t => t) : [],
      createdAt: new Date().toISOString(),
    };

    setConfig((prev) => ({
      ...prev,
      training: {
        scenarios: [...(prev.training?.scenarios || []), scenario],
      },
    }));

    setNewScenario({
      situation: '',
      clientMessage: '',
      idealResponse: '',
      tags: '',
    });
    setUnsavedChanges(true);
  };

  const removeScenario = (id) => {
  
  };

  const startEditScenario = (scenario) => {
    setEditingScenario({
      ...scenario,
      tags: scenario.tags ? scenario.tags.join(', ') : '',
    });
  };

  const saveEditScenario = () => {
    const updatedScenario = {
      ...editingScenario,
      tags: editingScenario.tags ? editingScenario.tags.split(',').map(t => t.trim()).filter(t => t) : [],
    };

    setConfig((prev) => ({
      ...prev,
      training: {
        scenarios: prev.training.scenarios.map((s) =>
          s.id === updatedScenario.id ? updatedScenario : s
        ),
      },
    }));
    setEditingScenario(null);
    setUnsavedChanges(true);
  };

  const tabs = [
    { id: 'identity', label: 'Identidade', icon: Brain },
    { id: 'rules', label: 'Regras', icon: Clock },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'templates', label: 'Respostas', icon: MessageSquare },
    { id: 'training', label: 'Treinamento', icon: Zap },
  ];

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Loader size={48} style={{ animation: 'spin 1s linear infinite' }} color="#3b82f6" />
        <p style={styles.loadingText}>Carregando configurações...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{mediaQueries}</style>

      <div style={styles.header}>
        <div style={{ width: '100%' }}>
          <div style={styles.headerBadge}>
            <Brain size={16} />
            <span>Configurações da IA</span>
          </div>
          <h1 style={styles.title}>Configure sua Assistente</h1>
          <p style={styles.subtitle}>
            Personalize o jeito que sua IA conversa e responde
          </p>
        </div>
      </div>

      <div style={styles.statusBanner}>
        <div style={styles.statusIcon}>
          <Sparkles size={isMobile ? 20 : 24} />
        </div>
        <div style={styles.statusContent}>
          <h3 style={styles.statusTitle}>IA Ativa</h3>
          <p style={styles.statusText}>Respondendo automaticamente</p>
        </div>
        <div style={styles.statusIndicator}>
          <div style={styles.pulse}></div>
          <span>Online</span>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.tabs}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ ...styles.tab, ...(isActive ? styles.tabActive : {}) }}
                className="tab-button"
              >
                <Icon size={18} />
                <span className="tab-label">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div style={styles.tabContent}>
          {activeTab === 'identity' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <Brain size={24} color="#3b82f6" />
                <div>
                  <h2 style={styles.sectionTitle}>Identidade da IA</h2>
                  <p style={styles.sectionDescription}>
                    Defina como sua IA se apresenta aos clientes
                  </p>
                </div>
              </div>

              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <User size={16} />
                    Nome da Assistente
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => handleSimpleChange('name', e.target.value)}
                    style={styles.input}
                    placeholder="Ex: AIM Assistant"
                  />
                  <span style={styles.hint}>Como a IA se apresentará nas conversas</span>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <Globe size={16} />
                    Idioma Principal
                  </label>
                  <select
                    value={config.language}
                    onChange={(e) => handleSimpleChange('language', e.target.value)}
                    style={styles.select}
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                  <span style={styles.hint}>Idioma padrão das respostas</span>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <Volume2 size={16} />
                    Tom de Voz
                  </label>
                  <select
                    value={config.tone}
                    onChange={(e) => handleSimpleChange('tone', e.target.value)}
                    style={styles.select}
                  >
                    <option value="friendly">Amigável</option>
                    <option value="professional">Profissional</option>
                    <option value="neutral">Neutro</option>
                    <option value="humorous">Bem-humorado</option>
                  </select>
                  <span style={styles.hint}>Estilo de comunicação</span>
                </div>

                <div style={styles.formGroupFull}>
                  <label style={styles.label}>
                    <Sparkles size={16} />
                    Personalidade
                  </label>
                  <div style={styles.radioGroup}>
                    {[
                      { value: 'helpful', label: 'Prestativo', desc: 'Foca em resolver problemas' },
                      { value: 'creative', label: 'Criativo', desc: 'Respostas inovadoras' },
                      { value: 'serious', label: 'Sério', desc: 'Formal e direto' },
                      { value: 'efficient', label: 'Eficiente', desc: 'Rápido e objetivo' },
                    ].map((option) => (
                      <label key={option.value} style={styles.radioCard}>
                        <input
                          type="radio"
                          name="personality"
                          value={option.value}
                          checked={config.personality === option.value}
                          onChange={(e) => handleSimpleChange('personality', e.target.value)}
                          style={styles.radio}
                        />
                        <div>
                          <div style={styles.radioLabel}>{option.label}</div>
                          <div style={styles.radioDesc}>{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <Clock size={24} color="#10b981" />
                <div>
                  <h2 style={styles.sectionTitle}>Regras & Horários</h2>
                  <p style={styles.sectionDescription}>
                    Configure quando e como a IA deve responder
                  </p>
                </div>
              </div>

              <div style={styles.formGrid}>
                <div style={styles.formGroupFull}>
                  <div style={styles.toggleContainer}>
                    <label style={styles.label}>
                      <Calendar size={16} />
                      Horário de Funcionamento
                    </label>
                    <label style={styles.switch}>
                      <input
                        type="checkbox"
                        checked={config.workingHours.enabled}
                        onChange={(e) =>
                          handleChange('workingHours', 'enabled', e.target.checked)
                        }
                      />
                      <span style={styles.slider}></span>
                    </label>
                  </div>

                  {config.workingHours.enabled && (
                    <div style={styles.hoursGrid}>
                      <div style={styles.formGroup}>
                        <label style={styles.labelSmall}>Início</label>
                        <input
                          type="time"
                          value={config.workingHours.start}
                          onChange={(e) =>
                            handleChange('workingHours', 'start', e.target.value)
                          }
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.labelSmall}>Término</label>
                        <input
                          type="time"
                          value={config.workingHours.end}
                          onChange={(e) =>
                            handleChange('workingHours', 'end', e.target.value)
                          }
                          style={styles.input}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div style={styles.formGroupFull}>
                  <div style={styles.toggleContainer}>
                    <div>
                      <label style={styles.label}>
                        <Zap size={16} />
                        Resposta Automática
                      </label>
                      <span style={styles.hint}>
                        IA responde automaticamente mensagens recebidas
                      </span>
                    </div>
                    <label style={styles.switch}>
                      <input
                        type="checkbox"
                        checked={config.autoResponse}
                        onChange={(e) =>
                          handleSimpleChange('autoResponse', e.target.checked)
                        }
                      />
                      <span style={styles.slider}></span>
                    </label>
                  </div>
                </div>

                <div style={styles.formGroupFull}>
                  <div style={styles.toggleContainer}>
                    <div>
                      <label style={styles.label}>
                        <Shield size={16} />
                        Confirmação Obrigatória
                      </label>
                      <span style={styles.hint}>
                        Exige confirmação humana antes de agendar
                      </span>
                    </div>
                    <label style={styles.switch}>
                      <input
                        type="checkbox"
                        checked={config.confirmationRequired}
                        onChange={(e) =>
                          handleSimpleChange('confirmationRequired', e.target.checked)
                        }
                      />
                      <span style={styles.slider}></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <Bell size={24} color="#f59e0b" />
                <div>
                  <h2 style={styles.sectionTitle}>Notificações</h2>
                  <p style={styles.sectionDescription}>
                    Escolha quando e como receber alertas
                  </p>
                </div>
              </div>

              <div style={styles.notificationsList}>
                {[
                  {
                    key: 'newAppointment',
                    icon: Calendar,
                    label: 'Novo Agendamento',
                    description: 'Notificar quando um novo agendamento for criado pela IA',
                    color: '#3b82f6',
                  },
                  {
                    key: 'cancellation',
                    icon: AlertCircle,
                    label: 'Cancelamentos',
                    description: 'Alertar quando um agendamento for cancelado',
                    color: '#ef4444',
                  },
                  {
                    key: 'reminder',
                    icon: Clock,
                    label: 'Lembretes',
                    description: 'Receber lembretes automáticos de agendamentos próximos',
                    color: '#f59e0b',
                  },
                  {
                    key: 'aiResponse',
                    icon: Brain,
                    label: 'Respostas da IA',
                    description: 'Notificar cada vez que a IA responder uma mensagem',
                    color: '#8b5cf6',
                  },
                  {
                    key: 'dailySummary',
                    icon: Mail,
                    label: 'Resumo Diário',
                    description: 'Receber email com resumo das atividades do dia',
                    color: '#10b981',
                  },
                ].map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <div key={notification.key} style={styles.notificationItem}>
                      <div
                        style={{
                          ...styles.notificationIcon,
                          background: `${notification.color}15`,
                          color: notification.color,
                        }}
                      >
                        <Icon size={isMobile ? 20 : 24} />
                      </div>
                      <div style={styles.notificationContent}>
                        <h4 style={styles.notificationLabel}>{notification.label}</h4>
                        <p style={styles.notificationDesc}>{notification.description}</p>
                      </div>
                      <label style={styles.switch}>
                        <input
                          type="checkbox"
                          checked={config.notifications[notification.key]}
                          onChange={(e) =>
                            handleChange('notifications', notification.key, e.target.checked)
                          }
                        />
                        <span style={styles.slider}></span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <MessageSquare size={24} color="#8b5cf6" />
                <div>
                  <h2 style={styles.sectionTitle}>Respostas Padrão</h2>
                  <p style={styles.sectionDescription}>
                    Personalize as mensagens automáticas da IA
                  </p>
                </div>
              </div>

              <div style={styles.templatesGrid}>
                {[
                  {
                    key: 'greeting',
                    label: 'Saudação Inicial',
                    description: 'Primeira mensagem enviada ao cliente',
                    icon: MessageSquare,
                  },
                  {
                    key: 'confirmation',
                    label: 'Confirmação',
                    description: 'Mensagem após agendar com sucesso',
                    icon: CheckCircle,
                  },
                  {
                    key: 'cancellation',
                    label: 'Cancelamento',
                    description: 'Resposta ao cancelar um agendamento',
                    icon: AlertCircle,
                  },
                  {
                    key: 'unavailable',
                    label: 'Indisponível',
                    description: 'Quando o horário solicitado não está disponível',
                    icon: Clock,
                  },
                ].map((template) => {
                  const Icon = template.icon;
                  return (
                    <div key={template.key} style={styles.templateCard}>
                      <div style={styles.templateHeader}>
                        <div style={styles.templateIcon}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <h4 style={styles.templateLabel}>{template.label}</h4>
                          <p style={styles.templateDesc}>{template.description}</p>
                        </div>
                      </div>
                      <textarea
                        value={config.templates[template.key]}
                        onChange={(e) =>
                          handleChange('templates', template.key, e.target.value)
                        }
                        style={styles.textarea}
                        rows={3}
                        placeholder="Digite a mensagem..."
                      />
                      <div style={styles.templateFooter}>
                        <Info size={14} color="#6b7280" />
                        <span style={styles.templateHint}>
                          Use {'{data}'} e {'{hora}'} para valores dinâmicos
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'training' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <Zap size={24} color="#f59e0b" />
                <div>
                  <h2 style={styles.sectionTitle}>Treinamento da IA</h2>
                  <p style={styles.sectionDescription}>
                    Ensine sua IA a responder situações específicas do seu negócio
                  </p>
                </div>
              </div>

              <div style={styles.trainingInfo}>
                <Brain size={20} color="#3b82f6" />
                <div>
                  <strong>Como funciona?</strong>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                    Crie cenários com situações reais. A IA aprenderá e responderá de forma personalizada.
                  </p>
                </div>
              </div>

              <div style={styles.newScenarioCard}>
                <h3 style={styles.cardTitle}>
                  <Plus size={18} />
                  Adicionar Novo Cenário
                </h3>

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <AlertCircle size={16} />
                      Nome da Situação *
                    </label>
                    <input
                      type="text"
                      value={newScenario.situation}
                      onChange={(e) =>
                        setNewScenario({ ...newScenario, situation: e.target.value })
                      }
                      style={styles.input}
                      placeholder="Ex: Cliente quer reagendar última hora"
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <MessageSquare size={16} />
                      Tags (opcional)
                    </label>
                    <input
                      type="text"
                      value={newScenario.tags}
                      onChange={(e) =>
                        setNewScenario({ ...newScenario, tags: e.target.value })
                      }
                      style={styles.input}
                      placeholder="urgente, reagendamento"
                    />
                  </div>

                  <div style={styles.formGroupFull}>
                    <label style={styles.label}>
                      <User size={16} />
                      Mensagem do Cliente *
                    </label>
                    <textarea
                      value={newScenario.clientMessage}
                      onChange={(e) =>
                        setNewScenario({ ...newScenario, clientMessage: e.target.value })
                      }
                      style={styles.textarea}
                      rows={3}
                      placeholder="Ex: Oi, preciso remarcar meu horário de amanhã..."
                    />
                  </div>

                  <div style={styles.formGroupFull}>
                    <label style={styles.label}>
                      <Brain size={16} />
                      Resposta Ideal da IA *
                    </label>
                    <textarea
                      value={newScenario.idealResponse}
                      onChange={(e) =>
                        setNewScenario({ ...newScenario, idealResponse: e.target.value })
                      }
                      style={styles.textarea}
                      rows={4}
                      placeholder="Ex: Claro! Deixa eu verificar os horários disponíveis..."
                    />
                  </div>
                </div>

                <button style={styles.btnAddScenario} onClick={addScenario}>
                  <Plus size={18} />
                  Adicionar Cenário
                </button>
              </div>

              <div style={styles.scenariosList}>
                <h3 style={styles.scenariosTitle}>
                  Cenários Cadastrados ({config.training?.scenarios?.length || 0})
                </h3>

                {(!config.training?.scenarios || config.training.scenarios.length === 0) && (
                  <div style={styles.emptyState}>
                    <Brain size={48} color="#d1d5db" />
                    <p style={styles.emptyText}>Nenhum cenário cadastrado ainda</p>
                    <p style={styles.emptyHint}>
                      Comece adicionando situações comuns do seu negócio
                    </p>
                  </div>
                )}

                {config.training?.scenarios?.map((scenario) => (
                  <div key={scenario.id} style={styles.scenarioCard}>
                    {editingScenario?.id === scenario.id ? (
                      <>
                        <div style={styles.formGrid}>
                          <div style={styles.formGroup}>
                            <label style={styles.labelSmall}>Situação</label>
                            <input
                              type="text"
                              value={editingScenario.situation}
                              onChange={(e) =>
                                setEditingScenario({
                                  ...editingScenario,
                                  situation: e.target.value,
                                })
                              }
                              style={styles.input}
                            />
                          </div>
                          <div style={styles.formGroup}>
                            <label style={styles.labelSmall}>Tags</label>
                            <input
                              type="text"
                              value={editingScenario.tags}
                              onChange={(e) =>
                                setEditingScenario({
                                  ...editingScenario,
                                  tags: e.target.value,
                                })
                              }
                              style={styles.input}
                            />
                          </div>
                          <div style={styles.formGroupFull}>
                            <label style={styles.labelSmall}>Mensagem do Cliente</label>
                            <textarea
                              value={editingScenario.clientMessage}
                              onChange={(e) =>
                                setEditingScenario({
                                  ...editingScenario,
                                  clientMessage: e.target.value,
                                })
                              }
                              style={styles.textarea}
                              rows={2}
                            />
                          </div>
                          <div style={styles.formGroupFull}>
                            <label style={styles.labelSmall}>Resposta Ideal</label>
                            <textarea
                              value={editingScenario.idealResponse}
                              onChange={(e) =>
                                setEditingScenario({
                                  ...editingScenario,
                                  idealResponse: e.target.value,
                                })
                              }
                              style={styles.textarea}
                              rows={3}
                            />
                          </div>
                        </div>
                        <div style={styles.scenarioActions}>
                          <button style={styles.btnSaveEdit} onClick={saveEditScenario}>
                            <CheckCircle size={16} />
                            Salvar
                          </button>
                          <button
                            style={styles.btnCancelEdit}
                            onClick={() => setEditingScenario(null)}
                          >
                            <X size={16} />
                            Cancelar
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={styles.scenarioHeader}>
                          <div style={styles.scenarioTitle}>
                            <AlertCircle size={18} color="#3b82f6" />
                            <strong>{scenario.situation}</strong>
                          </div>
                          {scenario.tags && scenario.tags.length > 0 && (
                            <div style={styles.scenarioTags}>
                              {scenario.tags.map((tag, idx) => (
                                <span key={idx} style={styles.tag}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div style={styles.scenarioContent}>
                          <div style={styles.scenarioBlock}>
                            <label style={styles.scenarioLabel}>
                              <User size={14} />
                              Cliente:
                            </label>
                            <p style={styles.scenarioText}>{scenario.clientMessage}</p>
                          </div>

                          <div style={styles.scenarioBlock}>
                            <label style={styles.scenarioLabel}>
                              <Brain size={14} />
                              IA Responde:
                            </label>
                            <p style={styles.scenarioText}>{scenario.idealResponse}</p>
                          </div>
                        </div>

                        <div style={styles.scenarioActions}>
                          <button
                            style={styles.btnEdit}
                            onClick={() => startEditScenario(scenario)}
                          >
                            <Edit size={16} />
                            Editar
                          </button>
                          <button
                            style={styles.btnDelete}
                            onClick={() => removeScenario(scenario.id)}
                          >
                            <Trash2 size={16} />
                            Excluir
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={styles.footer}>
        {unsavedChanges && !isMobile && (
          <div style={styles.unsavedBanner}>
            <AlertCircle size={18} />
            <span>Alterações não salvas</span>
          </div>
        )}
        <div style={styles.footerActions}>
          <button
            style={{
              ...styles.btnReset,
              ...(saving ? { opacity: 0.6, cursor: 'not-allowed' } : {}),
            }}
            onClick={handleReset}
            disabled={saving}
          >
            {saving ? (
              <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <RotateCcw size={18} />
            )}
            {!isMobile && 'Resetar'}
          </button>
          <button
            style={{
              ...styles.btnSave,
              ...(saving ? { opacity: 0.8, cursor: 'not-allowed' } : {}),
            }}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <Save size={18} />
            )}
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div>

      {showPreview && (
        <div style={styles.modalOverlay} onClick={() => setShowPreview(false)}>
          <div style={styles.previewModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.previewHeader}>
              <h3 style={styles.previewTitle}>Pré-visualização da Conversa</h3>
              <button style={styles.btnClose} onClick={() => setShowPreview(false)}>
                ×
              </button>
            </div>
            <div style={styles.previewBody}>
              <div style={styles.chatPreview}>
                <div style={styles.chatMessage}>
                  <div style={styles.chatAvatar}>
                    <Brain size={20} />
                  </div>
                  <div style={styles.chatBubble}>{config.templates.greeting}</div>
                </div>
                <div style={styles.chatMessageUser}>
                  <div style={styles.chatBubbleUser}>
                    Gostaria de agendar para amanhã às 14h
                  </div>
                </div>
                <div style={styles.chatMessage}>
                  <div style={styles.chatAvatar}>
                    <Brain size={20} />
                  </div>
                  <div style={styles.chatBubble}>
                    {config.templates.confirmation
                      .replace('{data}', 'amanhã')
                      .replace('{hora}', '14:00')}
                  </div>
                </div>
              </div>
              <div style={styles.previewInfo}>
                <Info size={16} color="#3b82f6" />
                <span>
                  Esta é uma simulação de como a IA conversará com seus clientes
                </span>
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
    padding: '1rem',
    background: '#fafafa',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    paddingBottom: '100px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: '1rem',
  },
  loadingText: {
    fontSize: '1rem',
    color: '#6b7280',
    fontWeight: '500',
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
    lineHeight: '1.6',
  },
  statusBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    padding: '1.5rem',
    borderRadius: '12px',
    marginBottom: '1.5rem',
    color: 'white',
  },
  statusIcon: {
    width: '48px',
    height: '48px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 'clamp(1rem, 4vw, 1.5rem)',
    fontWeight: '700',
    margin: '0 0 0.25rem 0',
  },
  statusText: {
    fontSize: 'clamp(0.75rem, 3vw, 1rem)',
    opacity: 0.95,
    margin: 0,
  },
  statusIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '600',
  },
  pulse: {
    width: '8px',
    height: '8px',
    background: '#10b981',
    borderRadius: '50%',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  content: {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #e5e7eb',
    padding: '0 0.5rem',
    background: '#fafafa',
    overflowX: 'auto',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#6b7280',
    whiteSpace: 'nowrap',
  },
  tabActive: {
    color: '#3b82f6',
    borderBottomColor: '#3b82f6',
  },
  tabContent: {
    padding: '1.5rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #e5e7eb',
  },
  sectionTitle: {
    fontSize: 'clamp(1.125rem, 4vw, 1.5rem)',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 0.25rem 0',
  },
  sectionDescription: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0,
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  formGroupFull: {
    gridColumn: '1 / -1',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
  },
  labelSmall: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: '0.25rem',
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
    minHeight: '80px',
    width: '100%',
    boxSizing: 'border-box',
  },
  hint: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  radioCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  radio: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    flexShrink: 0,
  },
  radioLabel: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  radioDesc: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  toggleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    background: '#f9fafb',
    borderRadius: '8px',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: '48px',
    height: '24px',
    flexShrink: 0,
  },
  slider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#e5e7eb',
    transition: '0.3s',
    borderRadius: '24px',
  },
  hoursGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
    padding: '1rem',
    background: '#f9fafb',
    borderRadius: '8px',
  },
  notificationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  notificationItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.25rem',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    transition: 'all 0.2s',
    flexWrap: 'wrap',
  },
  notificationIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  notificationContent: {
    flex: 1,
    minWidth: '200px',
  },
  notificationLabel: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 0.25rem 0',
  },
  notificationDesc: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0,
  },
  templatesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  templateCard: {
    padding: '1.5rem',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    background: '#fafafa',
  },
  templateHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    marginBottom: '1rem',
  },
  templateIcon: {
    width: '40px',
    height: '40px',
    background: 'white',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#3b82f6',
    flexShrink: 0,
  },
  templateLabel: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 0.25rem 0',
  },
  templateDesc: {
    fontSize: '0.75rem',
    color: '#6b7280',
    margin: 0,
  },
  templateFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '0.75rem',
    flexWrap: 'wrap',
  },
  templateHint: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  trainingInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '1.25rem',
    background: 'linear-gradient(135deg, #eff6ff, #f3e8ff)',
    borderRadius: '12px',
    border: '1px solid #dbeafe',
  },
  newScenarioCard: {
    padding: '1.5rem',
    background: '#fafafa',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1.5rem',
  },
  btnAddScenario: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '0.875rem',
    background: 'linear-gradient(135deg, #f59e0b, #f97316)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginTop: '1rem',
  },
  scenariosList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  scenariosTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem 1.5rem',
    background: '#fafafa',
    borderRadius: '12px',
    border: '2px dashed #e5e7eb',
  },
  emptyText: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#6b7280',
    margin: '1rem 0 0.25rem 0',
  },
  emptyHint: {
    fontSize: '0.875rem',
    color: '#9ca3af',
    margin: 0,
  },
  scenarioCard: {
    padding: '1.5rem',
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    transition: 'all 0.2s',
  },
  scenarioHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    gap: '0.75rem',
  },
  scenarioTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  scenarioTags: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  tag: {
    padding: '0.25rem 0.75rem',
    background: '#eff6ff',
    color: '#3b82f6',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  scenarioContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1rem',
  },
  scenarioBlock: {
    padding: '1rem',
    background: '#f9fafb',
    borderRadius: '8px',
    borderLeft: '3px solid #3b82f6',
  },
  scenarioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem',
  },
  scenarioText: {
    fontSize: '0.875rem',
    color: '#374151',
    margin: 0,
    lineHeight: '1.6',
  },
  scenarioActions: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  btnEdit: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'white',
    color: '#3b82f6',
    border: '1px solid #3b82f6',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  btnDelete: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'white',
    color: '#ef4444',
    border: '1px solid #ef4444',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  btnSaveEdit: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  btnCancelEdit: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'white',
    color: '#6b7280',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'white',
    borderTop: '1px solid #e5e7eb',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
    flexWrap: 'wrap',
    gap: '0.75rem',
  },
  unsavedBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    background: '#fef3c7',
    color: '#d97706',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
  },
  footerActions: {
    display: 'flex',
    gap: '0.75rem',
    marginLeft: 'auto',
    flexWrap: 'wrap',
  },
  btnReset: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'white',
    color: '#ef4444',
    border: '1px solid #ef4444',
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
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
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
  previewModal: {
    background: 'white',
    borderRadius: '16px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  previewHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewTitle: {
    fontSize: 'clamp(1rem, 4vw, 1.25rem)',
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
  previewBody: {
    padding: '1.5rem',
  },
  chatPreview: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1.5rem',
    background: '#f9fafb',
    borderRadius: '12px',
    minHeight: '300px',
  },
  chatMessage: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start',
  },
  chatMessageUser: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  chatAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    flexShrink: 0,
  },
  chatBubble: {
    padding: '0.75rem 1rem',
    background: 'white',
    borderRadius: '12px',
    borderTopLeftRadius: '4px',
    fontSize: '0.875rem',
    color: '#1f2937',
    maxWidth: '80%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    wordWrap: 'break-word',
  },
  chatBubbleUser: {
    padding: '0.75rem 1rem',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: 'white',
    borderRadius: '12px',
    borderTopRightRadius: '4px',
    fontSize: '0.875rem',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  previewInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginTop: '1rem',
    padding: '1rem',
    background: '#eff6ff',
    borderRadius: '8px',
    fontSize: '0.875rem',
    color: '#1e40af',
  },
};

const mediaQueries = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  input[type="checkbox"] {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  input[type="checkbox"]:checked + span {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  }
  
  input[type="checkbox"]:checked + span:before {
    transform: translateX(24px);
  }
  
  input[type="checkbox"] + span:before {
    content: "";
    position: absolute;
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background: white;
    transition: 0.3s;
    border-radius: 50%;
  }

  button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  button:active:not(:disabled) {
    transform: translateY(0);
  }

  input:focus, select:focus, textarea:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .radioCard:hover {
    border-color: #3b82f6;
    background: #f9fafb;
  }

  .notificationItem:hover {
    border-color: #d1d5db;
    background: #fafafa;
  }

  @media (max-width: 768px) {
    .tab-button {
      padding: 0.75rem 1rem !important;
      font-size: 0.8rem !important;
    }
    
    .tab-label {
      display: none;
    }
    
    .tab-button svg {
      margin: 0 !important;
    }
  }

  @media (min-width: 768px) {
    .formGrid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
`;