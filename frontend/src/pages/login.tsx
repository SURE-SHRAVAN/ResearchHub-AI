import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";

export default function Login() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div style={{ display: "flex", height: "100vh" }}>
        
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          style={{
            flex: 1,
            background: "radial-gradient(circle at center, #7b2ff7, #0c0c1e)"
          }}
        />

        <div style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="glass"
            style={{ width: "400px", padding: "40px" }}
          >
            <h2 style={{ marginBottom: "20px" }}>Welcome Back</h2>

            <input placeholder="Email" style={inputStyle} />
            <input placeholder="Password" type="password" style={inputStyle} />

            <button
              className="button-primary"
              style={{ width: "100%", marginTop: "20px" }}
              onClick={() => navigate("/home")}
            >
              Sign In
            </button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

const inputStyle = {
  width: "100%",
  marginTop: "15px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #333",
  background: "#141428",
  color: "white"
};
