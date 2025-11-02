import React, { useState, useEffect } from 'react';
import { Calendar, Check, Sparkles, ArrowRight, Bell, Layout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Obrigado() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    // Animação sequencial
    setTimeout(() => setShowContent(true), 300);
    setTimeout(() => setShowFeatures(true), 800);
    
    // Gera confetes aleatórios
    const pieces = [];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        color: ['#3b82f6', '#9333ea', '#ec4899', '#f59e0b', '#10b981'][Math.floor(Math.random() * 5)]
      });
    }
    setConfettiPieces(pieces);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #faf5ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    },
    confetti: {
      position: 'absolute',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      top: '-20px',
      zIndex: 1
    },
    wrapper: {
      width: '100%',
      maxWidth: '48rem',
      position: 'relative',
      zIndex: 2
    },
    card: {
      background: 'white',
      borderRadius: '2rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      padding: '3rem 2rem',
      border: '1px solid #f3f4f6',
      textAlign: 'center',
      opacity: 0,
      transform: 'scale(0.9)',
      animation: showContent ? 'fadeInScale 0.6s ease-out forwards' : 'none'
    },
    iconWrapper: {
      position: 'relative',
      display: 'inline-flex',
      marginBottom: '2rem'
    },
    successIcon: {
      width: '6rem',
      height: '6rem',
      background: 'linear-gradient(135deg, #10b981, #059669)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.4)',
      animation: showContent ? 'bounce 1s ease-out' : 'none',
      position: 'relative'
    },
    checkIcon: {
      color: 'white',
      animation: showContent ? 'checkAppear 0.6s ease-out 0.3s backwards' : 'none'
    },
    sparkle: {
      position: 'absolute',
      color: '#fbbf24',
      animation: showContent ? 'sparkleFloat 2s ease-in-out infinite' : 'none'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '1rem',
      opacity: 0,
      animation: showContent ? 'fadeInUp 0.6s ease-out 0.2s forwards' : 'none'
    },
    subtitle: {
      fontSize: '1.125rem',
      color: '#6b7280',
      marginBottom: '0.5rem',
      lineHeight: '1.75',
      opacity: 0,
      animation: showContent ? 'fadeInUp 0.6s ease-out 0.3s forwards' : 'none'
    },
    highlight: {
      background: 'linear-gradient(90deg, #3b82f6, #9333ea)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: '700'
    },
    message: {
      fontSize: '1rem',
      color: '#4b5563',
      marginBottom: '2.5rem',
      opacity: 0,
      animation: showContent ? 'fadeInUp 0.6s ease-out 0.4s forwards' : 'none'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1.5rem',
      marginBottom: '2.5rem',
      opacity: 0,
      animation: showFeatures ? 'fadeIn 0.6s ease-out forwards' : 'none'
    },
    featureCard: {
      background: 'linear-gradient(135deg, #f9fafb, #ffffff)',
      padding: '1.5rem',
      borderRadius: '1rem',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s'
    },
    featureCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      borderColor: '#3b82f6'
    },
    featureIcon: {
      width: '3rem',
      height: '3rem',
      margin: '0 auto 1rem',
      borderRadius: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    featureTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    featureDesc: {
      fontSize: '0.875rem',
      color: '#6b7280',
      lineHeight: '1.5'
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      marginBottom: '1.5rem'
    },
    button: {
      padding: '0.875rem 2rem',
      border: 'none',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    buttonPrimary: {
      background: 'linear-gradient(90deg, #2563eb, #9333ea)',
      color: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    buttonPrimaryHover: {
      background: 'linear-gradient(90deg, #1d4ed8, #7e22ce)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
      transform: 'translateY(-2px)'
    },
    socialProof: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      color: '#6b7280',
      fontSize: '0.875rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid #e5e7eb'
    },
    stars: {
      color: '#fbbf24',
      display: 'flex',
      gap: '0.25rem'
    },
    footer: {
      textAlign: 'center',
      marginTop: '2rem',
      fontSize: '0.875rem',
      color: '#6b7280'
    }
  };

  const features = [
    {
      icon: Calendar,
      gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      title: 'Agenda Inteligente',
      desc: 'Organize todos os seus compromissos em um só lugar'
    },
    {
      icon: Bell,
      gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
      title: 'Lembretes Automáticos',
      desc: 'Nunca perca um compromisso importante'
    },
    {
      icon: Layout,
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      title: 'Dashboard Completo',
      desc: 'Visualize métricas e relatórios detalhados'
    }
  ];

  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div style={styles.container}>
      {/* Confetes animados */}
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          style={{
            ...styles.confetti,
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animation: `confettiFall ${piece.duration}s ease-out ${piece.delay}s forwards`
          }}
        />
      ))}

      <div style={styles.wrapper}>
        <div style={styles.card}>
          {/* Ícone de Sucesso com Sparkles */}
          <div style={styles.iconWrapper}>
            <Sparkles 
              style={{
                ...styles.sparkle,
                top: '-10px',
                left: '-10px',
                width: '1.5rem',
                height: '1.5rem',
                animationDelay: '0s'
              }} 
            />
            <Sparkles 
              style={{
                ...styles.sparkle,
                top: '-5px',
                right: '-5px',
                width: '1.25rem',
                height: '1.25rem',
                animationDelay: '0.3s'
              }} 
            />
            <Sparkles 
              style={{
                ...styles.sparkle,
                bottom: '-5px',
                left: '10px',
                width: '1rem',
                height: '1rem',
                animationDelay: '0.6s'
              }} 
            />
            
            <div style={styles.successIcon}>
              <Check 
                style={{
                  ...styles.checkIcon,
                  width: '3rem',
                  height: '3rem'
                }} 
              />
            </div>
          </div>

          {/* Título e Mensagem */}
          <h1 style={styles.title}>Bem-vindo ao AIM Agenda! 🎉</h1>
          <p style={styles.subtitle}>
            Obrigado por escolher a <span style={styles.highlight}>melhor solução</span> para gerenciar seus compromissos!
          </p>
          <p style={styles.message}>
            Sua conta foi criada com sucesso. Estamos animados para fazer parte da sua jornada rumo à produtividade máxima.
          </p>

          {/* Cards de Features */}
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={{
                    ...styles.featureCard,
                    ...(hoveredFeature === index ? styles.featureCardHover : {}),
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div style={{
                    ...styles.featureIcon,
                    background: feature.gradient
                  }}>
                    <Icon style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                  </div>
                  <div style={styles.featureTitle}>{feature.title}</div>
                  <div style={styles.featureDesc}>{feature.desc}</div>
                </div>
              );
            })}
          </div>

          {/* Botões de Ação */}
          <div style={styles.buttonGroup}>
            <button
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
              onClick={() => navigate('/login')}
              style={{
                ...styles.button,
                ...styles.buttonPrimary,
                ...(buttonHover ? styles.buttonPrimaryHover : {})
              }}
            >
              Ir para o Menu
              <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>
          </div>

          {/* Social Proof */}
          <div style={styles.socialProof}>
            <div style={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
            <span>Mais de 10.000 usuários satisfeitos</span>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p>© 2025 AIM Agenda. Todos os direitos reservados.</p>
        </div>
      </div>

      {/* Animações CSS */}
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(-20px);
          }
          50% {
            transform: translateY(-10px);
          }
          75% {
            transform: translateY(-15px);
          }
        }

        @keyframes checkAppear {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes sparkleFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          25% {
            transform: translateY(-10px) rotate(90deg);
          }
          50% {
            transform: translateY(-5px) rotate(180deg);
            opacity: 0.7;
          }
          75% {
            transform: translateY(-8px) rotate(270deg);
          }
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .featuresGrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}