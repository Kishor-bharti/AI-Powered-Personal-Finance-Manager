// src/pages/AddTransaction.jsx
import { useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import { useNavigate } from "react-router-dom";

export default function AddTransaction() {
  useEffect(() => {
    document.title = "Finance Manager | Add Transaction";
  }, []);

  const navigate = useNavigate();
  
  const handleAdded = () => {
    // Navigate back to dashboard after adding transaction
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Transaction</h2>
      <TransactionForm onAdd={handleAdded} />
    </div>
  );
}
