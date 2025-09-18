import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/login");               // go back to login page
  };

  return (
    <header style={{ padding: "10px", background: "#282c34", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        💰 Finance Manager
      </h2>
      <nav>
        <button onClick={() => navigate("/")} style={{ marginRight: "10px" }}>Dashboard</button>
        <button onClick={() => navigate("/add")}>Add Transaction</button>
        <button onClick={handleLogout} style={{ marginLeft: "20px", background: "red", color: "white" }}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
