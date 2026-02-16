import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/layout";
import API from "../utils/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    };

    let isValid = true;

    if (!form.full_name.trim()) {
      newErrors.full_name = "Full name is required";
      isValid = false;
    }

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
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!form.confirm_password) {
      newErrors.confirm_password = "Please confirm your password";
      isValid = false;
    } else if (form.password !== form.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // FastAPI compatible payload
      const payload = {
        full_name: form.full_name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      };

      await API.post("/auth/register", payload);

      // Success - redirect to login
      navigate("/login", {
        state: { message: "Registration successful! Please log in." },
      });
    } catch (error: any) {
      setLoading(false);
      
      // Handle FastAPI error responses
      if (error.response?.data?.detail) {
        const detail = error.response.data.detail;
        if (typeof detail === "string") {
          alert(detail);
        } else if (detail.msg) {
          alert(detail.msg);
        } else {
          alert("Registration failed. Please try again.");
        }
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        {/* Left Side - Brand */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.brandSide}
        >
          <div style={styles.brandContent}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 style={styles.brandTitle}>Research Hub AI</h1>
              <p style={styles.brandSubtitle}>
                Your intelligent companion for academic research and knowledge discovery
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={styles.featuresList}
            >
              <div style={styles.feature}>
                <div style={styles.featureIcon}>🔬</div>
                <div>
                  <h3 style={styles.featureTitle}>Advanced Research</h3>
                  <p style={styles.featureText}>
                    AI-powered insights and analysis
                  </p>
                </div>
              </div>

              <div style={styles.feature}>
                <div style={styles.featureIcon}>📊</div>
                <div>
                  <h3 style={styles.featureTitle}>Work Space</h3>
                  <p style={styles.featureText}>
                    Organize and manage your research projects
                  </p>
                </div>
              </div>

              <div style={styles.feature}>
                <div style={styles.featureIcon}>🤝</div>
                <div>
                  <h3 style={styles.featureTitle}>Chatbot-Assistance</h3>
                  <p style={styles.featureText}>
                    Get instant help and support from our AI chatbot
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Animated gradient orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={styles.orb1}
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={styles.orb2}
          />
        </motion.div>

        {/* Right Side - Registration Form */}
        <div style={styles.formSide}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={styles.formContainer}
          >
            <div style={styles.formHeader}>
              <h2 style={styles.formTitle}>Create Your Account</h2>
              <p style={styles.formSubtitle}>
                Join Research Hub AI and start your journey
              </p>
            </div>

            <form onSubmit={handleRegister} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  name="full_name"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.full_name}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    borderColor: errors.full_name ? "#ff4d4f" : "rgba(255, 255, 255, 0.1)",
                  }}
                />
                {errors.full_name && (
                  <span style={styles.error}>{errors.full_name}</span>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    borderColor: errors.email ? "#ff4d4f" : "rgba(255, 255, 255, 0.1)",
                  }}
                />
                {errors.email && (
                  <span style={styles.error}>{errors.email}</span>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div style={styles.passwordWrapper}>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      borderColor: errors.password ? "#ff4d4f" : "rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.password && (
                  <span style={styles.error}>{errors.password}</span>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm Password</label>
                <div style={styles.passwordWrapper}>
                  <input
                    name="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={form.confirm_password}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      borderColor: errors.confirm_password
                        ? "#ff4d4f"
                        : "rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeButton}
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.confirm_password && (
                  <span style={styles.error}>{errors.confirm_password}</span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                style={styles.submitButton}
                disabled={loading}
              >
                {loading ? (
                  <span style={styles.loadingSpinner}>Creating Account...</span>
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </form>

            <div style={styles.footer}>
              <p style={styles.footerText}>
                Already have an account?{" "}
                <span
                  style={styles.link}
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </span>
              </p>
            </div>

            <div style={styles.terms}>
              <p style={styles.termsText}>
                By creating an account, you agree to our{" "}
                <span style={styles.termsLink}>Terms of Service</span> and{" "}
                <span style={styles.termsLink}>Privacy Policy</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
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
  brandContent: {
    maxWidth: "500px",
    zIndex: 2,
    position: "relative",
  },
  brandTitle: {
    fontSize: "48px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "20px",
    lineHeight: "1.2",
  },
  brandSubtitle: {
    fontSize: "18px",
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: "1.6",
    marginBottom: "50px",
  },
  featuresList: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
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
  featureIcon: {
    fontSize: "32px",
    flexShrink: 0,
  },
  featureTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "5px",
  },
  featureText: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: "1.5",
  },
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
  formHeader: {
    marginBottom: "40px",
    textAlign: "center" as const,
  },
  formTitle: {
    fontSize: "32px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "10px",
  },
  formSubtitle: {
    fontSize: "15px",
    color: "rgba(255, 255, 255, 0.6)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.8)",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "15px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "#ffffff",
    outline: "none",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
  },
  passwordWrapper: {
    position: "relative",
  },
  eyeButton: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    padding: "4px",
    opacity: 0.6,
    transition: "opacity 0.2s",
  },
  error: {
    fontSize: "12px",
    color: "#ff4d4f",
    marginTop: "4px",
  },
  submitButton: {
    width: "100%",
    padding: "16px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    cursor: "pointer",
    marginTop: "10px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
  },
  loadingSpinner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  footer: {
    marginTop: "30px",
    textAlign: "center" as const,
  },
  footerText: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.6)",
  },
  link: {
    color: "#a78bfa",
    cursor: "pointer",
    fontWeight: "600",
    transition: "color 0.2s",
  },
  terms: {
    marginTop: "20px",
    textAlign: "center" as const,
  },
  termsText: {
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.4)",
    lineHeight: "1.6",
  },
  termsLink: {
    color: "#a78bfa",
    cursor: "pointer",
    textDecoration: "underline",
  },
};