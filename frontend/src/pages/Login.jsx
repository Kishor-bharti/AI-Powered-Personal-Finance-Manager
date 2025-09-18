import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import AuthHeader from "../components/AuthHeader";
import Footer from "../components/Footer";
import "../styles/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/"); // Navigate to dashboard after successful login
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      <AuthHeader />
      <div className="auth-container">
        <div className="auth-form">
          <h2 style={{ marginBottom: "20px", color: "#282c34" }}>Login</h2>
          <div style={{ marginBottom: "15px" }}>
            <input 
              placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd"
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd"
              }}
            />
          </div>
          <button 
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Login
          </button>
        </div>
        <div style={{
          width: "45%",
          padding: "20px",
          color: "white"
        }}>
          <h1 style={{ 
            fontSize: "2.5em", 
            marginBottom: "20px",
            color: "#4CAF50"
          }}>
            Welcome to Finance Manager
          </h1>
          <p style={{ 
            fontSize: "1.2em", 
            lineHeight: "1.6",
            marginBottom: "20px",
            color: "#ccc"
          }}>
            Take control of your financial future with our comprehensive finance management solution.
          </p>
          <div style={{ marginBottom: "30px" }}>
            <h3 style={{ color: "#4CAF50", marginBottom: "15px" }}>Key Features:</h3>
            <ul style={{ 
              listStyle: "none",
              padding: 0,
              color: "#ccc"
            }}>
              <li style={{ 
                marginBottom: "10px",
                display: "flex",
                alignItems: "center"
              }}>
                📊 Track income and expenses effortlessly
              </li>
              <li style={{ 
                marginBottom: "10px",
                display: "flex",
                alignItems: "center"
              }}>
                🎯 Set and achieve financial goals
              </li>
              <li style={{ 
                marginBottom: "10px",
                display: "flex",
                alignItems: "center"
              }}>
                📈 Get AI-powered insights and analysis
              </li>
              <li style={{ 
                marginBottom: "10px",
                display: "flex",
                alignItems: "center"
              }}>
                🔒 Secure and private data management
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
