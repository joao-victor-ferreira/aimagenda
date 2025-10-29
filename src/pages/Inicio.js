import React, { useEffect, useState } from 'react';
import '../css/Inicio.css';

const AimLandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      text: "A AIM Agenda reduziu 80% das minhas mensagens manuais e aumentou em 40% os agendamentos confirmados!",
      author: "Carla Santos",
      role: "Salão Cílios da Carla",
      image: "C"
    },
    {
      text: "Nunca mais perdi um cliente por demora na resposta. A IA responde instantaneamente, 24 horas por dia!",
      author: "Roberto Lima",
      role: "Studio Fit Personal",
      image: "R"
    },
    {
      text: "Minha agenda ficou organizada e profissional. Os clientes adoram a praticidade do agendamento automático.",
      author: "Ana Paula",
      role: "Clínica Estética Bella",
      image: "A"
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "149",
      features: [
        "200 mensagens IA/mês",
        "1 usuário",
        "Integração WhatsApp",
        "Painel básico",
        "Suporte por e-mail"
      ],
      cta: "Começar Agora",
      highlighted: false
    },
    {
      name: "Pro",
      price: "299",
      features: [
        "500 mensagens IA/mês",
        "3 usuários",
        "WhatsApp + Google Calendar",
        "Painel avançado",
        "Suporte padrão"
      ],
      cta: "Escolher Plano Pro",
      highlighted: true,
      badge: "Mais Popular"
    },
    {
      name: "Premium",
      price: "499",
      features: [
        "1000 mensagens IA/mês",
        "10 usuários",
        "Todas as integrações",
        "Relatórios avançados",
        "Suporte prioritário"
      ],
      cta: "Quero o Premium",
      highlighted: false
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="landing-container">
      {/* Header */}
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <nav className="nav-container">
          <div className="logo">AIM Agenda</div>
          <div className="nav-links">
            <a href="#como-funciona">Como Funciona</a>
            <a href="#recursos">Recursos</a>
            <a href="#planos">Planos</a>
            <a href="#depoimentos">Depoimentos</a>
          </div>
          <div className="nav-actions">
            <a href="/login" className="btn-login">Login</a>
            <a href="/registrar" className="btn-primary">Teste Grátis</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-animated"></div>
        <div className="hero-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <div className="hero-content">
          <div className="hero-main">
            <h1 className="hero-title animate-fade-in">
              Automatize seus agendamentos<br/>
              com <span className="gradient-text">Inteligência Artificial</span>
            </h1>
            
            <p className="hero-subtitle animate-fade-in">
              A AIM Agenda conecta você, seus clientes e seus horários com precisão e eficiência.
            </p>
            
            <div className="hero-cta animate-fade-in">
              <a href="/login" className="btn-hero-primary">
                <span>Testar Agora Gratuitamente</span>
                <div className="btn-glow"></div>
              </a>
            </div>

            <p className="hero-trial-info">
              ✨ 7 dias grátis ou 50 mensagens IA • Sem cartão de crédito
            </p>
          </div>

          {/* Dashboard Mockup */}
          <div className="dashboard-mockup animate-float">
            <div className="mockup-window">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="mockup-title">AIM Dashboard</div>
              </div>
              <div className="mockup-content">
                <div className="metric-card">
                  <div className="metric-icon">📅</div>
                  <div className="metric-info">
                    <div className="metric-value">127</div>
                    <div className="metric-label">Agendamentos</div>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon">🤖</div>
                  <div className="metric-info">
                    <div className="metric-value">98%</div>
                    <div className="metric-label">Automação</div>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon">⚡</div>
                  <div className="metric-info">
                    <div className="metric-value">2.5h</div>
                    <div className="metric-label">Economizadas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problema e Solução */}
      <section className="section problem-solution-section">
        <div className="container">
          <h2 className="section-title text-center">
            O agendamento manual está custando<br/>
            <span className="gradient-text">tempo e oportunidades</span>
          </h2>

          <div className="comparison-grid">
            <div className="comparison-card before">
              <div className="comparison-icon">❌</div>
              <h3>Antes (Manual)</h3>
              <ul>
                <li>Mensagens esquecidas</li>
                <li>Horários duplicados</li>
                <li>Respostas lentas</li>
                <li>Perda de clientes</li>
                <li>Planilhas confusas</li>
              </ul>
            </div>

            <div className="comparison-arrow">→</div>

            <div className="comparison-card after">
              <div className="comparison-icon">✅</div>
              <h3>Depois (AIM Agenda)</h3>
              <ul>
                <li>Respostas automáticas 24h</li>
                <li>Agenda sincronizada</li>
                <li>IA inteligente</li>
                <li>Mais conversões</li>
                <li>Tudo organizado</li>
              </ul>
            </div>
          </div>

          <div className="benefits-row">
            <div className="benefit-item">
              <div className="benefit-icon">⏰</div>
              <h4>Economia de Tempo</h4>
              <p>Automatize respostas e libere horas do seu dia</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">📈</div>
              <h4>Mais Produtividade</h4>
              <p>Foque no atendimento, não na agenda</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🤖</div>
              <h4>Atendimento 24h</h4>
              <p>IA trabalha enquanto você dorme</p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="section how-it-works-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Como Funciona</span>
            <h2 className="section-title">
              Simples em <span className="gradient-text">3 passos</span>
            </h2>
          </div>

          <div className="timeline-steps">
            <div className="timeline-step">
              <div className="step-number">1</div>
              <div className="step-icon">💬</div>
              <h3>Cliente Envia Mensagem</h3>
              <p>Via WhatsApp, site ou e-mail</p>
            </div>

            <div className="timeline-connector"></div>

            <div className="timeline-step">
              <div className="step-number">2</div>
              <div className="step-icon">🤖</div>
              <h3>IA Responde e Agenda</h3>
              <p>Automaticamente, entendendo o contexto</p>
            </div>

            <div className="timeline-connector"></div>

            <div className="timeline-step">
              <div className="step-number">3</div>
              <div className="step-icon">📊</div>
              <h3>Você Visualiza Tudo</h3>
              <p>No painel unificado AIM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section id="recursos" className="section features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Recursos</span>
            <h2 className="section-title">
              Tudo que você precisa em <span className="gradient-text">um só lugar</span>
            </h2>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>Agendamentos Inteligentes</h3>
              <p>A IA entende pedidos e responde automaticamente com contexto e naturalidade</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Painel Unificado</h3>
              <p>Visualize métricas, clientes e horários em um dashboard moderno</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h3>Integrações Prontas</h3>
              <p>WhatsApp Business, Google Calendar e e-mail conectados</p>
              <span className="feature-badge">Pro/Premium</span>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🕒</div>
              <h3>Notificações Instantâneas</h3>
              <p>Saiba de cada novo agendamento em tempo real via push e e-mail</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Multi-dispositivo</h3>
              <p>Acesse de qualquer lugar: web, mobile ou tablet</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Segurança Total</h3>
              <p>Dados criptografados e protegidos conforme LGPD</p>
            </div>
          </div>
        </div>
      </section>

      {/* Planos e Preços */}
      <section id="planos" className="section pricing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Planos</span>
            <h2 className="section-title">
              Escolha o plano ideal para <span className="gradient-text">seu negócio</span>
            </h2>
            <p className="section-description">
              Teste grátis por 7 dias antes de escolher um plano
            </p>
          </div>

          <div className="pricing-grid">
            {plans.map((plan, idx) => (
              <div key={idx} className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}>
                {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
                
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  <span className="currency">R$</span>
                  <span className="amount">{plan.price}</span>
                  <span className="period">/mês</span>
                </div>

                <ul className="plan-features">
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a href="/registrar" className={`plan-cta ${plan.highlighted ? 'cta-highlighted' : ''}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          <div className="pricing-footer">
            <p>✅ Sem fidelidade • Cancele quando quiser</p>
            <p>🎁 Todos os planos incluem 7 dias de teste grátis</p>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Depoimentos</span>
            <h2 className="section-title">
              O que nossos clientes <span className="gradient-text">dizem sobre nós</span>
            </h2>
          </div>

          <div className="testimonial-slider">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonials[currentTestimonial].text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonials[currentTestimonial].image}</div>
                <div className="author-info">
                  <div className="author-name">{testimonials[currentTestimonial].author}</div>
                  <div className="author-role">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
            </div>

            <div className="testimonial-dots">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`dot ${idx === currentTestimonial ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section final-cta-section">
        <div className="container">
          <div className="final-cta-content">
            <h2 className="final-cta-title">
              Pronto para <span className="gradient-text">transformar</span> sua rotina?
            </h2>
            <p className="final-cta-subtitle">
              Comece hoje com IA e descubra como é fácil automatizar sua agenda
            </p>
            <a href="/registrar" className="btn-final-cta">
              <span>Criar Conta Gratuita</span>
              <div className="btn-glow"></div>
            </a>
            <p className="final-cta-note">
              🚀 Configure em menos de 3 minutos • Sem necessidade de cartão
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">AIM Agenda</div>
              <p className="footer-text">Automatização inteligente de agendamentos com IA.</p>
              <div className="footer-social">
                <a href="#" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Produto</h4>
              <ul>
                <li><a href="#como-funciona">Como Funciona</a></li>
                <li><a href="#recursos">Recursos</a></li>
                <li><a href="#planos">Planos</a></li>
                <li><a href="#depoimentos">Depoimentos</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Empresa</h4>
              <ul>
                <li><a href="#">Sobre</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Carreiras</a></li>
                <li><a href="#">Parceiros</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Suporte</h4>
              <ul>
                <li><a href="#">Central de Ajuda</a></li>
                <li><a href="#">Política de Privacidade</a></li>
                <li><a href="#">Termos de Uso</a></li>
                <li><a href="mailto:suporte@aimagenda.com">Contato</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 AIM Agenda. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <a href="https://wa.me/5519999999999" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Back to Top */}
      {showBackToTop && (
        <button onClick={scrollToTop} className="back-to-top">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AimLandingPage;