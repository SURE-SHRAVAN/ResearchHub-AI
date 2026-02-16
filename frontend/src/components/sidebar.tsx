import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        width: "220px",
        height: "100vh",
        background: "#141428",
        padding: "30px"
      }}
    >
      <h2>ResearchHub AI</h2>

      <nav style={{ marginTop: "40px" }}>
        {["home", "dashboard", "searchpapers", "ai", "uploadfiles", "docspace"].map((item) => (
          <motion.div whileHover={{ scale: 1.1 }} key={item}>
            <Link to={`/${item}`} style={{ display: "block", margin: "20px 0" }}>
              {item.toUpperCase()}
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
}
