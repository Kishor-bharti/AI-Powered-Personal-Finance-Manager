// src/pages/AddTransaction.jsx
import TransactionForm from "../components/TransactionForm";
import { useNavigate } from "react-router-dom";

export default function AddTransaction() {
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
