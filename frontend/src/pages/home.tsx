import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
interface NavItem {
  icon: string;
  label: string;
  id: string;
  path: string;
}

interface Feature {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
  color: string;
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ active }: { active: string }) {
  const navigate = useNavigate();

  const nav: NavItem[] = [
    { icon: "🏠", label: "Home",          id: "home",      path: "/home" },
    { icon: "📊", label: "Dashboard",     id: "dashboard", path: "/dashboard" },
    { icon: "🔍", label: "Search Papers", id: "search",    path: "/search" },
    { icon: "🤖", label: "AI Tools",      id: "ai",        path: "/AI" },
    { icon: "📄", label: "Upload PDF",    id: "upload",    path: "/upload" },
    { icon: "📁", label: "DocSpace",      id: "doc",       path: "/docspace" },
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebarBrand}>
        <div style={styles.brandDot} />
        <span style={styles.sidebarBrandText}>ResearchHub AI</span>
      </div>
      <nav style={styles.sidebarNav}>
        {nav.map((item) => (
          <div
            key={item.id}
            style={{
              ...styles.navItem,
              ...(item.id === active ? styles.navItemActive : {}),
            }}
            onClick={() => navigate(item.path)}
          >
            <span style={styles.navIcon}>{item.icon}</span>
            <span style={styles.navLabel}>{item.label}</span>
            {item.id === active && <div style={styles.navActivePill} />}
          </div>
        ))}
      </nav>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();

  const features: Feature[] = [
    {
      icon: "🔍",
      iconBg: "#f3f0ff",
      iconColor: "#7c3aed",
      title: "Smart Search",
      description: "Search millions of research papers with AI-powered relevance ranking and semantic understanding.",
    },
    {
      icon: "💬",
      iconBg: "#f3f0ff",
      iconColor: "#7c3aed",
      title: "AI Chat",
      description: "Chat with your documents. Ask questions and get instant, context-aware answers from your papers.",
    },
    {
      icon: "📄",
      iconBg: "#f3f0ff",
      iconColor: "#7c3aed",
      title: "Document Editor",
      description: "Collaborate and edit research documents with AI assistance and real-time co-authoring tools.",
    },
    {
      icon: "📚",
      iconBg: "#f3f0ff",
      iconColor: "#7c3aed",
      title: "Literature Review",
      description: "Automatically synthesize and generate structured literature reviews from your paper collection.",
    },
  ];

  const steps: Step[] = [
    {
      number: "01",
      title: "Search or Upload",
      description: "Find papers from millions of sources or upload your own PDFs directly to your workspace.",
      color: "#7c3aed",
    },
    {
      number: "02",
      title: "Analyze with AI",
      description: "Use our AI tools to generate summaries, extract key insights, and identify research trends.",
      color: "#2563eb",
    },
    {
      number: "03",
      title: "Collaborate & Export",
      description: "Share your workspace, co-author documents, and export polished literature reviews.",
      color: "#059669",
    },
  ];

  const stats = [
    { value: "10M+", label: "Research Papers" },
    { value: "50K+", label: "Active Researchers" },
    { value: "500K+", label: "AI Summaries Generated" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <div style={styles.root}>
      <Sidebar active="home" />

      <div style={styles.main}>
        {/* Top Nav Bar */}
        <div style={styles.topbar}>
          <div style={styles.topbarBrand}>
            <div style={styles.topbarBrandDot} />
            <span style={styles.topbarBrandText}>ResearchHub AI</span>
          </div>
          <div style={styles.topbarSpacer} />
          <span style={styles.welcomeText}>Welcome!</span>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(124,58,237,0.4)" }}
            whileTap={{ scale: 0.97 }}
            style={styles.dashboardBtn}
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard →
          </motion.button>
        </div>

        {/* Scrollable Content */}
        <div style={styles.content}>

          {/* ── Hero Section ─────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            style={styles.hero}
          >
            {/* Subtle grid pattern overlay */}
            <div style={styles.heroGrid} />

            <div style={styles.heroBody}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={styles.heroBadge}
              >
                ✦ AI-Powered Research Platform
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                style={styles.heroTitle}
              >
                Your AI-Powered{" "}
                <span style={styles.heroTitleAccent}>Research Assistant</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.26 }}
                style={styles.heroSubtitle}
              >
                Accelerate your research with intelligent paper discovery, AI-powered
                insights, and collaborative document editing - all in one platform.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.34 }}
                style={styles.heroCTA}
              >
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(124,58,237,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                  style={styles.ctaPrimary}
                  onClick={() => navigate("/searchpapers")}
                >
                  Start Researching
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}
                  whileTap={{ scale: 0.97 }}
                  style={styles.ctaSecondary}
                  onClick={() => navigate("/docspace")}
                >
                  Try DocSpace
                </motion.button>
              </motion.div>
            </div>
          </motion.section>

          {/* ── Stats Bar ────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            style={styles.statsBar}
          >
            {stats.map((s, i) => (
              <div key={i} style={styles.statItem}>
                <span style={styles.statValue}>{s.value}</span>
                <span style={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </motion.section>

          {/* ── Features Section ─────────────────────────── */}
          <section style={styles.section}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              style={styles.sectionHeader}
            >
              <h2 style={styles.sectionTitle}>Powerful Features for Modern Research</h2>
              <p style={styles.sectionSubtitle}>
                Everything you need to supercharge your academic workflow
              </p>
            </motion.div>

            <div style={styles.featuresGrid}>
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.38, delay: i * 0.08 }}
                  whileHover={{ y: -4, boxShadow: "0 8px 28px rgba(124,58,237,0.12)" }}
                  style={styles.featureCard}
                >
                  <div
                    style={{
                      ...styles.featureIconWrap,
                      background: f.iconBg,
                    }}
                  >
                    <span style={{ fontSize: "22px" }}>{f.icon}</span>
                  </div>
                  <h3 style={styles.featureTitle}>{f.title}</h3>
                  <p style={styles.featureDesc}>{f.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── How It Works ──────────────────────────────── */}
          <section style={{ ...styles.section, ...styles.sectionAlt }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              style={styles.sectionHeader}
            >
              <h2 style={styles.sectionTitle}>How It Works</h2>
              <p style={styles.sectionSubtitle}>
                Get from question to insight in three simple steps
              </p>
            </motion.div>

            <div style={styles.stepsRow}>
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.38, delay: i * 0.1 }}
                  style={styles.stepCard}
                >
                  <div
                    style={{
                      ...styles.stepNumber,
                      color: step.color,
                      borderColor: step.color + "30",
                      background: step.color + "0d",
                    }}
                  >
                    {step.number}
                  </div>
                  <h3 style={styles.stepTitle}>{step.title}</h3>
                  <p style={styles.stepDesc}>{step.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── CTA Banner ───────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={styles.ctaBanner}
          >
            <h2 style={styles.ctaBannerTitle}>Ready to transform your research?</h2>
            <p style={styles.ctaBannerSubtitle}>
              Join thousands of researchers already using ResearchHub AI
            </p>
            <div style={styles.ctaBannerBtns}>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(0,0,0,0.25)" }}
                whileTap={{ scale: 0.97 }}
                style={styles.ctaBannerPrimary}
                onClick={() => navigate("/searchpapers")}
              >
                Start Researching
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={styles.ctaBannerSecondary}
                onClick={() => navigate("/dashboard")}
              >
                View Dashboard
              </motion.button>
            </div>
          </motion.section>

          {/* Footer */}
          <footer style={styles.footer}>
            <span style={styles.footerText}>
              © 2025 ResearchHub AI · Built for researchers, by researchers
            </span>
          </footer>
        </div>
      </div>

      {/* Right accent bar */}
      <div style={styles.rightAccent} />
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles: { [key: string]: React.CSSProperties } = {
  root: {
    display: "flex",
    minHeight: "100vh",
    background: "#f4f6fb",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: "#1e1b4b",
  },

  // ── Sidebar
  sidebar: {
    width: "200px",
    flexShrink: 0,
    background: "#ffffff",
    borderRight: "1px solid #e8eaf0",
    display: "flex",
    flexDirection: "column",
    boxShadow: "2px 0 8px rgba(0,0,0,0.03)",
  },
  sidebarBrand: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "22px 18px 18px",
    borderBottom: "1px solid #f0f0f5",
  },
  brandDot: {
    width: "24px",
    height: "24px",
    borderRadius: "7px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    flexShrink: 0,
  },
  sidebarBrandText: {
    fontSize: "13px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.2px",
  },
  sidebarNav: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    padding: "14px 10px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "9px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    position: "relative",
    color: "#6b7280",
    fontSize: "13px",
    transition: "background 0.15s, color 0.15s",
  },
  navItemActive: {
    background: "#ede9fe",
    color: "#7c3aed",
    fontWeight: "600",
  },
  navIcon: { fontSize: "15px" },
  navLabel: {},
  navActivePill: {
    position: "absolute",
    right: "0",
    top: "50%",
    transform: "translateY(-50%)",
    width: "3px",
    height: "18px",
    borderRadius: "2px 0 0 2px",
    background: "linear-gradient(180deg, #667eea, #a78bfa)",
  },

  // ── Main
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    overflowY: "auto",
  },

  // ── Top Nav Bar
  topbar: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px 32px",
    background: "#ffffff",
    borderBottom: "1px solid #e8eaf0",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  topbarBrand: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
  },
  topbarBrandDot: {
    width: "30px",
    height: "30px",
    borderRadius: "9px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
  topbarBrandText: {
    fontSize: "15px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.2px",
  },
  topbarSpacer: { flex: 1 },
  welcomeText: {
    fontSize: "14px",
    color: "#9ca3af",
    fontWeight: "400",
  },
  dashboardBtn: {
    padding: "9px 20px",
    borderRadius: "50px",
    border: "none",
    background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 14px rgba(124,58,237,0.3)",
    letterSpacing: "0.1px",
  },

  // ── Content
  content: {
    flex: 1,
  },

  // ── Hero
  hero: {
    position: "relative",
    background: "linear-gradient(160deg, #faf9ff 0%, #f0edff 60%, #ede9fe 100%)",
    borderBottom: "1px solid #e8eaf0",
    padding: "72px 48px 64px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "380px",
  },
  heroGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)",
    backgroundSize: "32px 32px",
    pointerEvents: "none",
  },
  heroBody: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center" as const,
    maxWidth: "680px",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 14px",
    borderRadius: "50px",
    background: "rgba(124,58,237,0.09)",
    border: "1px solid rgba(124,58,237,0.2)",
    color: "#7c3aed",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    marginBottom: "22px",
  },
  heroTitle: {
    fontSize: "44px",
    fontWeight: "800",
    color: "#111827",
    lineHeight: "1.15",
    letterSpacing: "-1px",
    marginBottom: "18px",
  },
  heroTitleAccent: {
    background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSubtitle: {
    fontSize: "16px",
    color: "#6b7280",
    lineHeight: "1.7",
    maxWidth: "540px",
    marginBottom: "36px",
  },
  heroCTA: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
    flexWrap: "wrap" as const,
    justifyContent: "center",
  },
  ctaPrimary: {
    padding: "13px 32px",
    borderRadius: "50px",
    border: "none",
    background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 18px rgba(124,58,237,0.35)",
    letterSpacing: "0.1px",
  },
  ctaSecondary: {
    padding: "13px 32px",
    borderRadius: "50px",
    border: "1.5px solid #d1d5db",
    background: "#ffffff",
    color: "#374151",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  },

  // ── Stats Bar
  statsBar: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    background: "#ffffff",
    borderBottom: "1px solid #e8eaf0",
    padding: "0",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    padding: "28px 16px",
    borderRight: "1px solid #f0f0f5",
  },
  statValue: {
    fontSize: "26px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
  },
  statLabel: {
    fontSize: "12px",
    color: "#9ca3af",
    fontWeight: "500",
  },

  // ── Sections
  section: {
    padding: "60px 48px",
  },
  sectionAlt: {
    background: "#faf9ff",
    borderTop: "1px solid #e8eaf0",
    borderBottom: "1px solid #e8eaf0",
  },
  sectionHeader: {
    textAlign: "center" as const,
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#111827",
    letterSpacing: "-0.5px",
    marginBottom: "10px",
  },
  sectionSubtitle: {
    fontSize: "14.5px",
    color: "#9ca3af",
    lineHeight: "1.6",
  },

  // ── Features Grid
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "18px",
  },
  featureCard: {
    background: "#ffffff",
    border: "1px solid #e8eaf0",
    borderRadius: "16px",
    padding: "26px 22px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    transition: "box-shadow 0.25s, transform 0.25s",
    cursor: "default",
  },
  featureIconWrap: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "4px",
  },
  featureTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#111827",
    letterSpacing: "-0.15px",
  },
  featureDesc: {
    fontSize: "13px",
    color: "#6b7280",
    lineHeight: "1.65",
  },

  // ── Steps
  stepsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "22px",
  },
  stepCard: {
    background: "#ffffff",
    border: "1px solid #e8eaf0",
    borderRadius: "16px",
    padding: "28px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  stepNumber: {
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "1px",
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    border: "1.5px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stepTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#111827",
    letterSpacing: "-0.2px",
  },
  stepDesc: {
    fontSize: "13px",
    color: "#6b7280",
    lineHeight: "1.65",
  },

  // ── CTA Banner
  ctaBanner: {
    margin: "48px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 60%, #4f46e5 100%)",
    padding: "52px 40px",
    textAlign: "center" as const,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 8px 32px rgba(124,58,237,0.3)",
    position: "relative",
    overflow: "hidden",
  },
  ctaBannerTitle: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: "-0.4px",
  },
  ctaBannerSubtitle: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.75)",
    marginBottom: "8px",
  },
  ctaBannerBtns: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
    flexWrap: "wrap" as const,
    justifyContent: "center",
  },
  ctaBannerPrimary: {
    padding: "12px 30px",
    borderRadius: "50px",
    border: "none",
    background: "#ffffff",
    color: "#7c3aed",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
  },
  ctaBannerSecondary: {
    padding: "12px 30px",
    borderRadius: "50px",
    border: "1.5px solid rgba(255,255,255,0.4)",
    background: "transparent",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background 0.2s",
  },

  // ── Footer
  footer: {
    padding: "24px 48px",
    borderTop: "1px solid #e8eaf0",
    background: "#ffffff",
    textAlign: "center" as const,
  },
  footerText: {
    fontSize: "12px",
    color: "#9ca3af",
  },

  // ── Right accent bar
  rightAccent: {
    width: "4px",
    background: "linear-gradient(180deg, #667eea 0%, #a78bfa 50%, transparent 100%)",
    opacity: 0.7,
  },
};