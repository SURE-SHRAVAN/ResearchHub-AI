import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/layout";
import API from "../utils/api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await API.post("/auth/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("token_type", response.data.token_type || "bearer");
      }
      navigate("/home");
    } catch (error: any) {
      setLoading(false);
      const msg = error.response?.data?.detail || "Login failed. Please check your credentials.";
      alert(msg);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        {/* Left Side: Brand/Marketing */}
        <div style={styles.brandSide}>
          <div style={styles.orb1} />
          <div style={styles.orb2} />
          
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={styles.brandContent}
          >
            <h1 style={styles.brandTitle}>Elevate Your Workflow</h1>
            <p style={styles.brandSubtitle}>
              Experience the next generation of productivity with our integrated platform.
            </p>

            <div style={styles.featuresList}>
              <div style={styles.feature}>
                <span style={styles.featureIcon}>🚀</span>
                <div>
                  <div style={styles.featureTitle}>Fast Performance</div>
                  <div style={styles.featureText}>Optimized for speed and efficiency.</div>
                </div>
              </div>
              <div style={styles.feature}>
                <span style={styles.featureIcon}>🛡️</span>
                <div>
                  <div style={styles.featureTitle}>Secure by Default</div>
                  <div style={styles.featureText}>Enterprise-grade encryption for your data.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Login Form */}
        <div style={styles.formSide}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={styles.formContainer}
          >
            {successMessage && (
              <div style={styles.successBanner}>✓ {successMessage}</div>
            )}

            <div style={styles.formHeader}>
              <h2 style={styles.formTitle}>Welcome Back</h2>
              <p style={styles.formSubtitle}>Please enter your details to sign in</p>
            </div>

            <form onSubmit={handleLogin} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.email && <div style={styles.error}>{errors.email}</div>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div style={styles.passwordWrapper}>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                  >
                    {showPassword ? "🔒" : "👁️"}
                  </button>
                </div>
                {errors.password && <div style={styles.error}>{errors.password}</div>}
              </div>

              <div style={styles.forgotPassword}>
                <span style={styles.forgotLink}>Forgot password?</span>
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                style={{
                    ...styles.submitButton,
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer"
                }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div style={styles.footer}>
              <p style={styles.footerText}>
                Don't have an account? <span style={styles.link} onClick={() => navigate("/")}>Sign up</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  // ... (Keep the styles exactly as you provided in your prompt)
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#0f0c29",
    position: "relative",
    overflow: "hidden",
  },
  brandSide: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px",
    position: "relative",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    overflow: "hidden",
  },
  brandContent: { maxWidth: "500px", zIndex: 2, position: "relative" },
  brandTitle: {
    fontSize: "48px",
    fontWeight: "800",
    color: "#fff",
    marginBottom: "20px",
    lineHeight: "1.2",
  },
  brandSubtitle: {
    fontSize: "18px",
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: "1.6",
    marginBottom: "50px",
  },
  featuresList: { display: "flex", flexDirection: "column", gap: "30px" },
  feature: {
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
    background: "rgba(255, 255, 255, 0.1)",
    padding: "20px",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  featureIcon: { fontSize: "32px", flexShrink: 0 },
  featureTitle: { fontSize: "18px", fontWeight: "600", color: "#ffffff", marginBottom: "5px" },
  featureText: { fontSize: "14px", color: "rgba(255, 255, 255, 0.8)", lineHeight: "1.5" },
  orb1: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
    top: "-100px",
    right: "-100px",
    zIndex: 1,
  },
  orb2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
    bottom: "-50px",
    left: "-50px",
    zIndex: 1,
  },
  formSide: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    background: "linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)",
  },
  formContainer: {
    width: "100%",
    maxWidth: "480px",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(20px)",
    padding: "50px 40px",
    borderRadius: "24px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  },
  successBanner: {
    padding: "12px 20px",
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    borderRadius: "12px",
    color: "#ffffff",
    fontSize: "14px",
    marginBottom: "30px",
    textAlign: "center" as const,
    fontWeight: "500",
  },
  formHeader: { marginBottom: "40px", textAlign: "center" as const },
  formTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "10px",
  },
  formSubtitle: { fontSize: "15px", color: "rgba(255, 255, 255, 0.6)" },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "14px", fontWeight: "500", color: "rgba(255, 255, 255, 0.8)" },
  input: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "15px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "#ffffff",
    outline: "none",
    boxSizing: "border-box" as "border-box",
  },
  passwordWrapper: { position: "relative" },
  eyeButton: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    opacity: 0.6,
  },
  error: { fontSize: "12px", color: "#ff4d4f", marginTop: "4px" },
  forgotPassword: { textAlign: "right" as const, marginTop: "-8px" },
  forgotLink: { fontSize: "14px", color: "#a78bfa", cursor: "pointer", fontWeight: "500" },
  submitButton: {
    width: "100%",
    padding: "16px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    marginTop: "10px",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
  },
  footer: { marginTop: "30px", textAlign: "center" as const },
  footerText: { fontSize: "14px", color: "rgba(255, 255, 255, 0.6)" },
  link: { color: "#a78bfa", cursor: "pointer", fontWeight: "600" },
};