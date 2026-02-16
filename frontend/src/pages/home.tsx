import Sidebar from "../components/sidebar";
import Layout from "../components/layout";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: "60px", flex: 1 }}>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Your AI-Powered Research Assistant
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{ marginTop: "20px" }}
          >
            Experience next-gen research productivity.
          </motion.p>
        </div>
      </div>
    </Layout>
  );
}
