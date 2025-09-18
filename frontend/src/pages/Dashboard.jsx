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
    <div>
      <h2>Dashboard</h2>
      <TransactionForm onAdd={fetchTransactions} />
      <h3>Your Transactions</h3>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.type} - {t.category} - ₹{t.amount} ({t.date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
