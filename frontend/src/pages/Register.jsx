import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import AuthHeader from "../components/AuthHeader";
import Footer from "../components/Footer";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", { name, email, password });
      alert("✅ Registered! Now login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      <AuthHeader />
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 40px",
        marginTop: "80px",
        marginBottom: "80px", // Space for footer
        maxWidth: "1200px",
        margin: "80px auto 80px"
      }}>
        <div style={{
          width: "45%",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          backgroundColor: "#fff"
        }}>
          <h2 style={{ marginBottom: "20px", color: "#282c34" }}>Register</h2>
          <div style={{ marginBottom: "15px" }}>
            <input 
              placeholder="Name" 
              onChange={(e) => setName(e.target.value)}
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
            onClick={handleRegister}
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
            Register
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
            Join Finance Manager Today
          </h1>
          <p style={{ 
            fontSize: "1.2em", 
            lineHeight: "1.6",
            marginBottom: "20px",
            color: "#ccc"
          }}>
            Start your journey to financial freedom with our smart finance management platform.
          </p>
          <div style={{ marginBottom: "30px" }}>
            <h3 style={{ color: "#4CAF50", marginBottom: "15px" }}>Why Choose Us:</h3>
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
                🚀 Quick and easy setup
              </li>
              <li style={{ 
                marginBottom: "10px",
                display: "flex",
                alignItems: "center"
              }}>
                💡 Smart financial insights
              </li>
              <li style={{ 
                marginBottom: "10px",
                display: "flex",
                alignItems: "center"
              }}>
                📱 Access anywhere, anytime
              </li>
              <li style={{ 
                marginBottom: "10px",
                display: "flex",
                alignItems: "center"
              }}>
                🤝 Dedicated customer support
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
