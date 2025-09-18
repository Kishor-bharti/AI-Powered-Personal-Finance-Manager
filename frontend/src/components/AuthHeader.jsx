import { useNavigate } from "react-router-dom";

function AuthHeader() {
  const navigate = useNavigate();

  return (
    <header style={{ 
      padding: "15px 20px",
      background: "#282c34",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: 0,
      width: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1000
    }}>
      <h2 style={{ cursor: "pointer", margin: "0 20px" }} onClick={() => navigate("/login")}>
        💰 Finance Manager
      </h2>
      <nav style={{ margin: "0 20px" }}>
        <button 
          onClick={() => navigate("/login")} 
          style={{ 
            marginRight: "10px",
            backgroundColor: window.location.pathname === "/login" ? "#4CAF50" : "#282c34"
          }}
        >
          Login
        </button>
        <button 
          onClick={() => navigate("/register")}
          style={{ 
            backgroundColor: window.location.pathname === "/register" ? "#4CAF50" : "#282c34"
          }}
        >
          Register
        </button>
      </nav>
    </header>
  );
}

export default AuthHeader;