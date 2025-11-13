import React, { useState, useEffect } from 'react';
import {
  Settings,
  Sun,
  Moon,
  Bell,
  Globe,
  Lock,
  Mail,
  User,
  CreditCard,
  Shield,
  Volume2,
  Clock,
  Check,
  X,
  Save,
  Key,
  Smartphone,
  Laptop,
  LogOut,
  Trash2,
  AlertCircle,
  CheckCircle,
  Crown,
  Zap,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

export default function Configuracao() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('appearance');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Estados para os dados do usuário
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  console.log(user);

  // Estados de loading e mensagens
  const [salvandoDados, setSalvandoDados] = useState(false);
  const [salvandoSenha, setSalvandoSenha] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const [planoAtual, setPlanoAtual] = useState(null);
  const [carregandoPlano, setCarregandoPlano] = useState(true);
  const [trocandoPlano, setTrocandoPlano] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
  const [excluindoConta, setExcluindoConta] = useState(false);
  const [dispositivos, setDispositivos] = useState([]);
  const [loading1, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDispositivos() {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Usuário não autenticado');

        const resposta = await fetch(
          'http://localhost:5000/api/seguranca/dispositivos',
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const data = await resposta.json();
        if (!resposta.ok)
          throw new Error(data.erro || 'Erro ao buscar dispositivos');

        setDispositivos(data.dispositivos || []);
      } catch (erro) {
        console.error('Erro ao buscar dispositivos:', erro);
      } finally {
        setLoading(false);
      }
    }

    fetchDispositivos();
  }, []);

  useEffect(() => {
    async function carregarPlano() {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Usuário não autenticado');

        const resposta = await fetch('http://localhost:5000/api/plano/atual', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await resposta.json();
        if (!resposta.ok) throw new Error(data.erro || 'Erro ao buscar plano');

        setPlanoAtual(data.plano);
      } catch (erro) {
        console.error('Erro ao carregar plano:', erro);
        setMensagemErro(erro.message);
      } finally {
        setCarregandoPlano(false);
      }
    }

    carregarPlano();
  }, []);

  // --- Função para trocar de plano ---
  async function trocarPlano(novoPlano) {
    try {
      setTrocandoPlano(true);
      setMensagemErro('');
      setMensagemSucesso('');

      const token = localStorage.getItem('token');
      if (!token) throw new Error('Usuário não autenticado');

      const resposta = await fetch('http://localhost:5000/api/plano/trocar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ novoPlano }),
      });

      const data = await resposta.json();
      if (!resposta.ok) throw new Error(data.erro || 'Erro ao trocar plano');

      setPlanoAtual(data.plano);
      setMensagemSucesso(`Plano alterado para ${novoPlano} com sucesso!`);

      // Atualiza o localStorage do usuário, se quiser manter coerência
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      if (usuario?.user) {
        usuario.user.plano = novoPlano;
        localStorage.setItem('usuario', JSON.stringify(usuario));
      }
    } catch (erro) {
      setMensagemErro(erro.message);
    } finally {
      setTrocandoPlano(false);
    }
  }

  useEffect(() => {
    if (user) {
      setNomeCompleto(user.nomeCompleto || '');
      setEmail(user.email || '');
      setTelefone(user.telefone || '');
    }
  }, [user]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [settings, setSettings] = useState({
    theme: 'light',
    compactMode: false,
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    notifyNewAppointment: true,
    notifyAIResponse: false,
    notifyCancellation: true,
    notifyReminder: true,
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    name: '',
    email: '',
    phone: '',
    twoFactorEnabled: false,
  });

  const tabs = [
    { id: 'appearance', label: 'Aparência', icon: Sun },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'general', label: 'Geral', icon: Globe },
    { id: 'account', label: 'Conta', icon: User },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'billing', label: 'Plano', icon: CreditCard },
  ];

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 149,
      period: '/mês',
      icon: Sparkles,
      color: '#6b7280',
      gradient: 'linear-gradient(135deg, #6b7280, #9ca3af)',
      features: [
        '200 mensagens IA/mês',
        '1 usuário',
        'Todas as integrações',
        'Relatórios avançados',
        'Suporte por e-mail',
      ],
      current: user?.plano === 'Starter',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 299,
      period: '/mês',
      icon: Zap,
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      popular: true,
      badge: 'Mais Popular',
      features: [
        '500 mensagens IA/mês',
        '3 usuários',
        'Todas as integrações',
        'Relatórios avançados',
        'Suporte padrão',
      ],
      current: user?.plano === 'Pro',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 499,
      period: '/mês',
      icon: Crown,
      color: '#9333ea',
      gradient: 'linear-gradient(135deg, #9333ea, #ec4899)',
      features: [
        '1000 mensagens IA/mês',
        '10 usuários',
        'Todas as integrações',
        'Relatórios avançados',
        'Suporte prioritário',
      ],
      current: user?.plano === 'Premium',
    },
  ];

  async function handleExcluirConta() {
    try {
      if (!senhaConfirmacao) {
        throw new Error('Digite sua senha para confirmar a exclusão.');
      }

      setExcluindoConta(true);
      setMensagemErro('');
      setMensagemSucesso('');

      const token = localStorage.getItem('token');
      if (!token) throw new Error('Você precisa estar autenticado.');

      const resposta = await fetch('http://localhost:5000/auth/excluir-conta', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ senha: senhaConfirmacao }),
      });

      const resultado = await resposta.json();

      if (!resposta.ok)
        throw new Error(resultado.erro || 'Erro ao excluir conta.');

      // Limpa o localStorage e redireciona
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');

      setMensagemSucesso('Conta excluída com sucesso!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (erro) {
      setMensagemErro(erro.message);
      setTimeout(() => setMensagemErro(''), 4000);
    } finally {
      setExcluindoConta(false);
      setSenhaConfirmacao('');
      setShowDeleteModal(false);
    }
  }

  async function salvarDadosPessoais() {
    const dadosParaAtualizar = {};

    // user.user contém os dados reais
    const userData = user?.user || {};

    // Compara com os dados originais do user
    if (nomeCompleto !== (userData.nomeCompleto || '')) {
      dadosParaAtualizar.nomeCompleto = nomeCompleto;
    }
    if (email !== (userData.email || '')) {
      dadosParaAtualizar.email = email;
    }
    if (telefone !== (userData.telefone || '')) {
      dadosParaAtualizar.telefone = telefone;
    }

    if (Object.keys(dadosParaAtualizar).length === 0) {
      setMensagemErro('Nenhuma alteração detectada');
      setTimeout(() => setMensagemErro(''), 3000);
      return;
    }

    try {
      setSalvandoDados(true);
      setMensagemErro('');
      setMensagemSucesso('');

      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Você precisa estar autenticado');
      }

      const resposta = await fetch(
        'http://localhost:5000/auth/atualizar-conta',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dadosParaAtualizar),
        },
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.erro || 'Erro ao atualizar os dados.');
      }

      // Atualizar localStorage com novos dados
      if (resultado.usuario) {
        const usuarioAtualizado = {
          ...userData,
          nomeCompleto: resultado.usuario.nomeCompleto || userData.nomeCompleto,
          email: resultado.usuario.email || userData.email,
          telefone: resultado.usuario.telefone || userData.telefone,
        };

        localStorage.setItem(
          'usuario',
          JSON.stringify({ user: usuarioAtualizado }),
        );

        // Atualizar estados locais
        setNomeCompleto(resultado.usuario.nomeCompleto || nomeCompleto);
        setEmail(resultado.usuario.email || email);
        setTelefone(resultado.usuario.telefone || telefone);

        setSettings((prev) => ({
          ...prev,
          name: resultado.usuario.nomeCompleto || prev.name,
          email: resultado.usuario.email || prev.email,
          phone: resultado.usuario.telefone || prev.phone,
        }));
      }

      setMensagemSucesso('Dados atualizados com sucesso!');
      setUnsavedChanges(false);

      setTimeout(() => setMensagemSucesso(''), 3000);
    } catch (erro) {
      setMensagemErro(erro.message);
      setTimeout(() => setMensagemErro(''), 5000);
    } finally {
      setSalvandoDados(false);
    }
  }

  async function atualizarSenha() {
    try {
      setSalvandoSenha(true);
      setMensagemErro('');
      setMensagemSucesso('');

      if (!senhaAtual || !novaSenha || !confirmarSenha) {
        throw new Error('Preencha todos os campos de senha');
      }

      if (novaSenha !== confirmarSenha) {
        throw new Error('As senhas não coincidem');
      }

      if (novaSenha.length < 6) {
        throw new Error('A nova senha deve ter pelo menos 6 caracteres');
      }

      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Você precisa estar autenticado');
      }

      const resposta = await fetch(
        'http://localhost:5000/auth/atualizar-conta',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            senhaAtual,
            novaSenha,
          }),
        },
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(resultado.erro || 'Erro ao atualizar a senha.');
      }

      setMensagemSucesso('Senha atualizada com sucesso!');

      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');
      setShowPasswordModal(false);

      setTimeout(() => setMensagemSucesso(''), 3000);
    } catch (erro) {
      setMensagemErro(erro.message);
      setTimeout(() => setMensagemErro(''), 5000);
    } finally {
      setSalvandoSenha(false);
    }
  }

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));

    if (key === 'name') setNomeCompleto(value);
    if (key === 'email') setEmail(value);
    if (key === 'phone') setTelefone(value);

    setUnsavedChanges(true);
  };

  const handleSave = () => {
    setUnsavedChanges(false);
    alert('Configurações salvas com sucesso!');
  };

  const selectTab = (tabId) => {
    setActiveTab(tabId);
    setShowMobileMenu(false);
  };

  return (
    <div style={styles.container}>
      <style>{mediaQueries}</style>

      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                border: '4px solid #e5e7eb',
                borderTop: '4px solid #3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1rem',
              }}
            ></div>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Carregando dados...
            </p>
          </div>
        </div>
      )}

      <div style={styles.header}>
        <div style={styles.headerTop}>
          <button style={styles.btnBack} onClick={() => window.history.back()}>
            <ArrowLeft size={20} />
            Voltar
          </button>
        </div>
        <div style={styles.headerContent}>
          <div>
            <div style={styles.headerBadge}>
              <Settings size={16} />
              <span>Configurações</span>
            </div>
            <h1 style={styles.title}>Configurações</h1>
            <p style={styles.subtitle}>Personalize sua experiência</p>
          </div>
        </div>
      </div>

      {mensagemSucesso && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#10b981',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
            zIndex: 9999,
            fontWeight: 500,
          }}
        >
          <CheckCircle size={20} />
          <span>{mensagemSucesso}</span>
        </div>
      )}

      {mensagemErro && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#ef4444',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
            zIndex: 9999,
            fontWeight: 500,
          }}
        >
          <AlertCircle size={20} />
          <span>{mensagemErro}</span>
        </div>
      )}

      {isMobile && (
        <div style={styles.mobileTabSelector}>
          <button
            style={styles.mobileTabButton}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {tabs.find((t) => t.id === activeTab)?.label}
            <X
              style={{
                transform: showMobileMenu ? 'rotate(0deg)' : 'rotate(45deg)',
              }}
              size={16}
            />
          </button>
          {showMobileMenu && (
            <div style={styles.mobileTabMenu}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    style={styles.mobileTabItem}
                    onClick={() => selectTab(tab.id)}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div style={styles.content} className="content-grid">
        {!isMobile && (
          <div style={styles.sidebar}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    ...styles.tab,
                    ...(isActive ? styles.tabActive : {}),
                  }}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        <div style={styles.mainContent}>
          {activeTab === 'appearance' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <Sun size={24} color="#3b82f6" />
                <div>
                  <h2 style={styles.sectionTitle}>Aparência</h2>
                  <p style={styles.sectionDescription}>Personalize o visual</p>
                </div>
              </div>

              <div style={styles.settingGroup}>
                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <h3 style={styles.settingTitle}>Tema</h3>
                    <p style={styles.settingDesc}>Claro ou escuro</p>
                  </div>
                  <div style={styles.themeSelector}>
                    <button
                      style={{
                        ...styles.themeOption,
                        ...(settings.theme === 'light'
                          ? styles.themeOptionActive
                          : {}),
                      }}
                      onClick={() => handleChange('theme', 'light')}
                    >
                      <Sun size={24} />
                      <span>Claro</span>
                    </button>
                    <button
                      style={{
                        ...styles.themeOption,
                        ...(settings.theme === 'dark'
                          ? styles.themeOptionActive
                          : {}),
                      }}
                      onClick={() => handleChange('theme', 'dark')}
                    >
                      <Moon size={24} />
                      <span>Escuro</span>
                    </button>
                  </div>
                </div>

                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <h3 style={styles.settingTitle}>Modo Compacto</h3>
                    <p style={styles.settingDesc}>Reduz espaçamento</p>
                  </div>
                  <label style={styles.switch}>
                    <input
                      type="checkbox"
                      checked={settings.compactMode}
                      onChange={(e) =>
                        handleChange('compactMode', e.target.checked)
                      }
                    />
                    <span style={styles.slider}></span>
                  </label>
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
                  <p style={styles.sectionDescription}>Configure alertas</p>
                </div>
              </div>

              <div style={styles.settingGroup}>
                <h3 style={styles.groupTitle}>Canais</h3>

                {[
                  {
                    key: 'emailNotifications',
                    icon: Mail,
                    label: 'Email',
                    desc: 'Notificações por email',
                  },
                  {
                    key: 'pushNotifications',
                    icon: Smartphone,
                    label: 'Push',
                    desc: 'Navegador e mobile',
                  },
                  {
                    key: 'soundEnabled',
                    icon: Volume2,
                    label: 'Som',
                    desc: 'Tocar som',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.key} style={styles.settingItem}>
                      <div style={styles.settingInfo}>
                        <div style={styles.settingTitleRow}>
                          <Icon size={18} color="#6b7280" />
                          <h3 style={styles.settingTitle}>{item.label}</h3>
                        </div>
                        <p style={styles.settingDesc}>{item.desc}</p>
                      </div>
                      <label style={styles.switch}>
                        <input
                          type="checkbox"
                          checked={settings[item.key]}
                          onChange={(e) =>
                            handleChange(item.key, e.target.checked)
                          }
                        />
                        <span style={styles.slider}></span>
                      </label>
                    </div>
                  );
                })}
              </div>

              <div style={styles.settingGroup}>
                <h3 style={styles.groupTitle}>Eventos</h3>

                {[
                  {
                    key: 'notifyNewAppointment',
                    label: 'Novos Agendamentos',
                    desc: 'Quando cliente agendar',
                  },
                  {
                    key: 'notifyAIResponse',
                    label: 'Respostas da IA',
                    desc: 'Cada resposta da IA',
                  },
                  {
                    key: 'notifyCancellation',
                    label: 'Cancelamentos',
                    desc: 'Quando cancelar',
                  },
                  {
                    key: 'notifyReminder',
                    label: 'Lembretes',
                    desc: 'Agendamentos próximos',
                  },
                ].map((item) => (
                  <div key={item.key} style={styles.settingItem}>
                    <div style={styles.settingInfo}>
                      <h3 style={styles.settingTitle}>{item.label}</h3>
                      <p style={styles.settingDesc}>{item.desc}</p>
                    </div>
                    <label style={styles.switch}>
                      <input
                        type="checkbox"
                        checked={settings[item.key]}
                        onChange={(e) =>
                          handleChange(item.key, e.target.checked)
                        }
                      />
                      <span style={styles.slider}></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'general' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <Globe size={24} color="#10b981" />
                <div>
                  <h2 style={styles.sectionTitle}>Geral</h2>
                  <p style={styles.sectionDescription}>
                    Fuso horário e formatos
                  </p>
                </div>
              </div>

              <div style={styles.settingGroup}>
                {[
                  {
                    key: 'timezone',
                    icon: Clock,
                    label: 'Fuso Horário',
                    desc: 'Ajusta datas',
                    options: [
                      { value: 'America/Sao_Paulo', label: 'Brasília (GMT-3)' },
                      { value: 'America/New_York', label: 'New York (GMT-5)' },
                      { value: 'Europe/London', label: 'London (GMT+0)' },
                    ],
                  },
                  {
                    key: 'language',
                    icon: Globe,
                    label: 'Idioma',
                    desc: 'Idioma da interface',
                    options: [
                      { value: 'pt-BR', label: 'Português (Brasil)' },
                      { value: 'en-US', label: 'English (US)' },
                      { value: 'es-ES', label: 'Español' },
                    ],
                  },
                  {
                    key: 'dateFormat',
                    label: 'Formato de Data',
                    desc: 'Como exibir datas',
                    options: [
                      { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                      { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                      { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
                    ],
                  },
                  {
                    key: 'timeFormat',
                    label: 'Formato de Hora',
                    desc: '12h ou 24h',
                    options: [
                      { value: '24h', label: '24 horas (14:00)' },
                      { value: '12h', label: '12 horas (2:00 PM)' },
                    ],
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.key} style={styles.settingItem}>
                      <div style={styles.settingInfo}>
                        {Icon && (
                          <div style={styles.settingTitleRow}>
                            <Icon size={18} color="#6b7280" />
                            <h3 style={styles.settingTitle}>{item.label}</h3>
                          </div>
                        )}
                        {!Icon && (
                          <h3 style={styles.settingTitle}>{item.label}</h3>
                        )}
                        <p style={styles.settingDesc}>{item.desc}</p>
                      </div>
                      <select
                        style={styles.select}
                        value={settings[item.key]}
                        onChange={(e) => handleChange(item.key, e.target.value)}
                      >
                        {item.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <User size={24} color="#8b5cf6" />
                <div>
                  <h2 style={styles.sectionTitle}>Conta</h2>
                  <p style={styles.sectionDescription}>Dados pessoais</p>
                </div>
              </div>

              <div style={styles.settingGroup}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nome Completo</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={nomeCompleto}
                    onChange={(e) => {
                      setNomeCompleto(e.target.value);
                      setUnsavedChanges(true);
                    }}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    style={styles.input}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setUnsavedChanges(true);
                    }}
                    placeholder="seu@email.com"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Telefone</label>
                  <input
                    type="tel"
                    style={styles.input}
                    value={telefone}
                    onChange={(e) => {
                      setTelefone(e.target.value);
                      setUnsavedChanges(true);
                    }}
                    placeholder="+55 11 98765-4321"
                  />
                </div>

                <button
                  style={{
                    ...styles.btnSecondary,
                    width: '100%',
                    marginTop: '1rem',
                    opacity: salvandoDados || !unsavedChanges ? 0.5 : 1,
                    cursor:
                      salvandoDados || !unsavedChanges
                        ? 'not-allowed'
                        : 'pointer',
                  }}
                  onClick={salvarDadosPessoais}
                  disabled={salvandoDados || !unsavedChanges}
                >
                  {salvandoDados ? (
                    'Salvando...'
                  ) : (
                    <>
                      <Save size={18} />
                      Salvar Alterações
                    </>
                  )}
                </button>
              </div>

              <div style={styles.settingGroup}>
                <h3 style={styles.groupTitle}>Senha</h3>
                <div style={styles.passwordSection}>
                  <Lock size={isMobile ? 32 : 48} color="#d1d5db" />
                  <div style={{ flex: 1 }}>
                    <h4 style={styles.passwordTitle}>Alterar Senha</h4>
                    <p style={styles.passwordDesc}>Mantenha sua conta segura</p>
                  </div>
                  <button
                    style={styles.btnSecondary}
                    onClick={() => setShowPasswordModal(true)}
                  >
                    <Key size={18} />
                    {!isMobile && 'Redefinir'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <Shield size={24} color="#10b981" />
                <div>
                  <h2 style={styles.sectionTitle}>Segurança</h2>
                  <p style={styles.sectionDescription}>Proteja sua conta</p>
                </div>
              </div>

              <div style={styles.settingGroup}>
                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <div style={styles.settingTitleRow}>
                      <Shield size={18} color="#6b7280" />
                      <h3 style={styles.settingTitle}>2FA</h3>
                    </div>
                    <p style={styles.settingDesc}>
                      Autenticação de dois fatores
                    </p>
                  </div>
                  <label style={styles.switch}>
                    <input
                      type="checkbox"
                      checked={settings.twoFactorEnabled}
                      onChange={(e) =>
                        handleChange('twoFactorEnabled', e.target.checked)
                      }
                    />
                    <span style={styles.slider}></span>
                  </label>
                </div>
              </div>

              <div style={styles.settingGroup}>
                <h3 style={styles.groupTitle}>Dispositivos</h3>
                <div style={styles.devicesList}>
                  {dispositivos.length === 0 ? (
                    <p>Nenhum dispositivo conectado ainda.</p>
                  ) : (
                    dispositivos.map((d, idx) => {
                      const Icon = d.tipo === 'Mobile' ? Smartphone : Laptop;
                      return (
                        <div key={idx} style={styles.deviceItem}>
                          <div style={styles.deviceIcon}>
                            <Icon size={24} color="#6b7280" />
                          </div>
                          <div style={styles.deviceInfo}>
                            <div style={styles.deviceName}>
                              {d.navegador.split('(')[0].trim()}
                              <span style={styles.deviceLocation}>{d.ip}</span>
                            </div>
                            <div style={styles.settingDesc}>
                              Último login:{' '}
                              {new Date(d.dataLogin).toLocaleString('pt-BR')}
                            </div>
                          </div>
                          <button style={styles.deviceLogout}>
                            <LogOut size={16} />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div style={styles.dangerZone}>
                <h3 style={styles.dangerTitle}>
                  <AlertCircle size={20} />
                  Zona de Perigo
                </h3>
                <p style={styles.dangerText}>Ações irreversíveis</p>
                <button
                  style={styles.btnDanger}
                  onClick={() => setShowDeleteModal(true)}
                >
                  <Trash2 size={18} />
                  Excluir Conta
                </button>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div style={styles.section}>
              <div style={styles.sectionHeader}>
                <CreditCard size={24} color="#8b5cf6" />
                <div>
                  <h2 style={styles.sectionTitle}>Plano</h2>
                  <p style={styles.sectionDescription}>
                    Gerencie sua assinatura
                  </p>
                </div>
              </div>

              {planoAtual && (
                <div style={styles.currentPlan}>
                  <div style={styles.planHeader}>
                    <Crown size={32} color="#8b5cf6" />
                    <div>
                      <h3 style={styles.planName}>
                        Plano {planoAtual.tipoPlano}
                      </h3>
                      <p style={styles.planDesc}>
                        R$ {planoAtual.valorPlano}/mês • Renovação em{' '}
                        {new Date(planoAtual.dataVencimento).toLocaleDateString(
                          'pt-BR',
                          {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  <div style={styles.planStats}>
                    <div style={styles.planStatItem}>
                      <Zap size={18} color="#3b82f6" />
                      <span>
                        {planoAtual.tipoPlano === 'Starter'
                          ? '1 usuário'
                          : planoAtual.tipoPlano === 'Pro'
                            ? '3 usuários'
                            : '10 usuários'}
                      </span>
                    </div>

                    <div style={styles.planStatItem}>
                      <CheckCircle size={18} color="#10b981" />
                      <span>Todas as integrações</span>
                    </div>
                  </div>
                </div>
              )}

              <div style={styles.plansGrid} className="plans-grid">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    style={{
                      ...styles.planCard,
                      ...(plan.current ? styles.planCardCurrent : {}),
                    }}
                  >
                    {plan.badge && (
                      <div style={styles.planBadge}>{plan.badge}</div>
                    )}
                    <h4 style={styles.planCardName}>{plan.name}</h4>
                    <div style={styles.planPrice}>
                      <span style={styles.planPriceCurrency}>R$</span>
                      <span style={styles.planPriceValue}>{plan.price}</span>
                      <span style={styles.planPricePeriod}>/mês</span>
                    </div>
                    <ul style={styles.planFeatures}>
                      {plan.features.map((feature, idx) => (
                        <li key={idx} style={styles.planFeature}>
                          <Check size={16} color="#10b981" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      style={
                        plan.current || planoAtual?.tipoPlano === plan.name
                          ? styles.planBtnCurrent
                          : styles.planBtnUpgrade
                      }
                      disabled={
                        trocandoPlano || planoAtual?.tipoPlano === plan.name
                      }
                      onClick={() => trocarPlano(plan.name)}
                    >
                      {planoAtual?.tipoPlano === plan.name
                        ? 'Atual'
                        : trocandoPlano
                          ? 'Trocando...'
                          : 'Mudar Plano'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {unsavedChanges && (
        <div style={styles.saveBar}>
          <div style={styles.saveBarContent}>
            <AlertCircle size={20} />
            <span>{isMobile ? 'Não salvo' : 'Alterações não salvas'}</span>
          </div>
          <div style={styles.saveBarActions}>
            <button
              style={styles.btnCancel}
              onClick={() => setUnsavedChanges(false)}
            >
              {isMobile ? 'Descartar' : 'Descartar'}
            </button>
            <button style={styles.btnSave} onClick={handleSave}>
              <Save size={18} />
              Salvar
            </button>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowPasswordModal(false)}
        >
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Redefinir Senha</h3>
              <button
                style={styles.btnClose}
                onClick={() => setShowPasswordModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Senha Atual</label>
                <input
                  type="password"
                  style={styles.input}
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  placeholder="Digite sua senha atual"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nova Senha</label>
                <input
                  type="password"
                  style={styles.input}
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Confirmar Nova Senha</label>
                <input
                  type="password"
                  style={styles.input}
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Confirme a nova senha"
                />
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.btnCancel}
                onClick={() => {
                  setShowPasswordModal(false);
                  setSenhaAtual('');
                  setNovaSenha('');
                  setConfirmarSenha('');
                  setMensagemErro('');
                }}
                disabled={salvandoSenha}
              >
                Cancelar
              </button>
              <button
                style={{
                  ...styles.btnSave,
                  opacity: salvandoSenha ? 0.7 : 1,
                  cursor: salvandoSenha ? 'wait' : 'pointer',
                }}
                onClick={atualizarSenha}
                disabled={salvandoSenha}
              >
                {salvandoSenha ? 'Atualizando...' : 'Atualizar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowDeleteModal(false)}
        >
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Excluir Conta</h3>
              <button
                style={styles.btnClose}
                onClick={() => setShowDeleteModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <p
                style={{
                  marginBottom: '1rem',
                  color: '#ef4444',
                  fontWeight: '500',
                }}
              >
                ⚠️ Essa ação é irreversível! Todos os seus dados serão apagados
                permanentemente.
              </p>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Digite sua senha para confirmar
                </label>
                <input
                  type="password"
                  style={styles.input}
                  value={senhaConfirmacao}
                  onChange={(e) => setSenhaConfirmacao(e.target.value)}
                  placeholder="Sua senha atual"
                />
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.btnCancel}
                onClick={() => {
                  setShowDeleteModal(false);
                  setSenhaConfirmacao('');
                }}
                disabled={excluindoConta}
              >
                Cancelar
              </button>
              <button
                style={{
                  ...styles.btnDanger,
                  opacity: excluindoConta ? 0.7 : 1,
                  cursor: excluindoConta ? 'wait' : 'pointer',
                }}
                onClick={handleExcluirConta}
                disabled={excluindoConta}
              >
                {excluindoConta ? 'Excluindo...' : 'Confirmar Exclusão'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mediaQueries = `
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

  @media (max-width: 768px) {
    .content-grid {
      grid-template-columns: 1fr !important;
    }
    
    .plans-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

const styles = {
  container: {
    padding: '1rem',
    background: '#fafafa',
    minHeight: '100vh',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    paddingBottom: '100px',
  },
  header: {
    marginBottom: '1.5rem',
  },
  headerTop: {
    marginBottom: '1rem',
  },
  btnBack: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'white',
    color: '#374151',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  mobileTabSelector: {
    position: 'relative',
    marginBottom: '1.5rem',
  },
  mobileTabButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    cursor: 'pointer',
  },
  mobileTabMenu: {
    position: 'absolute',
    top: 'calc(100% + 0.5rem)',
    left: 0,
    right: 0,
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    zIndex: 100,
    overflow: 'hidden',
  },
  mobileTabItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem',
    background: 'white',
    border: 'none',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    cursor: 'pointer',
    textAlign: 'left',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    gap: '1.5rem',
  },
  sidebar: {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    padding: '0.5rem',
    height: 'fit-content',
    position: 'sticky',
    top: '1rem',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
    color: '#6b7280',
    fontSize: '0.875rem',
    fontWeight: '500',
    textAlign: 'left',
  },
  tabActive: {
    background: 'linear-gradient(135deg, #eff6ff, #f3e8ff)',
    color: '#3b82f6',
    fontWeight: '600',
  },
  mainContent: {
    background: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    padding: '1.5rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
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
  settingGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  groupTitle: {
    fontSize: '0.875rem',
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginTop: '1rem',
  },
  settingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    background: '#f9fafb',
    borderRadius: '8px',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  settingInfo: {
    flex: 1,
    minWidth: '200px',
  },
  settingTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.25rem',
  },
  settingTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0,
  },
  settingDesc: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0,
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
  themeSelector: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  themeOption: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    minWidth: '100px',
  },
  themeOptionActive: {
    borderColor: '#3b82f6',
    background: '#eff6ff',
  },
  select: {
    padding: '0.75rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    outline: 'none',
    cursor: 'pointer',
    background: 'white',
    minWidth: '150px',
    maxWidth: '100%',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
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
    fontFamily: 'inherit',
    width: '100%',
    boxSizing: 'border-box',
  },
  inputWithButton: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  inputButton: {
    padding: '0.75rem 1.5rem',
    background: 'white',
    color: '#3b82f6',
    border: '1px solid #3b82f6',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  passwordSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.25rem',
    background: '#f9fafb',
    borderRadius: '12px',
    flexWrap: 'wrap',
  },
  passwordTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.25rem',
  },
  passwordDesc: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0,
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
    whiteSpace: 'nowrap',
  },
  devicesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  deviceItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: '#f9fafb',
    borderRadius: '8px',
    flexWrap: 'wrap',
  },
  deviceIcon: {
    width: '48px',
    height: '48px',
    background: 'white',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  deviceInfo: {
    flex: 1,
    minWidth: '150px',
  },
  deviceName: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  currentBadge: {
    padding: '0.125rem 0.5rem',
    background: '#d1fae5',
    color: '#10b981',
    fontSize: '0.75rem',
    fontWeight: '600',
    borderRadius: '9999px',
  },
  deviceLocation: {
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  deviceLogout: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'transparent',
    color: '#ef4444',
    border: '1px solid #ef4444',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  dangerZone: {
    padding: '1.25rem',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '12px',
    marginTop: '1.5rem',
  },
  dangerTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  dangerText: {
    fontSize: '0.875rem',
    color: '#991b1b',
    marginBottom: '1rem',
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
  },
  currentPlan: {
    padding: '1.5rem',
    background: 'linear-gradient(135deg, #f3e8ff, #eff6ff)',
    borderRadius: '12px',
    marginBottom: '1.5rem',
  },
  planHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  planName: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
  },
  planDesc: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0,
  },
  planStats: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  planStatItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#374151',
  },
  plansGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
  },
  planCard: {
    padding: '1.5rem',
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    position: 'relative',
    transition: 'all 0.3s',
  },
  planCardCurrent: {
    borderColor: '#8b5cf6',
    background: '#faf5ff',
  },
  planBadge: {
    position: 'absolute',
    top: '-12px',
    right: '1rem',
    padding: '0.25rem 0.75rem',
    background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: '700',
    borderRadius: '9999px',
  },
  planCardName: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  planPrice: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.25rem',
    marginBottom: '1.5rem',
  },
  planPriceCurrency: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#6b7280',
  },
  planPriceValue: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1f2937',
  },
  planPricePeriod: {
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  planFeatures: {
    listStyle: 'none',
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    padding: 0,
  },
  planFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#374151',
  },
  planBtnCurrent: {
    width: '100%',
    padding: '0.75rem',
    background: '#e5e7eb',
    color: '#6b7280',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'not-allowed',
  },
  planBtnUpgrade: {
    width: '100%',
    padding: '0.75rem',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  saveBar: {
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
    gap: '1rem',
    flexWrap: 'wrap',
  },
  saveBarContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#f59e0b',
    fontSize: '0.875rem',
    fontWeight: '600',
  },
  saveBarActions: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  btnCancel: {
    padding: '0.75rem 1.25rem',
    background: 'transparent',
    color: '#6b7280',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
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
    maxWidth: '500px',
    width: '100%',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  modalHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
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
    color: '#6b7280',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  modalBody: {
    padding: '1.5rem',
  },
  modalFooter: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
};
