import Sidebar from "../components/sidebar";
import Layout from "../components/layout";
import { useState } from "react";
import { motion } from "framer-motion";


export default function AI() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const ask = async () => {
    const res = await API.post("/chat", { question });
    setResponse(res.data.response);
  };

  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "60px", flex: 1 }}>
          <h2>AI Research Assistant</h2>

          <div style={{ marginTop: "20px" }}>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask research question..."
            />
            <button onClick={ask} style={{ marginLeft: "10px" }}>
              Ask
            </button>
          </div>

          {response && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ marginTop: "30px" }}
              className="glass"
            >
              <p style={{ padding: "20px" }}>{response}</p>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
