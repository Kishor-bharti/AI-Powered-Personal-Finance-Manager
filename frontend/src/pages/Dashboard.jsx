import { useEffect, useState } from "react";
import API from "../api";
import TransactionForm from "../components/TransactionForm";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      alert("Failed to fetch transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Dashboard</h2>
      <TransactionForm onAdd={fetchTransactions} />
      <h3 style={{ marginTop: "40px", marginBottom: "20px" }}>Your Transactions</h3>
      <div style={{ 
        background: "white", 
        padding: "20px", 
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        {transactions.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>No transactions yet</p>
        ) : (
          <ul style={{ 
            listStyle: "none", 
            padding: 0,
            margin: 0 
          }}>
            {transactions.map((t) => (
              <li key={t.id} style={{
                padding: "15px",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <span style={{ 
                    color: t.type === "expense" ? "#e74c3c" : "#2ecc71",
                    fontWeight: "bold"
                  }}>
                    {t.type === "expense" ? "- " : "+ "}₹{t.amount}
                  </span>
                  <span style={{ marginLeft: "15px", color: "#666" }}>{t.category}</span>
                </div>
                <span style={{ color: "#999", fontSize: "0.9em" }}>{t.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
