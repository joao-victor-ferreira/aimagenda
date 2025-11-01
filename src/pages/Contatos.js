import React, { useState } from 'react';
import '../css/Contatos.css';

const Contatos = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    assunto: '',
    mensagem: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 5000);
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      empresa: '',
      assunto: '',
      mensagem: ''
    });
  };

  return (
    <div className="contatos-container">
     
      {/* Header */}
      <header className="header">
        <nav className="nav-container">
          <div className="logo" onClick={() => window.location.href = '/'}>AIM Agenda</div>
          <div className="nav-actions">
            <a href="/login" className="btn-login">Login</a>
            <a href="/registrar" className="btn-primary">Teste</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="contatos-hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <span className="hero-badge">Fale Conosco</span>
          <h1 className="hero-title">
            Estamos aqui para <span className="gradient-text">ajudar você</span>
          </h1>
          <p className="hero-subtitle">
            Entre em contato com nossa equipe e tire todas as suas dúvidas sobre a AIM Agenda
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="contatos-main">
        <div className="contatos-grid">
          {/* Info Section */}
          <div className="info-section">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>E-mail</h3>
              <p>Envie sua mensagem e responderemos em até 24 horas</p>
              <a href="mailto:contato@aimagenda.com" className="info-link">
                contato@aimagenda.com
              </a>
            </div>

            <div className="info-card">
              <div className="info-icon">💬</div>
              <h3>WhatsApp</h3>
              <p>Fale diretamente com nosso time de suporte</p>
              <a href="https://wa.me/5519999999999" className="info-link" target="_blank" rel="noopener noreferrer">
                +55 (19) 99999-9999
              </a>
            </div>

            <div className="info-card">
              <div className="info-icon">🏢</div>
              <h3>Escritório</h3>
              <p>Segunda a Sexta: 9h às 18h</p>
              <p>Indaiatuba, São Paulo - Brasil</p>
            </div>

           
          </div>

          {/* Form Section */}
          <div className="form-section">
            {enviado && (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <div className="success-text">
                  <h4>Mensagem enviada com sucesso!</h4>
                  <p>Entraremos em contato em breve.</p>
                </div>
              </div>
            )}

            <h2 className="form-title">Envie sua mensagem</h2>
            <p className="form-subtitle">Preencha o formulário abaixo e retornaremos o mais rápido possível</p>

            <div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nome Completo *</label>
                  <input
                    type="text"
                    name="nome"
                    className="form-input"
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Telefone</label>
                  <input
                    type="tel"
                    name="telefone"
                    className="form-input"
                    placeholder="(00) 00000-0000"
                    value={formData.telefone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Empresa</label>
                  <input
                    type="text"
                    name="empresa"
                    className="form-input"
                    placeholder="Nome da empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Assunto *</label>
                <select
                  name="assunto"
                  className="form-select"
                  value={formData.assunto}
                  onChange={handleChange}
                >
                  <option value="">Selecione um assunto</option>
                  <option value="suporte">Suporte Técnico</option>
                  <option value="vendas">Vendas e Planos</option>
                  <option value="duvidas">Dúvidas Gerais</option>
                  <option value="parceria">Parcerias</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Mensagem *</label>
                <textarea
                  name="mensagem"
                  className="form-textarea"
                  placeholder="Descreva sua mensagem..."
                  value={formData.mensagem}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="button" onClick={handleSubmit} className="form-submit">
                Enviar Mensagem
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-header">
          <h2 className="faq-title">
            Perguntas <span className="gradient-text">Frequentes</span>
          </h2>
          <p className="faq-subtitle">Respostas rápidas para as dúvidas mais comuns</p>
        </div>

        <div className="faq-list">
          <div className="faq-item">
            <div className="faq-question">
              <span className="faq-icon">❓</span>
              Quanto tempo leva para receber uma resposta?
            </div>
            <p className="faq-answer">
              Normalmente respondemos em até 24 horas úteis. Para questões urgentes, utilize nosso WhatsApp para atendimento mais rápido.
            </p>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span className="faq-icon">❓</span>
              Posso agendar uma demonstração?
            </div>
            <p className="faq-answer">
              Sim! Selecione "Vendas e Planos" no formulário e solicite uma demonstração personalizada da plataforma.
            </p>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              <span className="faq-icon">❓</span>
              Vocês oferecem suporte em português?
            </div>
            <p className="faq-answer">
              Sim, todo nosso atendimento é realizado em português por uma equipe brasileira especializada.
            </p>
          </div>

        
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 AIM Agenda. Todos os direitos reservados.</p>
      </footer>

      {/* WhatsApp Float */}
      <a href="https://wa.me/5519999999999" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        💬
      </a>
    </div>
  );
};

export default Contatos;