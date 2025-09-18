import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/login");               // go back to login page
  };

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
      <h2 style={{ cursor: "pointer", margin: 0 }} onClick={() => navigate("/")}>
        💰 Finance Manager
      </h2>
      <nav>
        <button 
          onClick={() => navigate("/")} 
          style={{ 
            marginRight: "10px",
            backgroundColor: window.location.pathname === "/" ? "#4CAF50" : "#282c34"
          }}
        >
          Dashboard
        </button>
        <button 
          onClick={() => navigate("/add")}
          style={{ 
            backgroundColor: window.location.pathname === "/add" ? "#4CAF50" : "#282c34",
            marginRight: "15px"
          }}
        >
          Add Transaction
        </button>
        <button 
          onClick={handleLogout} 
          style={{ 
            backgroundColor: "#dc3545", 
            color: "white",
            padding: "8px 16px",
            marginRight: "10px"
          }}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
