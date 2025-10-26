import React, { useEffect, useState } from "react";
import "../css/PainelAgil.css"; // movemos o CSS para um arquivo separado (mesmo conteúdo do <style>)

const Inicio = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-page">
      {/* Header */}
      <header id="header" className={scrolled ? "scrolled" : ""}>
        <nav>
          <div className="logo">AIM</div>
          <div className="nav-links">
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#benefits">Benefits</a>
          </div>
          <div className="nav-actions">
            <a href="/login" className="btn-login">Login</a>
            <a href="/register" className="btn-primary">Get Started</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">🚀 Trusted by 500+ professionals worldwide</div>
          <h1>
            Your new <span className="highlight">AI-powered</span> <br /> scheduling assistant
          </h1>
          <p className="subtitle">Stop wasting time coordinating meetings.</p>
          <p>
            AIM handles your calendar, replies to clients, and books meetings automatically — through WhatsApp, email, or your website.
          </p>
          <div className="hero-cta">
            <a href="/register" className="btn-hero btn-hero-primary">
              Start Free — no credit card required
            </a>
           
          </div>
          <p className="hero-note">✨ Get started in under 3 minutes</p>

          {/* Chat Mockup */}
          <div className="hero-mockup">
            <div className="mockup-container">
              <div className="chat-message user">
                <div className="message-bubble">Can we meet tomorrow at 3pm?</div>
              </div>
              <div className="chat-message">
                <div className="message-bubble">
                  Sure! I've checked your calendar. 3pm is available. Would you like me to book it? 📅
                </div>
              </div>
              <div className="chat-message user">
                <div className="message-bubble">Yes, please!</div>
              </div>
              <div className="chat-message">
                <div className="message-bubble">
                  ✅ Done! Meeting scheduled for tomorrow at 3:00 PM. You'll receive a confirmation email shortly.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-dark">
        <div className="container-narrow">
          <div className="section-header">
            <span className="section-badge">The Problem</span>
            <h2>
              Still spending hours <br />
              <span className="gradient-text">coordinating schedules?</span>
            </h2>
            <p className="section-description">
              Every week, thousands of professionals waste valuable time exchanging messages just to set a meeting.
            </p>
          </div>

          <div className="problem-grid">
            {[
              { icon: "⏰", title: "Time Wasted", text: "Hours lost in back-and-forth messages" },
              { icon: "❌", title: "Lost Leads", text: "Clients give up waiting for replies" },
              { icon: "📅", title: "Double Bookings", text: "Manual errors cost credibility" },
            ].map((item) => (
              <div className="problem-item" key={item.title}>
                <div className="problem-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "64px" }}>
            <p style={{ fontSize: "24px", color: "#60A5FA", fontWeight: 600 }}>
              AIM eliminates all that by using natural conversation + smart automation to find the perfect time — instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">The Solution</span>
            <h2>
              AIM understands, responds <br /> and schedules — <span className="gradient-text">like a human assistant</span>
            </h2>
          </div>

          <div className="solution-grid">
            {[
              { icon: "💬", title: "Talks naturally", text: "Clients message you on WhatsApp, email or your site — AIM understands intent and context." },
              { icon: "📅", title: "Schedules automatically", text: "Syncs with Google Calendar and finds available slots, avoiding conflicts." },
              { icon: "🌐", title: "Works across all channels", text: "Centralized automation: WhatsApp, email, forms, or direct link." },
              { icon: "🔄", title: "Learns from you", text: "AIM adapts to your style, business hours, and rules over time." },
            ].map((card) => (
              <div className="solution-card" key={card.title}>
                <div className="solution-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>Product</h4>
            <ul className="footer-links">
              <li><a href="#how-it-works">How it works</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#benefits">Benefits</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">© 2025 AIM — All rights reserved.</div>
      </footer>
    </div>
  );
};

export default Inicio;
