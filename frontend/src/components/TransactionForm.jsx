import { useState } from "react";
import API from "../api";

function TransactionForm({ onAdd }) {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  
  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!category || !amount || !date) {
      alert("Please fill all fields");
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
   }    
    try {
      await API.post("/transactions/add", { type, category, amount, date });
      onAdd();
    } catch (err) {
      alert("Failed to add transaction");
    }
  };

  return (
    <div style={{ 
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{ marginTop: 0, marginBottom: "20px" }}>Add Transaction</h3>
      <div style={{ display: "grid", gap: "15px", gridTemplateColumns: "1fr 1fr" }}>
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            backgroundColor: "white",
            color: "#333",
            width: "100%",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          <option value="expense" style={{ color: "#e74c3c" }}>Expense</option>
          <option value="income" style={{ color: "#2ecc71" }}>Income</option>
        </select>
        <input 
          placeholder="Category" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            padding: "12px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            fontSize: "16px",
            color: "#333",
            backgroundColor: "white"
          }}
        />
        <input 
          placeholder="Amount" 
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            padding: "12px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            fontSize: "16px",
            color: "#333",
            backgroundColor: "white"
          }}
        />
        <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            fontSize: "16px",
            color: "#333",
            backgroundColor: "transparent",
            cursor: "pointer"
          }}
        />
      </div>
      <button 
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "15px"
        }}
      >
        Add Transaction
      </button>
    </div>
  );
}

export default TransactionForm;
