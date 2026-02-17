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

interface Paper {
  id: number;
  title: string;
  authors: string;
  abstract: string;
  date: string;
  source: string;
  tags: string[];
  citations: number | null;
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

// ── Paper Card ────────────────────────────────────────────────────────────────
function PaperCard({
  paper,
  index,
  selected,
  onToggle,
}: {
  paper: Paper;
  index: number;
  selected: boolean;
  onToggle: (id: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      style={{
        ...styles.card,
        ...(selected ? styles.cardSelected : {}),
      }}
    >
      <div style={styles.cardInner}>
        {/* Checkbox */}
        <div
          style={{
            ...styles.checkBox,
            ...(selected ? styles.checkBoxSelected : {}),
          }}
          onClick={() => onToggle(paper.id)}
        >
          {selected && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.15 }}
              style={styles.checkMark}
            >
              ✓
            </motion.span>
          )}
        </div>

        {/* Body */}
        <div style={styles.cardBody}>
          <div style={styles.cardTitleRow}>
            <h3 style={styles.cardTitle}>{paper.title}</h3>
            <span style={styles.sourceBadge}>{paper.source}</span>
          </div>
          <p style={styles.cardAuthors}>{paper.authors}</p>
          <p style={styles.cardAbstract}>{paper.abstract}</p>
          <div style={styles.cardMeta}>
            <span style={styles.metaDate}>{paper.date}</span>
            {paper.tags.map((t) => (
              <span key={t} style={styles.metaTag}>{t}</span>
            ))}
            {paper.citations !== null && (
              <span style={styles.metaCitations}>{paper.citations} citations</span>
            )}
            <a href="#" style={styles.viewLink}>View Paper</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function SearchPapers() {
  const [query, setQuery] = useState<string>("agentic ai");
  const [source, setSource] = useState<string>("All Sources");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [searched, setSearched] = useState<boolean>(true);

  const papers: Paper[] = [
    {
      id: 1,
      title: "AI Agents and Agentic AI-Navigating a Plethora of Concepts for Future Manufacturing",
      authors: "Yinwang Ren, Yangyang Liu, Tang Ji, Xun Xu",
      abstract:
        "AI agents are autonomous systems designed to perceive, reason, and act within dynamic environments. With the rapid advancements in generative AI (GenAI), large language models (LLMs) and multimodal large language models (MLLMs) have significantly improved AI agents' capabilities in semantic comprehension, complex reasoning, and autonomous decision-making. At the same time, the rise of Agentic AI highlights adaptability and goal-directed autonomy in dynamic and complex environments. LLMs-based AI Agents (LLM-Agents)...",
      date: "2025-07-02",
      source: "arxiv",
      tags: ["arXiv", "0 citations"],
      citations: 0,
    },
    {
      id: 2,
      title: "Responsible AI Agents",
      authors: "Deven R. Desai, Mark O. Riedl",
      abstract:
        "Thanks to advances in large language models, a new type of software agent, the artificial intelligence (AI) agent, has entered the marketplace. Companies such as OpenAI, Google, Microsoft, and Salesforce promise that AI Agents will go from generating passive text to executing tasks. Instead of a travel itinerary, an AI Agent would book all aspects of your trip. Instead of generating text or images for social media post, an AI Agent would post the content across a host of social media outlets. The potential power of AI Agents has fueled...",
      date: "2025-06-15",
      source: "arxiv",
      tags: ["arXiv"],
      citations: 12,
    },
    {
      id: 3,
      title: "Agentic AI Systems: A Survey of Architectures, Capabilities and Challenges",
      authors: "Michael Chen, Sarah Park, James Wilson",
      abstract:
        "This survey provides a comprehensive overview of agentic AI systems, examining their core architectural components including planning modules, memory systems, and tool-use capabilities. We systematically review recent advances in multi-agent coordination, long-horizon task completion, and safety mechanisms.",
      date: "2025-05-28",
      source: "arxiv",
      tags: ["arXiv"],
      citations: 31,
    },
    {
      id: 4,
      title: "Tool-Augmented Language Agents for Scientific Discovery",
      authors: "Priya Sharma, Lucas Bauer, Mei Zhang",
      abstract:
        "We present a framework for deploying language model agents equipped with specialized scientific tools including literature retrieval, hypothesis generation, and experimental design assistance. Our approach demonstrates significant improvements in novel insight generation across chemistry, biology, and materials science domains.",
      date: "2025-04-11",
      source: "arxiv",
      tags: ["arXiv"],
      citations: 8,
    },
    {
      id: 5,
      title: "Memory-Augmented Agents for Long-Horizon Task Planning",
      authors: "Aria Patel, Robert Kim, Yuki Tanaka",
      abstract:
        "Long-horizon task planning remains a core challenge for autonomous AI agents. We propose a hierarchical memory architecture that enables agents to store, retrieve, and reason over extended interaction histories.",
      date: "2025-03-22",
      source: "Semantic Scholar",
      tags: ["S2"],
      citations: 19,
    },
    {
      id: 6,
      title: "Multi-Agent Debate for Factual Accuracy in LLMs",
      authors: "James Liu, Andrea Rossi, Kenji Watanabe",
      abstract:
        "We introduce a multi-agent debate framework where multiple LLM agents iteratively challenge and refine each other's outputs to improve factual accuracy. Our experiments across QA benchmarks demonstrate significant reduction in hallucination rates.",
      date: "2025-02-18",
      source: "arxiv",
      tags: ["arXiv"],
      citations: 44,
    },
    {
      id: 7,
      title: "ReAct: Synergizing Reasoning and Acting in Language Models",
      authors: "Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du",
      abstract:
        "We explore the use of LLMs to generate both reasoning traces and task-specific actions in an interleaved manner, allowing for greater synergy between the two and substantially improving performance on question answering and fact verification tasks.",
      date: "2025-01-05",
      source: "arxiv",
      tags: ["arXiv"],
      citations: 203,
    },
    {
      id: 8,
      title: "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversations",
      authors: "Qingyun Wu, Gagan Bansal, Jieyu Zhang",
      abstract:
        "AutoGen is an open-source framework that allows developers to build LLM applications via multiple agents that can converse with each other to accomplish tasks. AutoGen agents are customizable, conversable, and seamlessly allow human participation.",
      date: "2024-12-12",
      source: "arxiv",
      tags: ["arXiv"],
      citations: 512,
    },
    {
      id: 9,
      title: "Cognitive Architectures for Language Agents",
      authors: "Theodore Sumers, Shunyu Yao, Karthik Narasimhan",
      abstract:
        "Language agents are increasingly deployed to solve complex tasks requiring planning, memory, and tool use. We propose a unifying cognitive architecture for language agents, categorizing existing work and identifying key open challenges.",
      date: "2024-11-30",
      source: "Semantic Scholar",
      tags: ["S2"],
      citations: 87,
    },
    {
      id: 10,
      title: "AgentBench: Evaluating LLMs as Agents",
      authors: "Xiao Liu, Hao Yu, Hanchen Zhang, Yifan Xu",
      abstract:
        "We present AgentBench, the first systematic benchmark to evaluate LLMs as autonomous agents across diverse environments including web browsing, online shopping, database querying, and more.",
      date: "2024-10-22",
      source: "arxiv",
      tags: ["arXiv"],
      citations: 156,
    },
  ];

  const toggleSelect = (id: number): void => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div style={styles.root}>
      <Sidebar active="search" />

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
            <h1 style={styles.pageTitle}>Search Research Papers</h1>
            <p style={styles.pageSubtitle}>
              Search across millions of research papers and import them to your workspace
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.08 }}
            style={styles.searchBar}
          >
            <div style={styles.searchInputWrapper}>
              <span style={styles.searchInputIcon}>🔍</span>
              <input
                style={styles.searchInput}
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuery(e.target.value)
                }
                placeholder="Search papers, authors, topics..."
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(124,58,237,0.45)" }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              style={styles.searchBtn}
            >
              Search
            </motion.button>
          </motion.form>

          {/* Filters Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.14 }}
            style={styles.filtersRow}
          >
            <span style={styles.filterIcon}>▼</span>
            <span style={styles.filterLabel}>Source:</span>
            <select
              value={source}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSource(e.target.value)
              }
              style={styles.filterSelect}
            >
              <option>All Sources</option>
              <option>arxiv</option>
              <option>Semantic Scholar</option>
              <option>PubMed</option>
              <option>IEEE</option>
            </select>
          </motion.div>

          {/* Results Count */}
          {searched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.28, delay: 0.18 }}
              style={styles.resultsHeader}
            >
              <div style={styles.resultsCountBox}>
                <span style={styles.resultsCount}>
                  Found {papers.length} papers
                </span>
              </div>
              {selected.size > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.03 }}
                  style={styles.importBtn}
                  type="button"
                >
                  Import {selected.size} selected
                </motion.button>
              )}
            </motion.div>
          )}

          {/* Paper Cards */}
          <div style={styles.cardList}>
            <AnimatePresence>
              {papers.map((paper, i) => (
                <PaperCard
                  key={paper.id}
                  paper={paper}
                  index={i}
                  selected={selected.has(paper.id)}
                  onToggle={toggleSelect}
                />
              ))}
            </AnimatePresence>
          </div>
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
    marginBottom: "22px",
  },
  pageTitle: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#111827",
    letterSpacing: "-0.4px",
    marginBottom: "5px",
  },
  pageSubtitle: {
    fontSize: "13.5px",
    color: "#9ca3af",
  },

  // ── Search Bar
  searchBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "14px",
    alignItems: "stretch",
  },
  searchInputWrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#ffffff",
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    padding: "0 16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  },
  searchInputIcon: {
    fontSize: "14px",
    opacity: 0.4,
    flexShrink: 0,
  },
  searchInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#111827",
    fontSize: "14px",
    padding: "13px 0",
    fontFamily: "inherit",
  },
  searchBtn: {
    padding: "0 26px",
    fontSize: "14px",
    fontWeight: "700",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    color: "#fff",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 14px rgba(124,58,237,0.3)",
    letterSpacing: "0.1px",
  },

  // ── Filters
  filtersRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "18px",
  },
  filterIcon: {
    fontSize: "11px",
    color: "#9ca3af",
  },
  filterLabel: {
    fontSize: "13px",
    color: "#6b7280",
    fontWeight: "500",
  },
  filterSelect: {
    background: "#ffffff",
    border: "1.5px solid #e5e7eb",
    borderRadius: "8px",
    color: "#374151",
    padding: "6px 12px",
    fontSize: "13px",
    outline: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  },

  // ── Results Header
  resultsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "14px",
  },
  resultsCountBox: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "8px 16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  },
  resultsCount: {
    fontSize: "13px",
    color: "#374151",
    fontWeight: "500",
  },
  importBtn: {
    padding: "8px 18px",
    borderRadius: "8px",
    border: "1px solid #c4b5fd",
    background: "#f5f3ff",
    color: "#7c3aed",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
  },

  // ── Cards
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "18px 20px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    transition: "border-color 0.18s, box-shadow 0.18s",
  },
  cardSelected: {
    background: "#faf5ff",
    borderColor: "#c4b5fd",
    boxShadow: "0 2px 10px rgba(124,58,237,0.08)",
  },
  cardInner: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
  },
  checkBox: {
    marginTop: "2px",
    width: "17px",
    height: "17px",
    borderRadius: "5px",
    border: "2px solid #d1d5db",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background 0.15s, border-color 0.15s",
  },
  checkBoxSelected: {
    background: "#7c3aed",
    borderColor: "#7c3aed",
  },
  checkMark: {
    fontSize: "10px",
    color: "#fff",
    fontWeight: "700",
    lineHeight: 1,
  },
  cardBody: {
    flex: 1,
    minWidth: 0,
  },
  cardTitleRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "3px",
  },
  cardTitle: {
    fontSize: "14.5px",
    fontWeight: "700",
    color: "#1e1b4b",
    lineHeight: "1.4",
    flex: 1,
  },
  sourceBadge: {
    flexShrink: 0,
    fontSize: "10.5px",
    fontWeight: "600",
    padding: "2px 8px",
    borderRadius: "20px",
    background: "#f3f0ff",
    border: "1px solid #e9d5ff",
    color: "#7c3aed",
    letterSpacing: "0.2px",
  },
  cardAuthors: {
    fontSize: "12px",
    color: "#9ca3af",
    marginBottom: "8px",
  },
  cardAbstract: {
    fontSize: "12.5px",
    color: "#6b7280",
    lineHeight: "1.65",
    marginBottom: "10px",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  cardMeta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  metaDate: {
    fontSize: "11.5px",
    color: "#d1d5db",
    fontFamily: "monospace",
    background: "#f9fafb",
    padding: "2px 7px",
    borderRadius: "5px",
    border: "1px solid #e5e7eb",
  },
  metaTag: {
    fontSize: "11px",
    padding: "2px 8px",
    borderRadius: "20px",
    background: "#f3f0ff",
    color: "#7c3aed",
    border: "1px solid #e9d5ff",
    fontWeight: "500",
  },
  metaCitations: {
    fontSize: "11.5px",
    color: "#9ca3af",
    fontWeight: "500",
  },
  viewLink: {
    fontSize: "12px",
    color: "#7c3aed",
    textDecoration: "none",
    fontWeight: "600",
    marginLeft: "2px",
  },

  // ── Right accent bar
  rightAccent: {
    width: "4px",
    background: "linear-gradient(180deg, #667eea 0%, #a78bfa 50%, transparent 100%)",
    opacity: 0.7,
  },
};