import Sidebar from "../components/sidebar";
import Layout from "../components/layout";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "60px", flex: 1 }}>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Dashboard
          </motion.h2>

          <p style={{ marginTop: "20px" }}>
            Overview of your research activity.
          </p>
        </div>
      </div>
    </Layout>
  );
}
