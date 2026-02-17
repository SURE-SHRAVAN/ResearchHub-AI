import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
interface NavItem {
  icon: string;
  label: string;
  id: string;
  path: string;
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ active }: { active: string }) {
  const navigate = useNavigate();

  const nav: NavItem[] = [
    { icon: "🏠", label: "Home", id: "home", path: "/" },
    { icon: "📊", label: "Dashboard", id: "dashboard", path: "/dashboard" },
    { icon: "🔍", label: "Search Papers", id: "search", path: "/search" },
    { icon: "🤖", label: "AI Tools", id: "ai", path: "/ai-tools" },
    { icon: "📄", label: "Upload PDF", id: "upload", path: "/upload" },
    { icon: "📁", label: "DocSpace", id: "doc", path: "/docspace" },
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
export default function UploadPDF() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [aiSummary, setAiSummary] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<"text" | "summary" | null>("text");

  const handleFile = (file: File): void => {
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }
    setUploadedFile(file);
    setIsSaved(false);
    setAiSummary("");
    // Simulate text extraction
    setTimeout(() => {
      setExtractedText(
        `Extracted text from "${file.name}":\n\nAI agents are autonomous systems designed to perceive, reason, and act within dynamic environments. With the rapid advancements in generative AI (GenAI), large language models (LLMs) and multimodal large language models (MLLMs) have significantly improved AI agents' capabilities in semantic comprehension, complex reasoning, and autonomous decision-making.\n\nAt the same time, the rise of Agentic AI highlights adaptability and goal-directed autonomy in dynamic and complex environments. LLMs-based AI Agents (LLM-Agents) represent a paradigm shift in how AI systems operate, moving from passive responders to active participants that can plan, execute, and iterate on complex tasks.\n\nThis paper navigates the rich conceptual landscape of AI agents and Agentic AI, providing clarity on terminology, architectural patterns, and future directions for manufacturing applications.`
      );
      setActiveSection("text");
    }, 800);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (): void => setIsDragging(false);

  const handleGenerateSummary = (): void => {
    setIsGenerating(true);
    setActiveSection("summary");
    setTimeout(() => {
      setAiSummary(
        `**AI Summary**\n\nThis paper provides a comprehensive taxonomy of AI agent concepts and their applications in future manufacturing environments.\n\n**Key Findings:**\n• AI agents leverage LLMs for complex reasoning and decision-making\n• Agentic AI represents a shift toward goal-directed, autonomous operation\n• Manufacturing applications benefit from multi-agent coordination\n• Reliability and safety remain core challenges for deployment\n\n**Methodology:** Systematic literature review covering 150+ papers on AI agents, Agentic AI, and LLM-based autonomous systems published between 2020–2025.\n\n**Conclusion:** The convergence of generative AI and autonomous agent architectures presents significant opportunities for intelligent manufacturing, requiring careful attention to human-AI collaboration and safety constraints.`
      );
      setIsGenerating(false);
    }, 2200);
  };

  const handleSaveToWorkspace = (): void => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleDownloadText = (): void => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${uploadedFile?.name.replace(".pdf", "") ?? "extracted"}_text.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearFile = (): void => {
    setUploadedFile(null);
    setExtractedText("");
    setAiSummary("");
    setActiveSection(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div style={styles.root}>
      <Sidebar active="upload" />

      <div style={styles.main}>
        {/* Topbar */}
        <div style={styles.topbar}>
          <div style={styles.topbarSpacer} />
          <div style={styles.userChip}>
            <div style={styles.avatar}>R</div>
            <div style={styles.userInfo}>
              <span style={styles.userName}>RK</span>
              <span style={styles.userEmail}>123@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={styles.pageHeader}
          >
            <h1 style={styles.pageTitle}>Upload Research Paper</h1>
            <p style={styles.pageSubtitle}>
              Upload a PDF to extract text and generate AI insights
            </p>
          </motion.div>

          {/* Upload Zone */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            style={styles.uploadCard}
          >
            {/* Drop Zone */}
            <div
              style={{
                ...styles.dropZone,
                ...(isDragging ? styles.dropZoneActive : {}),
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => !uploadedFile && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                style={{ display: "none" }}
                onChange={handleFileInput}
              />

              <AnimatePresence mode="wait">
                {!uploadedFile ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={styles.dropContent}
                  >
                    {/* Upload icon */}
                    <div style={styles.uploadIconWrapper}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 16V8M12 8L9 11M12 8L15 11"
                          stroke="#667eea"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 16.5C21.1 15.8 22 14.5 22 13C22 10.8 20.2 9 18 9C17.8 9 17.6 9 17.4 9.1C16.8 6.7 14.6 5 12 5C8.7 5 6 7.7 6 11C6 11.4 6 11.7 6.1 12C4.3 12.5 3 14.1 3 16C3 18.2 4.8 20 7 20H18C19.1 20 20 19.1 20 18C20 17.4 19.7 16.9 19.3 16.5"
                          stroke="#667eea"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <h3 style={styles.dropTitle}>Upload PDF</h3>
                    <p style={styles.dropSubtitle}>
                      Drop your PDF file here or click to browse
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(102,126,234,0.5)" }}
                      whileTap={{ scale: 0.97 }}
                      style={styles.selectBtn}
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      Select PDF File
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="uploaded"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={styles.dropContent}
                  >
                    <div style={styles.uploadIconWrapper}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 16V8M12 8L9 11M12 8L15 11"
                          stroke="#667eea"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 16.5C21.1 15.8 22 14.5 22 13C22 10.8 20.2 9 18 9C17.8 9 17.6 9 17.4 9.1C16.8 6.7 14.6 5 12 5C8.7 5 6 7.7 6 11C6 11.4 6 11.7 6.1 12C4.3 12.5 3 14.1 3 16C3 18.2 4.8 20 7 20H18C19.1 20 20 19.1 20 18C20 17.4 19.7 16.9 19.3 16.5"
                          stroke="#667eea"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <h3 style={styles.dropTitle}>Upload PDF</h3>
                    <p style={styles.dropSubtitle}>
                      Drop your PDF file here or click to browse
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(102,126,234,0.5)" }}
                      whileTap={{ scale: 0.97 }}
                      style={styles.selectBtn}
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      Select PDF File
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Uploaded file pill */}
            <AnimatePresence>
              {uploadedFile && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.25 }}
                  style={styles.filePill}
                >
                  <span style={styles.filePillIcon}>📄</span>
                  <span style={styles.filePillName}>{uploadedFile.name}</span>
                  <span style={styles.filePillCheck}>✓</span>
                  <button
                    style={styles.filePillRemove}
                    onClick={clearFile}
                    title="Remove file"
                  >
                    ✕
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Action Buttons */}
          <AnimatePresence>
            {uploadedFile && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                style={styles.actionRow}
              >
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(102,126,234,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                  style={styles.actionBtnPrimary}
                  onClick={handleGenerateSummary}
                  disabled={isGenerating}
                >
                  <span style={styles.btnIcon}>✦</span>
                  {isGenerating ? "Generating..." : "Generate AI Summary"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(16,185,129,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    ...styles.actionBtnGreen,
                    ...(isSaved ? styles.actionBtnSaved : {}),
                  }}
                  onClick={handleSaveToWorkspace}
                >
                  <span style={styles.btnIcon}>{isSaved ? "✓" : "💾"}</span>
                  {isSaved ? "Saved!" : "Save to Workspace"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(59,130,246,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  style={styles.actionBtnBlue}
                  onClick={handleDownloadText}
                  disabled={!extractedText}
                >
                  <span style={styles.btnIcon}>⬇</span>
                  Download Text
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Extracted Text / AI Summary */}
          <AnimatePresence>
            {(extractedText || aiSummary) && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                style={styles.outputCard}
              >
                {/* Tab toggle */}
                {aiSummary && (
                  <div style={styles.outputTabs}>
                    <button
                      style={{
                        ...styles.outputTab,
                        ...(activeSection === "text" ? styles.outputTabActive : {}),
                      }}
                      onClick={() => setActiveSection("text")}
                    >
                      Extracted Text
                    </button>
                    <button
                      style={{
                        ...styles.outputTab,
                        ...(activeSection === "summary" ? styles.outputTabActive : {}),
                      }}
                      onClick={() => setActiveSection("summary")}
                    >
                      ✦ AI Summary
                    </button>
                  </div>
                )}

                {/* Content */}
                <AnimatePresence mode="wait">
                  {activeSection === "text" && extractedText && (
                    <motion.div
                      key="text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {!aiSummary && (
                        <h3 style={styles.outputLabel}>Extracted Text:</h3>
                      )}
                      <pre style={styles.outputText}>{extractedText}</pre>
                    </motion.div>
                  )}

                  {activeSection === "summary" && (
                    <motion.div
                      key="summary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isGenerating ? (
                        <div style={styles.generatingState}>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                            style={styles.spinner}
                          >
                            ✦
                          </motion.div>
                          <span style={styles.generatingText}>
                            Generating AI summary...
                          </span>
                        </div>
                      ) : (
                        <pre style={styles.outputText}>{aiSummary}</pre>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
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
    background: "#f0f2f5",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: "#1e1a3a",
    position: "relative",
  },

  // ── Sidebar
  sidebar: {
    width: "220px",
    flexShrink: 0,
    background: "#ffffff",
    borderRight: "1px solid #e8eaf0",
    display: "flex",
    flexDirection: "column",
    boxShadow: "2px 0 12px rgba(0,0,0,0.04)",
  },
  sidebarBrand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "24px 20px 20px",
    borderBottom: "1px solid #f0f2f5",
  },
  brandDot: {
    width: "26px",
    height: "26px",
    borderRadius: "7px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    flexShrink: 0,
  },
  sidebarBrandText: {
    fontSize: "15px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
    gap: "11px",
    padding: "9px 12px",
    borderRadius: "9px",
    cursor: "pointer",
    position: "relative",
    transition: "background 0.18s",
    color: "#64748b",
    fontSize: "14px",
  },
  navItemActive: {
    background: "rgba(102,126,234,0.1)",
    color: "#667eea",
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
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "14px 28px",
    borderBottom: "1px solid #e8eaf0",
    background: "#ffffff",
  },
  topbarSpacer: { flex: 1 },
  userChip: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "5px 12px",
    borderRadius: "50px",
    background: "#f8f9fc",
    border: "1px solid #e8eaf0",
    cursor: "pointer",
  },
  avatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: "700",
    color: "#fff",
    flexShrink: 0,
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.2,
  },
  userName: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#1e293b",
  },
  userEmail: {
    fontSize: "11px",
    color: "#94a3b8",
  },

  // ── Content
  content: {
    flex: 1,
    padding: "36px 48px",
    overflowY: "auto",
    maxWidth: "860px",
  },
  pageHeader: {
    marginBottom: "28px",
  },
  pageTitle: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "6px",
    letterSpacing: "-0.4px",
  },
  pageSubtitle: {
    fontSize: "14px",
    color: "#94a3b8",
  },

  // ── Upload Card
  uploadCard: {
    background: "#ffffff",
    border: "1px solid #e8eaf0",
    borderRadius: "16px",
    padding: "32px",
    marginBottom: "20px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
  },
  dropZone: {
    border: "2px dashed #d1d5db",
    borderRadius: "12px",
    padding: "40px 24px",
    transition: "border-color 0.2s, background 0.2s",
    cursor: "pointer",
    background: "transparent",
  },
  dropZoneActive: {
    borderColor: "#667eea",
    background: "rgba(102,126,234,0.04)",
  },
  dropContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    textAlign: "center" as const,
  },
  uploadIconWrapper: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "rgba(102,126,234,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "4px",
  },
  dropTitle: {
    fontSize: "17px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "2px",
  },
  dropSubtitle: {
    fontSize: "13px",
    color: "#94a3b8",
    marginBottom: "6px",
  },
  selectBtn: {
    padding: "11px 28px",
    borderRadius: "9px",
    border: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 14px rgba(102,126,234,0.35)",
    marginTop: "4px",
  },

  // ── File Pill
  filePill: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "16px",
    padding: "12px 16px",
    borderRadius: "10px",
    background: "rgba(16,185,129,0.08)",
    border: "1px solid rgba(16,185,129,0.25)",
    overflow: "hidden",
  },
  filePillIcon: { fontSize: "16px" },
  filePillName: {
    flex: 1,
    fontSize: "14px",
    fontWeight: "500",
    color: "#1e293b",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  filePillCheck: {
    fontSize: "14px",
    color: "#10b981",
    fontWeight: "700",
  },
  filePillRemove: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#94a3b8",
    fontSize: "14px",
    padding: "0 2px",
    lineHeight: 1,
    fontFamily: "inherit",
    transition: "color 0.2s",
  },

  // ── Action Buttons
  actionRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
    flexWrap: "wrap" as const,
  },
  actionBtnPrimary: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "11px 22px",
    borderRadius: "9px",
    border: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 14px rgba(102,126,234,0.3)",
    transition: "opacity 0.2s",
  },
  actionBtnGreen: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "11px 22px",
    borderRadius: "9px",
    border: "none",
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 14px rgba(16,185,129,0.25)",
    transition: "all 0.2s",
  },
  actionBtnSaved: {
    background: "linear-gradient(135deg, #6ee7b7 0%, #10b981 100%)",
  },
  actionBtnBlue: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "11px 22px",
    borderRadius: "9px",
    border: "none",
    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 14px rgba(59,130,246,0.25)",
    transition: "opacity 0.2s",
  },
  btnIcon: { fontSize: "14px" },

  // ── Output Card
  outputCard: {
    background: "#ffffff",
    border: "1px solid #e8eaf0",
    borderRadius: "16px",
    padding: "28px 32px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
  },
  outputTabs: {
    display: "flex",
    gap: "4px",
    borderBottom: "1px solid #e8eaf0",
    marginBottom: "20px",
  },
  outputTab: {
    background: "transparent",
    border: "none",
    borderBottom: "2px solid transparent",
    padding: "8px 16px",
    marginBottom: "-1px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#94a3b8",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  outputTabActive: {
    color: "#667eea",
    borderBottomColor: "#667eea",
    fontWeight: "600",
  },
  outputLabel: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "14px",
  },
  outputText: {
    fontSize: "13px",
    color: "#475569",
    lineHeight: "1.75",
    whiteSpace: "pre-wrap" as const,
    fontFamily: "inherit",
    margin: 0,
  },
  generatingState: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "24px 0",
    justifyContent: "center",
  },
  spinner: {
    fontSize: "22px",
    color: "#667eea",
    display: "inline-block",
  },
  generatingText: {
    fontSize: "14px",
    color: "#667eea",
    fontWeight: "500",
  },

  // ── Right accent bar
  rightAccent: {
    width: "4px",
    background: "linear-gradient(180deg, #667eea 0%, #a78bfa 50%, transparent 100%)",
    opacity: 0.7,
  },
};