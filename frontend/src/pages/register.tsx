import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/layout";
import API from "../utils/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      // If backend ready:
      await API.post("/register", form);

      setLoading(false);
      navigate("/"); // Go back to login
    } catch (error) {
      setLoading(false);
      alert("Registration failed");
    }
  };

  return (
    <Layout>
      <div style={{ display: "flex", height: "100vh" }}>
        
        {/* Animated Background */}
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          style={{
            flex: 1,
            background: "radial-gradient(circle at center, #a020f0, #0c0c1e)"
          }}
        />

        {/* Register Form */}
        <div style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass"
            style={{
              width: "420px",
              padding: "40px"
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>
              Create Account
            </h2>

            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={inputStyle}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-primary"
              style={{ width: "100%", marginTop: "20px" }}
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Creating..." : "Register"}
            </motion.button>

            <p style={{ marginTop: "20px", fontSize: "14px" }}>
              Already have an account?{" "}
              <span
                style={{ color: "#a020f0", cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Sign In
              </span>
            </p>
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
