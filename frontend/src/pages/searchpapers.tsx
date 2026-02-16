import Sidebar from "../components/sidebar";
import Layout from "../components/layout";
import { useState } from "react";
import { motion } from "framer-motion";
import API from "../utils/api";

export default function SearchPapers() {
  const [query, setQuery] = useState("");
  const [papers, setPapers] = useState<any[]>([]);

  const search = async () => {
    const res = await API.get(`/search?query=${query}`);
    setPapers(res.data.papers);
  };

  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "60px", flex: 1 }}>
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Search Research Papers
          </motion.h2>

          <div style={{ marginTop: "20px" }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter topic..."
            />
            <button onClick={search} style={{ marginLeft: "10px" }}>
              Search
            </button>
          </div>

          <div style={{ marginTop: "30px" }}>
            {papers.map((paper, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass"
                style={{ padding: "20px", marginBottom: "20px" }}
              >
                <h4>{paper.title}</h4>
                <p>{paper.abstract}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
