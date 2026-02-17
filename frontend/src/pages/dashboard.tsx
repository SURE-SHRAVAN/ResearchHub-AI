import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
interface NavItem {
  icon: string;
  label: string;
  id: string;
  path: string;
}

interface Workspace {
  id: number;
  name: string;
  description: string;
  paperCount: number;
  createdAt: string;
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ active }: { active: string }) {
  const navigate = useNavigate();

  const nav: NavItem[] = [
    { icon: "🏠", label: "Home",          id: "home",      path: "/" },
    { icon: "📊", label: "Dashboard",     id: "dashboard", path: "/dashboard" },
    { icon: "🔍", label: "Search Papers", id: "search",    path: "/search" },
    { icon: "🤖", label: "AI Tools",      id: "ai",        path: "/ai-tools" },
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

// ── Workspace Card ────────────────────────────────────────────────────────────
function WorkspaceCard({
  workspace,
  index,
  onDelete,
  onClick,
}: {
  workspace: Workspace;
  index: number;
  onDelete: (id: number) => void;
  onClick: (id: number) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const handleDelete = (e: React.MouseEvent): void => {
    e.stopPropagation();
    if (confirmDelete) {
      onDelete(workspace.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 2500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(124,58,237,0.1)" }}
      style={styles.workspaceCard}
      onClick={() => onClick(workspace.id)}
    >
      {/* Card Header */}
      <div style={styles.cardHeader}>
        <h3 style={styles.cardName}>{workspace.name}</h3>
        <div style={styles.cardHeaderRight}>
          <span style={styles.papersBadge}>{workspace.paperCount} papers</span>
          <button
            style={{
              ...styles.deleteBtn,
              ...(confirmDelete ? styles.deleteBtnConfirm : {}),
            }}
            onClick={handleDelete}
            title={confirmDelete ? "Click again to confirm" : "Delete workspace"}
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Description */}
      <p style={styles.cardDesc}>
        {workspace.description || "No description"}
      </p>

      {/* Footer */}
      <div style={styles.cardFooter}>
        <span style={styles.cardDate}>📅 Created {workspace.createdAt}</span>
      </div>
    </motion.div>
  );
}

// ── Create Workspace Modal ────────────────────────────────────────────────────
function CreateWorkspaceModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
}) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name.trim(), description.trim());
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={styles.modalOverlay}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.22 }}
        style={styles.modal}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Create New Workspace</h3>
          <button style={styles.modalClose} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.modalForm}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Workspace Name *</label>
            <input
              style={styles.formInput}
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder="e.g. AI Research, NLP Papers..."
              autoFocus
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Description</label>
            <input
              style={styles.formInput}
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
              placeholder="Optional description..."
            />
          </div>
          <div style={styles.modalActions}>
            <button type="button" style={styles.modalCancelBtn} onClick={onClose}>
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              style={{
                ...styles.modalCreateBtn,
                opacity: !name.trim() ? 0.5 : 1,
                cursor: !name.trim() ? "not-allowed" : "pointer",
              }}
              disabled={!name.trim()}
            >
              Create Workspace
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);

  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    { id: 1, name: "AI",        description: "No description",   paperCount: 0, createdAt: "10/24/2025" },
    { id: 2, name: "ML",        description: "No description",   paperCount: 0, createdAt: "10/25/2025" },
    { id: 3, name: "MR",        description: "research analysis",paperCount: 0, createdAt: "10/29/2025" },
    { id: 4, name: "PRAMOD",    description: "No description",   paperCount: 0, createdAt: "10/30/2025" },
    { id: 5, name: "Project 1", description: "No description",   paperCount: 0, createdAt: "11/01/2025" },
    { id: 6, name: "Agentic ai",description: "No description",   paperCount: 0, createdAt: "11/03/2025" },
  ]);

  const totalPapers = workspaces.reduce((sum, w) => sum + w.paperCount, 0);

  const handleCreate = (name: string, description: string): void => {
    const now = new Date();
    const dateStr = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
    setWorkspaces((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        description: description || "No description",
        paperCount: 0,
        createdAt: dateStr,
      },
    ]);
  };

  const handleDelete = (id: number): void => {
    setWorkspaces((prev) => prev.filter((w) => w.id !== id));
  };

  const handleWorkspaceClick = (id: number): void => {
    navigate(`/workspace/${id}`);
  };

  return (
    <div style={styles.root}>
      <Sidebar active="dashboard" />

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
            transition={{ duration: 0.38 }}
            style={styles.pageHeader}
          >
            <h1 style={styles.pageTitle}>Dashboard</h1>
            <p style={styles.pageSubtitle}>Manage your research workspaces</p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.08 }}
            style={styles.statsRow}
          >
            {/* Total Workspaces */}
            <div style={styles.statCard}>
              <div style={styles.statCardTop}>
                <div>
                  <p style={styles.statCardLabel}>Total Workspaces</p>
                  <p style={styles.statCardValue}>{workspaces.length}</p>
                </div>
                <div style={{ ...styles.statCardIcon, background: "#f3f0ff" }}>
                  <span style={{ fontSize: "20px" }}>📂</span>
                </div>
              </div>
            </div>

            {/* Papers Imported */}
            <div style={styles.statCard}>
              <div style={styles.statCardTop}>
                <div>
                  <p style={styles.statCardLabel}>Papers Imported</p>
                  <p style={styles.statCardValue}>{totalPapers}</p>
                </div>
                <div style={{ ...styles.statCardIcon, background: "#ecfdf5" }}>
                  <span style={{ fontSize: "20px" }}>📋</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ ...styles.statCard, ...styles.statCardWide }}>
              <p style={styles.statCardLabel}>Quick Actions</p>
              <div style={styles.quickActions}>
                <button
                  style={styles.quickActionBtn}
                  onClick={() => navigate("/search")}
                >
                  🔍 <span style={styles.quickActionText}>Search Papers</span>
                </button>
                <button
                  style={styles.quickActionBtn}
                  onClick={() => navigate("/upload")}
                >
                  📄 <span style={styles.quickActionText}>Upload PDF</span>
                </button>
                <button
                  style={styles.quickActionBtn}
                  onClick={() => navigate("/ai-tools")}
                >
                  🤖 <span style={styles.quickActionText}>AI Tools</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Create Button */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.14 }}
            style={styles.createRow}
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }}
              whileTap={{ scale: 0.97 }}
              style={styles.createBtn}
              onClick={() => setShowModal(true)}
            >
              <span style={styles.createBtnPlus}>+</span>
              Create New Workspace
            </motion.button>
          </motion.div>

          {/* Workspaces Grid */}
          <div style={styles.workspacesGrid}>
            <AnimatePresence>
              {workspaces.map((ws, i) => (
                <WorkspaceCard
                  key={ws.id}
                  workspace={ws}
                  index={i}
                  onDelete={handleDelete}
                  onClick={handleWorkspaceClick}
                />
              ))}
            </AnimatePresence>

            {workspaces.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={styles.emptyState}
              >
                <span style={styles.emptyIcon}>📭</span>
                <p style={styles.emptyText}>No workspaces yet. Create one to get started!</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Right accent bar */}
      <div style={styles.rightAccent} />

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <CreateWorkspaceModal
            onClose={() => setShowModal(false)}
            onCreate={handleCreate}
          />
        )}
      </AnimatePresence>
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
  },

  // ── Topbar
  topbar: {
    display: "flex",
    alignItems: "center",
    padding: "13px 32px",
    background: "#ffffff",
    borderBottom: "1px solid #e8eaf0",
  },
  topbarSpacer: { flex: 1 },
  userChip: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "5px 12px 5px 6px",
    borderRadius: "50px",
    background: "#f5f5fa",
    border: "1px solid #e4e4ee",
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
    color: "#1f2937",
  },
  userEmail: {
    fontSize: "10.5px",
    color: "#9ca3af",
  },

  // ── Content
  content: {
    flex: 1,
    padding: "28px 32px",
    overflowY: "auto",
  },

  // ── Page Header
  pageHeader: {
    marginBottom: "24px",
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#111827",
    letterSpacing: "-0.5px",
    marginBottom: "4px",
  },
  pageSubtitle: {
    fontSize: "13.5px",
    color: "#9ca3af",
  },

  // ── Stats Row
  statsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1.5fr",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    background: "#ffffff",
    border: "1px solid #e8eaf0",
    borderRadius: "14px",
    padding: "20px 22px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  statCardWide: {},
  statCardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statCardLabel: {
    fontSize: "12px",
    color: "#9ca3af",
    fontWeight: "500",
    marginBottom: "6px",
    letterSpacing: "0.2px",
  },
  statCardValue: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#111827",
    letterSpacing: "-0.5px",
    lineHeight: 1,
  },
  statCardIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quickActions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
    flexWrap: "wrap" as const,
  },
  quickActionBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "7px 14px",
    borderRadius: "8px",
    border: "1px solid #e8eaf0",
    background: "#faf9ff",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "inherit",
    color: "#374151",
    transition: "background 0.15s, border-color 0.15s",
  },
  quickActionText: {
    color: "#7c3aed",
    fontWeight: "600",
    fontSize: "13px",
  },

  // ── Create Button Row
  createRow: {
    marginBottom: "22px",
  },
  createBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 26px",
    borderRadius: "50px",
    border: "none",
    background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 16px rgba(124,58,237,0.32)",
    letterSpacing: "0.1px",
  },
  createBtnPlus: {
    fontSize: "18px",
    fontWeight: "400",
    lineHeight: 1,
    marginTop: "-1px",
  },

  // ── Workspaces Grid
  workspacesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },

  // ── Workspace Card
  workspaceCard: {
    background: "#ffffff",
    border: "1px solid #e8eaf0",
    borderRadius: "14px",
    padding: "18px 20px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    cursor: "pointer",
    transition: "box-shadow 0.22s, transform 0.22s",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "10px",
  },
  cardName: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#111827",
    letterSpacing: "-0.2px",
    flex: 1,
  },
  cardHeaderRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
  },
  papersBadge: {
    fontSize: "11px",
    fontWeight: "600",
    padding: "3px 9px",
    borderRadius: "50px",
    background: "#f3f0ff",
    color: "#7c3aed",
    border: "1px solid #e9d5ff",
    whiteSpace: "nowrap" as const,
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    opacity: 0.45,
    transition: "opacity 0.15s",
    padding: "2px",
    lineHeight: 1,
    borderRadius: "6px",
  },
  deleteBtnConfirm: {
    opacity: 1,
    background: "#fef2f2",
  },
  cardDesc: {
    fontSize: "12.5px",
    color: "#9ca3af",
    lineHeight: "1.5",
  },
  cardFooter: {
    marginTop: "4px",
  },
  cardDate: {
    fontSize: "11.5px",
    color: "#c4b5fd",
    fontWeight: "500",
  },

  // ── Empty State
  emptyState: {
    gridColumn: "1 / -1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "64px 24px",
    gap: "12px",
  },
  emptyIcon: { fontSize: "40px" },
  emptyText: {
    fontSize: "14px",
    color: "#9ca3af",
    textAlign: "center" as const,
  },

  // ── Modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    backdropFilter: "blur(3px)",
  },
  modal: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "28px 32px",
    width: "100%",
    maxWidth: "440px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    border: "1px solid #e8eaf0",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "22px",
  },
  modalTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
    letterSpacing: "-0.3px",
  },
  modalClose: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    color: "#9ca3af",
    padding: "4px",
    lineHeight: 1,
    fontFamily: "inherit",
    borderRadius: "6px",
    transition: "background 0.15s",
  },
  modalForm: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  formLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
  },
  formInput: {
    padding: "11px 14px",
    borderRadius: "10px",
    border: "1.5px solid #e5e7eb",
    fontSize: "14px",
    color: "#111827",
    outline: "none",
    fontFamily: "inherit",
    background: "#fafafa",
    transition: "border-color 0.15s",
  },
  modalActions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    marginTop: "6px",
  },
  modalCancelBtn: {
    padding: "10px 20px",
    borderRadius: "9px",
    border: "1.5px solid #e5e7eb",
    background: "transparent",
    color: "#6b7280",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  modalCreateBtn: {
    padding: "10px 22px",
    borderRadius: "9px",
    border: "none",
    background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
  },

  // ── Right accent bar
  rightAccent: {
    width: "4px",
    background: "linear-gradient(180deg, #667eea 0%, #a78bfa 50%, transparent 100%)",
    opacity: 0.7,
  },
};